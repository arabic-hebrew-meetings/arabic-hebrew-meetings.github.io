// Usage tracking: actions and meeting entries are logged by posting to Google Forms.
// Moved from public/headerFooterScript.js. Until every page is converted, legacyGlobals.js
// also exposes these functions on window for the legacy page scripts.

const ACTIONS_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc80anqYMA0tJUUe6VTZ6AqIWT5METAW_by6iZaw0XrVsCLJQ/formResponse';
const MEETING_ENTRIES_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfWguAsBgnb3a3s4P7JLzWwXWFZnP82nXbMddmjr_QugOqw8Q/formResponse';

// Google Forms does not send CORS headers, so the response is unreadable ("no-cors");
// the submission itself still goes through, which is all we need.
export function postToGoogleForm(url, data) {
  return fetch(url, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(data) }).catch(() => {});
}

export function saveAction(siteLocation, action, params) {
  doSaveAction(siteLocation, action, params, true, true);
}

export function doSaveAction(siteLocation, action, params, createNewSessionIfNeeded, saveAlsoAnonymous) {
  const paramsStr = params != null ? JSON.stringify(params) : '';
  const sessionId = getSessionId(siteLocation, createNewSessionIfNeeded);
  if (sessionId != 'anonymous' || saveAlsoAnonymous) {
    postToGoogleForm(ACTIONS_FORM_URL, {
      'entry.354079520': sessionId,
      'entry.1032780145': siteLocation,
      'entry.1729768685': action,
      'entry.579761647': paramsStr,
    });
  }
}

export function saveMeetingEntry(nativeLanguage, level, languageInRoom, roomNumber, roomType, sourceKey, meetingDate) {
  postToGoogleForm(MEETING_ENTRIES_FORM_URL, {
    'entry.354079520': getSessionId('meetings', true),
    'entry.1032780145': nativeLanguage,
    'entry.1729768685': level,
    'entry.579761647': languageInRoom,
    'entry.1804344661': roomNumber,
    'entry.358084798': roomType,
    'entry.12017553': sourceKey,
    'entry.366684760': meetingDate,
  });
}

export function createSessionId(siteLocation) {
  writeCookie('sessionId', guid(), 1000);
  doSaveAction(siteLocation, 'new_user', null, false, false);
}

export function getSessionId(siteLocation, createNewSessionIfNeeded) {
  let sessionId = readCookie('sessionId');
  if (createNewSessionIfNeeded && sessionId == '') {
    createSessionId(siteLocation);
    sessionId = readCookie('sessionId');
  }
  return sessionId == '' ? 'anonymous' : sessionId;
}

export function writeCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

export function readCookie(name) {
  const nameEQ = name + '=';
  for (let c of document.cookie.split(';')) {
    c = c.trimStart();
    if (c.startsWith(nameEQ)) {
      return c.substring(nameEQ.length);
    }
  }
  return '';
}

export function eraseCookie(name) {
  writeCookie(name, '', -1);
}

// Random id in the format 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', e.g. "c2181edf-041b-0a61-3651-79d671fa3db7".
export function guid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
