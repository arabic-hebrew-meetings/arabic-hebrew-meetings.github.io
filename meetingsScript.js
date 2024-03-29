
$(document).ready(initialize);

function initialize() {
	updateNextMeetingInfo(true);
}

var nextMeetingInfo = ["UTC Meeting time:","May 9, 2060 18:00:00","Meeting time text in Arabic:","يوم السبت","Meeting time text in Hebrew:","יום שבת","Meeting date hour:","09/05 21:00","Is International:","FALSE"];
var isMeetingStarted = false;
var ignoreCountdown = false;
var meetingsCounters = [];
var roomsOpenStatus = ["Closed","Closed","Closed","Closed"];
var roomsRecommendedStatus = ["Normal","Normal","Normal","Normal"];
var roomsUrls = [
"https://zoom.us/",
"https://zoom.us/",
"https://zoom.us/",
"https://zoom.us/"
];
var possibleRoomsByLangLevel = {
  Arabic: {
	  Beginner: [1,3,5,7,9,11],
	  Intermediate: [1,2,3,4,5,6,7,8,9,10,11,12],
	  Advanced: [2,4,6,8,10,12]
  },
  Hebrew: {
	  Beginner: [2,4,6,8,10,12],
	  Intermediate: [1,2,3,4,5,6,7,8,9,10,11,12],
	  Advanced: [1,3,5,7,9,11]
  }
};
var hashedMeetingCode = "blablabla";
var badPwd = false;
var isFirstPwdCheck = true;
var markedSessionIds = ["88888888","99999999"];

function countdownIgnore() {
	ignoreCountdown = true;
}

function updateDataAndDisplayRecommendations(userLang, userLevel, userChoice, chosenData) {
	startSpinner("my_spinner_groups");
	var url = "https://sheets.googleapis.com/v4/spreadsheets/1Fk1Ojj2D0UB0mopeJpmYR5k3wwjll2OFwLGozEy1hPE/values/Data!1:54?key=AIzaSyDo2RRl54o6M6wy5yCNv9cZW3OW8o7YNgs";                                                             
  $.getJSON(url, function(result){
    $.each(result, function(i, field){
		if (i == "values") {
			nextMeetingInfo = field[1];
			meetingsCounters = field[3];
			roomsOpenStatus = field[9];
			roomsUrls = field[15];
			possibleRoomsByLangLevel["Arabic"]["Beginner"] = field[18];
			possibleRoomsByLangLevel["Arabic"]["Intermediate"] = field[20];
			possibleRoomsByLangLevel["Arabic"]["Advanced"] = field[22];
			possibleRoomsByLangLevel["Hebrew"]["Beginner"] = field[24];
			possibleRoomsByLangLevel["Hebrew"]["Intermediate"] = field[26];
			possibleRoomsByLangLevel["Hebrew"]["Advanced"] = field[28];
			roomsRecommendedStatus = field[30];
			hashedMeetingCode = field[34][0];
			markedSessionIds = field[53];
		}
    });
  })
  .fail(function(xhr, status, error) {
	  console.log("failed to update data");
	  console.log(xhr.responseText)
	  console.log(xhr.status)
	  console.log(xhr.statusText)
  })
  .always(function() {
	  
//	  setTimeout(function() {
//		finishSpinner("my_spinner_groups");  
//		displayNumberOfOpenRooms(userLang);
//		displayRecommendedOptions(userLang, userLevel);
//		displayMenu(userLang, userLevel, userChoice, chosenData);
//	}, 10000);
	  
	  finishSpinner("my_spinner_groups");  
	  displayNumberOfOpenRooms(userLang);
	  var sessionId = getSessionId("meetings", false);
	  if (isMarked(sessionId)) {
		saveAction("meetings", "marked_session_open_meeting", {session_id: sessionId});
		handleMarkedSession(userLang);
	  } else {
		displayRecommendedOptions(userLang, userLevel);
		displayMenu(userLang, userLevel, userChoice, chosenData);
	  }
  }); 
}

function updateNextMeetingInfo(isFirstCall) {
	startSpinner("my_spinner_countdown");
	var url = "https://sheets.googleapis.com/v4/spreadsheets/1Fk1Ojj2D0UB0mopeJpmYR5k3wwjll2OFwLGozEy1hPE/values/Data!1:54?key=AIzaSyDo2RRl54o6M6wy5yCNv9cZW3OW8o7YNgs";                                                             
  $.getJSON(url, function(result){
    $.each(result, function(i, field){
		if (i == "values") {
			nextMeetingInfo = field[1];
			meetingsCounters = field[3];
			roomsOpenStatus = field[9];
			roomsUrls = field[15];
			possibleRoomsByLangLevel["Arabic"]["Beginner"] = field[18];
			possibleRoomsByLangLevel["Arabic"]["Intermediate"] = field[20];
			possibleRoomsByLangLevel["Arabic"]["Advanced"] = field[22];
			possibleRoomsByLangLevel["Hebrew"]["Beginner"] = field[24];
			possibleRoomsByLangLevel["Hebrew"]["Intermediate"] = field[26];
			possibleRoomsByLangLevel["Hebrew"]["Advanced"] = field[28];
			roomsRecommendedStatus = field[30];
			hashedMeetingCode = field[34][0];
			markedSessionIds = field[53];
		}
    });
  })
  .fail(function(xhr, status, error) {
	  console.log("failed to update meeting start time");
	  console.log(xhr.responseText)
	  console.log(xhr.status)
	  console.log(xhr.statusText)
  })
  .done(function() {
	  finishSpinner("my_spinner_countdown");
	  if (isApproved()) {
		if (isFirstCall || badPwd) {
			badPwd = false; // important that this line will be before handleCountDown but after the if
			handleCountdown();
		} else {
			badPwd = false;
		}
	  } else {
		badPwd = true;
		isMeetingStarted = false;
		
		//window.location.replace("https://arabic-hebrew-meetings.github.io/"); // Simulate an HTTP redirect
		displayGenericPage();
	  }
  }); 
  setTimeout(updateNextMeetingInfo, 600000); // update every 10 minutes
}

