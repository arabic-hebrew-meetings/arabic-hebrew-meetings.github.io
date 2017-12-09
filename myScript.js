function getItem(){
	var i = Math.floor(Math.random() * hebrew.length)
    document.getElementById("hebrewText").innerHTML = hebrew[i];
	document.getElementById("arabicText").innerHTML = arabic[i];
}

var hebrew = [
"?מה הספר האחרון שקראת",
"?אם היית יכול/ה לעבוד בכל מקצוע, באיזה מקצוע זה היה",
"?אם היית מקבל/ת מחר 3 משאלות - מה היית בוחר"
];

var arabic = [
"شو اخر كتاب قرأته؟",
"اذا كنت بتقدر تشتغل بكل موضوع بأي موضوع كنت بتشتغل؟",
"اذا بحكولك انو بحققولك تلات امنيات، شو كنت بتختار؟"
];