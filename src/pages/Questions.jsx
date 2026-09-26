import CardActivity from '../components/CardActivity.jsx';
import questions from '../data/questions.json';

// "שואלים אחד את השני - منسأل بعض": a random question per card. Replaces public/questionsScript.js.
//
// The data has "simple" and "complex" questions, but the legacy script always used the simple ones
// (category 0) and ignored the category it was called with, so only those are shown. The complex
// questions are kept in the data file.
const CATEGORY_SIMPLE = 0;
const data = questions.simple;

export default function Questions() {
  return (
    <CardActivity
      trackingName="questions"
      total={data.length}
      // The legacy script logged the turn from before the click, plus the category.
      trackingParams={(turnBefore) => ({ cur: turnBefore, category: CATEGORY_SIMPLE })}
      renderCard={(i, turn) => (
        <div className="rectangle" id="specialRectangle">
          {/* Remounted per turn so each question fades in (the legacy script used jQuery fadeIn(300)). */}
          <div id="texts" className="fade-in" key={turn}>
            <h2 className="rtl activityContent" id="hebrewText" dangerouslySetInnerHTML={{ __html: data[i].Hebrew }} />
            <h2 className="rtl activityContent" id="arabicText" dangerouslySetInnerHTML={{ __html: data[i].Arabic }} />
            <h2 className="rtl activityContent" id="taatikText" dangerouslySetInnerHTML={{ __html: data[i].Taatik }} />
          </div>
        </div>
      )}
    />
  );
}
