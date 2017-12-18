var past = [];
function getItem(){
    if (past.length == hebrew.length) {
        past = [];
    }
    while (true) {
        var i = Math.floor(Math.random() * hebrew.length);
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
    document.getElementById("hebrewText").innerHTML = hebrew[i];
	document.getElementById("arabicText").innerHTML = arabic[i];
    document.getElementById("taaticText").innerHTML = taatic[i];
}

var hebrew = [
"?מה הספר האחרון שקראת",
"?אם היית יכול/ה לעבוד בכל מקצוע, באיזה מקצוע זה היה",
"?אם היית יכול לתת לילד עצה אחת לחיים- מה היית אומר",
"?כלבים או חתולים",
"?מהם שמות החיבה שלך",
"?מה הדבר שתמיד רצית לעשות אבל עדיין לא הספקת",
"?אם היו אומרים לך שנותרו לך רק כמה חודשים לחיות. מה היית עושה",
"?אם היית יכול/ה להיות כל חיה, מה היית ולמה",
"?אם היה לך מיליון דולר, מה היית עושה",
"ספר משהו שאנשים לא יודעים עליך",
"?אם היית יכול/ה לפגוש אישיות מפורסמת, מי זה היה? על מה היית מדבר איתו",
"?הבית שלך עולה באש. מה הדבר הראשון שאת/ה מציל/ה",
"?אם היית יכול/ה להגיע לכל מקום בעולם, לאן היית הולך/ת",
"?איפה את/ה רואה את עצמך 10 שנים מהיום",
"?מה הדבר שהכי היית רוצה לעשות ולמה",
"?מהו הדבר שאתה הכי מעריך/ה אצל אנשים/ חברים",
"?מה היית רוצה ללמוד ולמה",
"?האם היית רוצה להתפרסם ואם כן בזכות מה",
"?איזו שעה של היום את/ה מעדיף/ה ולמה",
"?על איזו תקופה בחייך היית חוזר/ת ולמה",
"?מהו המשחק שהכי אהבת בילדותך",
"?מיהי הדמות שהשפיעה עליך ביותר וכיצד",
"?מהם שלושת הדברים שהיית לוקח/ת איתך לאי בודד",
"(לו היית יכול/ה להתעורר מחר בבוקר בגופו של אדם אחר, האם היית עושה זאת? ובמי היית בוחר/ת? (רק הגוף משתנה",
"?מה הייתה העבודה הראשונה בחייך? ובאיזה גיל זה היה",
"?מהו הדבר הראשון שאת/ה עושה בבוקר? ומהי המחשבה הראשונה שעולה לך בבוקר ממוצע",
"?מה הדבר הכי חשוב שקרה לך בשנה האחרונה",
"?אם היית חייב להחליף שם, איזה שם היית בוחר לעצמך",
"?מהו הדבר המטורף/ משוגע/ הזוי/ חריג/ משונה שעשית בחייך",
"?אם היית מקבל/ת מחר 3 משאלות - מה היית בוחר"
];

var arabic = [
"شو اخر كتاب قرأته؟",
"اذا كنت بتقدر تشتغل بكل موضوع بأي موضوع كنت بتشتغل؟",
"اذا كنت بدك تعطي لولد نصيحة واحدة للحياة شو كنت بتقوله؟",
"بساس ولا كلاب؟",
"شو القابك؟",
"شو الاشي اللي دايما بدك تعملو بس بعدك مش عاملو؟",
"اذا حكولك انو ضل بس كم شهر تعيش، شو كنت بتعمل؟",
"اذا كنت بتقدر تكون كل حيوان، شو كنت بتكون؟",
"اذا كان معك مليون دولار شو كنت بتعمل؟",
"احكي اشي الناس ما بتعرفوا عنك",
"اذا كنت بتقدر تقابل شخصية مشهورة مين كنت بتنقي؟ وعن شو بتحكي معو؟",
"اذا بيتك عم يحترق، شو اول شي بتنقذو؟",
"اذا فيك\ فيكي توصلي لكل مكان بالعالم ؟ لوين كنت بتروح \ بتروحي ؟",
"وين بتشوف\ بتشوفي حالك بعد 10 سنين من اليوم ؟",
"شو اكتر شي كنت بدك تعلمو\ تعمليه وليش؟",
"شو اكثر اشي بتقدرو عند ناس/صحاب؟",
"شو كنت بتحب تتعلم وليش؟",
"هل كنت بدك تصير مشهور\ مشهوره ؟ واذا اه , بشو؟",
"اي ساعة باليوم انت بتفضل \ بتفضلي وليش؟",
"على اي فترة بحياتك كنت بترجع\ بترجعي وليش؟",
"اكتر لعبة حبيتها بطفولتك؟",
"شو اكتر شخصية أثرت فيك وكيف؟",
"شو الثلاثة اشياء الي بتوخدها \ بتوخديها معك لجزيرة نائية؟",
"(اذا كان فيك \فيكي تصحي بكرا الصبح بجسم بني ادم ثاني , هل كنت بتعملو \ بتعمليه ؟ وبمين كنت بتختار\ بتختاري ؟ ( فقط الجسم بتغير ",
"شو اول شغل كان الك بحياتك ؟ وبأي جيل كان؟",
"ايش الاشي الاول الي بتعملو او ( الي بتسويه ) في صبح ؟ وشو اول فكرة بتيجي او ( بتخطر) على بالك؟",
"شو اكتر اشي مهم صار معك بالسنة الاخيرة؟",
"اذا كنت لازم تتغير الاسم تبعتك , اي اسم تخود؟",
"شو الاشي المجنون/ خاص/ غريب? اللي عملتو بحياتك؟",
"اذا بحكولك انو بحققولك تلات امنيات، شو كنت بتختار؟"
];

var taatic = [
"?שו אח׳ר כתאב קראתו",
"?אד׳א כנת בתקדר תשתר׳ל בכל מוד׳וע, באיי מוד׳וע כנת בתשתרל",
"?אד׳א כנת בדכ תעטי לולד נס׳יחה ואחדה ללחיאה שו כנת בתקולו",
"?בסאס ולא כלאב",
"?שו אלקאבכ",
"?שו אלאשי אללי דאימן בדכ תעמלו בס בעדכ מש עאמלו",
"?אד׳א חכולכ אנו ד׳ל בס כם שהר תעיש, שו כנת בתעמל",
"?אד׳א כנת בתקדר כתון כל חיואן, שו כנת בתכון",
"?אד׳א כאן מעכ מליון דולאר שו כנת בתעמל",
"אחכי אשי אלנאס מא ביתערפו ענכ",
"?אד׳א כנת בתקדר תקאבל שח׳ס׳יה משהורה מין כנת בתלקי? וען שו בתחכי מעו",
"?אד׳א ביתכ עם יתחרק, שו אול שי בתנקד׳ו",
"?אד׳א פיכ\פיכי תוס׳לי לכל מכאן באלעאלם, לוין כנת בתרוח\בתרוחי",
"?וין בתשופ\בתשופי חאלכ בעד 10 סנין מן אליום",
"?שו אכתר שי כנת בדכ תעמלו וליש",
"?שו אכתר אשי בתקדרו ענד נאס/ס׳חאב",
"?שו כנת בתחב תתעלם וליש",
"?הל כנת בדכ תס׳יר משהור\משהורה? ואד׳א אה, בשו",
"?אי סאעה באליום אנת בתפד׳ל וליש",
"?עלא אי פתרה בחיאתכ כנת בתרג׳ע וליש",
"?אכתר לעבה חביתהא בטפולתכ",
"?שו אכתר שח׳ס׳יה את׳רת פיכ וכיפ",
"?שו אלתלאתה אשיאא׳ אללי בתוח׳דהא מעכ לג׳זירה נאא׳יה",
"(אד׳א כאן פיכ תס׳חי בכרא אלס׳בח בג׳סם בני אדם תאני, מין כנת בתח׳תאר? ( פקט אלג׳סם בתר׳יר ",
"?שו אול שר׳ל כאן אלכ בחיאתכ? ובאי ג׳יל כאן",
"?איש אלאשי אלאול אללי בתעמלו פי ס׳בח? ושו אול פכרה בתיגי עלא באלכ",
"?שו אכתר אשי מהם ס׳אר מעכ באלסנה אלאח׳ירה",
"?אד׳א כנת לאזם תתר׳יר אלאסם תבעתכ, אי אסם תח׳וד",
"?שו אלאשי אלמג׳נון, ח׳אס׳, ר׳ריב אללי עמלתו בחיאתכ",
"?אד׳א בחכולכ אנו בחקקולכ תלאת אמניאת, שו כנת בתח׳תאר"
];