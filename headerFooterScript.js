function getHeader(){
	console.log("getHeader Start");
	document.getElementById("header").innerHTML = `<div class="row">
         <nav class="col-sm-10 text-left">
    <ul class="nav navbar-nav">
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span>פעילויות &nbsp فعاليات</a>
        <ul class="dropdown-menu">
		  <li><a href="questions.html">שואלים אחד את השני  -   منسأل بعض</a></li>
		  <li><a href="discussions.html">מועדון דיבייט  -   نادي النقاش</a></li>
		  <li><a href="songs.html">שירים - اغاني</a></li>
          <li><a href="21questions.html">מפורסמים  -  مشاهير</a></li>
          <li><a href="fastest.html">הזוג הכי מהיר  -   أسرع اثنين</a></li>
          <li><a href="truth-or-lie.html">אמת או שקר  -  صدق او كذب</a></li>
          <li><a href="jokes.html">בדיחות  -  نكت</a></li>
          <li><a href="story.html">בונים ביחד סיפור  -  نبني مع بعض قصة</a></li>
          <li><a href="slang.html">סלנג - مصطلحات عامية</a></li>
          <li><a href="sayings.html">פתגמים  -  امثال</a></li>
          <li><a href="picture.html">היכרות בעזרת תמונות - تعارف عن طريق الصور</a></li>
        </ul>
      </li>
      <li><a href="phrases.html">שיחון &nbsp عبارات شائعة</a></li>
      <li><a href="index.html">בית &nbsp بيت</a></li>
    </ul>
      </nav>    
		<img class="col-sm-2" src="logo-speaklang2-03.png"/>
    </div>`;
	console.log("getHeader End");
}

function getFooter(){
	console.log("getFooter Start");
	document.getElementById("footer").innerHTML = `<div class="row">
      <ul class="col-sm-1">
        <li class="col-sm-1">
		<a href="https://www.facebook.com/madrasafree/">
        	<img src="https://s3.amazonaws.com/codecademy-content/projects/make-a-website/lesson-4/facebook.svg"/>
        </a>
		</li>
      </ul>
	  <p class="col-sm-3">הצטרפו אלינו בפייסבוק  -  انضموا الينا على فيسبوك</p>
	  <p class="col-sm-8">נבנה ע"י רועי נחמיאס  2019 &copy;</p>
    </div>`;
	console.log("getFooter End");
}