function isApproved() {
	var code = getQueryParamByName("pwd");
	console.log("Checking code: " + code);
	var isCodeApproved = false;
	if (code != null) {
		res = SHA256(code);
		isCodeApproved = hashedMeetingCode == res;
	}
	saveOpenMeetingPageDetails(isCodeApproved, code);
	return isCodeApproved;
}

function isMarked(sessionId) {
	var isMarked = false;
	for (curId of markedSessionIds) {
		if (curId == sessionId) {
			isMarked = true;
		}
	}
	return isMarked;
}

function displayGenericPage() {
	
	document.getElementById("headline").innerHTML = ``
	document.getElementById("subheadline").innerHTML = ``
	document.getElementById("question-area").innerHTML =  `
		<div id="SocialGroupsDetails" class="text-center rtl">

	<h1 class="socialGroupsTop" id="SocialGroupsHebrewHeadline"></h1>
	<h1 id="SocialGroupsArabicHeadline"></h1>
	
	<div id="facebookSection">
	
		<img class="socialMediaSectionIcon" src="socialMedia/facebookIcon.png">
		
		<div>
			<a class="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton" onClick="window.open('https://www.facebook.com/groups/Arabic.Hebrew.Meetings', '_blank');" role="button">
				<span class="mySocialGroupButtonText">
					ישראלים ופלסטינים<br>إسرائيليين وفلسطينيين
				</span>
			</a>
			<a class="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton" onClick="window.open('https://www.facebook.com/groups/Arabic.Hebrew.Online', '_blank');" role="button">
				<span class="mySocialGroupButtonText">
					משתתפים מכל העולם<br>مشتركين من كل العالم
				</span>
			</a>
		</div>
	
	</div>

    <div id="whatsappSection">
	
		<img class="socialMediaSectionIcon" src="socialMedia/whatsAppIcon.png">
		
		<div>
			<a class="btn btn-success btn-xl rtl two-options socialGroupButton whatsappButton socialGroupsBottom" onClick="window.open('https://forms.gle/uNcGD9cN7Cfc2SoJ8', '_blank');" role="button">
				<span class="mySocialGroupButtonText">
					הרשמה לקבוצות<br>التسجيل للمجموعات
				</span>
			</a>
		</div>

    </div>
		  
</div>
		`;
		
	var meetingsHeadlineHebrew = "הצטרפו לקבוצות שלנו כדי לקבל לינק למפגש הקרוב!";
	var meetingsHeadlineArabic = "انضموا لمجموعاتنا عشان تستقبلوا رابط للقاﺀ القريب!";
	document.getElementById("SocialGroupsHebrewHeadline").innerHTML = meetingsHeadlineHebrew;
	document.getElementById("SocialGroupsArabicHeadline").innerHTML = meetingsHeadlineArabic;
	
	var leftColElem = document.getElementById("leftCol")
	leftColElem.style.minHeight = "500px";
}

function handleMarkedSession(userLang) {
	var optionsHeadline = document.getElementById("optionsHeadline");
	var options = document.getElementById("options");
	if (userLang == "Hebrew") {
		document.getElementById("question-area").innerHTML =  `
		<div class="rtl text-center">
			<div class="marked-headline">
					ענו על השאלות הבאות
					<br>
					כדי להצטרף למפגש
			</div>

			<div id="marked_form" class="marked-form"></div>
		</div>
		`;
	} else {
		document.getElementById("question-area").innerHTML =  `
		<div class="rtl text-center">
			<div class="marked-headline">
					جاوبوا على الاسئلة التالية
					<br>
					عشان تنضموا للقاء
			</div>

			<div id="marked_form" class="marked-form"></div>
		</div>
		`;
	}
	handleMarkedSessionDetails('meetings', 'displayForm', userLang);
	optionsHeadline.style.visibility="visible";	
	options.style.visibility="visible";	
}

