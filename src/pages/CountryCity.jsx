import { useState } from 'react';
import StartButtons from '../components/StartButtons.jsx';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { saveAction } from '../lib/tracking.js';

// "ארץ עיר - إنسان حيوان نبات": each click draws a random Hebrew or Arabic letter.
// Replaces public/countryCityScript.js.

const HEBREW_LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];
const ARABIC_LETTERS = [
  'أ (א)', 'ب (ב)', 'ت (ת)', "ث (ת')", "ج (ג')", 'ح (ח)', "خ (ח')", 'د (ד)', "ذ (ד')", 'ر (ר)', 'ز (ז)', 'س (ס)', 'ش (ש)', 'ص (צ)',
  "ض (צ')", 'ط (ט)', "ظ (ט')", 'ع (ע)', "غ (ע')", 'ف (פ)', 'ق (ק)', 'ك (כ)', 'ل (ל)', 'م (מ)', 'ن (נ)', 'ه (ה)', 'و (ו)', 'ي (י)',
];
const TOTAL_LETTERS = HEBREW_LETTERS.length + ARABIC_LETTERS.length;

// Letters are indexes into [...HEBREW_LETTERS, ...ARABIC_LETTERS]. While there are Hebrew letters left,
// draws alternate Hebrew (even turns) and Arabic (odd turns); after that only Arabic. No letter repeats.
function drawLetter(turn, drawn) {
  while (true) {
    const letter =
      turn < HEBREW_LETTERS.length * 2 && turn % 2 === 0
        ? Math.floor(Math.random() * HEBREW_LETTERS.length)
        : HEBREW_LETTERS.length + Math.floor(Math.random() * ARABIC_LETTERS.length);
    if (!drawn.includes(letter)) {
      return letter;
    }
  }
}

function LetterCard({ letter }) {
  const isHebrew = letter < HEBREW_LETTERS.length;
  return (
    <div className="rectangle rtl">
      <h2 className="rtl activityContent" id="language1">
        {isHebrew ? 'קיבלתם את האות בעברית:' : 'קיבלתם את האות בערבית:'}
      </h2>
      <h2 className="rtl activityContent" id="language2">
        {isHebrew ? 'طلعلكم الحرف بالعبراني:' : 'طلعلكم الحرف بالعربي:'}
      </h2>
      <h1 className="rtl" id="letter">
        {isHebrew ? HEBREW_LETTERS[letter] : ARABIC_LETTERS[letter - HEBREW_LETTERS.length]}
      </h1>
      <h2 className="rtl activityContent">
        <br />
        הקטגוריות - الفئات:
      </h2>
      <h2 className="rtl activityContent">ארץ - עיר - חי - צומח - דומם - שם - מקצוע - אישיות</h2>
      <h2 className="rtl activityContent">بلاد - مدينة - حيوان - نبات - جماد - اسم - مهنة - شخصية مشهورة</h2>
    </div>
  );
}

function CircleButton({ direction, onClick, invisible }) {
  return (
    <a className={invisible ? 'circle-button invisible' : 'circle-button'} onClick={onClick} role="button">
      <span className={`glyphicon glyphicon glyphicon-chevron-${direction} my-activity-button-single`}></span>
    </a>
  );
}

export default function CountryCity() {
  const [turn, setTurn] = useState(-1); // -1: not started yet
  const [drawn, setDrawn] = useState([]); // letters drawn so far, in order
  const smallScreen = useMediaQuery('(max-width: 600px)');

  function next() {
    const nextTurn = turn + 1;
    saveAction('countryCity', 'getNext', { cur: nextTurn });
    if (nextTurn === drawn.length) {
      setDrawn([...drawn, drawLetter(nextTurn, drawn)]);
    }
    setTurn(nextTurn);
  }

  function prev() {
    const prevTurn = turn - 1;
    saveAction('countryCity', 'getPrev', { cur: prevTurn });
    setTurn(prevTurn);
  }

  if (turn === -1) {
    return (
      <div className="activity-content rtl" id="button-and-text">
        <StartButtons onStart={next} />
      </div>
    );
  }

  const card = <LetterCard letter={drawn[turn]} />;
  const nextButton = <CircleButton direction="left" onClick={next} invisible={turn === TOTAL_LETTERS - 1} />;
  // On the first letter there's no "previous": hidden on small screens, an invisible placeholder otherwise.
  const prevButton = turn === 0 && smallScreen ? null : <CircleButton direction="right" onClick={prev} invisible={turn === 0} />;

  return (
    <div className="activity-content rtl" id="button-and-text">
      {smallScreen ? (
        <>
          <div className="row">{card}</div>
          <div className="row">
            {prevButton}
            {nextButton}
          </div>
        </>
      ) : (
        <>
          {prevButton}
          {card}
          {nextButton}
        </>
      )}
    </div>
  );
}
