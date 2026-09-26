
function getQueryParamByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
    <div>
        <a class="btn btn-success btn-xl rtl two-options socialGroupButton whatsappButton" onClick="window.open('https://wa.me/972557291206', '_blank');" role="button">
        <span class="mySocialGroupButtonText">
            שלחו לנו הודעה<br>דרך וואטסאפ
        </span>
        </a>
        <a class="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton" onClick="window.open('https://m.me/nifgashim.ledaber', '_blank');" role="button">
        <span class="mySocialGroupButtonText">
            שלחו לנו הודעה<br>דרך פייסבוק
        </span>
        </a>
    </div>
    <br>
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
    <div>
        <a class="btn btn-success btn-xl rtl two-options socialGroupButton whatsappButton" onClick="window.open('https://wa.me/972557291206', '_blank');" role="button">
        <span class="mySocialGroupButtonText">
            ابعتولنا رسالة<br>على واتس اب
        </span>
        </a>
        <a class="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton" onClick="window.open('https://m.me/nifgashim.ledaber', '_blank');" role="button">
        <span class="mySocialGroupButtonText">
            ابعتولنا رسالة<br>على فيسبوك
        </span>
        </a>
    </div>
    <br>
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