function handleCountdown() {
	if (badPwd) {
		return;
	}
	try {
		// Set the date we're counting down to
		var meetingStartTime = nextMeetingInfo[1];
		var countdownDate = new Date(meetingStartTime).getTime();
		
		if (isNaN(countdownDate)) {
			throw "Countdown is NaN";
		}

		// Get today's date and time
		var now = new Date();
		var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()).getTime();

		// Find the distance between now and the count down date
		var distance = countdownDate - nowUTC;
			
		// If the count down is finished, write some text
		if (distance < 0 || ignoreCountdown) {
			if (!isMeetingStarted) {
				// Starting meeting now
				isMeetingStarted = true;
				handleChoice("", "", "");			
			} else {
				// Meeting already started, no need to do anything
			}
			setTimeout(handleCountdown, 60000); // check every minute if we need to start the countdown again
		} else {
			isMeetingStarted = false;
			//calculate countdown and display it
			displayCountdown(distance);
			setTimeout(handleCountdown, 1000); // Update the count down every 1 second
		}		
	}
	catch(err) {
		console.log("failed to handle countdown");
		console.log(err);
		if (!isMeetingStarted) {
			// Starting meeting now
			isMeetingStarted = true;
			handleChoice("", "", "");				
		} else {
			// Meeting already started, no need to do anything
		}
		setTimeout(handleCountdown, 60000); // check every minute if we need to update the count again
	}
}

function displayCountdown(distance) {
	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	var countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	
	document.getElementById("subheadline").innerHTML = ``
	document.getElementById("question-area").innerHTML =  `
		<div class='select-ctr'>
		  <div class='selected-input input-preview'></div>
		  
		  <div id="before-countdown" class="countdown-message before-countdown"></div>
		  <ul class="countdown ltr">
			<li>
				<span id="days" class="days">00</span>
				<p id="days_ref" class="days_ref">days</p>
			</li>
			<li class="seperator">.</li>
			<li>
				<span id="hours" class="hours">00</span>
				<p id="hours_ref" class="hours_ref">hours</p>
			</li>
			<li class="seperator">:</li>
			<li>
				<span id="minutes" class="minutes">00</span>
				<p id="minutes_ref" class="minutes_ref">minutes</p>
			</li>
			<li class="seperator">:</li>
			<li>
				<span id="seconds" class="seconds">00</span>
				<p id="seconds_ref" class="seconds_ref">seconds</p>
			</li>
		  </ul>
		  <div id="after-countdown" class="countdown-message after-countdown"></div>
		  
		</div>
		`;
		
	var stillNotTimeHebrew = "המפגש עדיין לא התחיל!";
	var stillNotTimeArabic = "اللقاء لسا ما بدا!";
	var meetingDayHebrew = nextMeetingInfo[5];
	var meetingDayArabic = nextMeetingInfo[3];
	var meetingDateHour = nextMeetingInfo[7];
	var isInternationalMeeting = nextMeetingInfo[9];	
		
	var textBeforeCountdown	= stillNotTimeHebrew + "<br>" + stillNotTimeArabic;
	var textAfterCountdown = meetingDayHebrew + "<br>" + meetingDayArabic + "<br>" + meetingDateHour;

	if (isInternationalMeeting == "TRUE") {
		textAfterCountdown += "<br>" + "توقيت القدس - שעון ירושלים";
	}
		
	// based on the date change the refrence wording
    var ref_days = (days === 1) ? 'day' : 'days',
    ref_hours = (hours === 1) ? 'hour' : 'hours',
    ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
    ref_seconds = (seconds === 1) ? 'second' : 'seconds';
	
	document.getElementById("before-countdown").innerHTML = textBeforeCountdown;
	
    document.getElementById("days").innerHTML = days;
	document.getElementById("hours").innerHTML = hours;
	document.getElementById("minutes").innerHTML = minutes;
	document.getElementById("seconds").innerHTML = seconds;
	
	document.getElementById("days_ref").innerHTML = ref_days;
	document.getElementById("hours_ref").innerHTML = ref_hours;
	document.getElementById("minutes_ref").innerHTML = ref_minutes;
	document.getElementById("seconds_ref").innerHTML = ref_seconds;
	
	document.getElementById("after-countdown").innerHTML = textAfterCountdown;
	
	var lastChildElemInsideLeftCol = document.getElementById("after-countdown")

	if (screen.width <= 600) {
		tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, 180);
	} else {
		tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, 230);
	}
}

function getCounterByNativeLanguageAndRoom(language, room) {
	index = ((room-1)*2);
	if (language == "Hebrew") {
		index += 1;
	}
	if (meetingsCounters.length >= index+1) {
		var counterStr = meetingsCounters[index]
		if (counterStr != "" && !isNaN(counterStr)) {
			return parseInt(counterStr);
		}	
	}

	return null;
}

