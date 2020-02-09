function getHeader(){
	console.log("getHeader Start");
	document.getElementById("header").innerHTML = `  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.html">מפגשי ערבית-עברית &nbsp لقاﺀات عربي-عبري</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown rtl">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">פעילויות &nbsp فعاليات <b class="caret"></b></a>
          <ul class="dropdown-menu dropdown-menu-right" style="text-align: right">
            <li><a href="questions.html">שואלים אחד את השני  -   منسأل بعض</a></li>
		  <li><a href="discussions.html">מועדון דיבייט  -   نادي النقاش</a></li>
		  <li><a href="21questions.html">מפורסמים  -  مشاهير</a></li>
		  <li><a href="story.html">בונים ביחד סיפור  -  نبني مع بعض قصة</a></li>
		  <li><a href="songs.html">שירים - اغاني</a></li>
          <li><a href="countryCity.html">ארץ עיר  -   إنسان حيوان نبات</a></li>
		  <li><a href="jokes.html">בדיחות  -  نكت</a></li>
		  <li><a href="picture.html">היכרות בעזרת תמונות - تعارف عن طريق الصور</a></li>
		  <li><a href="slang.html">סלנג - مصطلحات عامية</a></li>
		  <li><a href="sayings.html">פתגמים  -  امثال</a></li>
          <li><a href="fastest.html">הזוג הכי מהיר  -   أسرع اثنين</a></li>
          <li><a href="truth-or-lie.html">אמת או שקר  -  صدق او كذب</a></li>
		  <li><a href="wind.html">הרוח נושבת  -  تهب الريح</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div>`;
	console.log("getHeader End");
}

function getFooter(){
	console.log("getFooter Start");
	document.getElementById("footer").innerHTML = `נבנה ע"י רועי נחמיאס  2016-2020 &copy;`;
	console.log("getFooter End");
}

function getStartActivity() {
	document.getElementById("start-activity").innerHTML = `<div class="activity-content" id="button-and-text">
        <a class="btn btn-success btn-xl rtl" onclick="getNext()" role="button">
 <span class="my-activity-button-text">
		  התחילו - بلشو!
		  </span>
		  <span class="glyphicon glyphicon-play my-activity-button"></span>
        </a>
		</div>`;
}
