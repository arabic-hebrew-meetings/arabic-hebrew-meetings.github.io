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
        <h3 class="rtl" id="taatikText"></h3>
            </div>`;	
	document.getElementById("hebrewText").innerHTML = data[i].Hebrew;
	document.getElementById("arabicText").innerHTML = data[i].Arabic;
	document.getElementById("taatikText").innerHTML = data[i].Taatik;
}

const dataJson = [
  {
    "Hebrew": "מפלצת",
    "Arabic": "غولة",
    "Taatik": "ע'ולה"
  },
  {
    "Hebrew": "ג׳ירפה",
    "Arabic": "زرافة",
    "Taatik": "זראפה"
  },
  {
    "Hebrew": "קסם",
    "Arabic": "سحر",
    "Taatik": "סחר"
  },
  {
    "Hebrew": "ספר (במספרה)",
    "Arabic": "حلّاق",
    "Taatik": "חלאק"
  },
  {
    "Hebrew": "עוגה",
    "Arabic": "كعكه",
    "Taatik": "כעכה"
  },
  {
    "Hebrew": "אגדה",
    "Arabic": "اسطورة",
    "Taatik": "אסטורה"
  },
  {
    "Hebrew": "בית חולים",
    "Arabic": "مستشفى",
    "Taatik": "מסתשפא"
  },
  {
    "Hebrew": "חייזר",
    "Arabic": "مخلوق فدائي",
    "Taatik": "מח'לוק פדאאי"
  },
  {
    "Hebrew": "להקה",
    "Arabic": "فرقة",
    "Taatik": "פרקה"
  },
  {
    "Hebrew": "אי",
    "Arabic": "جزيرة",
    "Taatik": "ג'זירה"
  },
  {
    "Hebrew": "קפץ",
    "Arabic": "نطّ",
    "Taatik": "נט"
  },
  {
    "Hebrew": "אוצר",
    "Arabic": "كنز",
    "Taatik": "כנז"
  },
  {
    "Hebrew": "רקדנית בטן",
    "Arabic": "رقّاصة شرقيّة",
    "Taatik": "רקאצה שרקיה"
  },
  {
    "Hebrew": "כפר",
    "Arabic": "قرية",
    "Taatik": "קריה"
  },
  {
    "Hebrew": "בלונדיני",
    "Arabic": "اشقر",
    "Taatik": "אשקר"
  },
  {
    "Hebrew": "תחרות",
    "Arabic": "منافسة",
    "Taatik": "מנאפסה"
  },
  {
    "Hebrew": "בדיחה",
    "Arabic": "نكتة",
    "Taatik": "נכתה"
  },
  {
    "Hebrew": "פסטיבל",
    "Arabic": "مهرجان",
    "Taatik": "מהרג'אנ"
  },
  {
    "Hebrew": "שיכור",
    "Arabic": "سكران",
    "Taatik": "סכראנ"
  },
  {
    "Hebrew": "שמלה",
    "Arabic": "فستان",
    "Taatik": "פסתאנ"
  },
  {
    "Hebrew": "סירה",
    "Arabic": "قارب",
    "Taatik": "קארב"
  },
  {
    "Hebrew": "נולד",
    "Arabic": "انولد",
    "Taatik": "אנולד"
  },
  {
    "Hebrew": "שוד",
    "Arabic": "سطو",
    "Taatik": "סטו"
  },
  {
    "Hebrew": "לוויתן",
    "Arabic": "حوت",
    "Taatik": "חות"
  },
  {
    "Hebrew": "חצוצרה",
    "Arabic": "بوق",
    "Taatik": "בוק"
  },
  {
    "Hebrew": "עף",
    "Arabic": "طار",
    "Taatik": "טאר"
  },
  {
    "Hebrew": "חרב",
    "Arabic": "سيف",
    "Taatik": "סיפ"
  },
  {
    "Hebrew": "כעס",
    "Arabic": "غضب",
    "Taatik": "ע'צ'ב"
  },
  {
    "Hebrew": "קלפים",
    "Arabic": "شدّة",
    "Taatik": "שדה"
  },
  {
    "Hebrew": "מבוקש",
    "Arabic": "مطلوب",
    "Taatik": "מטלוב"
  },
  {
    "Hebrew": "מערה",
    "Arabic": "مغارة",
    "Taatik": "מע'ארה"
  },
  {
    "Hebrew": "מגדת עתידות",
    "Arabic": "عرّافة",
    "Taatik": "עראפה"
  },
  {
    "Hebrew": "רוח רפאים",
    "Arabic": "شبح",
    "Taatik": "שבח"
  },
  {
    "Hebrew": "רופא",
    "Arabic": "طبيب",
    "Taatik": "טביב"
  },
  {
    "Hebrew": "גן חיות",
    "Arabic": "حديقة الحيوانات",
    "Taatik": "חדיקה אלחיואנאת"
  },
  {
    "Hebrew": "נשך",
    "Arabic": "عضّ",
    "Taatik": "עצ'"
  }
]
const data = JSON.parse(JSON.stringify(dataJson))