function getRecommendedRooms(nativeLanguage, levelRooms) {
	var result = [];
	if (levelRooms.length == 0) {
		return result;
	}
	// first we want to recommend rooms with the least number of people with the same language as you
	var roomsRecommended = getMinOrMaxRoomsByLanguage(nativeLanguage, levelRooms, true);
	
	if (roomsRecommended.length == 1) {
		return roomsRecommended;
	}
	
	// // if there is a tie between a few rooms, then we try to recommend between these rooms
	// // the room with most people that speak the other language
	// var otherLanguage = "Arabic";
	// if (nativeLanguage == "Arabic") {
	// 	otherLanguage = "Hebrew";
	// }
	// var roomsRecommended = getMinOrMaxRoomsByLanguage(otherLanguage, roomsRecommended, false);
	// if (roomsRecommended.length == 1) {
	// 	return roomsRecommended;
	// }

	// if there is still a tiew between a few rooms,
	// then we just pick one randomly
	if (roomsRecommended.length > 0) {
		var room = roomsRecommended[Math.floor(Math.random() * roomsRecommended.length)];
		result.push(room);
	}
	return result;
}

function getMinOrMaxRoomsByLanguage(language, rooms, findMin) {
	var result = [];
	var bestCount = -1000; 
	var validCounters = true;
	var levelCounters = [];
	for (i in rooms) {
		var counter = getCounterByNativeLanguageAndRoom(language, rooms[i]);

		if (counter == null) {
			console.log("counter of room " + rooms[i] + " is invalid");
			validCounters = false;
		} else { 
			levelCounters.push(counter);
			if (findMin) {
				if (bestCount == -1000 || counter < bestCount) {
					bestCount = counter;
				}
			} else {
				if (bestCount == -1000 || counter > bestCount) {
					bestCount = counter;
				}
			}
		}
	}

	if (validCounters) {
		for (i in rooms) {
			if (levelCounters[i] == bestCount) {
				result.push(rooms[i]);
			}
		}
	} else {
		for (i in rooms) {	
			result.push(rooms[i]);
		}
	}

	return result;
}

function displayMenu(userLang, userLevel, userChoice, chosenData) {
	
		  var inputPreview = $(".input-preview"),
      input = $(".input");

	if (userChoice != "Room") {
	  TweenMax.set(input, {
		scale: 1.2,
		alpha: 0
	  });
	}
    
    inputPreview.toggleClass("active");
    

      
      TweenMax.staggerTo(input, 1.25, {
        scale: 1,
        alpha: 1,
        ease: Elastic.easeOut
      }, .1);   
	  
	if (userChoice != "Room") {
	  input.on("click", function() {

		var tlInput = new TimelineMax({
		  onComplete: done
		});

		var that = $(this),
		  siblings = that.siblings(".input"),
		  data = that.data("val"),
		  top = that.css("top");

		siblings.removeClass("active");
		

		tlInput.to(siblings, .25, {
			alpha: 0
		  })
		  .to(that, .25, {
			scale: 1.2
		  })
		  .to(that, .25, {
			scale: 1,
		  })
		  

		function done() {
		  
		  var nativeLanguage = "";
		  var level = "";
		  
		  if (data.includes("H-Native") || data.includes("Hebrew")) {
			  nativeLanguage = "Hebrew";
		  } else {
			  nativeLanguage = "Arabic";
		  }
		  if (data.includes("Beginner")) {
			  level = "Beginner";
		  }
		  if (data.includes("Intermediate")) {
			  level = "Intermediate";
		  }
		  if (data.includes("Advanced")) {
			  level = "Advanced";
		  }
		  
		  
		  if (data=="Choose-Native-Language-Back") {
			  return handleChoice("", "", "Back", data);
		  }
		  
		  if (data=="Arabic") {
			  return handleChoice("Arabic", "", "", data);
		  }
		  
		  if (data=="Hebrew") {
			  return handleChoice("Hebrew", "", "", data);
		  }
		  
		  if (data.includes("H-Native-A-Beginner-Room")) {
			  return handleChoice("Hebrew","Beginner","Room", data);
		  }
		  
		  if (data.includes("H-Native-A-Intermediate-Room")) {
			  return handleChoice("Hebrew","Intermediate","Room", data);
		  }
		  
		  
		  if (data.includes("H-Native-A-Advanced-Room")) {
			  return handleChoice("Hebrew","Advanced","Room", data);
		  }
		  
		  if (data.includes("A-Native-H-Beginner-Room")) {
			  return handleChoice("Arabic","Beginner","Room", data);
		  }
		  
		  if (data.includes("A-Native-H-Intermediate-Room")) {
			  return handleChoice("Arabic","Intermediate","Room", data);
		  }
		  
		  if (data.includes("A-Native-H-Advanced-Room")) {
			  return handleChoice("Arabic","Advanced","Room", data);
		  }
		  
		  if (data.includes("MoreOptions")) {
			  return handleChoice(nativeLanguage,level,"More", data);
		  }
		  
		  if (data.includes("-Recommended-Back")) {
			  return handleChoice(nativeLanguage,level);
		  }
		
		}

	  });
}
}

function fadeOutMenu() {
	input = $(".input");
	TweenMax.set(input, {
			scale: 1.2,
			alpha: 0,
			backgroundColor: "#fff"
		  });
}

