// Required function for publishing Google script app
// This funciton fires when a GET message is recieved
function doGet(e) {
  return HtmlService.createHtmlOutput("doGet request");
}

// Required fucntion for publishing Google script app
// This fucntion fires when a POST message is recieved
function doPost(e) {

  if (e.queryString != null && e.queryString.includes("jobUpdate")) {
    return updateJob(e);
  }

  timezone = "GMT+" + new Date().getTimezoneOffset()/60;
  var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"

  var originalWebhookJson = e.postData.contents;

  // in order to avoid duplicate webhooks and webhooks with bad structure that I cannot parse
  uniqueMessageId = getUniqueMessageId(originalWebhookJson);

  lockForWebhhokFirstSave(timeStamp, originalWebhookJson, uniqueMessageId);

  //lockForHandlingSavedWebhook(); // currently commented out

  return HtmlService.createHtmlOutput("doPost received");
}

function lockForWebhhokFirstSave(timeStamp, originalWebhookJson, uniqueMessageId) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(300000); // wait 5 min (300 seconds) for others' use of the code section and lock to stop and then proceed
  } catch (e) {
    Logger.log('Could not obtain lock after 5 min.');
    addCommentToSheet("error", 'Could not obtain lock to first save webhook');
    return HtmlService.createHtmlOutput("doPost received");
  }

  //successfully obtained the lock and now we can continue
  firstSaveWebhookInsideLock(timeStamp, originalWebhookJson, uniqueMessageId);
  lock.releaseLock();
}

function firstSaveWebhookInsideLock(timeStamp, originalWebhookJson, uniqueMessageId) {
  //Name of Sheet to be used.
  var sheetName = "ZoomWebhooks";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (uniqueMessageId != "bad_id") {
    sheet.appendRow([timeStamp, "webhookJson", originalWebhookJson, "Todo", uniqueMessageId]);
  } else {
    sheet.appendRow([timeStamp, "webhookJson", originalWebhookJson, "Bad Webhook Json"]);
  }
}

function lockForHandlingSavedWebhook() {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(300000); // wait 5 min (300 seconds) for others' use of the code section and lock to stop and then proceed
  } catch (e) {
    Logger.log('Could not obtain lock after 5 min.');
    addCommentToSheet("error", 'Could not obtain lock for handling saved webhook');
    return HtmlService.createHtmlOutput("doPost received");
  }

  //successfully obtained the lock and now we can continue
  updateSheetInsideLock();
  lock.releaseLock();
}

function getUniqueMessageId(webhookJson) {
  //Name of Sheet to be used.
  var sheetName = "ZoomWebhooks";

  timezone = "GMT+" + new Date().getTimezoneOffset()/60;
  var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  try {
    
    var data = JSON.parse(webhookJson);   

    var meetingId = data["payload"]["object"]["id"];
    var webhookEvent = data["event"];
    var webhookEventTimestamp = data["event_ts"];
    var userId = data["payload"]["object"]["participant"]["user_id"];
    var uniqueMessageId = webhookEvent + "_" + meetingId + "_" + userId + "_" + webhookEventTimestamp;

    return uniqueMessageId;
    
  } catch (error) {
    // if something goes wrong we will append message to google sheet so it can be easily found
    addCommentToSheet("error", error);

    return "bad_id";
  }

}

function updateJob(e) {
  if (e.queryString.includes("jobUpdate=start")) {
    return startJob(e);
  } else if (e.queryString.includes("jobUpdate=stop")) {
    return stopJob(e);
  } 
}

function startJob(e) {
  addCommentToSheet("starting job", "");

  // Trigger every 6 hours.
  ScriptApp.newTrigger("doJobFunction")
      .timeBased()
      .everyMinutes(1)
      .create();

  addCommentToSheet("started job", "");
}

function stopJob(e) {
  addCommentToSheet("stopping job", "");

  var foundTrigger = false;

  // Loop over all triggers.
  var allTriggers = ScriptApp.getProjectTriggers();
  addCommentToSheet("current number of triggers", allTriggers.length);
  for (var i = 0; i < allTriggers.length; i++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[i].getHandlerFunction() === "doJobFunction") {
      ScriptApp.deleteTrigger(allTriggers[i]);
      foundTrigger = true;
      break;
    }
  }

  if (foundTrigger) {
    addCommentToSheet("stopped job", "");
  } else {
    addCommentToSheet("error", "Couldn't find the trigger that needed to be stopped");
  }
  
}

