
function saveAction(sessionId, siteLocation, action){
	console.log("saveAction");
	console.log(sessionId);
	console.log(siteLocation);
	console.log(action);

            $.ajax({
            url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc80anqYMA0tJUUe6VTZ6AqIWT5METAW_by6iZaw0XrVsCLJQ/formResponse",
            data: {
				"entry.354079520": sessionId,
				"entry.1032780145": siteLocation,
				"entry.1729768685": action
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
	console.log("createSessionId");
	console.log(readCookie('sessionId'));
	var sessionId = guid();
	console.log(sessionId);
	writeCookie('sessionId',guid(),365);
	console.log(readCookie('sessionId'));
	console.log(sessionId);
}

function getSessionId() {
	console.log("getSessionId");
	var sessionId = readCookie('sessionId');
	if (sessionId=="") {
		createSessionId();
	}
	sessionId = readCookie('sessionId');
	console.log(sessionId);
	return sessionId;
}

function writeCookie(name,value,days) {
	console.log("writeCookie");
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
	console.log(name);
	console.log(value);
	console.log(date);
	console.log(expires);
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	console.log("readCookie");
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
	console.log(nameEQ);
	console.log(ca);
    for(i=0;i < ca.length;i++) {
        c = ca[i];
		console.log(i);
		console.log(c);
        while (c.charAt(0)==' ') {
			console.log("while");
			console.log(c.length);
            c = c.substring(1,c.length);
			console.log(c)
        }
        if (c.indexOf(nameEQ) == 0) {
			console.log("if")
			console.log(nameEQ.length)
			console.log(c.length)
            return c.substring(nameEQ.length,c.length);
        }
    }
	console.log("finish for")
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

