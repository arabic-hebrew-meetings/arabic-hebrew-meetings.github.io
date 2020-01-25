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
        <h2 class="rtl" id="taatikText"></h2>
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
    "Hebrew": "אַגָּדָה",
    "Arabic": "أُسْطُورَة",
    "Taatik": "אֻסְטוּרַה",
    "Taatik-English": "2us-t׳uu-ra"
  },
  {
    "Hebrew": "אדום",
    "Arabic": "أَحْمَر",
    "Taatik": "אַחְמַר",
    "Taatik-English": "2ah׳-mar"
  },
  {
    "Hebrew": "אוֹפַנַּיִים",
    "Arabic": "بِسِكْلِيت",
    "Taatik": "בִּסִכְּלֵית",
    "Taatik-English": "bi-sik-leit"
  },
  {
    "Hebrew": "אוצר",
    "Arabic": "كنز",
    "Taatik": "כַּנְז",
    "Taatik-English": "kanz"
  },
  {
    "Hebrew": "אִי",
    "Arabic": "جَزِيرِة",
    "Taatik": "גַ׳זִירֵה",
    "Taatik-English": "ja-zii-re"
  },
  {
    "Hebrew": "אפליקציה",
    "Arabic": "تطبيق",
    "Taatik": "תַטְבִּיק",
    "Taatik-English": "tat׳-biiq"
  },
  {
    "Hebrew": "אֲרוּחָה",
    "Arabic": "وَجْبِة",
    "Taatik": "וַגְ׳בֵּה",
    "Taatik-English": "waj-be"
  },
  {
    "Hebrew": "בדיחה",
    "Arabic": "نكتة",
    "Taatik": "נֻכְּתֵה",
    "Taatik-English": "nuk-te"
  },
  {
    "Hebrew": "בֵּית חוֹלִים",
    "Arabic": "مستشفى",
    "Taatik": "מֻסְתַשְפַא",
    "Taatik-English": "mus-tash-fa"
  },
  {
    "Hebrew": "מִסְעָדָה",
    "Arabic": "مَطْعَم",
    "Taatik": "מַטְעַם",
    "Taatik-English": "mat׳-3am"
  },
  {
    "Hebrew": "בלונדיני",
    "Arabic": "أَشْقَر",
    "Taatik": "אַשְקַר",
    "Taatik-English": "2ash-qar"
  },
  {
    "Hebrew": "בִּנְיָין",
    "Arabic": "عَمَارَة",
    "Taatik": "עַמַארַה",
    "Taatik-English": "3a-maa-ra"
  },
  {
    "Hebrew": "בּרח",
    "Arabic": "هرب",
    "Taatik": "הַרַבּ",
    "Taatik-English": "ha-rab"
  },
  {
    "Hebrew": "ג׳ירפה",
    "Arabic": "زرافة",
    "Taatik": "זַרַאפֵה",
    "Taatik-English": "za-raa-fe"
  },
  {
    "Hebrew": "גבינה",
    "Arabic": "جِبْنِة",
    "Taatik": "גִ׳בְּנֵה",
    "Taatik-English": "jib-ne"
  },
  {
    "Hebrew": "גיבור",
    "Arabic": "بَطَل",
    "Taatik": "בַּטַל",
    "Taatik-English": "ba-t׳al"
  },
  {
    "Hebrew": "גְּלִידָה",
    "Arabic": "بُوظَة",
    "Taatik": "בּוּטַ׳ה",
    "Taatik-English": "buu-z׳a"
  },
  {
    "Hebrew": "גן חיות",
    "Arabic": "حديقة الحيوانات",
    "Taatik": "חַדִיקַת אֵלְחַיוַאנַאת",
    "Taatik-English": "h׳aa-dii-qat el-h׳ay-waa-naat"
  },
  {
    "Hebrew": "גֶּשֶׁם",
    "Arabic": "buu-z׳a",
    "Taatik": "שִתַא",
    "Taatik-English": "shi-ta"
  },
  {
    "Hebrew": "הופעה",
    "Arabic": "حَفْلِة",
    "Taatik": "חַפְלֵה",
    "Taatik-English": "h׳af-le"
  },
  {
    "Hebrew": "הפתעה",
    "Arabic": "مفاجأة",
    "Taatik": "מֻפַאגַ׳אַה",
    "Taatik-English": "mu-faa-ja-2a"
  },
  {
    "Hebrew": "הִצִיל",
    "Arabic": "أنقذ",
    "Taatik": "אַנְקַד׳",
    "Taatik-English": "2an-qadh"
  },
  {
    "Hebrew": "הר",
    "Arabic": "جبل",
    "Taatik": "גַ׳בַּל",
    "Taatik-English": "ja-bal"
  },
  {
    "Hebrew": "זָהָב",
    "Arabic": "ذَهَب",
    "Taatik": "דַ׳הַבּ",
    "Taatik-English": "dha-hab"
  },
  {
    "Hebrew": "זיקוקים",
    "Arabic": "أَلْعَاب نَارِيِّه",
    "Taatik": "אַלְעַאבּ נַארִיֵّה",
    "Taatik-English": "2al-3aab na-riy-ye"
  },
  {
    "Hebrew": "חַג",
    "Arabic": "عِيد",
    "Taatik": "עִיד",
    "Taatik-English": "3iid"
  },
  {
    "Hebrew": "חוּפְשָׁה",
    "Arabic": "عُطْلِة",
    "Taatik": "עֻטְלֵה",
    "Taatik-English": "3ut׳-le"
  },
  {
    "Hebrew": "חייזר",
    "Arabic": "مخلوق فضائي",
    "Taatik": "מַחְ׳לוּק פַצַ׳אאִי",
    "Taatik-English": "makh-luuq fa-d׳aa-2i"
  },
  {
    "Hebrew": "חלום",
    "Arabic": "حلم",
    "Taatik": "חִלֵם",
    "Taatik-English": "h׳i-lem"
  },
  {
    "Hebrew": "חללית",
    "Arabic": "سفينة فضاء",
    "Taatik": "סַפִינֵת פָצָ׳אאְ",
    "Taatik-English": "sa-fii-net fa-d׳aa2"
  },
  {
    "Hebrew": "חצוצרה",
    "Arabic": "بوق",
    "Taatik": "בוּק",
    "Taatik-English": "buuq"
  },
  {
    "Hebrew": "חֶרֶב",
    "Arabic": "سِيف",
    "Taatik": "סֵיף",
    "Taatik-English": "seif"
  },
  {
    "Hebrew": "חשמל",
    "Arabic": "كَهْرَبَا",
    "Taatik": "כַּהְרַבַּא",
    "Taatik-English": "kah-ra-ba"
  },
  {
    "Hebrew": "טירה",
    "Arabic": "قلعة",
    "Taatik": "קַלְעַה",
    "Taatik-English": "qal-3a"
  },
  {
    "Hebrew": "טלוויזיה",
    "Arabic": "تِلْفِزْيُون",
    "Taatik": "תִלְפִזְיוֹן",
    "Taatik-English": "til-fiz-youn"
  },
  {
    "Hebrew": "ילדות",
    "Arabic": "طفولة",
    "Taatik": "טֻפוּלֵה",
    "Taatik-English": "tu-fuu-le"
  },
  {
    "Hebrew": "כדורגל",
    "Arabic": "فوتبول",
    "Taatik": "פוּתְבּוֹל",
    "Taatik-English": "fuut-boul"
  },
  {
    "Hebrew": "כּוֹבַע",
    "Arabic": "طاقيّة",
    "Taatik": "טַאקִיֵّה",
    "Taatik-English": "t׳aa-qiy-ye"
  },
  {
    "Hebrew": "כּוֹעֵס",
    "Arabic": "زَعْلَان",
    "Taatik": "זַעְלַאן",
    "Taatik-English": "za3-laan"
  },
  {
    "Hebrew": "כְּפָר",
    "Arabic": "قَرْيِة",
    "Taatik": "קַרְיֵה",
    "Taatik-English": "qar-ye"
  },
  {
    "Hebrew": "להקה",
    "Arabic": "فرقة",
    "Taatik": "פִרְקַה",
    "Taatik-English": "fir-qa"
  },
  {
    "Hebrew": "לוויתן",
    "Arabic": "حوت",
    "Taatik": "חוּת",
    "Taatik-English": "h׳uut"
  },
  {
    "Hebrew": "לַיְלָה",
    "Arabic": "لِيل",
    "Taatik": "לֵיל",
    "Taatik-English": "leil"
  },
  {
    "Hebrew": "לֵיצָן",
    "Arabic": "مهرّج",
    "Taatik": "מֻהַרֵّג׳",
    "Taatik-English": "mu-har-rej"
  },
  {
    "Hebrew": "גַּנָּב",
    "Arabic": "حرامي",
    "Taatik": "חַרַאמִי",
    "Taatik-English": "h׳a-raa-mi"
  },
  {
    "Hebrew": "מגדת עתידות",
    "Arabic": "عرّافة",
    "Taatik": "עָרָ֓אפֶה",
    "Taatik-English": "3a-raa-fe"
  },
  {
    "Hebrew": "מוּזֵיאוֹן",
    "Arabic": "مَتْحَف",
    "Taatik": "מַתְחַף",
    "Taatik-English": "mat-h׳af"
  },
  {
    "Hebrew": "מוּזָר",
    "Arabic": "غَرِيب",
    "Taatik": "עַ׳רִיבּ",
    "Taatik-English": "gha-riib"
  },
  {
    "Hebrew": "מוֹרֶה",
    "Arabic": "مْعَلِّم",
    "Taatik": "מְעַלֵّם",
    "Taatik-English": "m3al-lem"
  },
  {
    "Hebrew": "דף",
    "Arabic": "ورقة",
    "Taatik": "וַרַקַה",
    "Taatik-English": "wa-ra-qa"
  },
  {
    "Hebrew": "מַחְשֵׁב",
    "Arabic": "حَاسُوب",
    "Taatik": "חַאסוּבּ",
    "Taatik-English": "h׳aa-suub"
  },
  {
    "Hebrew": "מְיוּחַד",
    "Arabic": "مميّز",
    "Taatik": "מֻמַיַّז",
    "Taatik-English": "mu-may-yaz"
  },
  {
    "Hebrew": "מַיִם",
    "Arabic": "مَيِّة",
    "Taatik": "מַיֵّה",
    "Taatik-English": "may-ye"
  },
  {
    "Hebrew": "מכונה",
    "Arabic": "ماكنة",
    "Taatik": "מַאכִּנַה",
    "Taatik-English": "maa-ki-na"
  },
  {
    "Hebrew": "מְנַהֵל",
    "Arabic": "مُدِير",
    "Taatik": "מֻדִיר",
    "Taatik-English": "mu-diir"
  },
  {
    "Hebrew": "מערה",
    "Arabic": "مغارة",
    "Taatik": "מְעַ׳ארַה",
    "Taatik-English": "mghaa-ra"
  },
  {
    "Hebrew": "מַפָּה",
    "Arabic": "خَارْطِة",
    "Taatik": "חַ׳ארְטַה",
    "Taatik-English": "khaar-t׳a"
  },
  {
    "Hebrew": "מפחד",
    "Arabic": "خايف",
    "Taatik": "חַ׳איֵף",
    "Taatik-English": "khaa-yef"
  },
  {
    "Hebrew": "מִפְלֶצֶת",
    "Arabic": "غُولِة",
    "Taatik": "ע׳וּלֵה",
    "Taatik-English": "ghuu-le"
  },
  {
    "Hebrew": "מצלמה",
    "Arabic": "كامرة",
    "Taatik": "כַּאמַרַה",
    "Taatik-English": "kaa-ma-ra"
  },
  {
    "Hebrew": "משאלה",
    "Arabic": "أمنية",
    "Taatik": "אֻמְנִיֵה",
    "Taatik-English": "2um-ni-ye"
  },
  {
    "Hebrew": "משפחה",
    "Arabic": "عِيلِة",
    "Taatik": "עֵילֵה",
    "Taatik-English": "3ei-le"
  },
  {
    "Hebrew": "נולד",
    "Arabic": "إنولد",
    "Taatik": "אִנְוַלַד",
    "Taatik-English": "2in-wa-lad"
  },
  {
    "Hebrew": "נִיסַה",
    "Arabic": "حاول",
    "Taatik": "חַאוַל",
    "Taatik-English": "h׳aa-wal"
  },
  {
    "Hebrew": "נָסִיךְ",
    "Arabic": "أَمِير",
    "Taatik": "אַמִיר",
    "Taatik-English": "2a-miir"
  },
  {
    "Hebrew": "נַעֲלַיִים",
    "Arabic": "كُنْدَرَة",
    "Taatik": "כֻּנְדַרַה",
    "Taatik-English": "kun-da-ra"
  },
  {
    "Hebrew": "נָשָֹך",
    "Arabic": "عضّ",
    "Taatik": "עַץ׳",
    "Taatik-English": "3ad׳d׳"
  },
  {
    "Hebrew": "סבתא",
    "Arabic": "تيتة",
    "Taatik": "תתה",
    "Taatik-English": "te-ta"
  },
  {
    "Hebrew": "סוד",
    "Arabic": "سرّ",
    "Taatik": "סִרّ",
    "Taatik-English": "sirr"
  },
  {
    "Hebrew": "סוּס",
    "Arabic": "حْصَان",
    "Taatik": "חְצַאן",
    "Taatik-English": "h׳s׳aan"
  },
  {
    "Hebrew": "סִירָה",
    "Arabic": "قارب",
    "Taatik": "קַארֵבּ",
    "Taatik-English": "qaa-reb"
  },
  {
    "Hebrew": "סַפָּר (במספרה)",
    "Arabic": "حَلَّاق",
    "Taatik": "חַלַّאק",
    "Taatik-English": "h׳al-laaq"
  },
  {
    "Hebrew": "סֵפֶר",
    "Arabic": "كْتَاب",
    "Taatik": "כְּתַאבּ",
    "Taatik-English": "ktaab"
  },
  {
    "Hebrew": "עוּגָה",
    "Arabic": "كَعْكِة",
    "Taatik": "כַּעְכֵּה",
    "Taatik-English": "ka3-ke"
  },
  {
    "Hebrew": "עזב",
    "Arabic": "ترك",
    "Taatik": "תַרַכּ",
    "Taatik-English": "ta-rak"
  },
  {
    "Hebrew": "עיתונאי",
    "Arabic": "صحفي",
    "Taatik": "צַחַפִי",
    "Taatik-English": "s׳a-h׳a-fi"
  },
  {
    "Hebrew": "ענק",
    "Arabic": "عملاق",
    "Taatik": "עִמְלָאק",
    "Taatik-English": "im-lak"
  },
  {
    "Hebrew": "עף",
    "Arabic": "طَار",
    "Taatik": "טַאר",
    "Taatik-English": "t׳aar"
  },
  {
    "Hebrew": "שר (בממשלה)",
    "Arabic": "وَزِير",
    "Taatik": "וַזִיר",
    "Taatik-English": "wa-ziir"
  },
  {
    "Hebrew": "פסטיבל",
    "Arabic": "مَهْرَجَان",
    "Taatik": "מַהְרַגַ׳אן",
    "Taatik-English": "mah-ra-jaan"
  },
  {
    "Hebrew": "פֶּסֶל",
    "Arabic": "تمثال",
    "Taatik": "תִמְתַ׳אל",
    "Taatik-English": "tim-thaal"
  },
  {
    "Hebrew": "צחק",
    "Arabic": "ضحك",
    "Taatik": "צִ׳חֵכ",
    "Taatik-English": "d׳i-h׳ek"
  },
  {
    "Hebrew": "צריך",
    "Arabic": "لازم",
    "Taatik": "לַאזֵם",
    "Taatik-English": "laa-zem"
  },
  {
    "Hebrew": "אָנְגְלִית",
    "Arabic": "انجليزي",
    "Taatik": "אִנְגְלִיזִי",
    "Taatik-English": "in-glii-zi"
  },
  {
    "Hebrew": "קְבוּצָה",
    "Arabic": "مَجْمُوعَة",
    "Taatik": "מַגְ׳מוּעַה",
    "Taatik-English": "maj-muu-3a"
  },
  {
    "Hebrew": "קלפים",
    "Arabic": "شدّة",
    "Taatik": "שַדֵّה",
    "Taatik-English": "shad-de"
  },
  {
    "Hebrew": "קֶסֶם",
    "Arabic": "سِحْر",
    "Taatik": "סִחְר",
    "Taatik-English": "si-h׳er"
  },
  {
    "Hebrew": "קפץ",
    "Arabic": "نطّ",
    "Taatik": "נַטّ",
    "Taatik-English": "nat׳t׳"
  },
  {
    "Hebrew": "רוח רפאים",
    "Arabic": "شَبَح",
    "Taatik": "שַבַּח",
    "Taatik-English": "sha-bah׳"
  },
  {
    "Hebrew": "רופא",
    "Arabic": "طَبِيب",
    "Taatik": "טַבִּיבּ",
    "Taatik-English": "t׳a-biib"
  },
  {
    "Hebrew": "רחוב",
    "Arabic": "شارع",
    "Taatik": "שַארֵע",
    "Taatik-English": "shaa-re3"
  },
  {
    "Hebrew": "רעיון",
    "Arabic": "فِكْرَة",
    "Taatik": "פִכְּרַה",
    "Taatik-English": "fik-ra"
  },
  {
    "Hebrew": "רקדנית בטן",
    "Arabic": "رقّاصة شرقيّة",
    "Taatik": "רַקַّאצַה שַרְקִיֵّה",
    "Taatik-English": "raq-qaa-s׳a shar-qiy-ye"
  },
  {
    "Hebrew": "שוד",
    "Arabic": "سطو",
    "Taatik": "סָטֻו",
    "Taatik-English": "sa-tu"
  },
  {
    "Hebrew": "שוטר",
    "Arabic": "شرطي",
    "Taatik": "שֻׁרְטִי",
    "Taatik-English": "shur-t׳i"
  },
  {
    "Hebrew": "שיכור",
    "Arabic": "سكران",
    "Taatik": "סַכְּרַאן",
    "Taatik-English": "sak-raan"
  },
  {
    "Hebrew": "שִיר",
    "Arabic": "أُغْنِيِة",
    "Taatik": "אֻעְ׳נִיֵה",
    "Taatik-English": "2ugh-ni-ye"
  },
  {
    "Hebrew": "שמלה",
    "Arabic": "فستان",
    "Taatik": "פֻסְתַאן",
    "Taatik-English": "fu-staan"
  },
  {
    "Hebrew": "שָׁעוֹן",
    "Arabic": "سَاعَة",
    "Taatik": "סַאעַה",
    "Taatik-English": "saa-3a"
  },
  {
    "Hebrew": "שערורייה",
    "Arabic": "فضيحة",
    "Taatik": "פַצִ׳יחַה",
    "Taatik-English": "fa-d׳ii-h׳a"
  },
  {
    "Hebrew": "שֶׁקֶר",
    "Arabic": "كذب",
    "Taatik": "כִּדֵ׳בּ",
    "Taatik-English": "ki-zeb"
  },
  {
    "Hebrew": "אֵש",
    "Arabic": "نَار",
    "Taatik": "נַאר",
    "Taatik-English": "naar"
  },
  {
    "Hebrew": "תַּחֲרוּת",
    "Arabic": "مُنَافَسِة",
    "Taatik": "מֻנַאפַסֵה",
    "Taatik-English": "mu-naa-fa-se"
  },
  {
    "Hebrew": "תינוק",
    "Arabic": "طِفْل",
    "Taatik": "טִפְל",
    "Taatik-English": "t׳ifel"
  },
  {
    "Hebrew": "תכשיטים",
    "Arabic": "مجوهرات",
    "Taatik": "מֻגַ׳וְהַרַאת",
    "Taatik-English": "mu-jaw-ha-raat"
  },
  {
    "Hebrew": "תמונות",
    "Arabic": "صور",
    "Taatik": "צֻוַר",
    "Taatik-English": "s׳u-war"
  },
  {
    "Hebrew": "תקווה",
    "Arabic": "أَمَل",
    "Taatik": "אַמַל",
    "Taatik-English": "2a-mal"
  },
  {
    "Hebrew": "הצעה",
    "Arabic": "إقتراح",
    "Taatik": "אִקְתִרַאח",
    "Taatik-English": "2iq-ti-raah׳"
  },
  {
    "Hebrew": "הִתְעָרֵב (על משהו)",
    "Arabic": "تراهن",
    "Taatik": "תְרַאהַן",
    "Taatik-English": "traa-han"
  },
  {
    "Hebrew": "דמיוני",
    "Arabic": "خَيَالي",
    "Taatik": "חַ׳יַאלי",
    "Taatik-English": "kha-yaa-li"
  },
  {
    "Hebrew": "עתיד",
    "Arabic": "مستقبل",
    "Taatik": "מֻסְתַקְבַּל",
    "Taatik-English": "mus-taq-bal"
  },
  {
    "Hebrew": "בושם",
    "Arabic": "عطر",
    "Taatik": "עֻטֻר",
    "Taatik-English": "ut'-ur"
  },
  {
    "Hebrew": "אומנות",
    "Arabic": "فنّ",
    "Taatik": "פַןّ",
    "Taatik-English": "fann"
  },
  {
    "Hebrew": "ממתקים",
    "Arabic": "حلويات",
    "Taatik": "חִלְוַיַאת",
    "Taatik-English": "hil-wa-yaat"
  },
  {
    "Hebrew": "אזיקים",
    "Arabic": "كلبشات",
    "Taatik": "כַּלַבְּשַאת",
    "Taatik-English": "ka-lab-shaat"
  },
  {
    "Hebrew": "התחפש",
    "Arabic": "تنكّر",
    "Taatik": "תְנַכַּّר",
    "Taatik-English": "tnak-kar"
  },
  {
    "Hebrew": "שחקן",
    "Arabic": "ممثّل",
    "Taatik": "מֻמַתֵّ׳ל",
    "Taatik-English": "mu-math-thel"
  },
  {
    "Hebrew": "שיחקו",
    "Arabic": "لعبو",
    "Taatik": "לִעֵבּו",
    "Taatik-English": "li-3e-bu"
  },
  {
    "Hebrew": "נכשל",
    "Arabic": "فشل",
    "Taatik": "פִשֵל",
    "Taatik-English": "fi-shel"
  },
  {
    "Hebrew": "סִין",
    "Arabic": "الصِّين",
    "Taatik": "אֵ(ל)צִّין",
    "Taatik-English": "es׳-s׳iin"
  },
  {
    "Hebrew": "להיפך",
    "Arabic": "بالعكس",
    "Taatik": "בִּ(א)לְ-עַכְּס",
    "Taatik-English": "bil-3aks"
  },
  {
    "Hebrew": "נכון",
    "Arabic": "صحيح",
    "Taatik": "צַחִיח",
    "Taatik-English": "sah׳-iih׳"
  },
  {
    "Hebrew": "מתמטיקה",
    "Arabic": "رياضيات",
    "Taatik": "רִיַאצִ׳יַאת",
    "Taatik-English": "ri-yaa-d׳i-yaat"
  },
  {
    "Hebrew": "מדע",
    "Arabic": "عِلْم",
    "Taatik": "עִלְם",
    "Taatik-English": "3i-lem"
  },
  {
    "Hebrew": "ספורט",
    "Arabic": "رياضة",
    "Taatik": "רִיַאצַ׳ה",
    "Taatik-English": "ri-yaa-d׳a"
  },
  {
    "Hebrew": "נִיחֵש",
    "Arabic": "حزر",
    "Taatik": "חִזֵר",
    "Taatik-English": "h׳i-zer"
  },
  {
    "Hebrew": "חידה",
    "Arabic": "لغز",
    "Taatik": "לֻעֻ׳ז",
    "Taatik-English": "lu-ghuz"
  },
  {
    "Hebrew": "תְּרוּפָה",
    "Arabic": "دَوَا",
    "Taatik": "דַוַא",
    "Taatik-English": "da-wa"
  },
  {
    "Hebrew": "גאון",
    "Arabic": "عبقري",
    "Taatik": "עַבְּקַרִי",
    "Taatik-English": "3ab-qa-ri"
  },
  {
    "Hebrew": "חמוד",
    "Arabic": "نغنوش",
    "Taatik": "נַעְ׳נוּש",
    "Taatik-English": "nagh-nuush"
  },
  {
    "Hebrew": "טעים",
    "Arabic": "زَاكِي",
    "Taatik": "זַאכִּי",
    "Taatik-English": "zaa-ki"
  },
  {
    "Hebrew": "בנק",
    "Arabic": "بنك",
    "Taatik": "בַּנְכּ",
    "Taatik-English": "bank"
  },
  {
    "Hebrew": "הִתְבַּלְבֵּל",
    "Arabic": "تخربط",
    "Taatik": "תְחַ׳רְבַּט",
    "Taatik-English": "tkhar-bat׳"
  },
  {
    "Hebrew": "ישן",
    "Arabic": "قديم",
    "Taatik": "קַדִים",
    "Taatik-English": "qa-diim"
  },
  {
    "Hebrew": "מוּדְאָג",
    "Arabic": "قَلْقَان",
    "Taatik": "קַלְקַאן",
    "Taatik-English": "qal-qaan"
  },
  {
    "Hebrew": "שקט",
    "Arabic": "هدوء",
    "Taatik": "הֻדוּאְ",
    "Taatik-English": "hu-duu2"
  },
  {
    "Hebrew": "מומחה",
    "Arabic": "خبير",
    "Taatik": "חַ׳בִּיר",
    "Taatik-English": "kha-biir"
  },
  {
    "Hebrew": "שָׂמֵחַ",
    "Arabic": "فَرْحَان",
    "Taatik": "פַרְחַאן",
    "Taatik-English": "far-h׳aan"
  },
  {
    "Hebrew": "קוֹל",
    "Arabic": "صُوت",
    "Taatik": "צוֹת",
    "Taatik-English": "s׳out"
  },
  {
    "Hebrew": "חברים",
    "Arabic": "صحاب",
    "Taatik": "צְחַאבּ",
    "Taatik-English": "s׳h׳aab"
  },
  {
    "Hebrew": "קוֹר",
    "Arabic": "سقعة",
    "Taatik": "סַקְעַה",
    "Taatik-English": "saq-3a"
  },
  {
    "Hebrew": "תמיד",
    "Arabic": "دايماً",
    "Taatik": "דַאיְמַן",
    "Taatik-English": "daay-man"
  }
]
const data = JSON.parse(JSON.stringify(dataJson))