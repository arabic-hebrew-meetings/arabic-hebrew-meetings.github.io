function getHeader(){
	console.log("getHeader Start");
	document.getElementById("header").innerHTML = `<div class="container-fluid">
  <ul class="nav navbar-nav navbar-left">
  <li><a href="phrases.html">שיחון &nbsp عبارات شائعة</a></li>
  </ul>
    <div class="navbar-header pull-right">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="navbar-brand active">מפגשי ערבית עברית</div>
    </div>
    <div class="collapse navbar-collapse pull-right">
      <ul class="nav navbar-nav pull-right">
        <li class="dropdown rtl">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">פעילויות &nbsp فعاليات <b class="caret"></b></a>
          <ul class="dropdown-menu dropdown-menu-right" style="text-align: right">
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
		<li><a href="index.html">בית &nbsp بيت</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div>`;
	console.log("getHeader End");
}

function getFooter(){
	console.log("getFooter Start");
	document.getElementById("footer").innerHTML = `<div class="row">
  <figure class="col-sm-4">
	  </figure>
	  <figure class="col-sm-4">
	  <p>נבנה ע"י רועי נחמיאס  2019 &copy;</p>
	  </figure>
	  <figure class="col-sm-4">
	  </figure>
    </div>`;
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