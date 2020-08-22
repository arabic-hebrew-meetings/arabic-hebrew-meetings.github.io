var i;
var x;
var hasListener = false;

var past = [];
var cur = -1;
function getNext(){
	cur++;
	saveAction("countryCity", "getNext", {cur: cur});
	if (cur === past.length) {
		while (true) {
		i = 0;	
		if 	((cur < (hebrewLetters.length*2)) && ((cur%2) === 0)) {
			i = Math.floor(Math.random() * hebrewLetters.length);
		} else {
			i = Math.floor(Math.random() * arabicLetters.length);
			i = i + hebrewLetters.length;
		}			
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
	saveAction("countryCity", "getPrev", {cur: cur});
	i = past[cur];
	displayContent(cur, i);	
}

function getNextButton(cur) {
	nextButton = `<a class="circle-button" onclick="getNext()" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-left my-activity-button-single"></span>
        </a>`;
	if (cur === (hebrewLetters.length+arabicLetters.length-1)) {
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
	content = `<div class="rectangle rtl">
                <h2 class="rtl activityContent" id="language1"></h2>
				<h2 class="rtl activityContent" id="language2"></h2>
		<h1 class="rtl" id="letter"></h1>
		<h2 class="rtl activityContent"><br>הקטגוריות - الفئات:</h2>
		<h2 class="rtl activityContent">ארץ - עיר - חי - צומח - דומם - שם - מקצוע - אישיות</h2>
		<h2 class="rtl activityContent">بلاد - مدينة - حيوان - نبات - جماد - اسم - مهنة - شخصية مشهورة</h2>
            </div>`;
	return content;		
}

function displayContentBySpecificOrder(i) {
	if (i < hebrewLetters.length) {
		document.getElementById("language1").innerHTML = hebrewLetterText1;
		document.getElementById("language2").innerHTML = hebrewLetterText2;
		document.getElementById("letter").innerHTML = hebrewLetters[i];
	} else {
		
		document.getElementById("language1").innerHTML = arabicLetterText1;
		document.getElementById("language2").innerHTML = arabicLetterText2;
		document.getElementById("letter").innerHTML = arabicLetters[i-hebrewLetters.length];
	}
}

const hebrewLetterText1 = "קיבלתם את האות בעברית:"
const hebrewLetterText2 = "طلعلكم الحرف بالعبراني:"
const arabicLetterText1 = "קיבלתם את האות בערבית:"
const arabicLetterText2 = "طلعلكم الحرف بالعربي:"
const hebrewLetters = [`א`,`ב`,`ג`,`ד`,`ה`,`ו`,`ז`,`ח`,`ט`,`י`,`כ`,`ל`,`מ`,`נ`,`ס`,`ע`,`פ`,`צ`,`ק`,`ר`,`ש`,`ת`]
const arabicLetters = [`أ (א)`,`ب (ב)`,`ت (ת)`,`ث (ת')`,`ج (ג')`,`ح (ח)`,`خ (ח')`,`د (ד)`,`ذ (ד')`,`ر (ר)`,`ز (ז)`,`س (ס)`,`ش (ש)`,`ص (צ)`,`ض (צ')`,`ط (ט)`,`ظ (ט')`,`ع (ע)`,`غ (ע')`,`ف (פ)`,`ق (ק)`,`ك (כ)`,`ل (ל)`,`م (מ)`,`ن (נ)`,`ه (ה)`,`و (ו)`,`ي (י)`]