function handleChoice(userLang, userLevel, userChoice, chosenData) {
	fadeOutMenu();
	saveMeetingsActions(userLang, userLevel, userChoice, chosenData);
	if (userChoice != "Room") {
		if (userLang != null && userLang != "") {
			if (userLevel != null && userLevel != "") {
				if (userChoice == "More") {
					displayMoreOptions(userLang, userLevel, chosenData);
				} else {
					updateDataAndDisplayRecommendations(userLang, userLevel, userChoice, chosenData);
					// display menu will happen async after trying to update data
					return;
				}
			} else {
				displayLevelOptions(userLang);
			}
		} else {
			displayChooseNativeLanguage();
		}
	}
	displayMenu(userLang, userLevel, userChoice, chosenData);
}


function displayChooseNativeLanguage() {
	document.getElementById("subheadline").innerHTML = `
	<div class="subheadline">
		ענו על השאלות הבאות
		<br>
		כדי להצטרף למפגש
		<br>
		جاوبوا على الاسئلة التالية
		<br>
		عشان تنضموا للقاء
	</div>
		`
	document.getElementById("question-area").innerHTML =  `
		<div class='select-ctr'>
		  <div class='selected-input input-preview'>מה היא שפת האם שלכם?<br>شو لغة الام تبعتكم؟</div>
		  
		  <div class="cntr rtl">
			
		  </div>
		  
		  <div class="options" id="options">
		  <div class='input input-1' data-val='Hebrew'>עברית</div>
		  <div class='input input-2' data-val='Arabic'>عربي</div>
		  </div>
		</div>
		`;
		
	var lastOptionClass = '.input-2'
	var lastChildElemInsideLeftCol = document.querySelector(lastOptionClass);
	tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, 100);
}

function displayNumberOfOpenRooms(userLang) {
	var openRoomsNumber = getNumberOfOpenRooms();
	if (userLang=="Hebrew") {
		document.getElementById("subheadline").innerHTML = `
	<div class="subheadline">
	<span style='color:green;'>
	כרגע יש 
	<b>`+openRoomsNumber+`</b>
	 קבוצות במפגש
	</span>
	</div>
		`
	}
	if (userLang=="Arabic") {
		document.getElementById("subheadline").innerHTML = `
	<div class="subheadline">
	<span style='color:green;'>
	حاليا فيه 
	<b>`+openRoomsNumber+`</b>
	 مجموعات باللقاﺀ
	</span>
	</div>
		`
	}
}

function displayLevelOptions(userLang) {
	displayNumberOfOpenRooms(userLang);
	if (userLang=="Hebrew") {
		document.getElementById("question-area").innerHTML = `
		 <div id="my_spinner_groups"></div>
			<div class='select-ctr'>
		  <div class='selected-input input-preview'>סמנו את הרמה שלכם בערבית<br>ובחרו קבוצה להצטרף אליה:</div>
		  
		  <div class="cntr rtl display-above-600px">
			<label for="rdo-1" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Hebrew','Advanced')" id="rdo-1" name="radio-grp">
			  <svg class="option-1-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה מתקדמת</span>
			</label>
			<label for="rdo-2" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Hebrew','Intermediate')" id="rdo-2" name="radio-grp">
			  <svg class="option-2-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בינונית</span>
			</label>
			<label for="rdo-3" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Hebrew','Beginner')" id="rdo-3" name="radio-grp">
			  <svg class="option-3-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בסיסית</span>
			</label>
		  </div>
		  
		  <div class="cntr rtl display-under-600px">
			<label for="rdo-4" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Hebrew','Beginner')" id="rdo-4" name="radio-grp">
			  <svg class="option-1-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בסיסית</span>
			</label>
			<label for="rdo-5" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Hebrew','Intermediate')" id="rdo-5" name="radio-grp">
			  <svg class="option-2-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בינונית</span>
			</label>
			<label for="rdo-6" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Hebrew','Advanced')" id="rdo-6" name="radio-grp">
			  <svg class="option-3-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה מתקדמת</span>
			</label>
		  </div>
		  
		  <div class="optionsHeadline" id="optionsHeadline">הקבוצה המומלצת לך:</div>
		  
		  <div class="options" id="options">
		  <div class='input input-1-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
		  </div>
		</div>
		`
	}
	if (userLang=="Arabic") {
		document.getElementById("question-area").innerHTML = `
		 <div id="my_spinner_groups"></div>
			<div class='select-ctr'>
		  <div class='selected-input input-preview'>اختاروا مستواكم في اللغة العبرية<br>واختاروا مجموعة تنضموا لالها:</div>
		  
		  <div class="cntr rtl display-above-600px">
			<label for="rdo-1" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Arabic','Advanced')" id="rdo-1" name="radio-grp">
			  <svg class="option-1-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متقدم</span>
			</label>
			<label for="rdo-2" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Arabic','Intermediate')" id="rdo-2" name="radio-grp">
			  <svg class="option-2-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متوسط</span>
			</label>
			<label for="rdo-3" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Arabic','Beginner')" id="rdo-3" name="radio-grp">
			  <svg class="option-3-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى منخفض</span>
			</label>
		  </div>
		  
		  <div class="cntr rtl display-under-600px">
			<label for="rdo-4" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Arabic','Beginner')" id="rdo-4" name="radio-grp">
			  <svg class="option-1-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى منخفض</span>
			</label>
			<label for="rdo-5" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Arabic','Intermediate')" id="rdo-5" name="radio-grp">
			  <svg class="option-2-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متوسط</span>
			</label>
			<label for="rdo-6" class="btn-radio level-label">
			  <input type="radio" onclick="handleChoice('Arabic','Advanced')" id="rdo-6" name="radio-grp">
			  <svg class="option-3-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متقدم</span>
			</label>
		  </div>
		  
		  <div class="optionsHeadline" id="optionsHeadline">المجموعة المقترحة لك:</div>
		  
		  <div class="options" id="options">
		  <div class='input input-1-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
		  </div>
		</div>
		`
	}
	var lastOptionClass = '.input-1-after-radio-buttons'
	var lastChildElemInsideLeftCol = document.querySelector(lastOptionClass);
	tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, 100);
}