function doJobFunction() {

  addCommentToSheet("start execution", "");

  //Name of Sheet to be used.
  var sheetName = "ZoomWebhooks";

  timezone = "GMT+" + new Date().getTimezoneOffset()/60;
  var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  var tryToHandleNextWebhook = true;
  while (tryToHandleNextWebhook) {
    var webhookInfo = getNextWebhookToHandle(true);
    var rowNumFound = webhookInfo[0];
    var webhookJson = webhookInfo[1];

    if (rowNumFound == -1) {
      tryToHandleNextWebhook = false;
      Logger.log("Didn't find any webhook to handle");
      addCommentToSheet("finish execution", "Didn't find any webhook to handle");
      SpreadsheetApp.flush(); // applies all pending spreadsheet changes
      return;
    }

    addCommentToSheet("start handling webhook", webhookJson);

    handleWebhook(webhookInfo);

    addCommentToSheet("finish handling webhook", webhookJson);

    SpreadsheetApp.flush(); // applies all pending spreadsheet changes
  }

}

function handleWebhook(webhookInfo) {

    //Name of Sheet to be used.
    var sheetName = "ZoomWebhooks";

    timezone = "GMT+" + new Date().getTimezoneOffset()/60;
    var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    var rowNumFound = webhookInfo[0];
    var webhookJson = webhookInfo[1];

    try {

      var data = JSON.parse(webhookJson);   

      var meetingId = data["payload"]["object"]["id"];
      var webhookEvent = data["event"];
      var webhookEventTimestamp = data["event_ts"];
      var userName = data["payload"]["object"]["participant"]["user_name"];
      var userId = data["payload"]["object"]["participant"]["user_id"];
      var userEmail = data["payload"]["object"]["participant"]["email"];
      var userInfo = userEmail + "_" + userName + "_" + userId;

      var comment = "";
      var type = "";

      var numberOfRoom = getRoomNumberByMeetingId(meetingId);
      var roomNumber = "Room-"+numberOfRoom;
      if (numberOfRoom == -1) {
        var roomNumber = "Unknown room number";
      }

      var shouldHandleEvent = true;
      if (userName.includes("Admin") || userName == "Roy Nahmias" || userName == "BBB") {
        shouldHandleEvent = false;
        comment = "Didn't count myself"
        type = "Didn't count myself";
      }

      if (shouldHandleEvent && webhookEvent == "meeting.participant_joined") {
        comment = handleUserJoined(meetingId, userInfo, numberOfRoom, true);
        type = "User Joined";
      } else if (shouldHandleEvent && webhookEvent == "meeting.participant_left") {
        comment = handleUserLeft(meetingId, userInfo, numberOfRoom, true);
        type = "User Left";
      }

      //addCommentToSheet(type, comment);

      // write data to Google sheet
      sheet.appendRow([timeStamp, "webhookFullInfo", comment, roomNumber, userInfo, meetingId, webhookEvent, userId, userName, userEmail, webhookEventTimestamp]);

    } catch (error) {
      // if something goes wrong we will append message to google sheet so it can be easily found
      addCommentToSheet("error", error);
    }

}

