import { createRoot } from 'react-dom/client';
import './styles/single-section-page.css';
import './styles/static-activity.css';
import Carousel from './components/Carousel.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import CountryCity from './pages/CountryCity.jsx';
import Meetings from './pages/meetings/Meetings.jsx';
import DescribePhoto from './pages/DescribePhoto.jsx';
import Questions from './pages/Questions.jsx';
import Songs from './pages/Songs.jsx';
import { textActivityPages } from './pages/textActivities.jsx';

// React "islands": pages keep placeholder elements (with their page-specific classes) and React
// renders their contents. Placeholders can pass props through data-* attributes, e.g.
// <div id="activities-carousel" data-page="homepage"> renders <Carousel page="homepage" />.
const islands = {
  header: Navbar,
  footer: Footer,
  'activities-carousel': Carousel,
  form_place: FeedbackForm,
};

for (const [elementId, Component] of Object.entries(islands)) {
  const element = document.getElementById(elementId);
  if (element) {
    createRoot(element).render(<Component {...element.dataset} />);
  }
}

// Converted activity pages opt in with <div id="start-activity" data-activity="...">. Pages that
// haven't been converted yet keep filling #start-activity with their legacy script.
const activityPages = {
  countryCity: CountryCity,
  describePhoto: DescribePhoto,
  meetings: Meetings,
  questions: Questions,
  songs: Songs,
  ...textActivityPages,
};

for (const element of document.querySelectorAll('[data-activity]')) {
  const ActivityPage = activityPages[element.dataset.activity];
  createRoot(element).render(<ActivityPage {...element.dataset} />);
}
