import CardActivity from '../components/CardActivity.jsx';
import extensions from '../data/describePhoto.json';
import { explanations } from '../explanations.js';

// "מה רואים בתמונה? - شو شايفين بالصّورة؟": a random picture per card. Replaces public/describePhotoScript.js.
// Picture i is /describePictures/<i><extension>, with the extension (.png/.jpg) listed per picture.
export default function DescribePhoto() {
  return (
    <CardActivity
      trackingName="describePhoto"
      total={extensions.length}
      explanation={explanations.describePhoto}
      startTiles
      renderCard={(i) => (
        <div className="rectangle">
          <h2 className="rtl activityContent" id="image">
            <img src={`/describePictures/${i}${extensions[i]}`} />
          </h2>
        </div>
      )}
    />
  );
}
