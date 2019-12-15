var past = [];
function getItem(){
    if (past.length == dataJson.length) {
        past = [];
    }
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
            break
        }
    }
    past.push(i);
	document.getElementById("button-and-text").innerHTML = `<a class="btn btn-success btn-xl rtl" onclick="getItem()" role="button">
 <span class="my-activity-button-text">
		  המשיכו - كملو!
		  </span>
		  <span class="glyphicon glyphicon glyphicon glyphicon-play my-activity-button"></span>
        </a>`;
	document.getElementById("my-text-box").innerHTML = `<div class="rectangle">
                <h3 class="rtl" id="hebrewText"></h3>
		<h3 class="rtl" id="arabicText"></h3>
            </div>`;	
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