function updateSheetInsideLock() {

  //Name of Sheet to be used.
  var sheetName = "ZoomWebhooks";

  timezone = "GMT+" + new Date().getTimezoneOffset()/60;
  var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  var webhookInfo = getNextWebhookToHandle(true);
  var rowNumFound = webhookInfo[0];
  var webhookJson = webhookInfo[1];

  if (rowNumFound == -1) {
    Logger.log("Didn't find any webhook to handle");
    addCommentToSheet("error", "Didn't find any webhook to handle");
    return;
  }

  try {
    
    var data = JSON.parse(webhookJson);   

    var meetingId = data["payload"]["object"]["id"];
    var webhookEvent = data["event"];
    var webhookEventTimestamp = data["event_ts"];
    var userName = data["payload"]["object"]["participant"]["user_name"];
    var userId = data["payload"]["object"]["participant"]["user_id"];
    var userEmail = data["payload"]["object"]["participant"]["email"];
    var userInfo = userEmail + "_" + userName + "_" + userId;

    var comment = "";
    var type = "";

    var numberOfRoom = getRoomNumberByMeetingId(meetingId);
    var roomNumber = "Room-"+numberOfRoom;
    if (numberOfRoom == -1) {
      var roomNumber = "Unknown room number";
    }

    var shouldHandleEvent = true;
    if (userName.includes("Admin") || userName == "Roy Nahmias" || userName == "BBB") {
      shouldHandleEvent = false;
      comment = "Didn't count myself"
      type = "Didn't count myself";
    }

    if (shouldHandleEvent && webhookEvent == "meeting.participant_joined") {
      comment = handleUserJoined(meetingId, userInfo, numberOfRoom, true);
      type = "User Joined";
    } else if (shouldHandleEvent && webhookEvent == "meeting.participant_left") {
      comment = handleUserLeft(meetingId, userInfo, numberOfRoom, true);
      type = "User Left";
    }

    //addCommentToSheet(type, comment);

    // write data to Google sheet
    sheet.appendRow([timeStamp, "webhookFullInfo", comment, roomNumber, userInfo, meetingId, webhookEvent, userId, userName, userEmail, webhookEventTimestamp]);
    
  } catch (error) {
    // if something goes wrong we will append message to google sheet so it can be easily found
    addCommentToSheet("error", error);
  }
}

function getNextWebhookToHandle(saveImmediately) {
  var rowNumFound = -1;
  var webhookJson = "";
  var duplicateFound = false;

  timezone = "GMT+" + new Date().getTimezoneOffset()/60;
  var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"

   var sheetName = "ZoomWebhooks";
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  try {

    var numberOfRowsToIgnore = 1;
    var typeColumn = 1;
    var webhookJsonColumn = 2;
    var webhookStatusColumn = 3;
    var webhookUniqueMessageIdColumn = 4;
    var s = SpreadsheetApp.getActiveSpreadsheet();
    var sht = s.getSheetByName('ZoomWebhooks')
    var drng = sht.getDataRange();
    var rng = sht.getRange(numberOfRowsToIgnore+1,1, drng.getLastRow()-numberOfRowsToIgnore,drng.getLastColumn());
    var table = rng.getValues();//Array of input values
    var webhookIdSet = new Set(); 
    for (var i = 0; i < table.length; i++) {

      if (table[i][typeColumn] == "webhookJson" && table[i][webhookStatusColumn] == "Done") {
        webhookIdSet.add(table[i][webhookUniqueMessageIdColumn]);
      }

      if (table[i][typeColumn] == "webhookJson" && table[i][webhookStatusColumn] == "Todo") {


        if(webhookIdSet.has(table[i][webhookUniqueMessageIdColumn])) {
          // found duplicate webhook
          table[i][webhookStatusColumn] = "Duplicate";
          var curRow = i+numberOfRowsToIgnore+1;
          Logger.log('Found next webhook to handle in row:');
          Logger.log(curRow);
          addCommentToSheet("duplicate", "found duplicate in row " + curRow);
          duplicateFound = true;
          continue; // skip to the next webhook available
        }


        rowNumFound = i+numberOfRowsToIgnore+1;
        webhookJson = table[i][webhookJsonColumn];
        Logger.log('Found next webhook to handle in row:');
        Logger.log(i+numberOfRowsToIgnore+1);
        table[i][webhookStatusColumn] = "Done";
        break; //finish going over table after founding the first webhook to handle
      }
    }

  } catch (error) {
    // if something goes wrong we will append message to google sheet so it can be easily found
    addCommentToSheet("error", error);
    return [-1, ""];
  }

  if (saveImmediately && (rowNumFound != -1 || duplicateFound)) {
    rng.setValues(table) //save update to table
  }

  return [rowNumFound, webhookJson];
}

function addCommentToSheet(commentType, comment) {
  timezone = "GMT+" + new Date().getTimezoneOffset()/60
  var timeStamp = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy HH:mm:ss"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ZoomWebhooks");
  sheet.appendRow([timeStamp, commentType, comment])
}

