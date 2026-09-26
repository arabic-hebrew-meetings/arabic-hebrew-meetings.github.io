import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// React "islands": each page keeps its own <nav id="header"> and <footer id="footer">
// placeholders (with their page-specific classes), and React renders their contents.
const islands = {
  header: Navbar,
  footer: Footer,
};

for (const [elementId, Component] of Object.entries(islands)) {
  const element = document.getElementById(elementId);
  if (element) {
    createRoot(element).render(<Component />);
  }
}
