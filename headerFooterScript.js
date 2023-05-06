
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

function getNewStartActivity() {
	document.getElementById("start-activity").innerHTML = `<div class="activity-content rtl" id="button-and-text">
		<a class="btn btn-info btn-xl rtl two-options" onclick="getNext()" role="button">
 <span class="my-activity-button-text">
		  התחילו - بلشو!
		  </span>
		  <span class="glyphicon glyphicon-play my-activity-button"></span>
        </a>
		<a id="detailsBtn" class="btn btn-danger btn-xl rtl two-options" role="button">
 <span class="my-activity-button-text">
		  הסבר - شرح
		  </span>
		  <span class="glyphicon glyphicon-info-sign my-activity-button"></span>
        </a>
		</div>`;
	makeButtonWidthEqual();
	scrollToDetails();
}

function saveAction(siteLocation, action, params){
	doSaveAction(siteLocation, action, params, true, true);
}

function doSaveAction(siteLocation, action, params, createNewSessionIfNeeded, saveAlsoAnonymous){
	var paramsStr = "";
	if (params != null) {
		paramsStr = JSON.stringify(params);
	}
	var sessionId = getSessionId(siteLocation, createNewSessionIfNeeded);
	if (sessionId == "") {
		sessionId = "anonymous";
	}
	if (sessionId != "anonymous" || saveAlsoAnonymous) {
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
}

function saveMeetingEntry(nativeLanguage, level, languageInRoom, roomNumber, roomType, sourceKey, meetingDate){
	var sessionId = getSessionId("meetings", true);
	if (sessionId == "") {
		sessionId = "anonymous";
	}
            $.ajax({
            url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfWguAsBgnb3a3s4P7JLzWwXWFZnP82nXbMddmjr_QugOqw8Q/formResponse",
            data: {
				"entry.354079520": sessionId,
				"entry.1032780145": nativeLanguage,
				"entry.1729768685": level,
				"entry.579761647": languageInRoom,
				"entry.1804344661": roomNumber,
				"entry.358084798": roomType,
                "entry.12017553": sourceKey,
                "entry.366684760": meetingDate
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

function createSessionId(siteLocation) {
	writeCookie('sessionId',guid(),1000);
	doSaveAction(siteLocation, "new_user", null, false, false);
}

function getSessionId(siteLocation, createNewSessionIfNeeded) {
	var sessionId = readCookie('sessionId');
	if (createNewSessionIfNeeded && sessionId=="") {
		createSessionId(siteLocation);
		sessionId = readCookie('sessionId');
	}
	if (sessionId == "") {
		sessionId = "anonymous";
	}
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

function eraseCookie(name) {
    writeCookie(name,"",-1);
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
	//saveAction(siteLocation, "open_url", {url: url, locationOnPage: locationOnPage});
	location.href= url;
}

function makeButtonWidthEqual() {
	let maxWidth = 0;

$('.btn').each(function(){
 const width = parseFloat($(this).css('width'));
 if(width > maxWidth) {maxWidth = width}
})

$('.btn').css('width', maxWidth +'px');
}

function scrollToDetails() {
	var btn = document.getElementById("detailsBtn");
	btn.onclick = function() {
    $('html,body').animate({
        scrollTop: $(".details").offset().top-70},
        'slow');
};
}

function getQueryParamByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function handleFeedback(page, action) {
    if (page == "homepage" || page == "meetings") {
        if (action == "send") {
            feedbackName = document.getElementById('feeback_name').value;
            feedbackContent = document.getElementById('feedback_content').value;
            nameNotEmpty = feedbackName && feedbackName.trim();
            contentNotEmpty = feedbackContent && feedbackContent.trim();
            if (nameNotEmpty && contentNotEmpty && isNotSpam(feedbackContent)) {
                // convert text from multiline to singe line because google forms support single line for each input
                var feedbackName = feedbackName.replace(/\r/g, " . ").replace(/\n/g, " . ");
                var feedbackContent = feedbackContent.replace(/\r/g, " . ").replace(/\n/g, " . ");
                var sessionId = getSessionId(page, true);
                if (sessionId == "") {
                    sessionId = "anonymous";
                }
                $.ajax({
                    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfy9Cenad7cEtTJ2p9ebx-5Je2yYAPL3OSTmAyH6zXtLJgmEA/formResponse",
                    data: {
                        "entry.354079520": feedbackName,
                        "entry.1032780145": feedbackContent
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
                saveAction(page, "success_sending_feedback", {name: feedbackName, content: feedbackContent});
                document.getElementById('form_place').innerHTML = `
                <h3>תודה! شكرا!</h3>
                <button type="button" onclick="handleFeedback('`+page+`', 'displayForm')">Back</button>
                `;
            } else if (!nameNotEmpty && !contentNotEmpty) {
                saveAction(page, "error_sending_feedback", {error: "name empty AND content empty"});
                alert("בבקשה מלאו את שמכם ואת תוכן ההודעה"); 
            } else if (!contentNotEmpty) {
                saveAction(page, "error_sending_feedback", {error: "content empty", name: feedbackName});
                alert("בבקשה מלאו את תוכן ההודעה"); 
            } else if (!nameNotEmpty) {
                saveAction(page, "error_sending_feedback", {error: "name empty", content: feedbackContent});
                alert("בבקשה מלאו את שמכם"); 
            }
        } else if (action == "displayForm") {
            document.getElementById('form_place').innerHTML = `
            <form name="feedback" onsubmit="handleFeedback('`+page+`', 'send'); return false;">
		    שם:<br>
		    <input class="form__email" type="text" placeholder="" name="feeback_name" id="feeback_name" required="" /><br>
		    תוכן ההודעה:<br>
		    <textarea class="form__message" cols="30" type="text" placeholder="" name="feedback_content" id="feedback_content" required="" rows="5"></textarea><br>
		    <button class="form__submit">Submit</button><br>
		  </form>
            `;
        }
    }
}

function handleMarkedSessionDetails(page, action, userLang) {
    if (page == "meetings") {
        if (action == "send") {
            markedFacebook = document.getElementById('marked_facebook_name').value;
            markedPhone = document.getElementById('marked_phone_number').value;
            markedFbNotEmpty = markedFacebook && markedFacebook.trim();
            markedPhoneNotEmpty = markedPhone && markedPhone.trim();
            if (markedFbNotEmpty && markedPhoneNotEmpty) {
                // convert text from multiline to singe line because google forms support single line for each input
                var markedFacebook = markedFacebook.replace(/\r/g, " . ").replace(/\n/g, " . ");
                var markedPhone = markedPhone.replace(/\r/g, " . ").replace(/\n/g, " . ");
                var sessionId = getSessionId(page, true);
                if (sessionId == "") {
                    sessionId = "anonymous";
                }
                $.ajax({
                    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfy9Cenad7cEtTJ2p9ebx-5Je2yYAPL3OSTmAyH6zXtLJgmEA/formResponse",
                    data: {
                        "entry.354079520": markedFacebook,
                        "entry.1032780145": markedPhone
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
                saveAction(page, "marked_session_success_send_details", {markedFacebookName: markedFacebook, markedPhoneNumber: markedPhone});
                startSpinner("marked_form");
                setTimeout(finishMarkedSend, 1000, page, userLang);
                
            } else if (!markedFbNotEmpty && !markedPhoneNotEmpty) {
                saveAction(page, "marked_session_error_send_details", {error: "marked facebook empty AND marked phone empty"});
                if (userLang == "Hebrew") {
                    alert("כתבו את השם שלכם בפייסבוק ואת מספר הטלפון שלכם"); 
                } else {
                    alert("اكتبوا اسمكم بالفيسبوك ورقم التلفون تبعكم"); 
                }
            } else if (!markedPhoneNotEmpty) {
                saveAction(page, "marked_session_error_send_details", {error: "marked phone empty", markedFacebookName: markedFacebook});
                if (userLang == "Hebrew") {
                    alert("כתבו את מספר הטלפון שלכם"); 
                } else {
                    alert("اكتبوا رقم التلفون تبعكم"); 
                }
            } else if (!markedFbNotEmpty) {
                saveAction(page, "marked_session_error_send_details", {error: "marked facebook empty", markedPhoneNumber: markedPhone});
                if (userLang == "Hebrew") {
                    alert("כתבו את השם שלכם בפייסבוק"); 
                } else {
                    alert("اكتبوا اسمكم بالفيسبوك"); 
                }
            }
        } else if (action == "displayForm") {
            if (userLang == "Hebrew") {
                document.getElementById('marked_form').innerHTML = `
            <form name="feedback" onsubmit="handleMarkedSessionDetails('`+page+`', 'send', '`+userLang+`'); return false;">
		    כתבו את השם שלכם בפייסבוק:<br>
		    <input class="form__email marked-form-field" type="text" placeholder="" name="marked_facebook_name" id="marked_facebook_name" required="" /><br>
		    כתבו את מספר הטלפון שלכם:<br>
            <input class="form__email marked-form-field" type="text" placeholder="" name="marked_phone_number" id="marked_phone_number" required="" /><br>
		    <button class="form__submit marked-form-submit">Submit</button><br>
		  </form>
            `;
            } else {
                document.getElementById('marked_form').innerHTML = `
            <form name="feedback" onsubmit="handleMarkedSessionDetails('`+page+`', 'send', '`+userLang+`'); return false;">
		    اكتبوا اسمكم بالفيسبوك:<br>
		    <input class="form__email marked-form-field" type="text" placeholder="" name="marked_facebook_name" id="marked_facebook_name" required="" /><br>
		    اكتبوا رقم التلفون تبعكم:<br>
            <input class="form__email marked-form-field" type="text" placeholder="" name="marked_phone_number" id="marked_phone_number" required="" /><br>
		    <button class="form__submit marked-form-submit">Submit</button><br>
		  </form>
            `;
            }
        }
    }
}

function finishMarkedSend(page, userLang) {
    finishSpinner("marked_form");  
    if (userLang == "Hebrew") {
        document.getElementById('marked_form').innerHTML = `
    <form name="feedback" onsubmit="handleMarkedSessionDetails('`+page+`', 'send', '`+userLang+`'); return false;">
    כתבו את השם שלכם בפייסבוק:<br>
    <input class="form__email marked-form-field" type="text" placeholder="" name="marked_facebook_name" id="marked_facebook_name" required="" /><br>
    כתבו את מספר הטלפון שלכם:<br>
    <input class="form__email marked-form-field" type="text" placeholder="" name="marked_phone_number" id="marked_phone_number" required="" /><br>
    <button class="form__submit marked-form-submit">Submit</button><br>
    <div class="marked-error">
        <span class="glyphicon glyphicon-remove-sign marked-error-icon"></span>
        פרטים לא נכונים
    </div>
  </form>
    `;
    } else {
        document.getElementById('marked_form').innerHTML = `
    <form name="feedback" onsubmit="handleMarkedSessionDetails('`+page+`', 'send', '`+userLang+`'); return false;">
    اكتبوا اسمكم بالفيسبوك:<br>
    <input class="form__email marked-form-field" type="text" placeholder="" name="marked_facebook_name" id="marked_facebook_name" required="" /><br>
    اكتبوا رقم التلفون تبعكم:<br>
    <input class="form__email marked-form-field" type="text" placeholder="" name="marked_phone_number" id="marked_phone_number" required="" /><br>
    <button class="form__submit marked-form-submit">Submit</button><br>
    <div class="marked-error">
        <span class="glyphicon glyphicon-remove-sign marked-error-icon"></span>
        تفاصيل مش صحيحة
    </div>
  </form>
    `;
    }
    //  if (userLang == "Hebrew") {
    //     alert("כתבו את השם שלכם בפייסבוק ואת מספר הטלפון שלכם"); 
    // } else {
    //     alert("اكتبوا اسمكم بالفيسبوك ورقم التلفون تبعكم"); 
    // }
}

function startSpinner(elementId) {
	if (elementId == "my_spinner_countdown") {
		document.getElementById(elementId).innerHTML = `
			<svg class="spinner" viewBox="0 0 50 50">
				<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
			</svg>
		`;
	}
	if (elementId == "my_spinner_groups") {
		document.getElementById(elementId).innerHTML = `
			<svg class="spinner spinner_groups" viewBox="0 0 50 50">
				<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
			</svg>
		`;
		var optionsHeadline = document.getElementById("optionsHeadline");
		if (optionsHeadline.style.visibility=="visible") {
			updateSpinnerTop("65%");
		} else {
			updateSpinnerTop("70%");
		}
	}
    if (elementId == "marked_form") {
        document.getElementById(elementId).innerHTML = `
			<svg class="spinner" viewBox="0 0 50 50">
				<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
			</svg>
		`;
        updateSpinnerTop("40%");
    }
}

function updateSpinnerTop(topAttribute) {
	document.querySelector(".spinner").style.top = topAttribute;
}

function finishSpinner(elementId) {
	document.getElementById(elementId).innerHTML = ``;
}

function isNotSpam(content) {
    if (content != null && content.includes("http://bit.ly/") && content.includes("traffic")) {
        return false;
    } else {
        return true;
    }
}

function getActivitiesCarouselByPage(page) {
	document.getElementById("activities-carousel").innerHTML = `<div class="fade-in">
	<div class="my-square">
	<div class="my-square-content box color1">
                <div class="img-hover-zoom--brightness">
 <a onclick='openUrl("`+page+`", "carousel", "questions.html")'>
  <img class="myimg" src="questions.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "describePhoto.html")'>
  <img class="myimg" src="describePhoto-new.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "three.html")'>
  <img class="myimg" src="three-new.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color4">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "discussions.html")'>
  <img class="myimg" src="debates.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square ">
        <div class="my-square-content box color5">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "21questions.html")'>
  <img class="myimg" src="famous.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square ">
        <div class="my-square-content box color6">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "story.html")'>
  <img class="myimg" src="story.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color1">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "songs.html")'>
  <img class="myimg" src="songs.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "countryCity.html")'>
  <img class="myimg" src="countryCity.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "jokes.html")'>
  <img class="myimg" src="jokes.png">
  </a>
</div>
		</div>
    </div>
		<div class="my-square">
        <div class="my-square-content box color4">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "picture.html")'>
  <img class="myimg" src="photos.png">
  </a>
</div>
		</div>
    </div>
		<div class="my-square">
        <div class="my-square-content box color5">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "slang.html")'>
  <img class="myimg" src="slang.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color6">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "sayings.html")'>
  <img class="myimg" src="sayings.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color1">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "fastest.html")'>
  <img class="myimg" src="fastest.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "truth-or-lie.html")'>
  <img class="myimg" src="truthorlie.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("`+page+`", "carousel", "wind.html")'>
  <img class="myimg" src="wind.png">
  </a>
</div>
		</div>
    </div>
    <!-- you need to fill the last row with empty squares like this <div class="my-square empty-square"> </div> -->
	</div>
	<div class="container-fluid"><!-- /just for margin from the footer -->
  </div>`;
  if (page != "meetings") {
    saveAction(page, page+"_page_open", null);
  }
}	
