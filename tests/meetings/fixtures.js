// Fake responses for the Google Sheets request made by the meetings page, in the same shape as the
// real sheet (Data!A1:Z54, rows of strings). Only the rows the page reads are filled in.
import { createHash } from 'node:crypto';

export const TEST_PASSWORD = 'testpwd';
export const MARKED_SESSION_ID = 'marked-session-1';

// The page runs with the clock frozen at this time (UTC).
export const NOW = Date.UTC(2026, 0, 10, 12, 0, 0);
export const MEETING_STARTED = 'January 10, 2026 10:00:00'; // 2 hours before NOW
export const MEETING_UPCOMING = 'January 12, 2026 15:04:05'; // 2d 3h 4m 5s after NOW

const sha256 = (text) => createHash('sha256').update(text).digest('hex');

export function buildSheet({
  meetingTime = MEETING_STARTED,
  international = 'FALSE',
  // Per room: [Arabic speakers, Hebrew speakers]. Row 3 alternates Arabic, Hebrew for rooms 1..10.
  counters = [[3, 2], [1, 4], [2, 2], [0, 5], [1, 1], [4, 0], [2, 3], [1, 2], [0, 0], [3, 1]],
  openStatus = ['Open', 'Open', 'Open', 'Open', 'Open', 'Open', 'Closed', 'Closed', 'Closed', 'Closed'],
  recommendedStatus = ['Normal', 'Normal', 'Normal', 'NotRecommended', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal'],
  rooms = {
    arabicBeginner: ['1', '3', '5'],
    arabicIntermediate: ['1', '2', '3', '4', '5', '6'],
    arabicAdvanced: ['2', '4', '6'],
    hebrewBeginner: ['2', '4', '6'],
    hebrewIntermediate: ['1', '2', '3', '4', '5', '6'],
    hebrewAdvanced: ['1', '3', '5'],
  },
  markedSessionIds = [MARKED_SESSION_ID],
} = {}) {
  const values = Array.from({ length: 54 }, (_, i) => [`(row ${i})`]);
  values[1] = ['UTC Meeting time:', meetingTime, 'Meeting time text in Arabic:', 'يوم السبت', 'Meeting time text in Hebrew:', 'יום שבת', 'Meeting date hour:', '12/01 17:04', 'Is International:', international];
  values[3] = counters === null ? [] : counters.flat().map(String);
  values[9] = openStatus;
  values[15] = Array.from({ length: 10 }, (_, i) => `https://zoom.example/room-${i + 1}`);
  values[18] = rooms.arabicBeginner;
  values[20] = rooms.arabicIntermediate;
  values[22] = rooms.arabicAdvanced;
  values[24] = rooms.hebrewBeginner;
  values[26] = rooms.hebrewIntermediate;
  values[28] = rooms.hebrewAdvanced;
  values[30] = recommendedStatus;
  values[34] = [sha256(TEST_PASSWORD)];
  values[53] = markedSessionIds;
  return { range: 'Data!A1:Z54', majorDimension: 'ROWS', values };
}
