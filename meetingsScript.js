function doSomething() {
		  var inputPreview = $(".input-preview"),
      input = $(".input");

  TweenMax.set(input, {
    scale: 1.2,
    alpha: 0
  });

    
    inputPreview.toggleClass("active");
    
    if(inputPreview.hasClass("active")){
      
      TweenMax.staggerTo(input, 1.25, {
        scale: 1,
        alpha: 1,
        ease: Elastic.easeOut
      }, .1);   
    }
    else {
      TweenMax.staggerTo(input, 1, {
        scale: 1.2,
        alpha: 0,
        ease: Elastic.easeOut
      }, .1);
    }
  

  input.on("click", function() {

    var tlInput = new TimelineMax({
      onComplete: done
    });

    var that = $(this),
      siblings = that.siblings(".input"),
      data = that.data("val"),
      top = that.css("top");

    siblings.removeClass("active");
	
	saveAction("meetings", "select_choice", {choice: data});
	
	if (data.includes("Room")) {
		
		// save meeting entry
		
		var nativeLanguage = "";
		var level = "";
		var roomNumber = "";
	
		if (data.includes("A-Native")) {
			nativeLanguage = "Arabic";
		}
		if (data.includes("H-Native")) {
			nativeLanguage = "Hebrew";
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
	
		saveMeetingEntry(nativeLanguage, level, roomNumber);
		
	}
	
	//get the chosen answer from the data value
	var choice = "";
	if (data.includes("Back")) {
		choice = "Back";
	}
	if (data.includes("Room")) {
		if (data.includes("A-Native")) {
			if (data.includes("Room-1")) {
				choice = "مجموعة رقم 1";
			}
			if (data.includes("Room-2")) {
				choice = "مجموعة رقم 2";
			}
			if (data.includes("Room-3")) {
				choice = "مجموعة رقم 3";
			}
			if (data.includes("Room-4")) {
				choice = "مجموعة رقم 4";
			}
			if (data.includes("Room-5")) {
				choice = "مجموعة رقم 5";
			}
		}
		if (data.includes("H-Native")) {
			if (data.includes("Room-1")) {
				choice = "קבוצה מס' 1";
			}
			if (data.includes("Room-2")) {
				choice = "קבוצה מס' 2";
			}
			if (data.includes("Room-3")) {
				choice = "קבוצה מס' 3";
			}
			if (data.includes("Room-4")) {
				choice = "קבוצה מס' 4";
			}
			if (data.includes("Room-5")) {
				choice = "קבוצה מס' 5";
			}
		}		
	}
	if (!data.includes("Back") && !data.includes("Room")) {
		choice = dictionary[data];
	}	

    tlInput.to(siblings, .25, {
        alpha: 0
      })
      .to(that, .25, {
        scale: 1.2
      })
      .to(that, .25, {
        top: 0,
      })
      .set(inputPreview, {
        display: "none"
      })
      .to(that, .25, {
        scale: 1,
      })
      .to(that, .5, {
        backgroundColor: "white"
      })
      .set(inputPreview, {
        text: choice,
        display: "block"
      })
      .to(that, .25, {
        alpha: 0
      })

    function done() {
      inputPreview.removeClass("active");
      that.css("top", top).addClass("active");

      TweenMax.set(input, {
        scale: 1.2,
        alpha: 0,
        backgroundColor: "#fff"
      });
	  
	  if (data=="Choose-Native-Language" || data=="Choose-Native-Language-Back") {
	  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>מה היא שפת האם שלכם?<br>شو لغة الام تبعتكم؟</div>
  <div class='input input-1' data-val='Hebrew'>עברית</div>
  <div class='input input-2' data-val='Arabic'>عربي</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="Arabic" || data=="Arabic-Back") {
	  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>شو مستواكم بالعبري؟</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>مستوى منخفض</div>
  <div class='input input-2' data-val='A-Native-H-Intermediate'>مستوى متوسط</div>
  <div class='input input-3' data-val='A-Native-H-Advanced'>مستوى متقدم</div>
  <div class='input input-4' data-val='Choose-Native-Language-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="Hebrew" || data=="Hebrew-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>מה הרמה שלכם בערבית?</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>רמה בסיסית</div>
  <div class='input input-2' data-val='H-Native-A-Intermediate'>רמה בינונית</div>
  <div class='input input-3' data-val='H-Native-A-Advanced'>רמה מתקדמת</div>
  <div class='input input-4' data-val='Choose-Native-Language-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner" || data=="H-Native-A-Beginner-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>בחרו קבוצה להצטרף אליה:</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='H-Native-A-Beginner-Room-1'>קבוצה מס' 1</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='H-Native-A-Beginner-Room-2'>קבוצה מס' 2</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='H-Native-A-Beginner-Room-3'>קבוצה מס' 3</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='H-Native-A-Beginner-Room-4'>קבוצה מס' 4</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='H-Native-A-Beginner-Room-5'>קבוצה מס' 5</div>
  <div class='input input-6' data-val='Hebrew-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate" || data=="H-Native-A-Intermediate-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>בחרו קבוצה להצטרף אליה:</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='H-Native-A-Intermediate-Room-1'>קבוצה מס' 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='H-Native-A-Intermediate-Room-2'>קבוצה מס' 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='H-Native-A-Intermediate-Room-3'>קבוצה מס' 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='H-Native-A-Intermediate-Room-4'>קבוצה מס' 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='H-Native-A-Intermediate-Room-5'>קבוצה מס' 5</div>
  <div class='input input-6' data-val='Hebrew-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced" || data=="H-Native-A-Advanced-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>בחרו קבוצה להצטרף אליה:</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='H-Native-A-Advanced-Room-1'>קבוצה מס' 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='H-Native-A-Advanced-Room-2'>קבוצה מס' 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='H-Native-A-Advanced-Room-3'>קבוצה מס' 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='H-Native-A-Advanced-Room-4'>קבוצה מס' 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='H-Native-A-Advanced-Room-5'>קבוצה מס' 5</div>
  <div class='input input-6' data-val='Hebrew-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner" || data=="A-Native-H-Beginner-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>اختاروا مجموعة تنضموا لالها:</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='A-Native-H-Beginner-Room-1'>مجموعة رقم 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='A-Native-H-Beginner-Room-2'>مجموعة رقم 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='A-Native-H-Beginner-Room-3'>مجموعة رقم 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='A-Native-H-Beginner-Room-4'>مجموعة رقم 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='A-Native-H-Beginner-Room-5'>مجموعة رقم 5</div>
  <div class='input input-6' data-val='Arabic-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate" || data=="A-Native-H-Intermediate-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>اختاروا مجموعة تنضموا لالها:</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='A-Native-H-Intermediate-Room-1'>مجموعة رقم 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='A-Native-H-Intermediate-Room-2'>مجموعة رقم 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='A-Native-H-Intermediate-Room-3'>مجموعة رقم 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='A-Native-H-Intermediate-Room-4'>مجموعة رقم 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='A-Native-H-Intermediate-Room-5'>مجموعة رقم 5</div>
  <div class='input input-6' data-val='Arabic-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced" || data=="A-Native-H-Advanced-Back") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>اختاروا مجموعة تنضموا لالها:</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='A-Native-H-Advanced-Room-1'>مجموعة رقم 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='A-Native-H-Advanced-Room-2'>مجموعة رقم 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='A-Native-H-Advanced-Room-3'>مجموعة رقم 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='A-Native-H-Advanced-Room-4'>مجموعة رقم 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='A-Native-H-Advanced-Room-5'>مجموعة رقم 5</div>
  <div class='input input-6' data-val='Arabic-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 1 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 2 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 3 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 4 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 5 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 1 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 2 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 3 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 4 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 5 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 1 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 2 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 3 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 4 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 5 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 1 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 2 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 3 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 4 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 5 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Beginner-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 1 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 2 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 3 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 4 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 5 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 1 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 2 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 3 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 4 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 5 رح تفتتح الآن</div>
  <div class='input input-1' data-val='A-Native-H-Advanced-Back'>Back</div>
</div>`;
doSomething()
	  }
	  
	
    
	}

  });
}

$(document).ready(doSomething()

);

const dictionary = {
	"Arabic": "عربي",
	"Hebrew": "עברית",
	"H-Native-A-Beginner": "רמה בסיסית",
	"H-Native-A-Intermediate": "רמה בינונית",
	"H-Native-A-Advanced": "רמה מתקדמת",
	"A-Native-H-Beginner": "مستوى منخفض",
	"A-Native-H-Intermediate": "مستوى متوسط",
	"A-Native-H-Advanced": "مستوى متقدم"
};