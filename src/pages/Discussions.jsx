import CardActivity from '../components/CardActivity.jsx';
import TextCard from '../components/TextCard.jsx';
import discussions from '../data/discussions.json';

// "מועדון דיבייט - نادي النقاش": a random debate topic per card. Replaces public/discussionsScript.js.
export default function Discussions() {
  return (
    <CardActivity
      trackingName="discussions"
      total={discussions.length}
      renderCard={(i) => (
        <TextCard
          lines={[
            { id: 'hebrewText', html: discussions[i].Hebrew },
            { id: 'arabicText', html: discussions[i].Arabic },
            { id: 'taatikText', html: discussions[i].Taatik },
          ]}
        />
      )}
    />
  );
}
