// Exposes the shared helpers on window for the legacy scripts in public/ that still call them
// as globals (e.g. saveAction in every activity script). Remove each entry once no legacy
// script uses it.
//
// Timing: module scripts run after the HTML is parsed but before DOMContentLoaded, so these
// are in place before any legacy click handler or $(document).ready callback can run. They are
// NOT available to legacy code that runs while the page is still parsing.
import { getSessionId, saveAction, saveMeetingEntry } from './lib/tracking.js';

Object.assign(window, {
  saveAction, // every activity script, meetingsScript.js
  saveMeetingEntry, // meetingsScript.js
  getSessionId, // meetingsScript.js, handleMarkedSessionDetails in headerFooterScript.js
});
