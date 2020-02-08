function getHeader(){
	console.log("getHeader Start");
	document.getElementById("header").innerHTML = `<div class="container-fluid">
  <ul class="nav navbar-nav navbar-left">
  <li><a href="index.html">מפגשי ערבית-עברית &nbsp لقاﺀات عربي-عبري</a></li>
  </ul>
    <div class="collapse navbar-collapse pull-right">
      <ul class="nav navbar-nav pull-right">
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

function getActivitiesCarousel() {
	document.getElementById("activities-carousel").innerHTML = `<div class="fade-in">
	<div class="my-square">
	<div class="my-square-content box color1">
                <div class="img-hover-zoom--brightness">
 <a href="questions.html">
  <img class="myimg" src="questions.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a href="discussions.html">
  <img class="myimg" src="debates.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square ">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a href="21questions.html">
  <img class="myimg" src="famous.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square ">
        <div class="my-square-content box color4">
		<div class="img-hover-zoom--brightness">
  <a href="story.html">
  <img class="myimg" src="story.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color5">
		<div class="img-hover-zoom--brightness">
  <a href="songs.html">
  <img class="myimg" src="songs.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color6">
		<div class="img-hover-zoom--brightness">
  <a href="countryCity.html">
  <img class="myimg" src="countryCity.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color1">
		<div class="img-hover-zoom--brightness">
  <a href="jokes.html">
  <img class="myimg" src="jokes.png">
  </a>
</div>
		</div>
    </div>
		<div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a href="picture.html">
  <img class="myimg" src="photos.png">
  </a>
</div>
		</div>
    </div>
		<div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a href="slang.html">
  <img class="myimg" src="slang.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color4">
		<div class="img-hover-zoom--brightness">
  <a href="sayings.html">
  <img class="myimg" src="sayings.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color5">
		<div class="img-hover-zoom--brightness">
  <a href="fastest.html">
  <img class="myimg" src="fastest.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color6">
		<div class="img-hover-zoom--brightness">
  <a href="truth-or-lie.html">
  <img class="myimg" src="truthorlie.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color1">
		<div class="img-hover-zoom--brightness">
  <a href="wind.html">
  <img class="myimg" src="wind.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square empty-square">
    </div>
	<div class="my-square empty-square">
    </div>
	</div>`;
}