var i;
var x;
var hasListener = false;
var caregory;

const categories = Object.freeze({"simple":0, "complex":1})

var pastComplex = [];
var curComplex = -1;
var pastSimple = [];
var curSimple = -1;

function getCurByCategory(category) {
	if (category === categories.simple) {
		return curSimple;
	}
	if (category === categories.complex) {
		return curComplex;
	}
}

function getPastByCategory(category) {
	if (category === categories.simple) {
		return pastSimple;
	}
	if (category === categories.complex) {
		return pastComplex;
	}
}

function getDataByCategory(category) {
	if (category === categories.simple) {
		return dataSimple;
	}
	if (category === categories.complex) {
		return dataComplex;
	}
}

function getDataJsonByCategory(category) {
	if (category === categories.simple) {
		return dataJsonSimple;
	}
	if (category === categories.complex) {
		return dataJsonComplex;
	}
}

function incrementCurByCategory(category) {
	if (category === categories.simple) {
		curSimple++;
		return curSimple;
	}
	if (category === categories.complex) {
		curComplex++;
		return curComplex;
	}
}

function decrementCurByCategory(category) {
	if (category === categories.simple) {
		curSimple--;
		return curSimple;
	}
	if (category === categories.complex) {
		curComplex--;
		return curComplex;
	}
}

function pushToPastByCategory(category, i) {
	if (category === categories.simple) {
		pastSimple.push(i);
		return pastSimple;
	}
	if (category === categories.complex) {
		pastComplex.push(i);
		return pastComplex;
	}
}

function getNext(ignoredCategory){
	category = 0;
	cur = getCurByCategory(category);
	saveAction("questions", "getNext", {cur: cur, category: category});
	past = getPastByCategory(category);
	dataJson = getDataJsonByCategory(category);
	cur = incrementCurByCategory(category);
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
	past = pushToPastByCategory(category, i);
	} else {
		i = past[cur];
	}
	displayContent(cur, i, category);	
}

function getPrev(ignoredCategory){
	category = 0;
	cur = getCurByCategory(category);
	saveAction("questions", "getPrev", {cur: cur, category: category});
	past = getPastByCategory(category);
	cur = decrementCurByCategory(category);
	i = past[cur];
	displayContent(cur, i, category);	
}

function getNextButton(cur, category) {
	dataJson = getDataJsonByCategory(category);
	nextButton = `<a class="circle-button" onclick="getNext(`+category+`)" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-left my-activity-button-single"></span>
        </a>`;
	if (cur === dataJson.length-1) {
		nextButton = `<a class="circle-button invisible" onclick="getNext(`+category+`)" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-left my-activity-button-single"></span>
        </a>`;	
	}
	return nextButton;
}

function getPrevButton(cur, category) {
	prevButton = `<a class="circle-button" onclick="getPrev(`+category+`)" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-right my-activity-button-single"></span>
        </a>`;
	if (cur === 0) {
		if (x.matches) { // small screen
			prevButton = ``;
		} else {
			prevButton = `<a class="circle-button invisible" onclick="getPrev(`+category+`)" role="button">
		  <span class="glyphicon glyphicon glyphicon-chevron-right my-activity-button-single"></span>
        </a>`;
		}
	}	
	return prevButton;
}

function displayContent(cur, i, category) {
	x = window.matchMedia("(max-width: 600px)")
	displayContentByWidth() // Call listener function at run time
	if (!hasListener) {
		x.addListener(displayContentByWidth) // Attach listener function on state changes
		hasListener = true;
	}
}

var firstTime = true;
function displayContentByWidth() {
	nextButton = getNextButton(cur, category);
	prevButton = getPrevButton(cur, category);
	
	if (firstTime) {
		content = getNewContentRectangle();
	} else {
		content = getExistingContentRectangle();
	}
	displayContentAndButtons();
	displayContentBySpecificOrder(i, category);
	
}

function displayContentAndButtons() {
	if (x.matches) { // small screen
		document.getElementById("button-and-text").innerHTML = `<div class="row">` + content + `</div><div class="row">` + prevButton + nextButton + `</div>`;
	} else {
		document.getElementById("button-and-text").innerHTML =  prevButton + content + nextButton;
	}
}

function getNewContentRectangle() {
	content = `<div class="rectangle" id="specialRectangle">
					<div id="texts">
                <h2 class="rtl activityContent" id="hebrewText"></h3>
		<h2 class="rtl activityContent" id="arabicText"></h3>
        <h2 class="rtl activityContent" id="taatikText"></h3>
					</div>
            </div>`;
	return content;		
}

function getExistingContentRectangle() {
	content = `<div class="rectangle" id="specialRectangle">
					<div id="texts">
                <h2 class="rtl activityContent" id="hebrewText">` + currentHebrew + `</h3>
		<h2 class="rtl activityContent" id="arabicText">` + currentArabic + `</h3>
        <h2 class="rtl activityContent" id="taatikText">` + currentTaatik + `</h3>
					</div>
            </div>`;
	return content;		
}

function displayContentBySpecificOrder(i, category) {
	data = getDataByCategory(category);
	fadeInTime = 300; // this can be modified. I read about it and also felt that 300 is very good.
	fadeOutTime = 0; // this can be modified but I felt like 0 fade out is the best
	if (firstTime) {
		fadeOutTime = 0; // this must always be 0
	}
	jQuery("#texts").fadeOut(fadeOutTime, function() {
	firstTime=false;	
	currentHebrew = data[i].Hebrew;
	currentArabic = data[i].Arabic;
	currentTaatik = data[i].Taatik;
	document.getElementById("hebrewText").innerHTML = data[i].Hebrew;
	document.getElementById("arabicText").innerHTML = data[i].Arabic;
	document.getElementById("taatikText").innerHTML = data[i].Taatik;	
	jQuery("#texts").css('visibility','visible').hide().fadeIn(fadeInTime);
	});
	
}

