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
                <h2 class="rtl" id="hebrewText"></h3>
		<h2 class="rtl" id="arabicText"></h3>
        <h2 class="rtl" id="taatikText"></h3>
            </div>`;
	return content;		
}

function displayContentBySpecificOrder(i) {
	document.getElementById("hebrewText").innerHTML = data[i].Hebrew;
	document.getElementById("arabicText").innerHTML = data[i].Arabic;
	document.getElementById("taatikText").innerHTML = data[i].Taatik;
}

const dataJson = [
  {
    "Hebrew": "מה הספר האחרון שקראת?",
    "Arabic": "شو اخر كتاب قرأته؟",
    "Taatik": "שו אח'ר כתאב קראתה?"
  },
  {
    "Hebrew": "אם היית יכול/ה לעבוד בכל מקצוע, באיזה מקצוע זה היה?",
    "Arabic": "اذا كنت بتقدر تشتغل بكل موضوع بأي موضوع كنت بتشتغل؟",
    "Taatik": "אד'א כנת בתקדר תשתע'ל בכל מוצ'וע באי מוצ'וע כנת בתשתע'ל?"
  },
  {
    "Hebrew": "אם היית יכול לתת לילד עצה אחת לחיים- מה היית אומר?",
    "Arabic": "اذا كنت بدك تعطي لولد نصيحة واحدة للحياة شو كنت بتقوله؟",
    "Taatik": "אד'א כנת בדכ תעטי לולד נציחה ואחדה ללחיאה שו כנת בתקולה?"
  },
  {
    "Hebrew": "כלבים או חתולים?",
    "Arabic": "بساس ولا كلاب؟",
    "Taatik": "בסאס ולא כלאב?"
  },
  {
    "Hebrew": "מהם שמות החיבה שלך?",
    "Arabic": "شو القابك؟",
    "Taatik": "שו אלקאבכ?"
  },
  {
    "Hebrew": "מה הדבר שתמיד רצית לעשות אבל עדיין לא הספקת?",
    "Arabic": "شو الاشي اللي دايما بدك تعملو بس بعدك مش عاملو؟",
    "Taatik": "שו אלאשי אללי דאימא בדכ תעמלו בס בעדכ מש עאמלו?"
  },
  {
    "Hebrew": "אם היו אומרים לך שנותרו לך רק כמה חודשים לחיות. מה היית עושה?",
    "Arabic": "اذا حكولك انو ضل بس كم شهر تعيش، شو كنت بتعمل؟",
    "Taatik": "אד'א חכולכ אנו צ'ל בס כם שהר תעיש، שו כנת בתעמל?"
  },
  {
    "Hebrew": "אם היית יכול/ה להיות כל חיה, מה היית ולמה?",
    "Arabic": "اذا كنت بتقدر تكون كل حيوان، شو كنت بتكون؟",
    "Taatik": "אד'א כנת בתקדר תכון כל חיואנ، שו כנת בתכונ?"
  },
  {
    "Hebrew": "אם היה לך מיליון דולר, מה היית עושה?",
    "Arabic": "اذا كان معك مليون دولار شو كنت بتعمل؟",
    "Taatik": "אד'א כאן מעכ מליון דולאר שו כנת בתעמל?"
  },
  {
    "Hebrew": "ספר משהו שאנשים לא יודעים עליך",
    "Arabic": "احكي اشي الناس ما بتعرفوا عنك",
    "Taatik": "אחכי אשי אלנאס מא בתערפוא ענכ"
  },
  {
    "Hebrew": "אם היית יכול/ה לפגוש אישיות מפורסמת, מי זה היה? על מה היית מדבר איתו?",
    "Arabic": "اذا كنت بتقدر تقابل شخصية مشهورة مين كنت بتنقي؟ وعن شو بتحكي معو؟",
    "Taatik": "אד'א כנת בתקדר תקאבל שח'ציה משהורה מין כנת בתנקי? וען שו בתחכי מעו?"
  },
  {
    "Hebrew": "הבית שלך עולה באש. מה הדבר הראשון שאת/ה מציל/ה?",
    "Arabic": "اذا بيتك عم يحترق، شو اول شي بتنقذو؟",
    "Taatik": "אד'א ביתכ עם יחתרק، שו אול שי בתנקד'ו?"
  },
  {
    "Hebrew": "אם היית יכול/ה להגיע לכל מקום בעולם, לאן היית הולך/ת?",
    "Arabic": "اذا فيك\\ فيكي توصلي لكل مكان بالعالم ؟ لوين كنت بتروح \\ بتروحي ؟",
    "Taatik": "אד'א פיכ\\ פיכי תוצלי לכל מכאן באלעאלם ? לוין כנת בתרוח \\ בתרוחי ?"
  },
  {
    "Hebrew": "איפה את/ה רואה את עצמך 10 שנים מהיום?",
    "Arabic": "وين بتشوف\\ بتشوفي حالك بعد 10 سنين من اليوم ؟",
    "Taatik": "וין בתשופ\\ בתשופי חאלכ בעד 10 סנין מן אליום ?"
  },
  {
    "Hebrew": "מה הדבר שהכי היית רוצה לעשות ולמה?",
    "Arabic": "شو اكتر شي كنت بدك تعلمو\\ تعمليه وليش؟",
    "Taatik": "שו אכתר שי כנת בדכ תעלמו\\ תעמליה וליש?"
  },
  {
    "Hebrew": "מהו הדבר שאתה הכי מעריך/ה אצל אנשים/ חברים?",
    "Arabic": "شو اكثر اشي بتقدرو عند ناس/صحاب؟",
    "Taatik": "שו אכת'ר אשי בתקדרו ענד נאס/צחאב?"
  },
  {
    "Hebrew": "מה היית רוצה ללמוד ולמה?",
    "Arabic": "شو كنت بتحب تتعلم وليش؟",
    "Taatik": "שו כנת בתחב תתעלם וליש?"
  },
  {
    "Hebrew": "האם היית רוצה להתפרסם ואם כן בזכות מה?",
    "Arabic": "هل كنت بدك تصير مشهور\\ مشهوره ؟ واذا اه , بشو؟",
    "Taatik": "הל כנת בדכ תציר משהור\\ משהורה ? ואד'א אה , בשו?"
  },
  {
    "Hebrew": "איזו שעה של היום את/ה מעדיף/ה ולמה?",
    "Arabic": "اي ساعة باليوم انت بتفضل \\ بتفضلي وليش؟",
    "Taatik": "אי סאעה באליום אנת בתפצ'ל \\ בתפצ'לי וליש?"
  },
  {
    "Hebrew": "על איזו תקופה בחייך היית חוזר/ת ולמה?",
    "Arabic": "على اي فترة بحياتك كنت بترجع\\ بترجعي وليش؟",
    "Taatik": "עלא אי פתרה בחיאתכ כנת בתרג'ע\\ בתרג'עי וליש?"
  },
  {
    "Hebrew": "מהו המשחק שהכי אהבת בילדותך?",
    "Arabic": "اكتر لعبة حبيتها بطفولتك؟",
    "Taatik": "אכתר לעבה חביתהא בטפולתכ?"
  },
  {
    "Hebrew": "מיהי הדמות שהשפיעה עליך ביותר וכיצד?",
    "Arabic": "شو اكتر شخصية أثرت فيك وكيف؟",
    "Taatik": "שו אכתר שח'ציה את'רת פיכ וכיפ?"
  },
  {
    "Hebrew": "מהם שלושת הדברים שהיית לוקח/ת איתך לאי בודד?",
    "Arabic": "شو الثلاثة اشياء الي بتوخدها \\ بتوخديها معك لجزيرة نائية؟",
    "Taatik": "שו אלת'לאת'ה אשיאא אלי בתוח'דהא \\ בתוח'דיהא מעכ לג'זירה נאאיה?"
  },
  {
    "Hebrew": "לו היית יכול/ה להתעורר מחר בבוקר בגופו של אדם אחר, האם היית עושה זאת? ובמי היית בוחר/ת? (רק הגוף משתנה)",
    "Arabic": "اذا كان فيك \\فيكي تصحي بكرا الصبح بجسم بني ادم ثاني , هل كنت بتعملو \\ بتعمليه ؟ وبمين كنت بتختار\\ بتختاري ؟ ( فقط الجسم بتغير)",
    "Taatik": "אד'א כאן פיכ \\פיכי תצחי בכרא אלצבח בג'סם בני אדם ת'אני , הל כנת בתעמלו \\ בתעמליה ? ובמין כנת בתח'תאר\\ בתח'תארי ? ( פקט אלג'סם בתע'יר)"
  },
  {
    "Hebrew": "מה הייתה העבודה הראשונה בחייך? ובאיזה גיל זה היה?",
    "Arabic": "شو اول شغل كان الك بحياتك ؟ وبأي جيل كان؟",
    "Taatik": "שו אול שע'ל כאן אלכ בחיאתכ ? ובאי ג'יל כאנ?"
  },
  {
    "Hebrew": "מהו הדבר הראשון שאת/ה עושה בבוקר? ומהי המחשבה הראשונה שעולה לך בבוקר ממוצע?",
    "Arabic": "ايش الاشي الاول الي بتعملو او ( الي بتسويه ) في صبح ؟ وشو اول فكرة بتيجي او ( بتخطر) على بالك؟",
    "Taatik": "איש אלאשי אלאול אלי בתעמלו או ( אלי בתסויה ) פי צבח ? ושו אול פכרה בתיג'י או ( בתח'טר) עלא באלכ?"
  },
  {
    "Hebrew": "מה הדבר הכי חשוב שקרה לך בשנה האחרונה?",
    "Arabic": "شو اكتر اشي مهم صار معك بالسنة الاخيرة؟",
    "Taatik": "שו אכתר אשי מהם צאר מעכ באלסנה אלאח'ירה?"
  },
  {
    "Hebrew": "אם היית חייב להחליף שם, איזה שם היית בוחר לעצמך?",
    "Arabic": "اذا كنت لازم تتغير الاسم تبعتك , اي اسم تخود؟",
    "Taatik": "אד'א כנת לאזם תתע'יר אלאסם תבעתכ , אי אסם תח'וד?"
  },
  {
    "Hebrew": "מהו הדבר המטורף/ משוגע/ הזוי/ חריג/ משונה שעשית בחייך?",
    "Arabic": "شو الاشي المجنون/ خاص/ غريب؟ اللي عملتو بحياتك؟",
    "Taatik": "שו אלאשי אלמג'נונ/ ח'אצ/ ע'ריב? אללי עמלתו בחיאתכ?"
  },
  {
    "Hebrew": "אם היית מקבל/ת מחר 3 משאלות - מה היית בוחר?",
    "Arabic": "اذا بحكولك انو بحققولك تلات امنيات، شو كنت بتختار؟",
    "Taatik": "אד'א בחכולכ אנו בחקקולכ תלאת אמניאת، שו כנת בתח'תאר?"
  }
]
const data = JSON.parse(JSON.stringify(dataJson))