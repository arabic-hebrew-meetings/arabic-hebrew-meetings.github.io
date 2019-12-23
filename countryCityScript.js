var past = [];
var cur = -1;
function getNext(){
	cur++;
	if (cur === past.length) {
		while (true) {
        var i = Math.floor(Math.random() * (hebrewLetters.length+arabicLetters.length));
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
		prevButton = `<a class="circle-button invisible" onclick="getPrev()" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-right my-activity-button-single"></span>
        </a>`;
	}	
	return prevButton;
}

function displayContent(cur, i) {
	nextButton = getNextButton(cur);
	prevButton = getPrevButton(cur);
	content = getContentRectWithSpecificOrder();
	console.log(content)
	document.getElementById("button-and-text").innerHTML = nextButton + content + prevButton;
	displayContentWithSpecificOrder(i);
}

function getContentRectWithSpecificOrder() {
	content = `<div class="rectangle rtl">
                <h2 class="rtl" id="language"></h2>
		<h1 class="rtl" id="letter"></h1>
		<h2><br>הקטגוריות - الفئات:</h2>
		<h2>ארץ - עיר - חי - צומח - דומם - שם - מקצוע - אישיות</h2>
		<h2>بلاد - مدينة - حيوان - نبات - جماد - اسم - مهنة - شخصية مشهورة</h2>
            </div>`;
	return content;		
}

function displayContentWithSpecificOrder(i) {
	if (i < hebrewLetters.length) {
		document.getElementById("language").innerHTML = hebrewLetterText;
		document.getElementById("letter").innerHTML = hebrewLetters[i];
	} else {
		
		document.getElementById("language").innerHTML = arabicLetterText;
		document.getElementById("letter").innerHTML = arabicLetters[i-hebrewLetters.length];
	}
}

const hebrewLetterText = "קיבלתם את האות בעברית - طلعلكم الحرف بالعبراني:"
const arabicLetterText = "קיבלתם את האות בערבית - طلعلكم الحرف بالعربي:"
const hebrewLetters = [`א`,`ב`,`ג`,`ד`,`ה`,`ו`,`ז`,`ח`,`ט`,`י`,`כ`,`ל`,`מ`,`נ`,`ס`,`ע`,`פ`,`צ`,`ק`,`ר`,`ש`,`ת`]
const arabicLetters = [`أ (א)`,`ب (ב)`,`ت (ת)`,`ث (ת')`,`ج (ג')`,`ح (ח)`,`خ (ח')`,`د (ד)`,`ذ (ד')`,`ر (ר)`,`ز (ז)`,`س (ס)`,`ش (ש)`,`ص (צ)`,`ض (צ')`,`ط (ט)`,`ظ (ט')`,`ع (ע)`,`غ (ע')`,`ف (פ)`,`ق (ק)`,`ك (כ)`,`ل (ל)`,`م (מ)`,`ن (נ)`,`ه (ה)`,`و (ו)`,`ي (י)`]