function displayRecommendedOptions(userLang, userLevel) {
	
	// get all possible open rooms
	var openRooms = getAllOpenRoomsByLangLevel(userLang, userLevel);
	
	// get all not recommended rooms
	var notRecommendedRooms = getAllNotRecommendedRoomsByLangLevel(userLang, userLevel);
	
	// get optional recommended rooms
	optionalRecommendedRooms = [];
	for (openRoom of openRooms) {
		if (!notRecommendedRooms.includes(openRoom)) {
			optionalRecommendedRooms.push(openRoom);
		}
	}
	
	// get recommended rooms
	recommendedRooms = getRecommendedRooms(userLang, optionalRecommendedRooms);
	
	// get other rooms
	otherRooms = [];
	for (openRoom of openRooms) {
		if (!recommendedRooms.includes(openRoom)) {
			otherRooms.push(openRoom);
		}
	}
	
	options = ``;
	for (i = 0; i < recommendedRooms.length; i++) {
		
		// get url and data
 		roomNumber = recommendedRooms[i]
		var data = buildDataString(userLang, userLevel, roomNumber);
		var url = getRoomUrl(roomNumber);
		
		// build cur option
		curOption = `<div onclick="openMeeting('`+url+`','`+data+`','Recommended')" class='input input-`+(i+1)+`-after-radio-buttons' data-val='`+data+`'>`+getGroupTextByLang(userLang)+``+roomNumber+`</div>`;
		options += curOption;
	}
	
	var backOptionOrder = recommendedRooms.length+1;
	if (otherRooms.length > 0) {
		backOptionOrder += 1;
		
		// build other option
		var otherRoomsStr = "";
		for (j in otherRooms) {
			if (j=="0" || j==0) {
				otherRoomsStr += otherRooms[j];
			} else {
				otherRoomsStr += "_" + otherRooms[j];
			}
		}
		var moreData = userLang+"-"+userLevel+"-MoreOptions-"+otherRoomsStr;
		otherOption = `<div class='input input-`+(recommendedRooms.length+1)+`-after-radio-buttons' data-val='`+moreData+`'>`+getMoreGroupsTextByLang(userLang)+`</div>`;
		options += otherOption;
	}
	
	// build back option
	backOption = `<div class='input input-`+backOptionOrder+`-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>`;
	options += backOption;
		
	document.getElementById("optionsHeadline").innerHTML = getRecommendedHeadlineByLang(userLang);	
	var optionsHeadline = document.getElementById("optionsHeadline");
	optionsHeadline.style.visibility="visible";
	
	document.getElementById("options").innerHTML = options;
	
	var lastOptionClass = '.input-'+backOptionOrder+'-after-radio-buttons'
	var lastChildElemInsideLeftCol = document.querySelector(lastOptionClass);
	tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, 100);
}

function displayMoreOptions(userLang, userLevel, chosenData) {
	options = ``;
	
	// get other rooms
	var otherRoomsStr = chosenData.split("MoreOptions-")[1];
	otherRooms = otherRoomsStr.split("_");
	
	// build other rooms options
	for (i = 0; i < otherRooms.length; i++) {
		
		// get url and data
 		roomNumber = otherRooms[i]
		var data = buildDataString(userLang, userLevel, roomNumber);
		var url = getRoomUrl(roomNumber);
		
		// build cur option
		curOption = `<div onclick="openMeeting('`+url+`','`+data+`','Other')" class='input input-`+(i+1)+`-after-radio-buttons' data-val='`+data+`'>`+getGroupTextByLang(userLang)+``+roomNumber+`</div>`;
		options += curOption;
	}
	
	// build back option
	var backOptionOrder = otherRooms.length+1;
	var backData = userLang+"-"+userLevel+"-Recommended-Back";
	backOption = `<div id="back-button" class='input input-`+backOptionOrder+`-after-radio-buttons' data-val='`+backData+`k'>Back</div>`;
	options += backOption;
	
	document.getElementById("optionsHeadline").innerHTML = getMoreGroupsTextByLang(userLang)+":";
	
	document.getElementById("options").innerHTML = options;
	
	var lastOptionClass = '.input-'+backOptionOrder+'-after-radio-buttons'
	var lastChildElemInsideLeftCol = document.querySelector(lastOptionClass);
	tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, 100);
}	

