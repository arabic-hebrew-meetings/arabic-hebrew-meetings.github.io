// Meetings page scenarios. Each one loads a page with a fake sheet, then runs steps:
//   { click: selector }            click an element (el.click(), so hidden radio labels work too)
//   { type: [selector, text] }     type into a field
//   { capture: name }              record the page state (see run.mjs)
// A capture is also taken automatically right after the page loads ("loaded").
import { MARKED_SESSION_ID, MEETING_UPCOMING, TEST_PASSWORD, buildSheet } from './fixtures.js';

const pwd = `?pwd=${TEST_PASSWORD}`;
const hebrew = { click: '.input[data-val="Hebrew"]' };
const arabic = { click: '.input[data-val="Arabic"]' };
// Level radio buttons: desktop layout uses rdo-1..3 (Advanced, Intermediate, Beginner),
// the small-screen layout uses rdo-4..6 (Beginner, Intermediate, Advanced).
const level = (id) => ({ click: `label[for="${id}"]` });
const firstRoom = { click: '#options .input:first-child' };
const moreRooms = { click: '#options .input[data-val*="MoreOptions"]' };
const backToLanguage = { click: '#options .input[data-val="Choose-Native-Language-Back"]' };
const backToRecommended = { click: '#back-button' };

export const scenarios = [
  // Access
  { name: 'no-password', query: '', steps: [] },
  { name: 'wrong-password', query: '?pwd=wrong', steps: [] },
  { name: 'sheet-request-fails', query: pwd, sheetStatus: 500, steps: [] },

  // Before the meeting starts
  { name: 'countdown', query: pwd, sheet: buildSheet({ meetingTime: MEETING_UPCOMING }), steps: [] },
  { name: 'countdown-international', query: pwd, sheet: buildSheet({ meetingTime: MEETING_UPCOMING, international: 'TRUE' }), steps: [] },

  // Room picker
  {
    name: 'hebrew-beginner-recommended-and-more',
    query: pwd,
    steps: [hebrew, { capture: 'levels' }, level('rdo-3'), { capture: 'recommended' }, moreRooms, { capture: 'more-rooms' }, firstRoom, { capture: 'opened-other-room' }],
  },
  {
    name: 'arabic-advanced-open-recommended',
    query: pwd,
    steps: [arabic, { capture: 'levels' }, level('rdo-1'), { capture: 'recommended' }, firstRoom, { capture: 'opened-recommended-room' }],
  },
  {
    name: 'back-buttons',
    query: pwd,
    steps: [hebrew, level('rdo-2'), { capture: 'recommended' }, moreRooms, { capture: 'more-rooms' }, backToRecommended, { capture: 'back-to-recommended' }, backToLanguage, { capture: 'back-to-language' }],
  },
  {
    name: 'tie-broken-randomly',
    query: pwd,
    sheet: buildSheet({ counters: Array.from({ length: 10 }, () => [0, 0]) }),
    steps: [hebrew, level('rdo-2'), { capture: 'recommended' }],
  },
  {
    name: 'invalid-counters',
    query: pwd,
    sheet: buildSheet({ counters: null }),
    steps: [arabic, level('rdo-2'), { capture: 'recommended' }],
  },
  {
    name: 'all-rooms-closed',
    query: pwd,
    sheet: buildSheet({ openStatus: Array(10).fill('Closed') }),
    steps: [hebrew, { capture: 'levels' }, level('rdo-3'), { capture: 'recommended' }],
  },
  {
    name: 'small-screen-hebrew-flow',
    query: pwd,
    width: 390,
    steps: [hebrew, { capture: 'levels' }, level('rdo-4'), { capture: 'recommended' }, firstRoom, { capture: 'opened-room' }],
  },
  {
    name: 'small-screen-countdown',
    query: pwd,
    width: 390,
    sheet: buildSheet({ meetingTime: MEETING_UPCOMING }),
    steps: [],
  },

  // The ?s= source parameter is logged with the page open and each room entry
  { name: 'source-facebook-announcement', query: `${pwd}&s=fpa_10-01`, steps: [hebrew, level('rdo-3'), firstRoom, { capture: 'opened-room' }] },
  { name: 'source-direct-message-without-date', query: `${pwd}&s=dfm`, steps: [arabic, level('rdo-1'), firstRoom, { capture: 'opened-room' }] },
  { name: 'source-unknown-key', query: `${pwd}&s=newsletter`, steps: [] },

  // Marked sessions get a details form instead of rooms
  {
    name: 'marked-session',
    query: pwd,
    sessionCookie: MARKED_SESSION_ID,
    steps: [
      hebrew,
      level('rdo-3'),
      { capture: 'form' },
      { type: ['#marked_facebook_name', ' '] },
      { type: ['#marked_phone_number', ' '] },
      { click: '.marked-form-submit' },
      { capture: 'blank-details' },
      { type: ['#marked_facebook_name', 'Test Name'] },
      { type: ['#marked_phone_number', '0500000000'] },
      { click: '.marked-form-submit' },
      { capture: 'after-submit' },
    ],
  },

  // Experimental copies of the meetings page
  { name: 'ignore-countdown-page', page: 'meetingsIgnoreCountdown', query: pwd, sheet: buildSheet({ meetingTime: MEETING_UPCOMING }), steps: [] },
  // The share-test pages don't load sha256.js, so the password check throws "SHA256 is not defined".
  { name: 'share-test-page', page: 'sharetryagain', query: pwd, steps: [] },
  { name: 'share-test-page-no-password', page: 'sharetryagain', query: '', steps: [] },
];
