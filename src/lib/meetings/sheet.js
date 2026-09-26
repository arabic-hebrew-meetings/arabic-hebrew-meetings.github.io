// The meetings data lives in a public Google Sheet, read through the Sheets API.
// Moved from updateNextMeetingInfo() / updateDataAndDisplayRecommendations() in public/meetingsScript.js.

const SHEET_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1Fk1Ojj2D0UB0mopeJpmYR5k3wwjll2OFwLGozEy1hPE/values/Data!1:54?key=AIzaSyDo2RRl54o6M6wy5yCNv9cZW3OW8o7YNgs';

// Values used until the sheet has loaded (the legacy script's initial values).
export function initialMeetingData() {
  return {
    nextMeetingInfo: ['UTC Meeting time:', 'May 9, 2060 18:00:00', 'Meeting time text in Arabic:', 'يوم السبت', 'Meeting time text in Hebrew:', 'יום שבת', 'Meeting date hour:', '09/05 21:00', 'Is International:', 'FALSE'],
    meetingsCounters: [],
    roomsOpenStatus: ['Closed', 'Closed', 'Closed', 'Closed'],
    roomsRecommendedStatus: ['Normal', 'Normal', 'Normal', 'Normal'],
    roomsUrls: ['https://zoom.us/', 'https://zoom.us/', 'https://zoom.us/', 'https://zoom.us/'],
    possibleRoomsByLangLevel: {
      Arabic: { Beginner: [1, 3, 5, 7, 9, 11], Intermediate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], Advanced: [2, 4, 6, 8, 10, 12] },
      Hebrew: { Beginner: [2, 4, 6, 8, 10, 12], Intermediate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], Advanced: [1, 3, 5, 7, 9, 11] },
    },
    hashedMeetingCode: 'blablabla',
    markedSessionIds: ['88888888', '99999999'],
  };
}

// Fetches the sheet and updates `data` in place. Throws if the request fails, leaving `data` unchanged.
export async function loadMeetingData(data) {
  const response = await fetch(SHEET_URL);
  if (!response.ok) {
    throw new Error(`sheet request failed: ${response.status}`);
  }
  const { values } = await response.json();
  if (!values) {
    return;
  }
  data.nextMeetingInfo = values[1];
  data.meetingsCounters = values[3];
  data.roomsOpenStatus = values[9];
  data.roomsUrls = values[15];
  data.possibleRoomsByLangLevel.Arabic.Beginner = values[18];
  data.possibleRoomsByLangLevel.Arabic.Intermediate = values[20];
  data.possibleRoomsByLangLevel.Arabic.Advanced = values[22];
  data.possibleRoomsByLangLevel.Hebrew.Beginner = values[24];
  data.possibleRoomsByLangLevel.Hebrew.Intermediate = values[26];
  data.possibleRoomsByLangLevel.Hebrew.Advanced = values[28];
  data.roomsRecommendedStatus = values[30];
  data.hashedMeetingCode = values[34][0];
  data.markedSessionIds = values[53];
}
