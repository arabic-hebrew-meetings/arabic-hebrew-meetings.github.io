import CardActivity from '../components/CardActivity.jsx';
import TextCard from '../components/TextCard.jsx';
import twentyOneQuestions from '../data/21questions.json';
import discussions from '../data/discussions.json';
import fastest from '../data/fastest.json';
import jokes from '../data/jokes.json';
import sayings from '../data/sayings.json';
import story from '../data/story.json';
import three from '../data/three.json';

// Activity pages whose cards are lines of text from a data file. Each entry replaces a legacy
// public/<name>Script.js. `lines` maps each line's element id to the data field it shows, in order.
const textActivities = {
  // מפורסמים - مشاهير
  '21questions': { data: twentyOneQuestions, lines: { hebrewText: 'Hebrew', arabicText: 'Arabic' } },
  // מועדון דיבייט - نادي النقاش
  discussions: { data: discussions, lines: { hebrewText: 'Hebrew', arabicText: 'Arabic', taatikText: 'Taatik' } },
  // הזוג הכי מהיר - أسرع اثنين
  fastest: { data: fastest, lines: { hebrewText: 'Hebrew', arabicText: 'Arabic' } },
  // בדיחות - نكت
  jokes: { data: jokes, lines: { originalText: 'Original', taatikText: 'Taatik', translationText: 'Translation' } },
  // פתגמים - امثال
  sayings: {
    data: sayings,
    lines: { arabicText: 'Arabic', taatikText: 'Taatik', translationText: 'Translation', meaningText: 'Meaning' },
  },
  // בונים ביחד סיפור - نبني مع بعض قصة (the data also has an unused "Taatik-English" field)
  story: { data: story, lines: { hebrewText: 'Hebrew', arabicText: 'Arabic', taatikText: 'Taatik' } },
  // שלושה דברים - ثلاثة أشياء
  three: { data: three, lines: { hebrewText: 'Hebrew', arabicText: 'Arabic', taatikText: 'Taatik' } },
};

// { name: Component } for each text activity, where the page's tracking name is its key.
export const textActivityPages = Object.fromEntries(
  Object.entries(textActivities).map(([name, { data, lines }]) => [
    name,
    () => (
      <CardActivity
        trackingName={name}
        total={data.length}
        renderCard={(i) => (
          <TextCard lines={Object.entries(lines).map(([id, field]) => ({ id, html: data[i][field] }))} />
        )}
      />
    ),
  ])
);
