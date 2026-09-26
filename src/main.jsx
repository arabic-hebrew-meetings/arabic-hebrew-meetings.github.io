import './legacyGlobals.js';
import { createRoot } from 'react-dom/client';
import Carousel from './components/Carousel.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';

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
