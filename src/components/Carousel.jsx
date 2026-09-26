import { useEffect } from 'react';
import { activities } from '../activities.js';
import { saveAction } from '../lib/tracking.js';

// The grid of activity tiles. Replaces getActivitiesCarouselByPage() from headerFooterScript.js.
// `page` is the tracking name of the page it's shown on (e.g. "homepage", "meetings").
export default function Carousel({ page }) {
  useEffect(() => {
    // The meetings page logs its own, more detailed "page open" action.
    if (page != 'meetings') {
      saveAction(page, page + '_page_open', null);
    }
  }, [page]);

  return (
    <>
      <div className="fade-in">
        {activities.map(({ href, image }, i) => (
          <div className="my-square" key={href}>
            <div className={`my-square-content box color${(i % 6) + 1}`}>
              <div className="img-hover-zoom--brightness">
                <a href={href}>
                  <img className="myimg" src={image} />
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* you need to fill the last row with empty squares like this <div className="my-square empty-square"> </div> */}
      </div>
      <div className="container-fluid">{/* just for margin from the footer */}</div>
    </>
  );
}