function handleUserJoined(meetingId, userInfo, numberOfRoom, saveImmediately) {
  Logger.log('start handleUserJoined with meetingId and userInfo:');
  Logger.log(meetingId);
  Logger.log(userInfo);

  if (numberOfRoom == -1) {
    Logger.log('failed to finish handleUserJoined because of unknown room number, with meetingId and userInfo:');
    Logger.log(meetingId);
    Logger.log(userInfo);
    return "Unknown room number";
  }
  var roomNumber = "Room-"+numberOfRoom;

  updateRoomLiveCount(numberOfRoom, true, saveImmediately);

  if (userInfo == "") {
    Logger.log('failed to finish handleUserJoined because of unknown userInfo, with meetingId:');
    Logger.log(meetingId);
    return "Unknown userInfo";
  }

  var numberOfRowsToIgnore = 1;
  var roomNumberColumn = 5;
  var userInfoColumn = 10;
  var leftMeetingColumn = 11;
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Form responses 1')
  var drng = sht.getDataRange();
  var rng = sht.getRange(numberOfRowsToIgnore+1,1, drng.getLastRow()-numberOfRowsToIgnore,drng.getLastColumn());
  var table = rng.getValues();//Array of input values
  var foundUser = false;
  var foundRow = -1;
  for (var i = 0; i < table.length; i++) {
    if (table[i][roomNumberColumn] == roomNumber && table[i][userInfoColumn] == "" && table[i][leftMeetingColumn] != "LeftMeeting") {
      foundUser = true;
      foundRow = i+numberOfRowsToIgnore+1;
      Logger.log('Found joining user in row:');
      Logger.log(i+numberOfRowsToIgnore+1);
      table[i][userInfoColumn] = userInfo; //add the zoom userInfo of the user to the user's row
      break; //finish going over table after founding the first matching user
    }
  }

  Logger.log('finish handleUserJoined with meetingId and room number and userInfo:');
  Logger.log(meetingId);
  Logger.log(roomNumber);
  Logger.log(userInfo);

  if (foundUser) {
    if (saveImmediately) {
      rng.setValues(table) //save update to table
    }
    Logger.log("Joined user found");
    return "Joined user found in row " + foundRow;
  } else {
    //user not found = probably joined the zoom meeting from direct link and not from the website
    Logger.log("Joined user not found");
    return "Joined user not found"
  }
}

function handleUserLeft(meetingId, userInfo, numberOfRoom, saveImmediately) {
  Logger.log('start handleUserLeft with meetingId and userInfo:');
  Logger.log(meetingId);
  Logger.log(userInfo);

  if (numberOfRoom == -1) {
    Logger.log('failed to finish handleUserLeft because of unknown room number, with meetingId and userInfo:');
    Logger.log(meetingId);
    Logger.log(userInfo);
    return "Unknown room number";
  }
  var roomNumber = "Room-"+numberOfRoom;

  updateRoomLiveCount(numberOfRoom, false, saveImmediately);

  if (userInfo == "") {
    Logger.log('failed to finish handleUserLeft because of unknown userInfo, with meetingId:');
    Logger.log(meetingId);
    return "Unknown userInfo";
  }

  var numberOfRowsToIgnore = 1;
  var roomNumberColumn = 5;
  var userInfoColumn = 10;
  var leftMeetingColumn = 11;
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Form responses 1')
  var drng = sht.getDataRange();
  var rng = sht.getRange(numberOfRowsToIgnore+1,1, drng.getLastRow()-numberOfRowsToIgnore,drng.getLastColumn());
  var table = rng.getValues();//Array of input values
  var foundUser = false;
  var foundRow = -1;
  for (var i = 0; i < table.length; i++) {
    if (table[i][roomNumberColumn] == roomNumber && table[i][userInfoColumn] == userInfo && table[i][leftMeetingColumn] != "LeftMeeting") {
      foundUser = true;
      foundRow = i+numberOfRowsToIgnore+1;
      Logger.log('Found leaving user in row:');
      Logger.log(i+numberOfRowsToIgnore+1);
      table[i][leftMeetingColumn] = "LeftMeeting"; //update user's row so we'll know he left the meeting
      break;
    }
  }

  Logger.log('finish handleUserLeft with meetingId and room number and userInfo:');
  Logger.log(meetingId);
  Logger.log(roomNumber);
  Logger.log(userInfo);

  if (foundUser) {
    if (saveImmediately) {
      rng.setValues(table) //save update to table
    }
    Logger.log("Leaving user found");
    return "Leaving user found in row " + foundRow;
  } else {
    //user not found = probably joined the zoom meeting earlier from direct link and not from the website
    Logger.log("Leaving user not found");
    return "Leaving user not found"
  }
}

