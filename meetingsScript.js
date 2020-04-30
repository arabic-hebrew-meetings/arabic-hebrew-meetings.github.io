
$(document).ready(initialize);

function initialize() {
    doSomething("", "", "");
    updateMeetingCounters();
}

var meetingsCounters = [];

function updateMeetingCounters() {
	var url = "https://sheets.googleapis.com/v4/spreadsheets/1Fk1Ojj2D0UB0mopeJpmYR5k3wwjll2OFwLGozEy1hPE/values/2:2?key=AIzaSyCO7oL3OUci3vbOZ1MXXLoxdTZCLKGPv60";                                                             
  $.getJSON(url, function(result){
    $.each(result, function(i, field){
		if (i == "values") {
			meetingsCounters = field[0];
		}
    });
  }); 
  setTimeout(updateMeetingCounters, 5000);
}

function getCounterByNativeLanguageAndRoom(language, room) {
	index = ((room-1)*2);
	if (language == "Hebrew") {
		index += 1;
	}
	if (meetingsCounters.length >= index+1) {
		return meetingsCounters[index];
	} else {
		return 0;
	}
}

function getRecommendedRooms(nativeLanguage, levelRooms) {
	var result = [];
	var min = -1; 
	var validCounters = true;
	var levelCounters = [];
	for (i in levelRooms) {
		var counter = getCounterByNativeLanguageAndRoom(nativeLanguage, levelRooms[i]);
		if (isNaN(counter)) {
			validCounters = false;
		} else {
			levelCounters.push(counter);
			if (min == -1 || counter < min) {
				min = counter;
			}
		}
	}
	
	if (validCounters) {
		for (i in levelRooms) {
			if (levelCounters[i] == min) {
				result.push(levelRooms[i]);
			}
		}
	} else {
		for (i in levelRooms) {	
			result.push(levelRooms[i]);
		}
	}

	return result;
}

function doSomething(userLang, userLevel, userChoice, chosenData) {
	handleChoice(userLang, userLevel, userChoice, chosenData);
	
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
		  inputPreview.removeClass("active");
		  that.css("top", top).addClass("active");

		  TweenMax.set(input, {
			scale: 1.2,
			alpha: 0,
			backgroundColor: "#fff"
		  });
		  
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
			  return doSomething("", "", "Back", data);
		  }
		  
		  if (data=="Arabic") {
			  return doSomething("Arabic", "", "", data);
		  }
		  
		  if (data=="Hebrew") {
			  return doSomething("Hebrew", "", "", data);
		  }
		  
		  if (data.includes("H-Native-A-Beginner-Room")) {
			  return doSomething("Hebrew","Beginner","Room", data);
		  }
		  
		  if (data.includes("H-Native-A-Intermediate-Room")) {
			  return doSomething("Hebrew","Intermediate","Room", data);
		  }
		  
		  
		  if (data.includes("H-Native-A-Advanced-Room")) {
			  return doSomething("Hebrew","Advanced","Room", data);
		  }
		  
		  if (data.includes("A-Native-H-Beginner-Room")) {
			  return doSomething("Arabic","Beginner","Room", data);
		  }
		  
		  if (data.includes("A-Native-H-Intermediate-Room")) {
			  return doSomething("Arabic","Intermediate","Room", data);
		  }
		  
		  if (data.includes("A-Native-H-Advanced-Room")) {
			  return doSomething("Arabic","Advanced","Room", data);
		  }
		  
		  if (data.includes("MoreOptions")) {
			  return doSomething(nativeLanguage,level,"More", data);
		  }
		  
		  if (data.includes("-Recommended-Back")) {
			  return doSomething(nativeLanguage,level);
		  }
		
		}

	  });
}
}

function handleChoice(userLang, userLevel, userChoice, chosenData) {
	saveMeetingsActions(userLang, userLevel, userChoice, chosenData);
	if (userChoice != "Room") {
		if (userLang != null && userLang != "") {
			if (userLevel != null && userLevel != "") {
				if (userChoice == "More") {
					displayMoreOptions(userLang, userLevel, chosenData);
				} else {
					displayRecommendedOptions(userLang, userLevel);
				}
			} else {
				displayLevelOptions(userLang);
			}
		} else {
			displayChooseNativeLanguage();
		}
	}
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
}

