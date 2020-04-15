var past = [];
var cur = -1;
function getNext(){
	cur++;
	saveAction("fastest", "getNext", {cur: cur});
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
	saveAction("fastest", "getPrev", {cur: cur});
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
    "Hebrew": "רומיאו ויוליה",
    "Arabic": "روميو وجولييت"
  },
  {
    "Hebrew": "צרפת",
    "Arabic": "فرنسا"
  },
  {
    "Hebrew": "כנאפה",
    "Arabic": "كنافة"
  },
  {
    "Hebrew": "מאדים",
    "Arabic": "المريخ"
  },
  {
    "Hebrew": "רמדאן",
    "Arabic": "رمضان"
  },
  {
    "Hebrew": "סלפי",
    "Arabic": "سيلفي"
  },
  {
    "Hebrew": "אלוהים",
    "Arabic": "الله"
  },
  {
    "Hebrew": "חנוכה",
    "Arabic": "عيد الحانوكّا"
  },
  {
    "Hebrew": "אייפון",
    "Arabic": "آي فون"
  },
  {
    "Hebrew": "פוקימון",
    "Arabic": "بوكيمون"
  },
  {
    "Hebrew": "ריאל מדריד",
    "Arabic": "ريال مدريد"
  },
  {
    "Hebrew": "פלאפל",
    "Arabic": "فلافل"
  },
  {
    "Hebrew": "האולימפיאדה",
    "Arabic": "الألعاب الأولمبية"
  },
  {
    "Hebrew": "קוקה קולה",
    "Arabic": "كوكا كولا"
  },
  {
    "Hebrew": "אופניים",
    "Arabic": "دراجة هوائية"
  },
  {
    "Hebrew": "סושי",
    "Arabic": "سوشي"
  },
  {
    "Hebrew": "אייל גולן",
    "Arabic": "ايال غولان"
  },
  {
    "Hebrew": "פסנתר",
    "Arabic": "بيانو"
  },
  {
    "Hebrew": "מגדל אייפל",
    "Arabic": "برج ايفل"
  },
  {
    "Hebrew": "מקדונלדס",
    "Arabic": "ماكدونالدز"
  },
  {
    "Hebrew": "ריהאנה",
    "Arabic": "ريانا"
  },
  {
    "Hebrew": "פלייסטיישן",
    "Arabic": "بلايستيشن"
  },
  {
    "Hebrew": "העיר מכה",
    "Arabic": "مكا"
  },
  {
    "Hebrew": "אדידס",
    "Arabic": "أديداس"
  },
  {
    "Hebrew": "במבה",
    "Arabic": "بمبا (اكل)"
  },
  {
    "Hebrew": "וואטסאפ",
    "Arabic": "واتساب"
  },
  {
    "Hebrew": "ניו יורק",
    "Arabic": "نيويورك"
  },
  {
    "Hebrew": "בוב ספוג",
    "Arabic": "سبونج بوب"
  },
  {
    "Hebrew": "גוגל",
    "Arabic": "جوجل"
  },
  {
    "Hebrew": "מיקי מאוס",
    "Arabic": "ميكي ماوس"
  },
  {
    "Hebrew": "יוטיוב",
    "Arabic": "يوتيوب"
  },
  {
    "Hebrew": "אם.טי.וי",
    "Arabic": "ام تي في"
  },
  {
    "Hebrew": "אדם וחווה",
    "Arabic": "أدم وحواء"
  },
  {
    "Hebrew": "אום כולתום",
    "Arabic": "ام كلثوم"
  },
  {
    "Hebrew": "פייסבוק",
    "Arabic": "فيسبوك"
  },
  {
    "Hebrew": "משחקי הכס",
    "Arabic": "صراع العروش"
  },
  {
    "Hebrew": "התורה",
    "Arabic": "التوراة"
  },
  {
    "Hebrew": "סנטה קלאוס",
    "Arabic": "بابا نويل (سانتا كلوز)"
  },
  {
    "Hebrew": "הארי פוטר",
    "Arabic": "هاري بوتر"
  },
  {
    "Hebrew": "תל אביב",
    "Arabic": "تل ابيب"
  },
  {
    "Hebrew": "כדורסל",
    "Arabic": "كرة السلة"
  },
  {
    "Hebrew": "פיצה",
    "Arabic": "بيتزا"
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
    "Hebrew": "איקאה",
    "Arabic": "ايكيا"
  }
]
const data = JSON.parse(JSON.stringify(dataJson))