function updateRoomLiveCount(roomNumber, isJoined, saveImmediately) {
  try {
    if (isJoined) {
      Logger.log('start updateRoomLiveCount after user joined, with roomNumber:');
    } else {
      Logger.log('start updateRoomLiveCount after user left, with roomNumber:');
    }
    Logger.log(roomNumber);
    var s = SpreadsheetApp.getActiveSpreadsheet();
    var sht = s.getSheetByName('Data')
    var rng = sht.getRange('A41:J41'); //41 is the rooms exact live total count from webhooks row, and A is room 1 and J is room 10
    var table = rng.getValues();//Array of input values
    if (isJoined) {
      table[0][roomNumber-1] = table[0][roomNumber-1] + 1;
    } else {
      table[0][roomNumber-1] = table[0][roomNumber-1] - 1;
    }
    if (saveImmediately) {
      rng.setValues(table) //save update to table
    }
    if (isJoined) {
      Logger.log('finish updateRoomLiveCount after user joined, with roomNumber:');
    } else {
      Logger.log('finish updateRoomLiveCount after user left, with roomNumber:');
    }
    Logger.log(roomNumber);
  } catch (error) {
    // if something goes wrong we will append message to google sheet so it can be easily found
    addCommentToSheet("error", error);
  }
}

function getRoomNumberByMeetingId(meetingId) {
  Logger.log('start getRoomNumberByMeetingId with meetingId:');
  Logger.log(meetingId);
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Data')
  var rng = sht.getRange('A37:J37'); //37 is the rooms meeting ids row, and A is room 1 and J is room 10
  var table = rng.getValues();//Array of input values
  for (var i = 0; i < 10; i++) {
    if (table[0][i] == meetingId) {
      Logger.log('roon number found:');
      Logger.log(i+1);
      Logger.log('finish getRoomNumberByMeetingId with meetingId:');
      Logger.log(meetingId);
      return i+1;
    }
  }
  Logger.log('roon number not found');
  Logger.log('finish getRoomNumberByMeetingId with meetingId:');
  Logger.log(meetingId);
  return -1; // room number not found
}

function onFormSubmit(e) {
  Logger.log('start');
  ignorePreviousCountsOfSameUser(e);
  openNewRoomIfNeeded(e);
  Logger.log('finish');
}

function ignorePreviousCountsOfSameUser(e) {
  Logger.log('start ignorePreviousCountsOfSameUser');
  var numberOfRowsToIgnore = 1;
  var sessionIdColumn = 1;
  var doNotCountColumn = 7;
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Form responses 1')
  var drng = sht.getDataRange();
  var rng = sht.getRange(numberOfRowsToIgnore+1,1, drng.getLastRow()-numberOfRowsToIgnore,drng.getLastColumn());
  var table = rng.getValues();//Array of input values
  var idSet = new Set(); 
  for (var i = table.length-1; i >= 0; i--) {
    if (table[i][sessionIdColumn] != "anonymous" && table[i][doNotCountColumn] != "DoNotCount") {
      if(idSet.has(table[i][sessionIdColumn])) {
        Logger.log('In Row:');
        Logger.log(i+numberOfRowsToIgnore+1);
        Logger.log('Ignoring Count of User Session Id:');
        Logger.log(table[i][sessionIdColumn]);
        table[i][doNotCountColumn] = "DoNotCount";
      } else {
        idSet.add(table[i][sessionIdColumn]);
      }
    }
  }
  rng.setValues(table)
  Logger.log('finish ignorePreviousCountsOfSameUser');
}

