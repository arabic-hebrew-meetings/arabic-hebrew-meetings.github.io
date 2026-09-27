import { useEffect, useRef, useState } from 'react';
import { activities } from '../activities.js';

// Renders the contents of <nav id="header">: the site title, the mobile menu button and the activities
// dropdown. The dropdown and the mobile menu used to be run by Bootstrap 3.3.7's jQuery plugins
// (dropdown.js, collapse.js); they're reimplemented here with the same behavior, so the site doesn't need
// jQuery or bootstrap.min.js any more.

const COLLAPSE_DURATION = 350; // Bootstrap's Collapse.TRANSITION_DURATION (the .collapsing CSS transition)

// Vertical padding + border: jQuery's .height(value) adds them for box-sizing: border-box elements.
function verticalExtras(el) {
  const cs = getComputedStyle(el);
  return ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'].reduce((sum, p) => sum + parseFloat(cs[p]), 0);
}

// Calls done() when el's own CSS transition ends, or after `duration` ms, whichever comes first
// (Bootstrap's bsTransitionEnd + emulateTransitionEnd).
function onTransitionEnd(el, duration, done) {
  let called = false;
  const finish = () => {
    if (called) return;
    called = true;
    el.removeEventListener('transitionend', handler);
    done();
  };
  const handler = (e) => e.target === el && finish();
  el.addEventListener('transitionend', handler);
  setTimeout(finish, duration);
}

// The mobile menu's open/close animation, as in Bootstrap's Collapse.show()/hide(). It changes the
// element's classes and inline height directly (React never re-renders that className).
function useCollapse() {
  const ref = useRef(null);
  const transitioning = useRef(false);

  function show(el) {
    const extras = verticalExtras(el);
    el.classList.remove('collapse');
    el.classList.add('collapsing');
    el.style.height = 0 + extras + 'px';
    el.setAttribute('aria-expanded', 'true');
    transitioning.current = true;
    onTransitionEnd(el, COLLAPSE_DURATION, () => {
      el.classList.remove('collapsing');
      el.classList.add('collapse', 'in');
      el.style.height = '';
      transitioning.current = false;
    });
    el.style.height = el.scrollHeight + extras + 'px'; // reading scrollHeight first lays out the 0 height, so it animates
  }

  function hide(el) {
    el.style.height = getComputedStyle(el).height; // the current (border-box) height, to animate from
    void el.offsetHeight;
    el.classList.add('collapsing');
    el.classList.remove('collapse', 'in');
    el.setAttribute('aria-expanded', 'false');
    transitioning.current = true;
    el.style.height = 0 + verticalExtras(el) + 'px';
    onTransitionEnd(el, COLLAPSE_DURATION, () => {
      transitioning.current = false;
      el.classList.remove('collapsing');
      el.classList.add('collapse');
    });
  }

  function toggle() {
    const el = ref.current;
    if (transitioning.current) return; // clicks during the animation are ignored
    if (el.classList.contains('in')) hide(el);
    else show(el);
  }

  return [ref, toggle];
}

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ESC = 27;
const KEY_SPACE = 32;

// The activities dropdown, as in Bootstrap's dropdown.js: clicking the toggle opens/closes it, any other
// click closes it, and the keyboard works like Dropdown.prototype.keydown.
function useDropdown() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(); // aria-expanded on the toggle: absent until first used
  const openRef = useRef(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const setOpenState = (value) => {
    openRef.current = value;
    setOpen(value);
    setExpanded(value ? 'true' : 'false');
  };
  const close = () => openRef.current && setOpenState(false);

  function toggle() {
    const wasOpen = openRef.current;
    close();
    if (!wasOpen) {
      toggleRef.current.focus();
      setOpenState(true);
    }
  }

  function onToggleClick(e) {
    e.preventDefault();
    e.nativeEvent.stopPropagation(); // like Bootstrap's `return false`: the document click handler must not close it again
    toggle();
  }

  function onKeyDown(e, fromMenu) {
    const key = e.keyCode;
    if (![KEY_UP, KEY_DOWN, KEY_ESC, KEY_SPACE].includes(key) || /input|textarea/i.test(e.target.tagName)) return;
    e.preventDefault();
    e.stopPropagation();
    const isOpen = openRef.current;
    if ((!isOpen && key != KEY_ESC) || (isOpen && key == KEY_ESC)) {
      if (key == KEY_ESC) toggleRef.current.focus();
      // Bootstrap clicked the element: on the toggle that toggles the menu, from inside the menu it closes it.
      if (fromMenu) close();
      else toggle();
      return;
    }
    const items = [...menuRef.current.querySelectorAll('li:not(.disabled) a')].filter((a) => a.getClientRects().length > 0);
    if (!items.length) return;
    let index = items.indexOf(e.target);
    if (key == KEY_UP && index > 0) index--;
    if (key == KEY_DOWN && index < items.length - 1) index++;
    if (index == -1) index = 0;
    items[index].focus();
  }

  // Any click outside the toggle closes the menu (including clicks on its items).
  useEffect(() => {
    const onDocumentClick = (e) => e.button !== 2 && close();
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  return { open, expanded, toggleRef, menuRef, onToggleClick, onKeyDown };
}

export default function Navbar() {
  const [collapseRef, toggleCollapse] = useCollapse();
  const dropdown = useDropdown();

  return (
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" onClick={toggleCollapse}>
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a href="/index.html" className="navbar-brand">נפגשים לדבר &nbsp; نلتقي لنحكي</a>
      </div>
      <div className="collapse navbar-collapse" ref={collapseRef}>
        <ul className="nav navbar-nav navbar-right">
          <li className={dropdown.open ? 'dropdown rtl open' : 'dropdown rtl'}>
            <a
              href="#"
              className="dropdown-toggle"
              ref={dropdown.toggleRef}
              aria-expanded={dropdown.expanded}
              onClick={dropdown.onToggleClick}
              onKeyDown={(e) => dropdown.onKeyDown(e, false)}
            >
              פעילויות &nbsp; فعاليات <b className="caret"></b>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-right"
              style={{ textAlign: 'right' }}
              ref={dropdown.menuRef}
              onKeyDown={(e) => dropdown.onKeyDown(e, true)}
            >
              {activities.map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
