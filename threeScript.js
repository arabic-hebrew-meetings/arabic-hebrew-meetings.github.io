var i;
var x;
var hasListener = false;

var past = [];
var cur = -1;
function getNext(){
	cur++;
	saveAction("three", "getNext", {cur: cur});
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
	saveAction("three", "getPrev", {cur: cur});
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
                <h2 class="rtl activityContent" id="hebrewText"></h2>
		<h2 class="rtl activityContent" id="arabicText"></h2>
        <h2 class="rtl activityContent" id="taatikText"></h2>
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
      "Hebrew": "באי בודד",
      "Arabic": "في جزيرة نائية",
      "Taatik": "פי ג'זירה נאאיה"
    },
    {
      "Hebrew": "בבֵּית חוֹלִים",
      "Arabic": "في المستشفى",
      "Taatik": "פי אלמֻסְתַשְפַא"
    },
    {
      "Hebrew": "במִסְעָדָה",
      "Arabic": "في المَطْعَم",
      "Taatik": "פי אלמַטְעַם"
    },
    {
      "Hebrew": "בגן חיות",
      "Arabic": "في حديقة الحيوانات",
      "Taatik": "פי חַדִיקַת אֵלְחַיוַאנַאת"
    },
    {
      "Hebrew": "בהופעה",
      "Arabic": "في حَفْلِة",
      "Taatik": "פי חַפְלֵה"
    },
    {
      "Hebrew": "בחוּפְשָׁה",
      "Arabic": "في عُطْلِة",
      "Taatik": "פי עֻטְלֵה"
    },
    {
      "Hebrew": "בחללית",
      "Arabic": "في سفينة فضاء",
      "Taatik": "פי סַפִינֵת פָצָ׳אאְ"
    },
    {
      "Hebrew": "בטלוויזיה",
      "Arabic": "في التِلْفِزْيُون",
      "Taatik": "פי אלתִלְפִזְיוֹן"
    },
    {
      "Hebrew": "בכדורגל",
      "Arabic": "في فوتبول",
      "Taatik": "פי פוּתְבּוֹל"
    },
    {
      "Hebrew": "במוּזֵיאוֹן",
      "Arabic": "في المَتْحَف",
      "Taatik": "פי אלמַתְחַף"
    },
    {
      "Hebrew": "במַחְשֵׁב",
      "Arabic": "في الحَاسُوب",
      "Taatik": "פי אלחַאסוּבּ"
    },
    {
      "Hebrew": "במשפחה",
      "Arabic": "في العيلة",
      "Taatik": "פי אלעֵילֵה"
    },
    {
      "Hebrew": "בסֵפֶר",
      "Arabic": "في كْتَاب",
      "Taatik": "פי כְּתַאבּ"
    },
    {
      "Hebrew": "בפסטיבל",
      "Arabic": "في مَهْرَجَان",
      "Taatik": "פי מַהְרַגַ׳אן"
    },
    {
      "Hebrew": "ברחוב",
      "Arabic": "في الشارع",
      "Taatik": "פי אלשַארֵע"
    },
    {
      "Hebrew": "בעתיד",
      "Arabic": "في المستقبل",
      "Taatik": "פי אלמֻסְתַקְבַּל"
    },
    {
      "Hebrew": "בספורט",
      "Arabic": "في رياضة",
      "Taatik": "פי רִיַאצַ׳ה"
    },
    {
      "Hebrew": "בבנק",
      "Arabic": "في البنك",
      "Taatik": "פי אלבַּנְכּ"
    },
    {
      "Hebrew": "בספרייה",
      "Arabic": "في المَكْتَبِة",
      "Taatik": "פי אלמַכְּתַבֵּה"
    },
    {
      "Hebrew": "בבית",
      "Arabic": "في البِيت",
      "Taatik": "פי אלבית"
    },
    {
      "Hebrew": "במשרד",
      "Arabic": "في المكتب",
      "Taatik": "פי אלמַכְּתַבּ"
    },
    {
      "Hebrew": "בעבודה",
      "Arabic": "في الشُغْل",
      "Taatik": "פי אלשֻעְ׳ל"
    },
    {
      "Hebrew": "בקניון",
      "Arabic": "في المول",
      "Taatik": "פי אלמול"
    },
    {
      "Hebrew": "בחנות",
      "Arabic": "في محلّ اواعي",
      "Taatik": "פי מַחַלﬞ אַוַאעִי"
    },
    {
      "Hebrew": "בים",
      "Arabic": "في البَحَر",
      "Taatik": "פי אלבַּחַר"
    },
    {
      "Hebrew": "בבית ספר",
      "Arabic": "في المَدْرَسِة",
      "Taatik": "פי אלמַדְרַסֵה"
    },
    {
      "Hebrew": "בחתונה",
      "Arabic": "في عُرْس",
      "Taatik": "פי עֻרְס"
    },
    {
      "Hebrew": "בסרט",
      "Arabic": "في فِلْم",
      "Taatik": "פי פִלְם"
    },
    {
      "Hebrew": "בטלפון",
      "Arabic": "في التلفون",
      "Taatik": "פי אלתִלְפִון"
    },
    {
      "Hebrew": "בארמון",
      "Arabic": "في قَصْر",
      "Taatik": "פי קַצְר"
    },
    {
      "Hebrew": "ביער",
      "Arabic": "في غابة",
      "Taatik": "פי עַ׳אבֵּה"
    },
    {
      "Hebrew": "באיטליה",
      "Arabic": "في إِيطَالْيَا",
      "Taatik": "פי אִיטַאלְיַא"
    },
    {
      "Hebrew": "בחלל",
      "Arabic": "في الفضاء",
      "Taatik": "פי אלפַצַ׳אא"
    },
    {
      "Hebrew": "במאדים",
      "Arabic": "في المرّيخ",
      "Taatik": "פי אִלְמַרִﬞיח׳"
    },
    {
      "Hebrew": "באוטובוס",
      "Arabic": "في البَاص",
      "Taatik": "פי אלבאצ"
    },
    {
      "Hebrew": "ביום הולדת",
      "Arabic": "في عيد ميلاد",
      "Taatik": "פי עִיד מִילַאד"
    },
    {
      "Hebrew": "באוניברסיטה",
      "Arabic": "في الجَامْعَة",
      "Taatik": "פי אלגַ׳אמְעַה"
    },
    {
      "Hebrew": "במטבח",
      "Arabic": "في المطبخ",
      "Taatik": "פי אלמַטְבַּח׳"
    },
    {
      "Hebrew": "בסלון",
      "Arabic": "في الصالون",
      "Taatik": "פי אלצַאלוֹן"
    },
    {
      "Hebrew": "בחדר שלכם",
      "Arabic": "في غرفتكم",
      "Taatik": "פי ע'רפתכם"
    },
    {
      "Hebrew": "בכביש",
      "Arabic": "في الطريق",
      "Taatik": "פי אלטריק"
    },
    {
      "Hebrew": "בשוק",
      "Arabic": "في السُوق",
      "Taatik": "פי אלסוּק"
    }
  ]
const data = JSON.parse(JSON.stringify(dataJson))