// Room logic of the meetings page, moved from public/meetingsScript.js. Room numbers come from the sheet
// as strings (e.g. "3"), so comparisons rely on the same loose equality as the legacy code.

export function getNumberOfOpenRooms(data) {
  return data.roomsOpenStatus.filter((room) => room == 'Open').length;
}

function isRoomOpen(data, roomNumber) {
  return data.roomsOpenStatus.length >= roomNumber ? data.roomsOpenStatus[roomNumber - 1] == 'Open' : false;
}

function isRoomNotRecommended(data, roomNumber) {
  return data.roomsRecommendedStatus.length >= roomNumber
    ? data.roomsRecommendedStatus[roomNumber - 1] == 'NotRecommended'
    : false;
}

export function getRoomUrl(data, roomNumber) {
  return data.roomsUrls.length >= roomNumber ? data.roomsUrls[roomNumber - 1] : '';
}

// Number of people with this native language in the room, or null if the counter is missing/invalid.
// The counters row alternates Arabic, Hebrew for rooms 1, 2, ...
function getCounter(data, language, room) {
  let index = (room - 1) * 2;
  if (language == 'Hebrew') {
    index += 1;
  }
  if (data.meetingsCounters.length >= index + 1) {
    const counterStr = data.meetingsCounters[index];
    if (counterStr != '' && !isNaN(counterStr)) {
      return parseInt(counterStr);
    }
  }
  return null;
}

// The rooms with the fewest (findMin) or most people of this language; all rooms if any counter is invalid.
function getMinOrMaxRoomsByLanguage(data, language, rooms, findMin) {
  let bestCount = -1000;
  let validCounters = true;
  const levelCounters = [];
  for (const room of rooms) {
    const counter = getCounter(data, language, room);
    if (counter == null) {
      console.log('counter of room ' + room + ' is invalid');
      validCounters = false;
    } else {
      levelCounters.push(counter);
      if (bestCount == -1000 || (findMin ? counter < bestCount : counter > bestCount)) {
        bestCount = counter;
      }
    }
  }
  if (!validCounters) {
    return [...rooms];
  }
  return rooms.filter((room, i) => levelCounters[i] == bestCount);
}

// The recommended room: the one with the fewest people who share your native language, ties broken randomly.
function getRecommendedRooms(data, nativeLanguage, levelRooms) {
  if (levelRooms.length == 0) {
    return [];
  }
  const roomsRecommended = getMinOrMaxRoomsByLanguage(data, nativeLanguage, levelRooms, true);
  if (roomsRecommended.length == 1) {
    return roomsRecommended;
  }
  if (roomsRecommended.length > 0) {
    return [roomsRecommended[Math.floor(Math.random() * roomsRecommended.length)]];
  }
  return [];
}

// The open rooms for this native language and level, split into the recommended one and the others.
export function getRoomOptions(data, nativeLanguage, level) {
  const possible = data.possibleRoomsByLangLevel[nativeLanguage][level];
  const openRooms = possible.filter((room) => isRoomOpen(data, room));
  const notRecommended = possible.filter((room) => isRoomNotRecommended(data, room));
  const candidates = openRooms.filter((room) => !notRecommended.includes(room));
  const recommendedRooms = getRecommendedRooms(data, nativeLanguage, candidates);
  const otherRooms = openRooms.filter((room) => !recommendedRooms.includes(room));
  return { recommendedRooms, otherRooms };
}

// e.g. "H-Native-A-Beginner-Room-3": native language, level and room; used as the option's data-val and in tracking.
export function buildDataString(nativeLanguage, level, roomNumber) {
  return (nativeLanguage == 'Hebrew' ? 'H-Native-A' : 'A-Native-H') + '-' + level + '-Room-' + roomNumber;
}
