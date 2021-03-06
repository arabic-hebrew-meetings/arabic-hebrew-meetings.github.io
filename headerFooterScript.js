
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
	writeCookie('sessionId',guid(),365);
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
    if (page == "homepage") {
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
                document.getElementById('form_place').innerHTML = `
                <h3>תודה! شكرا!</h3>
                <button type="button" onclick="handleFeedback('homepage', 'displayForm')">Back</button>
                `;
            } else if (!nameNotEmpty && !contentNotEmpty) {
                alert("בבקשה מלאו את שמכם ואת תוכן ההודעה"); 
            } else if (!contentNotEmpty) {
                alert("בבקשה מלאו את תוכן ההודעה"); 
            } else if (!nameNotEmpty) {
                alert("בבקשה מלאו את שמכם"); 
            }
        } else if (action == "displayForm") {
            document.getElementById('form_place').innerHTML = `
            <form name="feedback" onsubmit="handleFeedback('homepage', 'send'); return false;">
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

function isNotSpam(content) {
    if (content != null && content.includes("http://bit.ly/") && content.includes("traffic")) {
        return false;
    } else {
        return true;
    }
}

