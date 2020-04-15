function getHeader(page){
	saveAction(page, "open_page");
	document.getElementById("header").innerHTML = `  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" onclick='openUrl("`+page+`", "header", "index.html")'>מפגשי ערבית-עברית &nbsp لقاﺀات عربي-عبري</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown rtl">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">פעילויות &nbsp فعاليات <b class="caret"></b></a>
          <ul class="dropdown-menu dropdown-menu-right" style="text-align: right">
            <li><a onclick='openUrl("`+page+`", "header", "questions.html")'>שואלים אחד את השני  -   منسأل بعض</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "discussions.html")'>מועדון דיבייט  -   نادي النقاش</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "21questions.html")'>מפורסמים  -  مشاهير</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "story.html")'>בונים ביחד סיפור  -  نبني مع بعض قصة</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "songs.html")'>שירים - اغاني</a></li>
          <li><a onclick='openUrl("`+page+`", "header", "countryCity.html")'>ארץ עיר  -   إنسان حيوان نبات</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "jokes.html")'>בדיחות  -  نكت</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "picture.html")'>היכרות בעזרת תמונות - تعارف عن طريق الصور</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "slang.html")'>סלנג - مصطلحات عامية</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "sayings.html")'>פתגמים  -  امثال</a></li>
          <li><a onclick='openUrl("`+page+`", "header", "fastest.html")'>הזוג הכי מהיר  -   أسرع اثنين</a></li>
          <li><a onclick='openUrl("`+page+`", "header", "truth-or-lie.html")'>אמת או שקר  -  صدق او كذب</a></li>
		  <li><a onclick='openUrl("`+page+`", "header", "wind.html")'>הרוח נושבת  -  تهب الريح</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div>`;
}

function getFooter(){
	document.getElementById("footer").innerHTML = `נבנה ע"י רועי נחמיאס  2020-2016 &copy;`;
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

function saveAction(siteLocation, action, params){
	var paramsStr = "";
	if (params != null) {
		paramsStr = JSON.stringify(params);
	}
	var sessionId = getSessionId();
            $.ajax({
            url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc80anqYMA0tJUUe6VTZ6AqIWT5METAW_by6iZaw0XrVsCLJQ/formResponse",
            data: {
				"entry.354079520": sessionId,
				"entry.1032780145": siteLocation,
				"entry.1729768685": action,
				"entry.579761647": paramsStr
				},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function() {
                    //Success message
                },
                200: function() {
                    //Success Message
                }
            }
        });
}

function createSessionId() {
	writeCookie('sessionId',guid(),365);
}

function getSessionId() {
	var sessionId = readCookie('sessionId');
	if (sessionId=="") {
		createSessionId();
	}
	sessionId = readCookie('sessionId');
	return sessionId;
}

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

//generates random id;
let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa', for example "c2181edf-041b-0a61-3651-79d671fa3db7"
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function openUrl(siteLocation, locationOnPage, url) {
	console.log("openUrl");
	console.log(siteLocation)
	console.log(url)
	saveAction(siteLocation, "open_url", {url: url, locationOnPage: locationOnPage});
	location.href= url;
}


