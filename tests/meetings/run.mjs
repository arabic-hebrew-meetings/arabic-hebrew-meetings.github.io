// Scenario tests for the meetings page. Runs every scenario in scenarios.js in headless Chrome against
// fake sheet data, with the clock frozen and Math.random seeded, and compares what the page shows and
// sends with the snapshots in ./snapshots.
//
//   npm run test:meetings                       build, serve and compare with the snapshots
//   npm run test:meetings -- --update           re-record the snapshots
//   npm run test:meetings -- --only countdown   run only scenarios whose name contains "countdown"
//   npm run test:meetings -- --base <url>       test an already running site instead of building
//   npm run test:meetings -- --screenshots dir  also save a screenshot per capture
//
// Nothing real is contacted: the sheet request is answered with fixtures, Google Forms posts are
// recorded and answered locally, window.open is recorded instead of opening, and ads/analytics are blocked.
// Chrome: set CHROME_PATH, otherwise the usual macOS / Linux install locations are tried.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { NOW, buildSheet } from './fixtures.js';
import { scenarios } from './scenarios.js';

const here = dirname(fileURLToPath(import.meta.url));
const snapshotDir = join(here, 'snapshots');
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const update = flag('--update');
const only = option('--only');
const screenshotDir = option('--screenshots');

const LOAD_WAIT = 2000; // after the page loads (sheet request, menu animation)
const ACTION_WAIT = 2500; // after a click (GSAP timeline + elastic animation + possible sheet refetch)

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error('Chrome not found; set CHROME_PATH');
  return found;
}

async function startServer() {
  const { build, preview } = await import('vite');
  await build({ logLevel: 'error' });
  const server = await preview({ logLevel: 'error', preview: { port: 4190, strictPort: false } });
  return { url: server.resolvedUrls.local[0].replace(/\/$/, ''), close: () => server.httpServer.close() };
}

// Runs in the page before any script: frozen clock, seeded Math.random, recorded window.open.
// Only `new Date()` is frozen (that's how the page reads the current time); Date.now() keeps running,
// because the animation library measures elapsed time with it and would otherwise never finish.
function pageSetup(now) {
  const RealDate = Date;
  class FrozenDate extends RealDate {
    constructor(...a) {
      super(...(a.length ? a : [now]));
    }
  }
  window.Date = FrozenDate;
  let seed = 12345;
  Math.random = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  window.__opened = [];
  window.open = (url, target) => { window.__opened.push([url, target]); return null; };
}

// Page state, normalized so that equivalent markup compares equal (whitespace, attribute order,
// inline style formatting) and animation-only inline styles (GSAP transforms) are ignored.
function capturePage() {
  const ATTRS = ['data-val', 'href', 'src', 'for', 'type', 'name', 'placeholder', 'target', 'title', 'required'];
  const STYLES = ['visibility', 'color', 'text-decoration', 'min-height'];
  const walk = (n) => {
    if (n.nodeType === 3) return n.textContent.trim() ? JSON.stringify(n.textContent.replace(/\s+/g, ' ').trim()) : null;
    if (n.nodeType !== 1) return null;
    const tag = n.tagName.toLowerCase();
    const cls = typeof n.className === 'string' && n.className.trim() ? '.' + n.className.trim().split(/\s+/).join('.') : '';
    const attrs = ATTRS.filter((a) => n.hasAttribute(a)).map((a) => `${a}=${n.getAttribute(a)}`);
    const styles = STYLES.map((s) => [s, n.style?.getPropertyValue(s)]).filter(([, v]) => v).map(([s, v]) => `${s}:${v}`);
    if (tag === 'svg') return `<svg${cls}>`; // icon paths don't matter
    const meta = [...attrs, ...styles];
    const children = [...n.childNodes].map(walk).filter(Boolean);
    return `<${tag}${n.id ? '#' + n.id : ''}${cls}${meta.length ? '{' + meta.join(',') + '}' : ''}>${children.length ? '[' + children.join(',') + ']' : ''}`;
  };
  const round = (v) => v.replace(/-?\d+\.\d+/g, (x) => String(Math.round(Number(x) * 100) / 100));
  return {
    page: walk(document.querySelector('.main-div')),
    menuButtons: [...document.querySelectorAll('.input')].map((el) => {
      const cs = getComputedStyle(el);
      return `${el.dataset.val}: opacity ${round(cs.opacity)}, background ${cs.backgroundColor}, transform ${round(cs.transform)}`;
    }),
    opened: window.__opened.slice(),
  };
}

