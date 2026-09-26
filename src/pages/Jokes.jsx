import CardActivity from '../components/CardActivity.jsx';
import TextCard from '../components/TextCard.jsx';
import jokes from '../data/jokes.json';

// "בדיחות - نكت": a random joke per card. Replaces public/jokesScript.js.
export default function Jokes() {
  return (
    <CardActivity
      trackingName="jokes"
      total={jokes.length}
      renderCard={(i) => (
        <TextCard
          lines={[
            { id: 'originalText', html: jokes[i].Original },
            { id: 'taatikText', html: jokes[i].Taatik },
            { id: 'translationText', html: jokes[i].Translation },
          ]}
        />
      )}
    />
  );
}
