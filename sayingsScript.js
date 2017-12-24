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
    "بيبني قصور في الرّمل<br><br>ביבני קצור פי א(ל)רמל<br><br>bibni ksur fi e(l)rramel<br><br>תרגום: בונה ארמונות בחול<br><br>משמעות: מקווה לדברים \ מתעסק בדברים שאין להם אחיזה במציאות, אין להם סיכוי להתגשם"
];