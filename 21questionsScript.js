var past = [];
var cur = -1;
function getNext(){
	cur++;
	if (cur === past.length) {
		while (true) {
        var i = Math.floor(Math.random() * dataJson.length);
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
	if (cur === dataJson.length-1) {
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
	document.getElementById("button-and-text").innerHTML = nextButton + content + prevButton;
	displayContentBySpecificOrder(i);
}

function getContentRectWithSpecificOrder() {
	content = `<div class="rectangle">
                <h2 class="rtl" id="hebrewText"></h2>
		<h2 class="rtl" id="arabicText"></h2>
            </div>`;
	return content;		
}

function displayContentBySpecificOrder(i) {
	document.getElementById("hebrewText").innerHTML = data[i].Hebrew;
	document.getElementById("arabicText").innerHTML = data[i].Arabic;
}

const dataJson = [
  {
    "Hebrew": "אייל גולן",
    "Arabic": "ايال غولان"
  },
  {
    "Hebrew": "ריהאנה",
    "Arabic": "ريانا"
  },
  {
    "Hebrew": "פיירוז",
    "Arabic": "فيروز"
  },
  {
    "Hebrew": "הארי פוטר",
    "Arabic": "هاري بوتر"
  },
  {
    "Hebrew": "דונלד טראמפ",
    "Arabic": "دونالد ترامب"
  },
  {
    "Hebrew": "כריסטיאנו רונאלדו",
    "Arabic": "كريستيانو رونالدو"
  },
  {
    "Hebrew": "מוחמד עלי",
    "Arabic": "محمد علي"
  },
  {
    "Hebrew": "גל גדות",
    "Arabic": "غال غادوت"
  },
  {
    "Hebrew": "מארק צוקרברג",
    "Arabic": "مارك زوكربيرغ"
  },
  {
    "Hebrew": "ישו",
    "Arabic": "عيسى بن مريم"
  },
  {
    "Hebrew": "ג׳סטין ביבר",
    "Arabic": "جاستن بيبر"
  },
  {
    "Hebrew": "אלברט איינשטיין",
    "Arabic": "ألبرت أينشتاين"
  },
  {
    "Hebrew": "ברק אובמה",
    "Arabic": "باراك أوباما"
  },
  {
    "Hebrew": "אנג׳לינה ג׳ולי",
    "Arabic": "أنجلينا جولي"
  },
  {
    "Hebrew": "וולפגנג אמדיאוס מוצארט",
    "Arabic": "فولفغانغ أماديوس موزارت"
  },
  {
    "Hebrew": "אלביס פרסלי",
    "Arabic": "إلفيس بريسلي"
  },
  {
    "Hebrew": "ג׳יימס בונד",
    "Arabic": "جيمس بوند"
  },
  {
    "Hebrew": "קים קרדשיאן",
    "Arabic": "كيم كردشيان"
  },
  {
    "Hebrew": "המונה ליזה",
    "Arabic": "موناليزا"
  },
  {
    "Hebrew": "אמינם",
    "Arabic": "إمينيم"
  },
  {
    "Hebrew": "טום קרוז",
    "Arabic": "توم كروز"
  },
  {
    "Hebrew": "ויליאם שייקספיר",
    "Arabic": "وليم شكسبير"
  },
  {
    "Hebrew": "שרלוק הולמס",
    "Arabic": "شرلوك هولمز"
  },
  {
    "Hebrew": "בוב ספוג",
    "Arabic": "سبونج بوب"
  }
]
const data = JSON.parse(JSON.stringify(dataJson))