function tryToFixLeftColMinHeight(lastChildElemInsideLeftCol, heightToAdd) {
	try {
		var lastElemDistanceFromTop = window.pageYOffset + lastChildElemInsideLeftCol.getBoundingClientRect().top
		var leftColElem = document.getElementById("leftCol")
		var leftColDistanceFromTop = window.pageYOffset + leftColElem.getBoundingClientRect().top
		var LastElemDistanceFromLeftCol = lastElemDistanceFromTop - leftColDistanceFromTop;
		leftColMinHeight = LastElemDistanceFromLeftCol + heightToAdd + "px";
		leftColElem.style.minHeight = leftColMinHeight;

		// console.log("lastElemDistanceFromTop:");
		// console.log(lastElemDistanceFromTop);
		// console.log("leftColDistanceFromTop:");
		// console.log(leftColDistanceFromTop);
		// console.log("LastElemDistanceFromLeftCol:");
		// console.log(LastElemDistanceFromLeftCol);
		// console.log("leftColMinHeight:");
		// console.log(leftColMinHeight);
	}
	catch(err) {
		console.log(err);
		console.log("failed to fix left col min height");
		//we ignore and just don't fix left col min height
	}
}

function saveMeetingsActions(userLang, userLevel, userChoice, data) {
	if (data != null && data != "") {
		saveAction("meetings", "select_choice", {choice: data});
	} else {
		if (userLevel != null && userLevel != "" && userLang != null && userLang != "") {
			var levelChoice = "";
			if (userLang == "Hebrew") {
				levelChoice = "H-Native-A-"+userLevel;
			} else {
				levelChoice = "A-Native-H-"+userLevel;
			}
			saveAction("meetings", "select_choice", {choice: levelChoice});
		}			
	}
}

function saveMeetingAction(data, roomType) {
	var sourceAndDate = getUserSourceAndMeetingDate();
	var sourceKey = sourceAndDate[0];
	var meetingDate = sourceAndDate[1];
	
	var nativeLanguage = "";
	var otherLanguage = "";
	var level = "";
	if (data.includes("H-Native")) {
		nativeLanguage = "Hebrew";
		otherLanguage = "Arabic";
	} else {
		nativeLanguage = "Arabic";
		otherLanguage = "Hebrew";
	}
		
	if (data.includes("Beginner")) {
		level = "Beginner";
	}
	if (data.includes("Intermediate")) {
		level = "Intermediate";
	}	
	if (data.includes("Advanced")) {
		level = "Advanced";
	}		
		
		
		var roomNumber = "";
		
		if (data.endsWith("Room-1")) {
			roomNumber = "1";
		}
		if (data.endsWith("Room-2")) {
			roomNumber = "2";
		}
		if (data.endsWith("Room-3")) {
			roomNumber = "3";
		}
		if (data.endsWith("Room-4")) {
			roomNumber = "4";
		}
		if (data.endsWith("Room-5")) {
			roomNumber = "5";
		}
		if (data.endsWith("Room-6")) {
			roomNumber = "6";
		}
		if (data.endsWith("Room-7")) {
			roomNumber = "7";
		}
		if (data.endsWith("Room-8")) {
			roomNumber = "8";
		}
		if (data.endsWith("Room-9")) {
			roomNumber = "9";
		}
		if (data.endsWith("Room-10")) {
			roomNumber = "10";
		}
		if (data.endsWith("Room-11")) {
			roomNumber = "11";
		}
		if (data.endsWith("Room-12")) {
			roomNumber = "12";
		}
		
		var languageLevel = otherLanguage+"-"+level;
		var languageInRoom = "Room"+roomNumber+"-"+nativeLanguage;
	
		saveMeetingEntry(nativeLanguage, languageLevel, languageInRoom, "Room-"+roomNumber, roomType, sourceKey, meetingDate);
}

function openMeeting(url, data, roomType) {
	saveMeetingAction(data, roomType);
	window.open(url, '_blank');
}

function getGroupTextByLang(language) {
	if (language == "Hebrew") {
		return "קבוצה מס' ";
	} else {
		return "مجموعة رقم ";
	}
}

function getMoreGroupsTextByLang(language) {
	if (language == "Hebrew") {
		return "קבוצות נוספות";
	} else {
		return "مجموعات اخرى";
	}
}

function getRecommendedHeadlineByLang(language) {
	if (language == "Hebrew") {
		return "הקבוצה המומלצת לך:";
	} else {
		return "المجموعة المقترحة لك:";
	}
}

function buildDataString(nativeLanguage, level, roomNumber) {
	result = "A-Native-H";
	if (nativeLanguage == "Hebrew") {
		result = "H-Native-A";
	}
	result += "-" + level + "-Room-" + roomNumber;
	return result;
}

