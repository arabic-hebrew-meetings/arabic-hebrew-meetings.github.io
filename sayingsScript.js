var past = [];
function getItem(){
    if (past.length == text.length) {
        past = [];
    }
    while (true) {
        var i = Math.floor(Math.random() * text.length);
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
    document.getElementById("text").innerHTML = text[i];
}

var text = [
    "بيبني قصور في الرّمل<br><br>ביבני קצור פי א(ל)רמל<br><br>bibni ksur fi e(l)rramel<br><br>תרגום: בונה ארמונות בחול<br><br>משמעות: מקווה לדברים \ מתעסק בדברים שאין להם אחיזה במציאות, אין להם סיכוי להתגשם",
    "بيحلب النّملة<br><br>ביחלב א(ל)נמלה<br><br>bihleb e(l)nnamle<br><br>תרגום: חולב את הנמלה<br><br>משמעות: שימוש 1- נאמר על אדם המנסה לעשות דבר בלתי אפשרי<br><br>שימוש 2- נאמר על אדם קמצן",
    "الشّاي حلو زيّ المرة والقهوة مرّة زيّ امّ المرة<br><br>א(ל)שאי חלו זי אלמרה ואלקהוה מרה זי אם אלמרה<br><br>e(l)sshay hilu zayy elmara uelkahawe murra zayy umm elmara<br><br>תרגום: התה מתוק כמו האישה והקפה מרה כמו אם (אמא של) האישה<br>(קפה- נקבה בערבית)<br><br>משמעות: ב'שבח' הקשר בין חמה לחתן שלה <br>(שבח במרכאות כמובן, הכוונה- בגנות)",
    "جارك القريب ولا أخوك البعيد<br><br>ג'ארכ אלקריב ולא אח'וכ אלבעיד<br><br>garak elkarib wala akhuk elbaid<br><br>תרגום: שכנך הקרוב ולא אחיך הרחוק<br><br>('משמעות: כמו בעברית, 'טוב שכן קרוב מאח רחוק' (משלי כ''ז, י",
    "عصفور في الايد ولا عشرة ع الشّجرة <br><br>עצפור פי אלאיד ולא עשרה ע א(ל)שג'רה<br><br>Asfur fi(e)l'id wula ashara a e(l)sshagara <br><br>תרגום: ציפור ביד ולא עשר על העץ<br><br>'משמעות: כמו בעברית: 'ציפור אחת ביד עדיפה משתיים על העץ",
    "شايف الدّيك أرنب <br><br>שאיפ א(ל)דיכ ארנב<br><br>Shayef e(l)ddik arnab <br><br>תרגום: רואה (את) התרנגול ארנב<br><br>(משמעות: נאמר על אדם שמרוב עייפות לא רואה כלום (ואת התרנגול רואה כאילו הוא ארנב",
    "قول قليلاً واعمل كثيراً<br><br>קול קלילא(ן) ואעמל כת'ירא(ן)<br><br>kul kalilan ue'emal kthiran<br><br>תרגום: אמור מעט ועשה הרבה<br><br>(משמעות: כמו בעברית: 'אֱמֹר מְעַט וַעֲשֵׂה הַרְבֵּה' (מסכת אבות, א', ט''ו",
    "لا حول ولا قوة الا بالله <br><br>לא חול ולא קוה אלא באללה<br><br>La hawla wala kuwa ila billah <br><br>תרגום: לא חיל ולא כח אלא בא-לוקים<br><br>('משמעות: מקביל לעברית- 'לֹא בְחַיִל וְלֹא בְכֹחַ כִּי אִם בְּרוּחִי אָמַר ה' צְבָאוֹת' (זכריה ד', ו<br><br>'...בשימוש במקרים בהם רוצים לומר 'מה יש בכוחנו לעשות?! ה' גדול",
    "اسأل مجرّب ولا تسأل حكيم<br><br>אסאל מג'רב ולא תסאל חכים<br><br>Es'al mgarreb wala tis'al hakim<br><br>תרגום: שאל (את ה) מנוסה ואל תשאל (את ה) חכם<br><br>'משמעות: כמו בעברית 'אין חכם כבעל ניסיון",
    "الحذر يمنع الخطر<br><br>אלחד'ר ימנע אלח'טר<br><br>elhathar imna elkhatar<br><br>תרגום: הזהירות \ העירנות ימנע (מונעת) סכנה<br><br>משמעות: פשוטו כמשמעו- הזהר \ היה עירני וכך תשמר מן הסכנה",
    "الّي بدّو يسكر ما بيعدّش قداح <br><br>אלי בדו יסכר מא ביעדש קדאח<br><br>illi biddo iskar ma biiddesh kdah <br><br>תרגום: מי שרוצה להשתכר (מלשון שוכרה, מיין) לא סופר (את ה) כוסיות<br><br>משמעות: אם כבר אתה עושה משהו, תעשה אותו עד הסוף בלי להתקמצן",
    "بعيد عن العين, بعيد عن القلب<br><br>בעיד ען אלעין, בעיד ען אלקלב<br><br>Baid an el'en, baid an elkalb <br><br>תרגום: רחוק מהעין רחוק מהלב<br><br>משמעות: כמו בעברית",
    "اقعد برّة ولا تقعد جمب الجرّة <br><br>אקעד ברה ולא תקעד ג'מב אלג'רה<br><br>Uk'ud barra wala tuk'ud gamb elgarra <br><br>תרגום: שב בחוץ ואל תשב ליד הכד <br><br>משמעות: לפעמים לא שווה להיות 'קרוב לצלחת' כי אז כולם יבואו אליך בבקשות",
    "مرة بشنب<br><br>מרה בשנב<br><br>Mara beshanab <br><br>תרגום: אישה בשפם<br><br>משמעות: אישה עם שפם<br><br>שימוש 1- לאישה שהיא ה'גבר' בבית <br><br>שימוש 2- לגבר שהוא ה'אישה' בבית",
    "المستحيل كلمة في قاموس المجانين<br><br>אלמסתחיל כלמה פי קאמוס אלמג'אנין<br><br>Elmustahil kilme fi kamus elmaganin <br><br>תרגום: הבלתי אפשרי (היא) מילה במילון המשוגעים<br><br>משמעות: אין דבר שהוא בלתי אפשרי",
    "مش كلّ يوم أكلة زلابية<br><br>מש כל יום אכלת זלאביה<br><br>Mish kull yom aklat zalabye<br><br>(תרגום: לא כל יום- אכילת זלאביה (מין מאפה מתוק <br><br>'משמעות: כמו בעברית 'לא כל יום פורים",
    "بتقول له ثور،  بيقول لك احلبه <br><br>בתקול לו ת'ור, ביקול לכ אחלבו<br><br>Bitkul lo thor, bikul lak ihilbo<br><br>תרגום: אתה אומר לו: שור, הוא אומר לך 'חלוב אותו'. <br><br>משמעות: משל לאדם המבקש לעשות דבר בלתי אפשרי. <br><br>(הרי לא ניתן לחלוב שור)",
    "الحرامي ع راسه ريشة<br><br>אלחראמי ע ראסו רישה<br><br>Elharami a raso reshe <br><br>תרגום: הגנב על ראשו נוצה<br><br>'משמעות: כמו בעברית,  'על ראש הגנב בוער הכובע",
    "شايف الدّيك أرنب <br><br>שאיפ א(ל)דיכ ארנב<br><br>Shayef e(l)ddik arnab <br><br>תרגום: רואה (את) התרנגול ארנב<br><br>(משמעות: נאמר על אדם שמרוב עייפות לא רואה כלום (ואת התרנגול רואה כאילו הוא ארנב",
    "كلّ قبيلة فيها هبيلة<br><br>כל קבילה פיהא הבילה<br><br>kull kabile fiha habile <br><br>תרגום: כל שבט (נקבה בערבית),  יש בה טפשה<br><br>משמעות: אין משפחה 'מושלמת',  אין בית בלי חור ביוב",
    "قال: ليش الطّنجرة هدّت؟ قالت: لأنّه امّك عدّت<br><br>קאל:  ליש א(ל)טנג'רה הדת? קאלת: לאנו אמכ עדת<br><br>Kal: lesh e(l)ttangara haddat? Kalat:  laenno immak addat <br><br>תרגום: אמר: למה הסיר / התבשיל נרגעה? אמרה: כיוון שאמך עברה.<br><br>הסבר לתרגום- גבר שואל את אשתו למה היא לא מבשלת,  והיא אומרת שזה בגלל אמא שלו. <br><br>משמעות: ב'שבח' הקשר בין כלה לחמותה",
    "بدّك الحقّ ولّا ابن عمّه<br><br>בדכ אלחק ולא אבן עמו<br><br>Biddak elhakk willa iben ammo<br><br>תרגום: ברצונך (לשמוע את) האמת או את בן דודו?<br><br>)(אמת- حقّ- חק- hakk - זכר בערבית<br><br>.משמעות: אדם אומר זאת למי שלא מאמין לדבריו",
    "القرد بعين امّه غزال<br><br>אלקרד בעין אמו ע'זאל<br><br>Elkird be'en immoz ghazal <br><br>תרגום: הקוף בעין אמו - צבי<br><br>.משמעות: פשוטו כמשמעו, גם אם הילד מכוער, בעיני אימו הוא יפה",
    "مثل الملح, ما حداش بيستغني عنّه<br><br>מת'ל אלמלח, מא חדאש ביסתע'ני ענו<br><br>mithel elmileh, ma hadash bistaghni anno<br><br>תרגום: כמו המלח, אף אחד לא מוותר עליו<br><br>.משמעות: פשוטו כמשמעו, נאמר על אדם \ דבר שלא ניתן לוותר עליו",
    "الّي مش عاجبه يرقّص حواجبه<br><br>אלי מש עאג'בו ירקצ חואג'בו<br><br>illi mish agbo yerakkes hawagbo<br><br>תרגום: מי שלא מוצא חן בעיניו (ש)ירקיד את גבותיו<br><br>'משמעות: בשפה פשוטה - מי שלא מוצא חן בעיניו ש'יקפוץ לי",
    "الكبير حيطه سور، وعيبه مستور<br><br>אלכביר חיטו סור, ועיבו מסתור<br><br>elkbir heto sur uebo mastur <br><br>תרגום: הגדול- קירו חומה, ופגמו/ בושתו (הפגם / הבושה שלו) מוסתר<br><br>('משמעות: נאמר על ידי העני אודות העשיר המצליח. (משמע: 'הוא לא כזה מוצלח, פשוט כל הפגמים מוסתרים"
];