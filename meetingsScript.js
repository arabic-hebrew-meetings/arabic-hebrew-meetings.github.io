
$(document).ready(
doSomething("", "", "")
);

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
	  
	  
	  if (data=="Choose-Native-Language-Back") {
		  doSomething("", "", "Back", data);
	  }
	  
	  if (data=="Arabic") {
		  doSomething("Arabic", "", "", data);
	  }
	  
	  if (data=="Hebrew") {
		  doSomething("Hebrew", "", "", data);
	  }
	  
	  if (data.includes("H-Native-A-Beginner-Room")) {
		  doSomething("Hebrew","Beginner","Room", data);
	  }
	  
	  if (data.includes("H-Native-A-Intermediate-Room")) {
		  doSomething("Hebrew","Intermediate","Room", data);
	  }
	  
	  
	  if (data.includes("H-Native-A-Advanced-Room")) {
		  doSomething("Hebrew","Advanced","Room", data);
	  }
	  
	  if (data.includes("A-Native-H-Beginner-Room")) {
		  doSomething("Arabic","Beginner","Room", data);
	  }
	  
	  if (data.includes("A-Native-H-Intermediate-Room")) {
		  doSomething("Arabic","Intermediate","Room", data);
	  }
	  
	  if (data.includes("A-Native-H-Advanced-Room")) {
		  doSomething("Arabic","Advanced","Room", data);
	  }
    
	}

  });
}