function displayLevelOptions(userLang) {
	if (userLang=="Hebrew") {
		document.getElementById("subheadline").innerHTML = ``
		document.getElementById("question-area").innerHTML = `
			<div class='select-ctr'>
		  <div class='selected-input input-preview'>סמנו את הרמה שלכם בערבית<br>ובחרו קבוצה להצטרף אליה:</div>
		  
		  <div class="cntr rtl display-above-600px">
			<label for="rdo-1" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Advanced')" id="rdo-1" name="radio-grp">
			  <svg class="option-1-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה מתקדמת</span>
			</label>
			<label for="rdo-2" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Intermediate')" id="rdo-2" name="radio-grp">
			  <svg class="option-2-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בינונית</span>
			</label>
			<label for="rdo-3" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Beginner')" id="rdo-3" name="radio-grp">
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
			  <input type="radio" onclick="doSomething('Hebrew','Beginner')" id="rdo-4" name="radio-grp">
			  <svg class="option-1-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בסיסית</span>
			</label>
			<label for="rdo-5" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Intermediate')" id="rdo-5" name="radio-grp">
			  <svg class="option-2-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בינונית</span>
			</label>
			<label for="rdo-6" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Advanced')" id="rdo-6" name="radio-grp">
			  <svg class="option-3-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה מתקדמת</span>
			</label>
		  </div>
		  
		  <div class="optionsHeadline" id="optionsHeadline">הקבוצות המומלצות לך:</div>
		  
		  <div class="options" id="options">
		  <div class='input input-1-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
		  </div>
		</div>
		`
	}
	if (userLang=="Arabic") {
		document.getElementById("subheadline").innerHTML = ``
		document.getElementById("question-area").innerHTML = `
			<div class='select-ctr'>
		  <div class='selected-input input-preview'>اختاروا مستواكم في اللغة العبرية<br>واختاروا مجموعة تنضموا لالها:</div>
		  
		  <div class="cntr rtl display-above-600px">
			<label for="rdo-1" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Arabic','Advanced')" id="rdo-1" name="radio-grp">
			  <svg class="option-1-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متقدم</span>
			</label>
			<label for="rdo-2" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Arabic','Intermediate')" id="rdo-2" name="radio-grp">
			  <svg class="option-2-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متوسط</span>
			</label>
			<label for="rdo-3" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Arabic','Beginner')" id="rdo-3" name="radio-grp">
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
			  <input type="radio" onclick="doSomething('Arabic','Beginner')" id="rdo-4" name="radio-grp">
			  <svg class="option-1-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى منخفض</span>
			</label>
			<label for="rdo-5" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Arabic','Intermediate')" id="rdo-5" name="radio-grp">
			  <svg class="option-2-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متوسط</span>
			</label>
			<label for="rdo-6" class="btn-radio level-label">
			  <input type="radio" onclick="doSomething('Arabic','Advanced')" id="rdo-6" name="radio-grp">
			  <svg class="option-3-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متقدم</span>
			</label>
		  </div>
		  
		  <div class="optionsHeadline" id="optionsHeadline">المجموعات المقترحة لك:</div>
		  
		  <div class="options" id="options">
		  <div class='input input-1-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
		  </div>
		</div>
		`
	}
}