function getRoomUrl(roomNumber) {
	if (roomsUrls.length >= roomNumber) {
		return roomsUrls[roomNumber-1];
	}
	return "";
}

function getNumberOfOpenRooms() {
	var result = 0;
	for (room of roomsOpenStatus) {
		if (room == "Open") {
			result++;
		}
	}
	return result;
}

function isRoomOpen(roomNumber) {
	if (roomsOpenStatus.length >= roomNumber) {
		return roomsOpenStatus[roomNumber-1] == "Open";
	}
	return false;
}

function getAllOpenRoomsByLangLevel(nativeLanguage, level) {
	allOpenRooms = [];
	var allPossible = possibleRoomsByLangLevel[nativeLanguage][level]
	for (roomNumber of allPossible) {
		if (isRoomOpen(roomNumber)) {
			allOpenRooms.push(roomNumber);
		}
	}
	return allOpenRooms;
}

function isRoomNotRecommended(roomNumber) {
	if (roomsRecommendedStatus.length >= roomNumber) {
		return roomsRecommendedStatus[roomNumber-1] == "NotRecommended";
	}
	return false;
}

function getAllNotRecommendedRoomsByLangLevel(nativeLanguage, level) {
	var allNotRecommendedRooms = [];
	var allPossible = possibleRoomsByLangLevel[nativeLanguage][level]
	for (roomNumber of allPossible) {
		if (isRoomNotRecommended(roomNumber)) {
			allNotRecommendedRooms.push(roomNumber);
		}
	}
	return allNotRecommendedRooms;
}

function getUserSourceAndMeetingDate() {
	var sourceKey = "unknown_source";
	var meetingDate = "unknown_date";
	var sourceParam = getQueryParamByName("s");
	if (sourceParam == null || sourceParam == "") {
		sourceKey = "unknown_source";
		meetingDate = "unknown_date";
	} else if (sourceParam.startsWith("fpa_")) {
		sourceKey = "facebook_palestinian_israeli_announcement";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fia_")) {
		sourceKey = "facebook_international_announcement";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fpt_")) {
		sourceKey = "facebook_palestinian_israeli_tonight";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fit_")) {
		sourceKey = "facebook_international_tonight";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fpn_")) {
		sourceKey = "facebook_palestinian_israeli_now";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fin_")) {
		sourceKey = "facebook_international_now";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fpe_")) {
		sourceKey = "facebook_palestinian_israeli_event";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fieu_")) {
		sourceKey = "facebook_international_event_url";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fied_")) {
		sourceKey = "facebook_international_event_details";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fiet_")) {
		sourceKey = "facebook_international_event_tonight";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fien_")) {
		sourceKey = "facebook_international_event_now";
		meetingDate = getMeetingDateFromUserSource(sourceParam);			
	} else if (sourceParam.startsWith("fpc_")) {
		sourceKey = "facebook_palestinian_israeli_comment";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("fic_")) {
		sourceKey = "facebook_international_comment";
		meetingDate = getMeetingDateFromUserSource(sourceParam);		
	} else if (sourceParam.startsWith("wput_")) {
		sourceKey = "whatsapp_palestinian_israeli_updates_tonight";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("wiut_")) {
		sourceKey = "whatsapp_international_updates_tonight";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("wpun_")) {
		sourceKey = "whatsapp_palestinian_israeli_updates_now";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("wiun_")) {
		sourceKey = "whatsapp_international_updates_now";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("wppt_")) {
		sourceKey = "whatsapp_palestinian_israeli_chats_tonight";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("wppn_")) {
		sourceKey = "whatsapp_palestinian_israeli_chats_now";
		meetingDate = getMeetingDateFromUserSource(sourceParam);
	} else if (sourceParam.startsWith("dfm")) {
		sourceKey = "direct_messege_to_user_from_me";
		if (sourceParam.includes("_")) {
			meetingDate = getMeetingDateFromUserSource(sourceParam);
		} else {
			meetingDate = "unknown_date";
		}
	} else if (sourceParam.startsWith("thisisme")) {
		sourceKey = "this_is_me";
		meetingDate = "unknown_date";
	} else if (sourceParam.startsWith("menu")) {
		sourceKey = "website_menu";
		meetingDate = "unknown_date";
	} else {
		sourceKey = sourceParam;
		meetingDate = "unknown_date";
	}
	return [sourceKey, meetingDate];
}

function getMeetingDateFromUserSource(sourceParam) {
	var meetingDate = sourceParam.substring(sourceParam.lastIndexOf('_') + 1);
	return meetingDate;
}

function saveOpenMeetingPageDetails(isCodeApproved, codeParam) {
	if (isFirstPwdCheck) {
		isFirstPwdCheck = false; // we only want to save the details the first time a user opens this page
		var sourceAndDate = getUserSourceAndMeetingDate();
		var sourceKey = sourceAndDate[0];
		var meetingDate = sourceAndDate[1];
		saveAction("meetings", "meetings_page_open", {source_key: sourceKey, meeting_date: meetingDate, is_approved: isCodeApproved, user_code: codeParam});
	}
}

	