const dataJsonComplex = [
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
  },
  {
    "Hebrew": "מה היית רוצה לשנות בעולם?",
    "Arabic": "شو كنت بدك تغيّر بالعالم؟",
    "Taatik": "שו כנת בדכ תע'יר באלעאלמ?"
  },
  {
    "Hebrew": "מהן התכונות הכי טובות שלך?",
    "Arabic": "شو احسن صفات عندك؟",
    "Taatik": "שו אחסן צפאת ענדכ?"
  },
  {
    "Hebrew": "איזה שפות את/ה מדבר/ת?",
    "Arabic": "اي لغات انت بتحكي؟",
    "Taatik": "אי לע'את אנת בתחכי?"
  },
  {
    "Hebrew": "מהם שלושת הדברים שאת/ה אף פעם לא יוצאת מהבית בלעדיהם?",
    "Arabic": "شو ثلاث اشيا اللي ولا مرة بتطلع من البيت بدونهن ؟",
    "Taatik": "שו ת'לאת' אשיא אללי ולא מרה בתטלע מן אלבית בדונהן ?"
  },
  {
    "Hebrew": "מהו השיר האהוב עליך?",
    "Arabic": "شو الاغنية المفضلة عندك؟",
    "Taatik": "שו אלאע'ניה אלמפצ'לה ענדכ?"
  },
  {
    "Hebrew": "מהו החג האהוב עליך?",
    "Arabic": "شو العيد المفضل عندك؟",
    "Taatik": "שו אלעיד אלמפצ'ל ענדכ?"
  },
  {
    "Hebrew": "מי הבן אדם שהכי מצחיק אותך?",
    "Arabic": "مين اكثر انسان بضحكك؟",
    "Taatik": "מין אכת'ר אנסאן בצ'חככ?"
  },
  {
    "Hebrew": "איפה המקום שאת/ה הכי אוהב/ת לבלות בו?",
    "Arabic": "شو اكثر محل بتحب تقضي وقت في؟",
    "Taatik": "שו אכת'ר מחל בתחב תקצ'י וקת פי?"
  },
  {
    "Hebrew": "מהי העונה האהובה עליך? למה?",
    "Arabic": "شو الفصل المفضل عندك؟ وليش؟",
    "Taatik": "שו אלפצל אלמפצ'ל ענדכ? וליש?"
  },
  {
    "Hebrew": "אם היית יכול לשנות טעות מן העבר שלך, מה היא הייתה?",
    "Arabic": "اذا كنت بدك تغير غلطة من الماضي، شو كانت بتكون؟",
    "Taatik": "אד'א כנת בדכ תע'יר ע'לטה מן אלמאצ'י, שו כאנת בתכונ?"
  },
  {
    "Hebrew": "האם את/ה נוטה לראות במצבים שונים בחיים את חצי הכוס הריקה או המלאה?",
    "Arabic": "شو انت بتميل انك تشوف بمواقف مختلفة بالحياة، نص الكاسة الفاضي او المليانة؟",
    "Taatik": "שו אנת בתמיל אנכ תשוף במואקף מח'תלפה באלחיאה, נצ אלכאסה אלפאצ'י או אלמליאנה?"
  },
  {
    "Hebrew": "את/ה נוהג למקום חדש שאת/ה לא מכיר/ה והולך/ת לאיבוד. מה את/ה עושה?",
    "Arabic": "اذا كنت عم تسوق لمحل جديد اللي ما بتعرفو وضعت، شو بتعمل؟",
    "Taatik": "אד'א כנת עם תסוק למחל ג'דיד אללי מא בתערפו וצ'עת, שו בתעמל?"
  },
  {
    "Hebrew": "ספר על זיכרון מעניין או מיוחד שבטח תספר/י עליו לנכדים שלך",
    "Arabic": "احكي عن ذكرى مثير للاهتمام او خاص الي رح تخرفو\\ نخرفيه للاحفادك",
    "Taatik": "אחכי ען ד'כרא מת'יר ללאהתמאם או ח'אצ אלי רח תח'רפו\\ נח'רפיה ללאחפאדכ"
  },
  {
    "Hebrew": "מהו הזיכרון הכי מצחיק שלך ?",
    "Arabic": "اكتر مقطع مضحك لالك ؟",
    "Taatik": "אכתר מקטע מצ'חכ לאלכ ?"
  },
  {
    "Hebrew": "מה הדבר הראשון שעובר לך בראש כשאתה חושב/ת על העתיד ?",
    "Arabic": "شو اول شي بخطر على بالك ببس تفكر\\ تفكري بالمستقبل ؟",
    "Taatik": "שו אול שי בח'טר עלא באלכ בבס תפכר\\ תפכרי באלמסתקבל ?"
  },
  {
    "Hebrew": "אם היית יכול/ה לקבל תכונה אחת לעצמך מה היית מבקש/ת ?",
    "Arabic": "اذا كان فيك \\ فيكي توخدي صفة (تحصلي على صفة ) لنفسك شو كنت بتطلب \\ بتطلبي ؟",
    "Taatik": "אד'א כאן פיכ \\ פיכי תוח'די צפה (תחצלי עלא צפה ) לנפסכ שו כנת בתטלב \\ בתטלבי ?"
  },
  {
    "Hebrew": "מהו הדבר שלמדת, אשר ילווה אותך לאורך כל החיים ?",
    "Arabic": "شو الاشي اللي تعلمتو ورح يرافقك بكل حياتك؟",
    "Taatik": "שו אלאשי אללי תעלמתו ורח יראפקכ בכל חיאתכ?"
  },
  {
    "Hebrew": "מהו המשפט שאמרו לך ושנחרט לך בזיכרון ?",
    "Arabic": "شو جملة حكولك اياها وانخرطت بذاكرتك؟",
    "Taatik": "שו ג'מלה חכולכ איאהא ואנח'רטת בד'אכרתכ?"
  },
  {
    "Hebrew": "מה מכעיס אותך ומדוע ?",
    "Arabic": "شو الي بعصبك ؟ وليش ؟",
    "Taatik": "שו אלי בעצבכ ? וליש ?"
  },
  {
    "Hebrew": "מהו הדבר שהכי משמח אותך, או מרגש אותך ?",
    "Arabic": "شو اكتر شي بفرحك او بحرك مشاعرك ؟",
    "Taatik": "שו אכתר שי בפרחכ או בחרכ משאערכ ?"
  },
  {
    "Hebrew": "איך את/ה מפנק/ת את עצמך ?",
    "Arabic": "كيف بدلل \\ بدللي حالك ؟",
    "Taatik": "כיף בדלל \\ בדללי חאלכ ?"
  },
  {
    "Hebrew": "האם יש לך מוטו/משפט לחיים?",
    "Arabic": "في عندك حكمة أو جملة بتمشي حسبها في الحياة؟",
    "Taatik": "פי ענדכ  חכמה או ג'מלה בתמשי חסבהא פי אלחיאה?"
  },
  {
    "Hebrew": "מה מפחיד אותך?",
    "Arabic": "شو الي بخفوك ؟",
    "Taatik": "שו אלי בח'פוכ ?"
  },
  {
    "Hebrew": "באילו אמונות טפלות אתה\\את מאמין\\ה?",
    "Arabic": "باي خرافات انت بتآمن \\ بتأمني ؟",
    "Taatik": "באי ח'ראפאת אנת בתאאמן \\ בתאמני ?"
  },
  {
    "Hebrew": "איזה חלום חלמת בעבר והיית רוצה לשוב ולחלום אותו?",
    "Arabic": "اي حلم حلمتو\\ حلمتيه بالماضي وبدك تحلمو \\ تحلميه كمان مرة ؟",
    "Taatik": "אי חלם חלמתו\\ חלמתיה  באלמאצ'י  ובדכ תחלמו \\ תחלמיה כמאן מרה ?"
  },
  {
    "Hebrew": "על מה בחייך את/ה אסיר/ת תודה ביותר?",
    "Arabic": "اكتر شي انت ممتنه الو ( ممتنه له ) بيحاتك ؟",
    "Taatik": "אכתר שי אנת ממתנה אלו ( ממתנה לה ) ביחאתכ ?"
  },
  {
    "Hebrew": "מהו המאכל שלעולם לא תסכים/י לטעום?",
    "Arabic": "شو الاكلة الي مش ممكن تذوقو\\ تذوقيه بحياتك ؟",
    "Taatik": "שו אלאכלה אלי מש ממכן תד'וקו\\ תד'וקיה בחיאתכ ?"
  },
  {
    "Hebrew": "איזה חפץ את/ה שומר/ת וכנראה שתשמור/י לעולם?",
    "Arabic": "اي غرض كنت بتحتفظ فيه \\ بتحتفظي فيه للابد ؟",
    "Taatik": "אי ע'רצ' כנת בתחתפט' פיה \\ בתחתפט'י פיה ללאבד ?"
  },
  {
    "Hebrew": "אם יכלת לחזור בזמן ולשנות משהו, לאיזה זמן היית חוזר ומה היית משנה?",
    "Arabic": "اذا كان فيك ترجع بالزمن وتغير اشي , لاي فترة بترجع ؟ وشو كنت بتغير؟",
    "Taatik": "אד'א כאן פיכ תרג'ע באלזמן ותע'יר אשי , לאי פתרה בתרג'ע ? ושו כנת בתע'יר?"
  },
  {
    "Hebrew": "ספר על חוויה משמעותית שעברת בחייך ?",
    "Arabic": "احكي عن تجربة مهمة مرقتها بحياتك؟",
    "Taatik": "אחכי ען תג'רבה מהמה מרקתהא בחיאתכ?"
  }
]
const dataComplex = JSON.parse(JSON.stringify(dataJsonComplex))