function openNewRoomIfNeeded(e) {
  Logger.log('start openNewRoomIfNeeded');
  var roomTypesFirstRoomsList = [1,2];
  var roomTypesDistanceFromNextRoomList = [2,2];
  Logger.log("number of room types to check:");
  Logger.log(roomTypesFirstRoomsList.length);
  for (var i = 0; i < roomTypesFirstRoomsList.length; i++) {
    Logger.log("checking roomType number:");
    Logger.log(i+1);
    var firstRoom = roomTypesFirstRoomsList[i];
    var distanceFromNextRoom = roomTypesDistanceFromNextRoomList[i];
    Logger.log("roomType first room:");
    Logger.log(firstRoom);
    Logger.log("roomType distance from next room:");
    Logger.log(distanceFromNextRoom);
    var roomToOpen = getPossibleNewRoom(e, firstRoom, distanceFromNextRoom);
    if (roomToOpen != -1) {
      Logger.log("possible new room:");
      Logger.log(roomToOpen);
      var shouldOpenNewRoom = checkShouldOpenNewRoom(e, firstRoom, distanceFromNextRoom);
      if (shouldOpenNewRoom) {
        Logger.log("we do need to open a new room");
        openNewRoom(e, roomToOpen);
      } else {
        Logger.log("no need to open a new room");
      }
    } else {
      Logger.log("no more possible rooms to open");
    }
  }
  Logger.log('finish openNewRoomIfNeeded');
}

function getPossibleNewRoom(e, firstRoom, distanceFromNextRoom) {
  Logger.log('start getPossibleNewRoom');
  var openStatusRow = 10;
  var forceOpenStatusRow = 14;
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Data')
  var drng = sht.getDataRange();
  var rng = sht.getRange(openStatusRow,1, forceOpenStatusRow-openStatusRow+1,drng.getLastColumn());
  var table = rng.getValues();//Array of input values
  var roomToOpen = -1;
  // we try to find a room that is currently closed but not forced to be closed (meaning it can be open)
  for (var j = firstRoom-1; j < table[0].length; j+=distanceFromNextRoom) {
    if (table[0][j] != "Open" && table[0][j] != "Closed") {
      // if we get to a cell that is not open or closed then we finished checking all rooms
      break;
    }
    if (table[0][j] == "Closed" && table[forceOpenStatusRow-openStatusRow][j] != "Closed") {
      roomToOpen = j+1; 
      break;
    }
  }
  Logger.log('finish getPossibleNewRoom');
  return roomToOpen;
}

function checkShouldOpenNewRoom(e, firstRoom, distanceFromNextRoom) {
  Logger.log('start checkShouldOpenNewRoom');
  var countersRow = 4;
  var maxSameLangInRoomRow = 8;
  var openStatusRow = 10;
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Data')
  var drng = sht.getDataRange();
  var rng = sht.getRange(countersRow,1, openStatusRow-countersRow+1,drng.getLastColumn());
  var table = rng.getValues();//Array of input values
  // we try see if all open rooms have max number of arabic speakers and max number of hebrew speakers
  // because that means we should open a new room
  var maxSameLangInRoom = table[maxSameLangInRoomRow-countersRow][0];
  for (var j = firstRoom-1; j < table[openStatusRow-countersRow].length; j+=distanceFromNextRoom) {
    if (table[openStatusRow-countersRow][j] != "Open" && table[openStatusRow-countersRow][j] != "Closed") {
      // if we get to a cell that is not open or closed then we finished checking all rooms
      break;
    }
    if (table[openStatusRow-countersRow][j] == "Open") {
      var curRoom = j+1;
      var arabicCountInRoomCol = ((curRoom-1)*2);
      var hebrewCountInRoomCol = arabicCountInRoomCol+1;
      if (table[0][arabicCountInRoomCol] < maxSameLangInRoom || table[0][hebrewCountInRoomCol] < maxSameLangInRoom) {
        // found an open room that doesn't have max number of arabic speakers and max number of hebrew speakers
        // so this room can still be filled and we don't need to open a new room
        Logger.log("Found a room that is not full:");
        Logger.log(curRoom);
        return false;
      }
    }
  }
  Logger.log('finish checkShouldOpenNewRoom');
  return true;
}

function openNewRoom(e, roomToOpen) {
  Logger.log('start openNewRoom');
  var shouldBeOpenRow = 12;
  Logger.log("Opening Room number:");
  Logger.log(roomToOpen);
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sht = s.getSheetByName('Data')
  var range = sht.getRange(shouldBeOpenRow,roomToOpen); 
  range.setValue("Open");
  Logger.log('finish openNewRoom');
}
