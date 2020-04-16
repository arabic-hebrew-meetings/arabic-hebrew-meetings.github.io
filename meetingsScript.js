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
        text: dictionary(data),
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
	  
	  if (data=="choose-native-language") {
	  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>מה היא שפת האם שלכם? - شو لغة الام تبعتكو؟</div>
  <div class='input input-1' data-val='Arabic'>انا العربي هي لغتي الام</div>
  <div class='input input-2' data-val='Hebrew'>אני דובר עברית שפת אם</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="Arabic") {
	  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>شو مستواكم في اللغة العبرية؟</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>مستوى منخفض</div>
  <div class='input input-2' data-val='A-Native-H-Intermediate'>مستوى متوسط</div>
  <div class='input input-3' data-val='A-Native-H-Advanced'>مستوى متقدم</div>
  <div class='input input-4' data-val='choose-native-language'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="Hebrew") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>מה הרמה שלכם בערבית?</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>רמה בסיסית</div>
  <div class='input input-2' data-val='H-Native-A-Intermediate'>רמה בינונית</div>
  <div class='input input-3' data-val='H-Native-A-Advanced'>רמה מתקדמת</div>
  <div class='input input-4' data-val='choose-native-language'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>בחרו קבוצה להצטרף אליה</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='H-Native-A-Beginner-Room-1'>קבוצה מס' 1</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='H-Native-A-Beginner-Room-2'>קבוצה מס' 2</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='H-Native-A-Beginner-Room-3'>קבוצה מס' 3</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='H-Native-A-Beginner-Room-4'>קבוצה מס' 4</div>
  <div onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='H-Native-A-Beginner-Room-5'>קבוצה מס' 5</div>
  <div class='input input-6' data-val='Hebrew'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>בחרו קבוצה להצטרף אליה</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='H-Native-A-Intermediate-Room-1'>קבוצה מס' 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='H-Native-A-Intermediate-Room-2'>קבוצה מס' 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='H-Native-A-Intermediate-Room-3'>קבוצה מס' 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='H-Native-A-Intermediate-Room-4'>קבוצה מס' 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='H-Native-A-Intermediate-Room-5'>קבוצה מס' 5</div>
  <div class='input input-6' data-val='Hebrew'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>בחרו קבוצה להצטרף אליה</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='H-Native-A-Advanced-Room-1'>קבוצה מס' 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='H-Native-A-Advanced-Room-2'>קבוצה מס' 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='H-Native-A-Advanced-Room-3'>קבוצה מס' 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='H-Native-A-Advanced-Room-4'>קבוצה מס' 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='H-Native-A-Advanced-Room-5'>קבוצה מס' 5</div>
  <div class='input input-6' data-val='Hebrew'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>اختاروا مجموعة منشان تنضموا اليها</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='A-Native-H-Beginner-Room-1'>مجموعة رقم 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='A-Native-H-Beginner-Room-2'>مجموعة رقم 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='A-Native-H-Beginner-Room-3'>مجموعة رقم 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='A-Native-H-Beginner-Room-4'>مجموعة رقم 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='A-Native-H-Beginner-Room-5'>مجموعة رقم 5</div>
  <div class='input input-6' data-val='Arabic'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>اختاروا مجموعة منشان تنضموا اليها</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='A-Native-H-Intermediate-Room-1'>مجموعة رقم 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='A-Native-H-Intermediate-Room-2'>مجموعة رقم 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='A-Native-H-Intermediate-Room-3'>مجموعة رقم 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='A-Native-H-Intermediate-Room-4'>مجموعة رقم 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='A-Native-H-Intermediate-Room-5'>مجموعة رقم 5</div>
  <div class='input input-6' data-val='Arabic'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>اختاروا مجموعة منشان تنضموا اليها</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-1' data-val='A-Native-H-Advanced-Room-1'>مجموعة رقم 1</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-2' data-val='A-Native-H-Advanced-Room-2'>مجموعة رقم 2</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-3' data-val='A-Native-H-Advanced-Room-3'>مجموعة رقم 3</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-4' data-val='A-Native-H-Advanced-Room-4'>مجموعة رقم 4</div>
  <div  onclick="window.open('https://us04web.zoom.us/j/9611602166');" class='input input-5' data-val='A-Native-H-Advanced-Room-5'>مجموعة رقم 5</div>
  <div class='input input-6' data-val='Arabic'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 1 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 2 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 3 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 4 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Beginner-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 5 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 1 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 2 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 3 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 4 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Intermediate-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 5 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 1 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 2 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 3 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 4 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="H-Native-A-Advanced-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>קבוצה מס' 5 תיפתח לכם כעת</div>
  <div class='input input-1' data-val='H-Native-A-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 1 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 2 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 3 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 4 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Beginner-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 5 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Beginner'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 1 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 2 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 3 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 4 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Intermediate-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 5 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Intermediate'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-1") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 1 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-2") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 2 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-3") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 3 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-4") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 4 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	  if (data=="A-Native-H-Advanced-Room-5") {
		  document.getElementById("question-area").innerHTML =  `<div class='select-ctr'>
  <div class='selected-input input-preview'>مجموعة رقم 5 بتفتح لكم هسا</div>
  <div class='input input-1' data-val='A-Native-H-Advanced'>Back</div>
</div>`;
doSomething()
	  }
	  
	
    
	}

  });
}

$(document).ready(doSomething()

);

const dictionary = {
	"Arabic": "انا العربي هي لغتي الام",
	"Hebrew": "אני דובר עברית שפת אם",
	"H-Native-A-Beginner": "רמה בסיסית",
	"H-Native-A-Intermediate": "רמה בינונית",
	"H-Native-A-Advanced": "רמה מתקדמת",
	"A-Native-H-Beginner": "مستوى منخفض",
	"A-Native-H-Intermediate": "مستوى متوسط",
	"A-Native-H-Advanced": "مستوى متقدم"
};