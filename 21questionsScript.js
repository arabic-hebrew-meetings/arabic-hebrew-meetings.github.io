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
}

var hebrew = [
"אייל גולן",
"ריהאנה",
"פיירוז",
"הארי פוטר",
"דונלד טראמפ",
"כריסטיאנו רונאלדו",
"מוחמד עלי",
"גל גדות",
"מארק צוקרברג",
"ישו",
"ג׳סטין ביבר",   
"בוב ספוג"
];

var arabic = [
"ايال غولان",
" ريانا",
"فيروز",
"هاري بوتر",
"دونالد ترامب",
"كريستيانو رونالدو",
"محمد علي",
"غال غادوت",   
"مارك زوكربيرغ", 
"عيسى بن مريم", 
"جاستن بيبر",    
"سبونج بوب"
];