function displayRecommendedOptions(userLang, userLevel) {
	
	// get possible rooms
	possibleRooms = [];
	levelMeetings = meetings[userLang][userLevel];
	for (meeting of levelMeetings) {
		room = meeting["room"];
		possibleRooms.push(room);
	}
	
	// get recommended rooms
	recommendedRooms = getRecommendedRooms(userLang, possibleRooms);
	
	// get other rooms
	otherRooms = [];
	for (meeting of levelMeetings) {
		room = meeting["room"];
		isRecRoom = false;
		for (recRoom of recommendedRooms) {
			if (room == recRoom) {
					isRecRoom = true;
			}
		}
		if (!isRecRoom) {
			otherRooms.push(room);
		}	
	}
	
	options = ``;
	for (i = 0; i < recommendedRooms.length; i++) {
		
		// get url and data
		url = "";
		data = "";
 		roomNumber = recommendedRooms[i]
		for (meeting of levelMeetings) {
			if (roomNumber == meeting["room"]) {
				url = meeting["url"];
				data = meeting["data"];
			}
		}
		
		// build cur option
		curOption = `<div onclick="openMeeting('`+url+`','`+data+`')" class='input input-`+(i+1)+`-after-radio-buttons' data-val='`+data+`'>`+getGroupTextByLang(userLang)+``+roomNumber+`</div>`;
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
}

function displayMoreOptions(userLang, userLevel, chosenData) {
	options = ``;
	
	// get other rooms
	var otherRoomsStr = chosenData.split("MoreOptions-")[1];
	otherRooms = otherRoomsStr.split("_");
	
	// build other rooms options
	levelMeetings = meetings[userLang][userLevel];
	for (i = 0; i < otherRooms.length; i++) {
		
		// get url and data
		url = "";
		data = "";
 		roomNumber = otherRooms[i]
		for (meeting of levelMeetings) {
			if (roomNumber == meeting["room"]) {
				url = meeting["url"];
				data = meeting["data"];
			}
		}
		
		// build cur option
		curOption = `<div onclick="openMeeting('`+url+`','`+data+`')" class='input input-`+(i+1)+`-after-radio-buttons' data-val='`+data+`'>`+getGroupTextByLang(userLang)+``+roomNumber+`</div>`;
		options += curOption;
	}
	
	// build back option
	var backOptionOrder = otherRooms.length+1;
	var backData = userLang+"-"+userLevel+"-Recommended-Back";
	backOption = `<div class='input input-`+backOptionOrder+`-after-radio-buttons' data-val='`+backData+`k'>Back</div>`;
	options += backOption;
	
	document.getElementById("optionsHeadline").innerHTML = getMoreGroupsTextByLang(userLang)+":";
	
	document.getElementById("options").innerHTML = options;
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

function saveMeetingAction(data) {
	
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
		
		if (data.includes("Room-1")) {
			roomNumber = "1";
		}
		if (data.includes("Room-2")) {
			roomNumber = "2";
		}
		if (data.includes("Room-3")) {
			roomNumber = "3";
		}
		if (data.includes("Room-4")) {
			roomNumber = "4";
		}
		if (data.includes("Room-5")) {
			roomNumber = "5";
		}
		if (data.includes("Room-6")) {
			roomNumber = "6";
		}
		if (data.includes("Room-7")) {
			roomNumber = "7";
		}
		if (data.includes("Room-8")) {
			roomNumber = "8";
		}
		if (data.includes("Room-9")) {
			roomNumber = "9";
		}
		
		var languageLevel = otherLanguage+"-"+level;
		var languageInRoom = "Room"+roomNumber+"-"+nativeLanguage;
	
		saveMeetingEntry(nativeLanguage, languageLevel, languageInRoom, "Room-"+roomNumber);
}

function openMeeting(url, data) {
	saveMeetingAction(data);
	window.open(url, '_blank');
}

var meetings = {
  Arabic: {
	  Beginner: [
	  {
		  room: 1,
		  url: "https://zoom.us/j/92421521133?pwd=MXFUajUyVlMxaTV1MW1jL3pNWjFZdz09",
		  data: "A-Native-H-Beginner-Room-1"
	  },
	  {
		  room: 2,
		  url: "https://zoom.us/j/98509806634?pwd=Mlo1UTJqZHNJVFNISGRxSTU1L3dCdz09",
		  data: "A-Native-H-Beginner-Room-2"
	  }
	  ],
	  Intermediate: [
	  {
		  room: 3,
		  url: "https://zoom.us/j/91538344978?pwd=aGRZbG91aE1JQkxna2IvVHRNQ2tKUT09",
		  data: "A-Native-H-Intermediate-Room-3"
	  },
	  {
		  room: 4,
		  url: "https://zoom.us/j/97617232470?pwd=aEZKVG5sY3pRU2o5THZVL2xpRVBDUT09",
		  data: "A-Native-H-Intermediate-Room-4"
	  }
	  ],
	  Advanced: [
	  {
		  room: 5,
		  url: "https://zoom.us/j/99912994947?pwd=UXRNbWxiNk5SaVBmZ21kTWpCejZHZz09",
		  data: "A-Native-H-Advanced-Room-5"
	  },
	  {
		  room: 6,
		  url: "https://zoom.us/j/91520797765?pwd=MzVvYlZ6Q3lNM3diZzBPRTFWQjlsdz09",
		  data: "A-Native-H-Advanced-Room-6"
	  }
	  ]
  },
  Hebrew: {
	  Beginner: [
	  {
		  room: 5,
		  url: "https://zoom.us/j/99912994947?pwd=UXRNbWxiNk5SaVBmZ21kTWpCejZHZz09",
		  data: "H-Native-A-Beginner-Room-5"
	  },
	  {
		  room: 6,
		  url: "https://zoom.us/j/91520797765?pwd=MzVvYlZ6Q3lNM3diZzBPRTFWQjlsdz09",
		  data: "H-Native-A-Beginner-Room-6"
	  }
	  ],
	  Intermediate: [
	  {
		  room: 3,
		  url: "https://zoom.us/j/91538344978?pwd=aGRZbG91aE1JQkxna2IvVHRNQ2tKUT09",
		  data: "H-Native-A-Intermediate-Room-3"
	  },
	  {
		  room: 4,
		  url: "https://zoom.us/j/97617232470?pwd=aEZKVG5sY3pRU2o5THZVL2xpRVBDUT09",
		  data: "H-Native-A-Intermediate-Room-4"
	  }
	  ],
	  Advanced: [
	  {
		  room: 1,
		  url: "https://zoom.us/j/92421521133?pwd=MXFUajUyVlMxaTV1MW1jL3pNWjFZdz09",
		  data: "H-Native-A-Advanced-Room-1"
	  },
	  {
		  room: 2,
		  url: "https://zoom.us/j/98509806634?pwd=Mlo1UTJqZHNJVFNISGRxSTU1L3dCdz09",
		  data: "H-Native-A-Advanced-Room-2"
	  }
	  ]
  }
};

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
		return "הקבוצות המומלצות לך:";
	} else {
		return "المجموعات المقترحة لك:";
	}
}

	
