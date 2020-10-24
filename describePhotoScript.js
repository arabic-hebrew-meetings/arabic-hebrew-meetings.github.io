var i;
var x;
var hasListener = false;

var past = [];
var cur = -1;
function getNext(){
	cur++;
	saveAction("story", "getNext", {cur: cur});
	if (cur === past.length) {
		while (true) {
        i = Math.floor(Math.random() * data.length);
        var found = false;
        for (j = 0; j < past.length; j++) {
            if (i == past[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            break;
        }
    }
    past.push(i);
	} else {
		i = past[cur];
	}
	displayContent(cur, i);	
}

function getPrev(){
	cur--;
	saveAction("story", "getPrev", {cur: cur});
	i = past[cur];
	displayContent(cur, i);	
}

function getNextButton(cur) {
	nextButton = `<a class="circle-button" onclick="getNext()" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-left my-activity-button-single"></span>
        </a>`;
	if (cur === data.length-1) {
		nextButton = `<a class="circle-button invisible" onclick="getNext()" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-left my-activity-button-single"></span>
        </a>`;	
	}	
	return nextButton;
}

function getPrevButton(cur) {
	prevButton = `<a class="circle-button" onclick="getPrev()" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-right my-activity-button-single"></span>
        </a>`;
	if (cur === 0) {
		if (x.matches) { // small screen
			prevButton = ``;
		} else {
			prevButton = `<a class="circle-button invisible" onclick="getPrev()" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-right my-activity-button-single"></span>
        </a>`;
		}
	}	
	return prevButton;
}

function displayContent(cur, i) {
	x = window.matchMedia("(max-width: 600px)")
	displayContentByWidth() // Call listener function at run time
	if (!hasListener) {
		x.addListener(displayContentByWidth) // Attach listener function on state changes
		hasListener = true;
	}
}

function displayContentByWidth() {
	nextButton = getNextButton(cur);
	prevButton = getPrevButton(cur);
	content = getContentRectWithSpecificOrder();
	displayContentAndButtons();
	displayContentBySpecificOrder(i);
}

function displayContentAndButtons() {
	if (x.matches) { // small screen
		document.getElementById("button-and-text").innerHTML = `<div class="row">` + content + `</div><div class="row">` + prevButton + nextButton + `</div>`;
	} else {
		document.getElementById("button-and-text").innerHTML =  prevButton + content + nextButton;
	}
}

function getContentRectWithSpecificOrder() {
	content = `<div class="rectangle">
                <h2 class="rtl activityContent" id="image"></h2>
            </div>`;
	return content;		
}

function displayContentBySpecificOrder(i) {
	document.getElementById("image").innerHTML = `<img src="/describePictures/`+i+data[i]+`">`
}

const data = [
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".png",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg",
".jpg"
]