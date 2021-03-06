var i;
var x;
var hasListener = false;

var past = [];
var cur = -1;
function getNext(){
	cur++;
	saveAction("sayings", "getNext", {cur: cur});
	if (cur === past.length) {
		while (true) {
        i = Math.floor(Math.random() * dataJson.length);
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
	saveAction("sayings", "getPrev", {cur: cur});
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
                <h2 class="rtl activityContent" id="arabicText"></h2>
		<h2 class="rtl activityContent" id="taatikText"></h2>
        <h2 class="rtl activityContent" id="translationText"></h2>
		<h2 class="rtl activityContent" id="meaningText"></h2>
            </div>`;
	return content;		
}

function displayContentBySpecificOrder(i) {
	document.getElementById("arabicText").innerHTML = data[i].Arabic;
	document.getElementById("taatikText").innerHTML = data[i].Taatik;
	document.getElementById("translationText").innerHTML = data[i].Translation;
	document.getElementById("meaningText").innerHTML = data[i].Meaning;
}

const dataJson = [
  {
    "Arabic": "بيبني قصور في الرّمل",
    "Taatik": "ביבני קצור פי אלרמל",
    "Translation": "תרגום: בונה ארמונות בחול",
    "Meaning": "משמעות: מקווה לדברים \\ מתעסק בדברים שאין להם אחיזה במציאות, אין להם סיכוי להתגשם"
  },
  {
    "Arabic": "بيحلب النّملة",
    "Taatik": "ביחלב אלנמלה",
    "Translation": "תרגום: חולב את הנמלה",
    "Meaning": "משמעות: שימוש 1- נאמר על אדם המנסה לעשות דבר בלתי אפשרי<br><br>שימוש 2- נאמר על אדם קמצן"
  },
  {
    "Arabic": "الشّاي حلو زيّ المرة والقهوة مرّة زيّ امّ المرة",
    "Taatik": "אלשאי חלו זי אלמרה ואלקהוה מרה זי אם אלמרה",
    "Translation": "תרגום: התה מתוק כמו האישה והקפה מרה כמו אם (אמא של) האישה",
    "Meaning": "משמעות: ב'שבח' הקשר בין חמה לחתן שלה <br>(שבח במרכאות כמובן, הכוונה- בגנות)"
  },
  {
    "Arabic": "جارك القريب ولا أخوك البعيد",
    "Taatik": "ג'ארכ אלקריב ולא אח'וכ אלבעיד",
    "Translation": "תרגום: שכנך הקרוב ולא אחיך הרחוק",
    "Meaning": "משמעות: כמו בעברית, 'טוב שכן קרוב מאח רחוק' (משלי כ''ז, י')"
  },
  {
    "Arabic": "عصفور في الايد ولا عشرة ع الشّجرة",
    "Taatik": "עצפור פי אלאיד ולא עשרה ע אלשג'רה",
    "Translation": "תרגום: ציפור ביד ולא עשר על העץ",
    "Meaning": "משמעות: כמו בעברית: 'ציפור אחת ביד עדיפה משתיים על העץ'"
  },
  {
    "Arabic": "شايف الدّيك أرنب",
    "Taatik": "שאיפ אלדיכ ארנב",
    "Translation": "תרגום: רואה (את) התרנגול ארנב",
    "Meaning": "משמעות: נאמר על אדם שמרוב עייפות לא רואה כלום (ואת התרנגול רואה כאילו הוא ארנב)"
  },
  {
    "Arabic": "قول قليلاً واعمل كثيراً",
    "Taatik": "קול קלילן ואעמל כת'ירן",
    "Translation": "תרגום: אמור מעט ועשה הרבה",
    "Meaning": "משמעות: כמו בעברית: 'אֱמֹר מְעַט וַעֲשֵׂה הַרְבֵּה' (מסכת אבות, א', ט''ו)"
  },
  {
    "Arabic": "لا حول ولا قوة الا بالله",
    "Taatik": "לא חול ולא קוה אלא באללה",
    "Translation": "תרגום: לא חיל ולא כח אלא באלוקים",
    "Meaning": "משמעות: מקביל לעברית- 'לֹא בְחַיִל וְלֹא בְכֹחַ כִּי אִם בְּרוּחִי אָמַר ה' צְבָאוֹת' (זכריה ד', ו')<br><br>בשימוש במקרים בהם רוצים לומר 'מה יש בכוחנו לעשות?! ה' גדול...'"
  },
  {
    "Arabic": "اسأل مجرّب ولا تسأل حكيم",
    "Taatik": "אסאל מג'רב ולא תסאל חכים",
    "Translation": "תרגום: שאל (את ה) מנוסה ואל תשאל (את ה) חכם",
    "Meaning": "משמעות: כמו בעברית 'אין חכם כבעל ניסיון'"
  },
  {
    "Arabic": "الحذر يمنع الخطر",
    "Taatik": "אלחד'ר ימנע אלח'טר",
    "Translation": "תרגום: הזהירות \\ העירנות ימנע (מונעת) סכנה",
    "Meaning": "משמעות: פשוטו כמשמעו- הזהר \\ היה עירני וכך תשמר מן הסכנה"
  },
  {
    "Arabic": "الّي بدّو يسكر ما بيعدّش قداح",
    "Taatik": "אלי בדו יסכר מא ביעדש קדאח",
    "Translation": "תרגום: מי שרוצה להשתכר (מלשון שוכרה, מיין) לא סופר (את ה) כוסיות",
    "Meaning": "משמעות: אם כבר אתה עושה משהו, תעשה אותו עד הסוף בלי להתקמצן"
  },
  {
    "Arabic": "بعيد عن العين, بعيد عن القلب",
    "Taatik": "בעיד ען אלעין, בעיד ען אלקלב",
    "Translation": "תרגום: רחוק מהעין רחוק מהלב",
    "Meaning": "משמעות: כמו בעברית"
  },
  {
    "Arabic": "اقعد برّة ولا تقعد جمب الجرّة",
    "Taatik": "אקעד ברה ולא תקעד ג'מב אלג'רה",
    "Translation": "תרגום: שב בחוץ ואל תשב ליד הכד",
    "Meaning": "משמעות: לפעמים לא שווה להיות 'קרוב לצלחת' כי אז כולם יבואו אליך בבקשות"
  },
  {
    "Arabic": "مرة بشنب",
    "Taatik": "מרה בשנב",
    "Translation": "תרגום: אישה בשפם",
    "Meaning": "משמעות: אישה עם שפם<br><br>שימוש 1- לאישה שהיא ה'גבר' בבית <br><br>שימוש 2- לגבר שהוא ה'אישה' בבית"
  },
  {
    "Arabic": "المستحيل كلمة في قاموس المجانين",
    "Taatik": "אלמסתחיל כלמה פי קאמוס אלמג'אנין",
    "Translation": "תרגום: הבלתי אפשרי (היא) מילה במילון המשוגעים",
    "Meaning": "משמעות: אין דבר שהוא בלתי אפשרי"
  },
  {
    "Arabic": "مش كلّ يوم أكلة زلابية",
    "Taatik": "מש כל יום אכלת זלאביה",
    "Translation": "תרגום: לא כל יום- אכילת זלאביה (מין מאפה מתוק)",
    "Meaning": "משמעות: כמו בעברית 'לא כל יום פורים'"
  },
  {
    "Arabic": "بتقول له ثور،  بيقول لك احلبه",
    "Taatik": "בתקול לו ת'ור, ביקול לכ אחלבו",
    "Translation": "תרגום: אתה אומר לו: שור, הוא אומר לך 'חלוב אותו'.",
    "Meaning": "משמעות: משל לאדם המבקש לעשות דבר בלתי אפשרי. <br><br>(הרי לא ניתן לחלוב שור)"
  },
  {
    "Arabic": "الحرامي ع راسه ريشة",
    "Taatik": "אלחראמי ע ראסו רישה",
    "Translation": "תרגום: הגנב על ראשו נוצה",
    "Meaning": "משמעות: כמו בעברית, 'על ראש הגנב בוער הכובע'"
  },
  {
    "Arabic": "كلّ قبيلة فيها هبيلة",
    "Taatik": "כל קבילה פיהא הבילה",
    "Translation": "תרגום: כל שבט (נקבה בערבית), יש בה טפשה",
    "Meaning": "משמעות: אין משפחה 'מושלמת', אין בית בלי חור ביוב"
  },
  {
    "Arabic": "قال: ليش الطّنجرة هدّت؟ قالت: لأنّه امّك عدّت",
    "Taatik": "קאל: ליש אלטנג'רה הדת? קאלת: לאנו אמכ עדת",
    "Translation": "תרגום: אמר: למה הסיר / התבשיל נרגעה? אמרה: כיוון שאמך עברה.<br><br>הסבר לתרגום- גבר שואל את אשתו למה היא לא מבשלת, והיא אומרת שזה בגלל אמא שלו.",
    "Meaning": "משמעות: ב'שבח' הקשר בין כלה לחמותה"
  },
  {
    "Arabic": "بدّك الحقّ ولّا ابن عمّه",
    "Taatik": "בדכ אלחק ולא אבן עמו",
    "Translation": "תרגום: ברצונך (לשמוע את) האמת או את בן דודה?",
    "Meaning": "משמעות: אדם אומר זאת למי שלא מאמין לדבריו."
  },
  {
    "Arabic": "القرد بعين امّه غزال",
    "Taatik": "אלקרד בעין אמו ע'זאל",
    "Translation": "תרגום: הקוף בעין אמו - צבי",
    "Meaning": "משמעות: פשוטו כמשמעו, גם אם הילד מכוער, בעיני אימו הוא יפה."
  },
  {
    "Arabic": "مثل الملح, ما حداش بيستغني عنّه",
    "Taatik": "מת'ל אלמלח, מא חדאש ביסתע'ני ענו",
    "Translation": "תרגום: כמו המלח, אף אחד לא מוותר עליו",
    "Meaning": "משמעות: פשוטו כמשמעו, נאמר על אדם \\ דבר שלא ניתן לוותר עליו."
  },
  {
    "Arabic": "الّي مش عاجبه يرقّص حواجبه",
    "Taatik": "אלי מש עאג'בו ירקצ חואג'בו",
    "Translation": "תרגום: מי שלא מוצא חן בעיניו (ש)ירקיד את גבותיו",
    "Meaning": "משמעות: בשפה פשוטה - מי שלא מוצא חן בעיניו ש'יקפוץ לי'"
  },
  {
    "Arabic": "الكبير حيطه سور، وعيبه مستور",
    "Taatik": "אלכביר חיטו סור, ועיבו מסתור",
    "Translation": "תרגום: הגדול- קירו חומה, ופגמו/ בושתו (הפגם / הבושה שלו) מוסתר",
    "Meaning": "משמעות: נאמר על ידי העני אודות העשיר המצליח. (משמע: 'הוא לא כזה מוצלח, פשוט כל הפגמים מוסתרים')"
  }
]
const data = JSON.parse(JSON.stringify(dataJson))