function handleChoice(userLang, userLevel, userChoice, chosenData) {
	saveMeetingsActions(userLang, userLevel, userChoice, chosenData);
	if (userLang != null && userLang != "") {
		if (userLevel != null && userLevel != "") {
			displayOptions(userLang, userLevel, userChoice);
		} else {
			displayLevelOptions(userLang);
		}
	} else {
		displayChooseNativeLanguage();
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
		  
		  <div class="cntr rtl">
			<label for="rdo-1" class="btn-radio order-three level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Advanced')" id="rdo-1" name="radio-grp">
			  <svg class="option-1-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה מתקדמת</span>
			</label>
			<label for="rdo-2" class="btn-radio order-two level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Intermediate')" id="rdo-2" name="radio-grp">
			  <svg class="option-2-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בינונית</span>
			</label>
			<label for="rdo-3" class="btn-radio order-one level-label">
			  <input type="radio" onclick="doSomething('Hebrew','Beginner')" id="rdo-3" name="radio-grp">
			  <svg class="option-3-hebrew" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>רמה בסיסית</span>
			</label>
		  </div>
		  
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
		  
		  <div class="cntr rtl">
			<label for="rdo-1" class="btn-radio order-three level-label">
			  <input type="radio" onclick="doSomething('Arabic','Advanced')" id="rdo-1" name="radio-grp">
			  <svg class="option-1-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متقدم</span>
			</label>
			<label for="rdo-2" class="btn-radio order-two level-label">
			  <input type="radio" onclick="doSomething('Arabic','Intermediate')" id="rdo-2" name="radio-grp">
			  <svg class="option-2-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى متوسط</span>
			</label>
			<label for="rdo-3" class="btn-radio order-one level-label">
			  <input type="radio" onclick="doSomething('Arabic','Beginner')" id="rdo-3" name="radio-grp">
			  <svg class="option-3-arabic" width="20px" height="20px" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="9"></circle>
				<path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z" class="inner"></path>
				<path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z" class="outer"></path>
			  </svg>
			  <span>مستوى منخفض</span>
			</label>
		  </div>
		  
		  <div class="options" id="options">
		  <div class='input input-1-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
		  </div>
		</div>
		`
	}
}

function displayOptions(userLang, userLevel, userChoice) {
	if (userLang=="Hebrew") {
		if (userLevel=="Beginner") {
			document.getElementById("options").innerHTML =  `
			<div onclick="window.open('https://zoom.us/j/99912994947?pwd=UXRNbWxiNk5SaVBmZ21kTWpCejZHZz09');" class='input input-1-after-radio-buttons' data-val='H-Native-A-Beginner-Room-5'>קבוצה מס' 5</div>
			<div onclick="window.open('https://zoom.us/j/91520797765?pwd=MzVvYlZ6Q3lNM3diZzBPRTFWQjlsdz09');" class='input input-2-after-radio-buttons' data-val='H-Native-A-Beginner-Room-6'>קבוצה מס' 6</div>
			<div class='input input-3-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
			`;
		}
		  
		  
		if (userLevel=="Intermediate") {
			document.getElementById("options").innerHTML =  `
			<div onclick="window.open('https://zoom.us/j/91538344978?pwd=aGRZbG91aE1JQkxna2IvVHRNQ2tKUT09');" class='input input-1-after-radio-buttons' data-val='H-Native-A-Intermediate-Room-3'>קבוצה מס' 3</div>
			<div onclick="window.open('https://zoom.us/j/97617232470?pwd=aEZKVG5sY3pRU2o5THZVL2xpRVBDUT09');" class='input input-2-after-radio-buttons' data-val='H-Native-A-Intermediate-Room-4'>קבוצה מס' 4</div>
			<div class='input input-3-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
			`;
		}
		
		if (userLevel=="Advanced") {
			document.getElementById("options").innerHTML =  `
			<div onclick="window.open('https://zoom.us/j/92421521133?pwd=MXFUajUyVlMxaTV1MW1jL3pNWjFZdz09');" class='input input-1-after-radio-buttons' data-val='H-Native-A-Advanced-Room-1'>קבוצה מס' 1</div>
			<div onclick="window.open('https://zoom.us/j/98509806634?pwd=Mlo1UTJqZHNJVFNISGRxSTU1L3dCdz09');" class='input input-2-after-radio-buttons' data-val='H-Native-A-Advanced-Room-2'>קבוצה מס' 2</div>
			<div class='input input-3-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
			`;
		}
	}
	if (userLang=="Arabic") {
		if (userLevel=="Beginner") {
			document.getElementById("options").innerHTML =  `
			<div onclick="window.open('https://zoom.us/j/92421521133?pwd=MXFUajUyVlMxaTV1MW1jL3pNWjFZdz09');" class='input input-1-after-radio-buttons' data-val='A-Native-H-Beginner-Room-1'>مجموعة رقم 1</div>
			<div onclick="window.open('https://zoom.us/j/98509806634?pwd=Mlo1UTJqZHNJVFNISGRxSTU1L3dCdz09');" class='input input-2-after-radio-buttons' data-val='A-Native-H-Beginner-Room-2'>مجموعة رقم 2</div>
			<div class='input input-3-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
			`;
		}
		  
		  
		if (userLevel=="Intermediate") {
			document.getElementById("options").innerHTML =  `
			<div onclick="window.open('https://zoom.us/j/91538344978?pwd=aGRZbG91aE1JQkxna2IvVHRNQ2tKUT09');" class='input input-1-after-radio-buttons' data-val='A-Native-H-Intermediate-Room-3'>مجموعة رقم 3</div>
			<div onclick="window.open('https://zoom.us/j/97617232470?pwd=aEZKVG5sY3pRU2o5THZVL2xpRVBDUT09');" class='input input-2-after-radio-buttons' data-val='A-Native-H-Intermediate-Room-4'>مجموعة رقم 4</div>
			<div class='input input-3-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
			`;
		}
		
		if (userLevel=="Advanced") {
			document.getElementById("options").innerHTML =  `
			<div onclick="window.open('https://zoom.us/j/99912994947?pwd=UXRNbWxiNk5SaVBmZ21kTWpCejZHZz09');" class='input input-1-after-radio-buttons' data-val='A-Native-H-Advanced-Room-5'>مجموعة رقم 5</div>
			<div onclick="window.open('https://zoom.us/j/91520797765?pwd=MzVvYlZ6Q3lNM3diZzBPRTFWQjlsdz09');" class='input input-2-after-radio-buttons' data-val='A-Native-H-Advanced-Room-6'>مجموعة رقم 6</div>
			<div class='input input-3-after-radio-buttons' data-val='Choose-Native-Language-Back'>Back</div>
			`;
		}
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
	
	if (userChoice == "Room") {
		
		// save meeting entry
		
		var nativeLanguage = userLang;
		var level = userLevel;
		var otherLanguage = "";
		if (userLang == "Hebrew") {
			otherLanguage = "Arabic";
		} else {
			otherLanguage = "Hebrew";
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
}
