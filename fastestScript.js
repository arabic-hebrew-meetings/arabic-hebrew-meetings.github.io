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