const dataJsonSimple = [
  {
    "Hebrew": "מה החיה האהובה עליך?",
    "Arabic": "شو الحيوان المفضّل عندك؟",
    "Taatik": "שו אלחיואן אלמפצ'ל ענדכ?",
    "Category": "Animals"
  },
  {
    "Hebrew": "האם הייתה לך חיה פעם? איזו?",
    "Arabic": "هل كان عندك حيوان مرة؟ شو هو الحيوان؟",
    "Taatik": "הל כאן ענדכ חיואן מרה? שו הו אלחיואנ?",
    "Category": "Animals"
  },
  {
    "Hebrew": "מה אתם מעדיפים- כלבים או חתולים?",
    "Arabic": "شو بتفضلوا- بساس ولا كلاب؟",
    "Taatik": "שו בתפצ'לוא- בסאס ולא כלאב?",
    "Category": "Animals"
  },
  {
    "Hebrew": "האם אתה עוסק בעצמך באומנות? (מצייר, מצלם, מנגן וכו'...)",
    "Arabic": "هل تعمل في مجال الفنون؟ (رسّام, مصوّر, عازف...)",
    "Taatik": "הל תעמל פי מג'אל אלפנונ? (רסאמ, מצור, עאזפ...)",
    "Category": "Art"
  },
  {
    "Hebrew": "תן שם של ספר שמאוד אהבת- מהילדות או מהשנים האחרונות",
    "Arabic": "اعطي اسم كتاب اللي كثير حبيته بالفترة الاخيرة او بطفولتك",
    "Taatik": "אעטי אסם כתאב אללי כת'יר חביתה באלפתרה אלאח'ירה או בטפולתכ",
    "Category": "Books"
  },
  {
    "Hebrew": "איך נראה יום שגרתי שלך?",
    "Arabic": "شو هو يومك الروتيني؟ (كيف بتقضي يومك عادة)",
    "Taatik": "שו הו יומכ אלרותיני? (כיף בתקצ'י יומכ עאדה)",
    "Category": "Daily"
  },
  {
    "Hebrew": "באיזה שעה אתה בדרך כלל קם?",
    "Arabic": "اي ساعة بتفيق بالعادة (بشكل عام)؟",
    "Taatik": "אי סאעה בתפיק באלעאדה (בשכל עאמ)?",
    "Category": "Daily"
  },
  {
    "Hebrew": "באיזה שעה אתה בדרך כלל הולך לישון?",
    "Arabic": "أي ساعة بشكل عام بتنام؟",
    "Taatik": "אי סאעה בשכל עאם בתנאמ?",
    "Category": "Daily"
  },
  {
    "Hebrew": "אתה טיפוס של יום או של לילה?",
    "Arabic": "انت من النوع اللي بفضل الليل ولا النوع اللي بفضل النهار؟",
    "Taatik": "אנת מן אלנוע אללי בפצ'ל אלליל ולא אלנוע אללי בפצ'ל אלנהאר?",
    "Category": "Daily"
  },
  {
    "Hebrew": "איזה יום אתה הכי אוהב בשבוע?",
    "Arabic": "أي اكثر يوم بتحبو بلاسبوع؟",
    "Taatik": "אי אכת'ר יום בתחבו בלאסבוע?",
    "Category": "Daily"
  },
  {
    "Hebrew": "מה אתה אוהב יותר- בוקר, צהריים או ערב?",
    "Arabic": "ايش بتحب اكثر- الصبح, الظهر او الليل؟",
    "Taatik": "איש בתחב אכת'ר- אלצבח, אלט'הר או אלליל?",
    "Category": "Daily"
  },
  {
    "Hebrew": "מה אתה אוהב לעשות בזמנך הפנוי?",
    "Arabic": "ايش بتحب تعمل بوقتك الفاضي؟",
    "Taatik": "איש בתחב תעמל בוקתכ אלפאצ'י?",
    "Category": "Daily"
  },
  {
    "Hebrew": "כמה אחים ואחיות יש לך?",
    "Arabic": "كم اخ واخت عندك؟",
    "Taatik": "כם אח' ואח'ת ענדכ?",
    "Category": "Family"
  },
  {
    "Hebrew": "איזה אוכל אתם אוכלים בדרך כלל בארוחות משפחתיות?",
    "Arabic": "اي اكلات عادة بتوكلوا بالمناسبات العائلية؟",
    "Taatik": "אי אכלאת עאדה בתוכלוא באלמנאסבאת אלעאאליה?",
    "Category": "Family"
  },
  {
    "Hebrew": "מה גודל המשפחה האידיאלית? (מספר הילדים)",
    "Arabic": "شو برايك حجم العيلة المثالي؟ (عدد الاولاد)",
    "Taatik": "שו בראיכ חג'ם אלעילה אלמת'אלי? (עדד אלאולאד)",
    "Category": "Family"
  },
  {
    "Hebrew": "איך היית קורא לילדים שלך?",
    "Arabic": "شو كنت بتسمي اولادك؟",
    "Taatik": "שו כנת בתסמי אולאדכ?",
    "Category": "Family"
  },
  {
    "Hebrew": "איזה סיפורים סיפרו לך ההורים שלך שהיית קטן?",
    "Arabic": "شو في قصص اهلك حكولك اياها لما كنت صغير؟",
    "Taatik": "שו פי קצצ אהלכ חכולכ איאהא למא כנת צע'יר?",
    "Category": "Family"
  },
  {
    "Hebrew": "מה אתה אוהב לעשות עם החברים והמשפחה?",
    "Arabic": "شو بتحب تعمل مع عيلتك واصحابك؟",
    "Taatik": "שו בתחב תעמל מע עילתכ ואצחאבכ?",
    "Category": "Family"
  },
  {
    "Hebrew": "את מי הכי היית רוצה לפגוש?",
    "Arabic": "مين اكثر شخص كنت حابب تلتقي في؟",
    "Taatik": "מין אכת'ר שח'צ כנת חאבב תלתקי פי?",
    "Category": "Famous"
  },
  {
    "Hebrew": "האם יש אדם מפורסם שאתה מעריץ?",
    "Arabic": "هل في شخص مشهور انت معجب في او بتقدرو ؟",
    "Taatik": "הל פי שח'צ משהור אנת מעג'ב פי או בתקדרו ?",
    "Category": "Famous"
  },
  {
    "Hebrew": "איזה סוג אוכל אתה הכי אוהב? (איטלקי/סיני…)",
    "Arabic": "شو اكثر نوع أكل بتحبه ؟ (ايطالي/صيني…)",
    "Taatik": "שו אכת'ר נוע אכל בתחבה ? (איטאלי/ציני…)",
    "Category": "Food"
  },
  {
    "Hebrew": "מה המאכל האהוב עליך?",
    "Arabic": "شو هي أكلتك المفضلة ؟",
    "Taatik": "שו הי אכלתכ אלמפצ'לה ?",
    "Category": "Food"
  },
  {
    "Hebrew": "איזה אוכל היית רוצה לנסות?",
    "Arabic": "أي أكلة او نوع اكل بتحب تجربه ؟",
    "Taatik": "אי אכלה או נוע אכל בתחב תג'רבה ?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה אתה אוהב לבשל?",
    "Arabic": "شو بتحب تطبخ؟",
    "Taatik": "שו בתחב תטבח'?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה היית רוצה לדעת לבשל?",
    "Arabic": "شو بتحب تتعلم تطبخ؟",
    "Taatik": "שו בתחב תתעלם תטבח'?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה אתה אוהב יותר- מתוק או מלוח?",
    "Arabic": "شو بتحب اكثر - حلو ولا مالح؟",
    "Taatik": "שו בתחב אכת'ר - חלו ולא מאלח?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה אתם מעדיפים- קפה או תה?",
    "Arabic": "شو بتفضلوا- قهوة ولا شاي؟",
    "Taatik": "שו בתפצ'לוא- קהוה ולא שאי?",
    "Category": "Food"
  },
  {
    "Hebrew": "איזה אוכל אתה שונא?",
    "Arabic": "شو في اشي بتكره توكله؟",
    "Taatik": "שו פי אשי בתכרה תוכלה?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה המשקה האהוב עליך?",
    "Arabic": "شو هو مشروبك المفضل؟",
    "Taatik": "שו הו משרובכ אלמפצ'ל?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה אתה אוהב יותר - שוקולד מריר/חלב/לבן?",
    "Arabic": "شو بتحب اكثر - شوكولاطة مُرّة / حليب / بيضا ؟",
    "Taatik": "שו בתחב אכת'ר - שוכולאטה מרה / חליב / ביצ'א ?",
    "Category": "Food"
  },
  {
    "Hebrew": "אתה אוהב חריף באוכל?",
    "Arabic": "بتحب الاكل الحارّ (بحرق) ؟",
    "Taatik": "בתחב אלאכל אלחאר (בחרק) ?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה הפרי האהוב עליך?",
    "Arabic": "شو اكثر فاكهة بتحبها؟",
    "Taatik": "שו אכת'ר פאכהה בתחבהא?",
    "Category": "Food"
  },
  {
    "Hebrew": "מה אתם מעדיפים- פיצה או המבורגר?",
    "Arabic": "شو بتفضلوا- بيتسا ولا هامبرغر؟",
    "Taatik": "שו בתפצ'לוא- ביתסא ולא האמברע'ר?",
    "Category": "Food"
  },
  {
    "Hebrew": "מהו המאכל שלעולם לא תסכים/י לטעום?",
    "Arabic": "شو الاكلة الي مش ممكن تذوقو\\ تذوقيه بحياتك ؟",
    "Taatik": "שו אלאכלה אלי מש ממכן תד'וקו\\ תד'וקיה בחיאתכ ?",
    "Category": "Food"
  },
  {
    "Hebrew": "מהו החג האהוב עליך?",
    "Arabic": "شو هو عيدك المفضّل؟",
    "Taatik": "שו הו עידכ אלמפצ'ל?",
    "Category": "Holidays"
  },
  {
    "Hebrew": "איזה חג לא בדת שלך אתה הכי מחבב?",
    "Arabic": "اي عيد بعجبك من ديانة غير دينك؟",
    "Taatik": "אי עיד בעג'בכ מן דיאנה ע'יר דינכ?",
    "Category": "Holidays"
  },
  {
    "Hebrew": "מה אתם עושים במשפחה בחגים?",
    "Arabic": "شو بتعملوا مع العيلة بالأعياد؟",
    "Taatik": "שו בתעמלוא מע אלעילה באלאעיאד?",
    "Category": "Holidays"
  },
  {
    "Hebrew": "אם יכלת להמציא חג משלך- מה היו עושים בו?",
    "Arabic": "اذا قدرت تخترع عيد - شو كانوا رح يعملوا فيه؟",
    "Taatik": "אד'א קדרת תח'תרע עיד - שו כאנוא רח יעמלוא פיה?",
    "Category": "Holidays"
  },
  {
    "Hebrew": "באיזה מקומות גרת?",
    "Arabic": "بأي اماكن سكنت؟",
    "Taatik": "באי אמאכן סכנת?",
    "Category": "Home"
  },
  {
    "Hebrew": "מה המטלה בבית שאתה הכי שונא? (לנקות/לשטוף כלים/לעשות כביסה…)",
    "Arabic": "شو المهمة اللي بكره تعملها بالبيت؟ (تنظيف\\جلي\\غسيل)",
    "Taatik": "שו אלמהמה אללי בכרה תעמלהא באלבית? (תנט'יפ\\ג'לי\\ע'סיל)",
    "Category": "Home"
  },
  {
    "Hebrew": "האם גדלת באיזור עם הרבה טבע או בעיר?",
    "Arabic": "هل كبرت بمنطقة فيها كثير طبيعة أو بالمدينة؟",
    "Taatik": "הל כברת במנטקה פיהא כת'יר טביעה או באלמדינה?",
    "Category": "Home"
  },
  {
    "Hebrew": "איך יראה בית החלומות שלך ואיפה הוא יהיה?",
    "Arabic": "كيف رح يكون شكل بيت احلامك ووين رح يكون؟",
    "Taatik": "כיף רח יכון שכל בית אחלאמכ ווין רח יכונ?",
    "Category": "Home"
  },
  {
    "Hebrew": "אם יכלת לחזור בזמן- לאיזו תקופה היית חוזר?",
    "Arabic": "اذا قدرت ترجع بالزمن لأي فترة بترجع؟",
    "Taatik": "אד'א קדרת תרג'ע באלזמן לאי פתרה בתרג'ע?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם היית יכול/ה לפגוש אישיות מפורסמת, מי זה היה? על מה היית מדבר איתו?",
    "Arabic": "اذا كنت بتقدر تقابل شخصية مشهورة مين كنت بتنقي؟ وعن شو بتحكي معو؟",
    "Taatik": "אד'א כנת בתקדר תקאבל שח'ציה משהורה מין כנת בתנקי? וען שו בתחכי מעו?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם יכלת להיות מפורסם מכל סוג- במה היית בוחר? (פוליטיקאי, שחקן, מוזיקאי, ספורטאי, אמן...)",
    "Arabic": "إذا كنت بتقدر تكون مشهور بأي إشي, شو كنت بتختار؟ (خبير سياسي, ممثّل, موسيقار, رياضيّ, فنّان..)",
    "Taatik": "אד'א כנת בתקדר תכון משהור באי אשי, שו כנת בתח'תאר? (ח'ביר סיאסי, ממת'ל, מוסיקאר, ריאצ'י, פנאן..)",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם יכלת להיות הכי טוב בעולם במשהו- מה זה היה? (הכי טוב בכדורגל, הכי מצחיק, הכי חכם...)",
    "Arabic": "اذا كنت بتقدر تكون الاحسن بالعالم باشي معين- شو بكون هذا الاشي؟ (الاحسن بالعالم بالفوتبول, اكثر حدا بضحك, الاذكى (اكثر حدا ذكي)..)",
    "Taatik": "אד'א כנת בתקדר תכון אלאחסן באלעאלם באשי מעינ- שו בכון הד'א אלאשי? (אלאחסן באלעאלם באלפותבול, אכת'ר חדא בצ'חכ, אלאד'כא (אכת'ר חדא ד'כי)..)",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם היו אומרים לך שנותרו לך רק כמה חודשים לחיות. מה היית עושה?",
    "Arabic": "اذا حكولك انو ضل بس كم شهر تعيش، شو كنت بتعمل؟",
    "Taatik": "אד'א חכולכ אנו צ'ל בס כם שהר תעיש، שו כנת בתעמל?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם היית יכול/ה להיות כל חיה, מה היית ולמה?",
    "Arabic": "اذا كنت بتقدر تكون كل حيوان، شو كنت بتكون؟",
    "Taatik": "אד'א כנת בתקדר תכון כל חיואנ، שו כנת בתכונ?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם היה לך מיליון דולר, מה היית עושה?",
    "Arabic": "اذا كان معك مليون دولار شو كنت بتعمل؟",
    "Taatik": "אד'א כאן מעכ מליון דולאר שו כנת בתעמל?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "מהם שלושת הדברים שהיית לוקח/ת איתך לאי בודד?",
    "Arabic": "شو الثلاثة اشياء الي بتوخدها \\ بتوخديها معك لجزيرة نائية؟",
    "Taatik": "שו אלת'לאת'ה אשיאא אלי בתוח'דהא \\ בתוח'דיהא מעכ לג'זירה נאאיה?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "אם היית מקבל/ת מחר 3 משאלות - מה היית בוחר?",
    "Arabic": "اذا بحكولك انو بحققولك تلات امنيات، شو كنت بتختار؟",
    "Taatik": "אד'א בחכולכ אנו בחקקולכ תלאת אמניאת، שו כנת בתח'תאר?",
    "Category": "Imagine"
  },
  {
    "Hebrew": "תקופה בחיים שלך שהיית חוזר אליה?",
    "Arabic": "فترة من حياتك اللي كنت بدك ترجعلها؟",
    "Taatik": "פתרה מן חיאתכ אללי כנת בדכ תרג'עלהא?",
    "Category": "Memories"
  },
  {
    "Hebrew": "מהו המשחק שהכי אהבת בילדותך?",
    "Arabic": "اكتر لعبة حبيتها بطفولتك؟",
    "Taatik": "אכתר לעבה חביתהא בטפולתכ?",
    "Category": "Memories"
  },
  {
    "Hebrew": "איזה חפץ את/ה שומר/ת וכנראה שתשמור/י לעולם?",
    "Arabic": "اي غرض كنت بتحتفظ فيه \\ بتحتفظي فيه للابد ؟",
    "Taatik": "אי ע'רצ' כנת בתחתפט' פיה \\ בתחתפט'י פיה ללאבד ?",
    "Category": "Memories"
  },
  {
    "Hebrew": "מה אתם מעדיפים- זריחה או שקיעה?",
    "Arabic": "شو بتفضلوا- شروق او غروب",
    "Taatik": "שו בתפצ'לוא- שרוק או ע'רוב",
    "Category": "Miscellaneous"
  },
  {
    "Hebrew": "מה אתם מעדיפים- לחיות בעיר או לחיות בכפר/בטבע?",
    "Arabic": "شو بتفضلوا- تعيشوا بمدينة ولا بقرية؟",
    "Taatik": "שו בתפצ'לוא- תעישוא במדינה ולא בקריה?",
    "Category": "Miscellaneous"
  },
  {
    "Hebrew": "מה הנוף הכי יפה לדעתך? (ערים יפות / ים / הרים / יערות וכו')",
    "Arabic": "شو احلى منظر برأيك؟ (بلاد حلوة, بحر, جبال, غابات والخ..)",
    "Taatik": "שו אחלא מנט'ר בראיכ? (בלאד חלוה, בחר, ג'באל, ע'אבאת ואלח'..)",
    "Category": "Miscellaneous"
  },
  {
    "Hebrew": "אם יש מזג אוויר טוב בחוץ ויש לך זמן, לאן תרצה ללכת?",
    "Arabic": "لو الطقس برّا حلو ومعك وقت, وين بتحب تروح؟",
    "Taatik": "לו אלטקס ברא חלו ומעכ וקת, וין בתחב תרוח?",
    "Category": "Miscellaneous"
  },
  {
    "Hebrew": "האם יש סדרות זרות שאתה אוהב ובאיזו שפה? (אנגלית, ספרדית, טורקית, קוריאנית…)",
    "Arabic": "في مسلسلات اجنبية معينة بتحبها؟ وبأي لغة؟ (انجليزي, اسباني, تركي, كوري..)",
    "Taatik": "פי מסלסלאת אג'נביה מעינה בתחבהא? ובאי לע'ה? (אנג'ליזי, אסבאני, תרכי, כורי..)",
    "Category": "Movies & TV"
  },
  {
    "Hebrew": "סרטים או סדרות טלוויזיה?",
    "Arabic": "أفلام او مسلسلات بالتلفزيون؟",
    "Taatik": "אפלאם או מסלסלאת באלתלפזיונ?",
    "Category": "Movies & TV"
  },
  {
    "Hebrew": "איזה סוג סרטים אתה הכי אוהב? (קומדיה, דרמה, אימה, אקשן…)",
    "Arabic": "شو اكثر نوع أفلام بتحب؟ (كوميدية, دراما, رعب, اكشن..)",
    "Taatik": "שו אכת'ר נוע אפלאם בתחב? (כומידיה, דראמא, רעב, אכשן..)",
    "Category": "Movies & TV"
  },
  {
    "Hebrew": "מה הסרט האהוב עליך?",
    "Arabic": "شو هو فيلمك المفضل؟",
    "Taatik": "שו הו פילמכ  אלמפצ'ל?",
    "Category": "Movies & TV"
  },
  {
    "Hebrew": "תן דוגמא של שחקן קולנוע או בטלוויזיה שאתה מאוד אוהב?",
    "Arabic": "اعطي مثال لممثل سينمائي (بالافلام) او تلفزيوني (بالمسلسلات) كثير بتحبه؟",
    "Taatik": "אעטי מת'אל לממת'ל סינמאאי (באלאפלאמ) או תלפזיוני (באלמסלסלאת) כת'יר בתחבה?",
    "Category": "Movies & TV"
  },
  {
    "Hebrew": "איזה מוזיקה אתה אוהב לשמוע?",
    "Arabic": "أي موسيقى بتحب تسمع؟",
    "Taatik": "אי מוסיקא בתחב תסמע?",
    "Category": "Music"
  },
  {
    "Hebrew": "איזה הופעה של זמר/להקה הכי היית רוצה לראות?",
    "Arabic": "حفلة أي مغني/ة او فرقة بتحب تحضرها ؟",
    "Taatik": "חפלה אי מע'ני/ה או פרקה בתחב תחצ'רהא ?",
    "Category": "Music"
  },
  {
    "Hebrew": "על איזה כלי נגינה היית רוצה לנגן? (גיטרה, פסנתר, תופים…)",
    "Arabic": "على أي آلة عزف جاي على بالك تعزف؟ (چيتارة, بيانو, طبول …)",
    "Taatik": "עלא אי אٓלה עזף ג'אי עלא באלכ תעזפ? (גיתארה, ביאנו, טבול …)",
    "Category": "Music"
  },
  {
    "Hebrew": "מה אתה אוהב לראות בטלוויזיה?",
    "Arabic": "شو بتحب تحضر في التلفزيون؟",
    "Taatik": "שו בתחב תחצ'ר פי אלתלפזיונ?",
    "Category": "Music"
  },
  {
    "Hebrew": "מהו השיר האהוב עליך?",
    "Arabic": "شو الاغنية المفضلة عندك؟",
    "Taatik": "שו אלאע'ניה אלמפצ'לה ענדכ?",
    "Category": "Music"
  },
  {
    "Hebrew": "אתה קורא/רואה חדשות בדרך כלל או לא?",
    "Arabic": "انت بتشوف او تقرا اخبار بشكل عام او لا؟",
    "Taatik": "אנת בתשוף או תקרא אח'באר בשכל עאם או לא?",
    "Category": "Personal"
  },
  {
    "Hebrew": "צבע אהוב עליך?",
    "Arabic": "لون بتحبه؟",
    "Taatik": "לון בתחבה?",
    "Category": "Personal"
  },
  {
    "Hebrew": "האם יש ציטוט שאתה אוהב במיוחד?",
    "Arabic": "هل في اقتباس معين اللي بتحبه كثير؟",
    "Taatik": "הל פי אקתבאס מעין אללי בתחבה כת'יר?",
    "Category": "Personal"
  },
  {
    "Hebrew": "שם שאתה אוהב?",
    "Arabic": "اسم انت بتحبه؟",
    "Taatik": "אסם אנת בתחבה?",
    "Category": "Personal"
  },
  {
    "Hebrew": "אתה בדרך כלל מבזבז או חוסך כסף?",
    "Arabic": "انت بشكل عام بتبذر ولا بتوفر مصاري؟",
    "Taatik": "אנת בשכל עאם בתבד'ר ולא בתופר מצארי?",
    "Category": "Personal"
  },
  {
    "Hebrew": "אתה בדרך כלל מקדים או מאחר לדברים (עבודה, לימודים, פגישות…) ?",
    "Arabic": "بالعادة بتتأخّر ولا بتبكّر على المواعيد؟ (شغل, تعليم, لقاءات)",
    "Taatik": "באלעאדה בתתאח'ר ולא בתבכר עלא אלמואעיד? (שע'ל, תעלים, לקאאאת)",
    "Category": "Personal"
  },
  {
    "Hebrew": "מהם שמות החיבה שלך?",
    "Arabic": "شو القابك؟",
    "Taatik": "שו אלקאבכ?",
    "Category": "Personal"
  },
  {
    "Hebrew": "מה הדבר שתמיד רצית לעשות אבל עדיין לא הספקת?",
    "Arabic": "شو الاشي اللي دايما بدك تعملو بس بعدك مش عاملو؟",
    "Taatik": "שו אלאשי אללי דאימא בדכ תעמלו בס בעדכ מש עאמלו?",
    "Category": "Personal"
  },
  {
    "Hebrew": "הבית שלך עולה באש. מה הדבר הראשון שאת/ה מציל/ה?",
    "Arabic": "اذا بيتك عم يحترق، شو اول شي بتنقذو؟",
    "Taatik": "אד'א ביתכ עם יחתרק، שו אול שי בתנקד'ו?",
    "Category": "Personal"
  },
  {
    "Hebrew": "איפה את/ה רואה את עצמך 10 שנים מהיום?",
    "Arabic": "وين بتشوف\\ بتشوفي حالك بعد 10 سنين من اليوم ؟",
    "Taatik": "וין בתשופ\\ בתשופי חאלכ בעד 10 סנין מן אליום ?",
    "Category": "Personal"
  },
  {
    "Hebrew": "ספר משהו שאנשים לא יודעים עליך",
    "Arabic": "احكي اشي الناس ما بتعرفوا عنك",
    "Taatik": "אחכי אשי אלנאס מא בתערפוא ענכ",
    "Category": "Personal"
  },
  {
    "Hebrew": "מה מפחיד אותך?",
    "Arabic": "شو الي بخفوك ؟",
    "Taatik": "שו אלי בח'פוכ ?",
    "Category": "Personal"
  },
  {
    "Hebrew": "על מה בחייך את/ה אסיר/ת תודה ביותר?",
    "Arabic": "اكتر شي انت ممتنه الو ( ممتنه له ) بيحاتك ؟",
    "Taatik": "אכתר שי אנת ממתנה אלו ( ממתנה לה ) ביחאתכ ?",
    "Category": "Personal"
  },
  {
    "Hebrew": "מה אתה אוהב יותר- קיץ / חורף / סתיו / אביב ?",
    "Arabic": "شو بتحب اكثر اشي (صيف \\ شتاء \\ خريف \\ ربيع؟)",
    "Taatik": "שו בתחב אכת'ר אשי (ציפ \\ שתאא \\ ח'ריפ \\ רביע?)",
    "Category": "Seasons"
  },
  {
    "Hebrew": "האם יש ספורט שאתה אוהב לעשות? איזה?",
    "Arabic": "في نوع رياضة بتحب تمارسها؟ اذا اه, اي نوع؟",
    "Taatik": "פי נוע ריאצ'ה בתחב תמארסהא? אד'א אה, אי נוע?",
    "Category": "Sport"
  },
  {
    "Hebrew": "איזה ספורט אתה אוהב לראות?",
    "Arabic": "شو نوع الرياضة اللي بتحب تتابعها؟",
    "Taatik": "שו נוע אלריאצ'ה אללי בתחב תתאבעהא?",
    "Category": "Sport"
  },
  {
    "Hebrew": "איזה קבוצה או שחקן ספורט אתה אוהב?",
    "Arabic": "اي فريق او لاعب بتحب؟",
    "Taatik": "אי פריק או לאעב בתחב?",
    "Category": "Sport"
  },
  {
    "Hebrew": "איזה מקצועות למדת/אתה לומד בבית ספר? מה אהבת ומה לא אהבת?",
    "Arabic": "اي مواضيع تعلمت\\بتتعلم بالمدرسة؟ شو حبيت وشو محبيتش؟",
    "Taatik": "אי מואצ'יע תעלמת\\בתתעלם באלמדרסה? שו חבית ושו מחביתש?",
    "Category": "Study"
  },
  {
    "Hebrew": "מה היית רוצה ללמוד?",
    "Arabic": "شو حابب تتعلم؟",
    "Taatik": "שו חאבב תתעלמ?",
    "Category": "Study"
  },
  {
    "Hebrew": "מה לא היית רוצה ללמוד?",
    "Arabic": "شو مش حابب تتعلم؟",
    "Taatik": "שו מש חאבב תתעלמ?",
    "Category": "Study"
  },
  {
    "Hebrew": "באיזה אפליקציות אתה משתמש הכי הרבה?",
    "Arabic": "شو اكثر تطبيق بتستعمله بالتلفون؟",
    "Taatik": "שו אכת'ר תטביק בתסתעמלה באלתלפונ?",
    "Category": "Technology"
  },
  {
    "Hebrew": "באיזה אתרים אתה אוהב לגלוש?",
    "Arabic": "شو هي اكثر مواقع بتحب تتصفحها؟",
    "Taatik": "שו הי אכת'ר מואקע בתחב תתצפחהא?",
    "Category": "Technology"
  },
  {
    "Hebrew": "תן שם של משחק מחשב שמאוד אהבת- מהילדות או מהשנים האחרונות",
    "Arabic": "اعطي اسم لعبة عالحاسوب اللي كثير حبيتها بالفترة الاخيرة او بطفولتك",
    "Taatik": "אעטי אסם לעבה עאלחאסוב אללי כת'יר חביתהא באלפתרה אלאח'ירה או בטפולתכ",
    "Category": "Technology"
  },
  {
    "Hebrew": "חופשה מבחינתך זה לנוח ולהתפנק או לצאת ולעשות דברים?",
    "Arabic": "العطلة بالنسبة الك هي راحة ودلال ولا تطلع وتعمل شغلات؟",
    "Taatik": "אלעטלה באלנסבה אלכ הי ראחה ודלאל ולא תטלע ותעמל שע'לאת?",
    "Category": "Vacations"
  },
  {
    "Hebrew": "מה החופשה המושלמת לדעתך?",
    "Arabic": "ايش هي العطلة المثالية حسب رايك؟",
    "Taatik": "איש הי אלעטלה אלמת'אליה חסב ראיכ?",
    "Category": "Vacations"
  },
  {
    "Hebrew": "אם אתה עובד- מה אתה אוהב בעבודה שלך ומה אתה לא אוהב?",
    "Arabic": "بتشتغل؟ شو بتحب بشغلك وشو بتحبش؟",
    "Taatik": "בתשתע'ל? שו בתחב בשע'לכ ושו בתחבש?",
    "Category": "Work"
  },
  {
    "Hebrew": "באיזה עבודה היית רוצה לעבוד?",
    "Arabic": "بأي شغل كنت بتحب تشتغل؟",
    "Taatik": "באי שע'ל כנת בתחב תשתע'ל?",
    "Category": "Work"
  },
  {
    "Hebrew": "באיזה עבודה לא היית רוצה לעבוד?",
    "Arabic": "باي شغل مكنتش بتشتغل؟",
    "Taatik": "באי שע'ל מכנתש בתשתע'ל?",
    "Category": "Work"
  },
  {
    "Hebrew": "מה הייתה העבודה הראשונה בחייך?",
    "Arabic": "شو اول شغل كان الك بحياتك ؟",
    "Taatik": "שו אול שע'ל כאן אלכ בחיאתכ ?",
    "Category": "Work"
  },
  {
    "Hebrew": "אם היית יכול/ה להגיע לכל מקום בעולם, לאן היית הולך/ת?",
    "Arabic": "اذا فيك\\ فيكي توصلي لكل مكان بالعالم ؟ لوين كنت بتروح \\ بتروحي ؟",
    "Taatik": "אד'א פיכ\\ פיכי תוצלי לכל מכאן באלעאלם ? לוין כנת בתרוח \\ בתרוחי ?",
    "Category": "World"
  },
  {
    "Hebrew": "איזו שפה היית רוצה ללמוד?",
    "Arabic": "اي لغة حابب انك تتعلم؟",
    "Taatik": "אי לע'ה חאבב אנכ תתעלמ?",
    "Category": "World"
  },
  {
    "Hebrew": "באיזה מדינה היית רוצה לגור?",
    "Arabic": "بأي دولة حابب انك تسكن؟",
    "Taatik": "באי דולה חאבב אנכ תסכנ?",
    "Category": "World"
  }
]
const dataSimple = JSON.parse(JSON.stringify(dataJsonSimple))
