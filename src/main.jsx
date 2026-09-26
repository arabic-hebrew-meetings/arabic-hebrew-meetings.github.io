import './legacyGlobals.js';
import { createRoot } from 'react-dom/client';
import Carousel from './components/Carousel.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import CountryCity from './pages/CountryCity.jsx';
import Discussions from './pages/Discussions.jsx';
import Jokes from './pages/Jokes.jsx';

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
  discussions: Discussions,
  jokes: Jokes,
};

for (const element of document.querySelectorAll('[data-activity]')) {
  const ActivityPage = activityPages[element.dataset.activity];
  createRoot(element).render(<ActivityPage />);
}