const summarizeForm = (url, body) => {
  const form = url.match(/e\/([^/]+)\/formResponse/)?.[1].slice(-6);
  const fields = Object.fromEntries(new URLSearchParams(body || ''));
  for (const [k, v] of Object.entries(fields)) if (/^[0-9a-f]{8}-[0-9a-f]{4}-/.test(v)) fields[k] = '<session-id>';
  return `${form} ${JSON.stringify(fields)}`;
};

async function runScenario(browser, base, scenario) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const record = { captures: {}, sheetRequests: 0, errors: [], dialogs: [] };
  let pendingForms = [];

  await page.emulateTimezone('UTC');
  await page.setViewport({ width: scenario.width || 1280, height: 800 });
  await page.evaluateOnNewDocument(pageSetup, NOW);
  if (scenario.sessionCookie) {
    await page.setCookie({ name: 'sessionId', value: scenario.sessionCookie, url: base });
  }
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.startsWith('https://sheets.googleapis.com/')) {
      record.sheetRequests++;
      const status = scenario.sheetStatus || 200;
      const body = status === 200 ? JSON.stringify(scenario.sheet || buildSheet()) : '{"error":"test"}';
      return req.respond({ status, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body });
    }
    if (url.includes('docs.google.com/forms')) {
      pendingForms.push(summarizeForm(url, req.postData()));
      return req.respond({ status: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: '' });
    }
    if (/googlesyndication|googletagmanager|google-analytics/.test(url)) return req.abort();
    req.continue();
  });
  page.on('pageerror', (e) => record.errors.push(e.message.split('\n')[0]));
  page.on('dialog', async (d) => { record.dialogs.push(d.message()); await d.accept(); });

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const capture = async (name) => {
    record.captures[name] = { ...(await page.evaluate(capturePage)), tracking: pendingForms };
    pendingForms = [];
    if (screenshotDir) await page.screenshot({ path: join(screenshotDir, `${scenario.name}--${name}.png`) });
  };

  await page.goto(`${base}/${encodeURIComponent(scenario.page || 'meetings')}.html${scenario.query}`, { waitUntil: 'networkidle2' });
  await wait(LOAD_WAIT);
  await capture('loaded');
  for (const step of scenario.steps) {
    if (step.click) {
      await page.$eval(step.click, (el) => el.click());
      await wait(ACTION_WAIT);
    } else if (step.type) {
      await page.$eval(step.type[0], (el) => (el.value = ''));
      await page.type(step.type[0], step.type[1]);
    } else if (step.capture) {
      await capture(step.capture);
    }
  }
  await context.close();
  return record;
}

// Lists the differences between two JSON values as "path: expected -> actual".
function diff(expected, actual, path = '') {
  if (JSON.stringify(expected) === JSON.stringify(actual)) return [];
  if (expected && actual && typeof expected === 'object' && typeof actual === 'object') {
    return [...new Set([...Object.keys(expected), ...Object.keys(actual)])].flatMap((k) => diff(expected[k], actual[k], `${path}.${k}`));
  }
  const show = (v) => (JSON.stringify(v) ?? 'undefined').slice(0, 300);
  return [`${path}:\n      expected ${show(expected)}\n      actual   ${show(actual)}`];
}

const selected = scenarios.filter((s) => !only || s.name.includes(only));
if (screenshotDir) mkdirSync(screenshotDir, { recursive: true });
mkdirSync(snapshotDir, { recursive: true });

const server = option('--base') ? { url: option('--base').replace(/\/$/, ''), close() {} } : await startServer();
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
let failures = 0;
try {
  for (const scenario of selected) {
    const record = await runScenario(browser, server.url, scenario);
    const file = join(snapshotDir, `${scenario.name}.json`);
    if (update || !existsSync(file)) {
      writeFileSync(file, JSON.stringify(record, null, 2) + '\n');
      console.log(`recorded  ${scenario.name}`);
      continue;
    }
    const differences = diff(JSON.parse(readFileSync(file, 'utf8')), record);
    if (differences.length) {
      failures++;
      console.log(`FAIL      ${scenario.name}\n    ${differences.join('\n    ')}`);
    } else {
      console.log(`ok        ${scenario.name}`);
    }
  }
} finally {
  await browser.close();
  server.close();
}
console.log(failures ? `\n${failures} of ${selected.length} scenarios differ from the snapshots` : `\nall ${selected.length} scenarios match`);
process.exit(failures ? 1 : 0);
