import { useLayoutEffect, useRef } from 'react';

// "Start" and "Explanation" buttons shown before an activity starts.
// Replaces getNewStartActivity(), makeButtonWidthEqual() and scrollToDetails() from headerFooterScript.js.
// With onExplain the explanation button calls it (opens the explanation modal); without it, the button
// scrolls to the explanation section at the bottom of the page.
export default function StartButtons({ onStart, onExplain }) {
  const startRef = useRef(null);
  const detailsRef = useRef(null);

  // Give both buttons the width of the wider one.
  useLayoutEffect(() => {
    const buttons = [startRef.current, detailsRef.current];
    const maxWidth = Math.max(...buttons.map((b) => parseFloat(getComputedStyle(b).width)));
    buttons.forEach((b) => (b.style.width = maxWidth + 'px'));
  }, []);

  function scrollToDetails() {
    const details = document.querySelector('.details');
    window.scrollTo({ top: details.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  }

  return (
    <>
      <a ref={startRef} className="btn btn-info btn-xl rtl two-options" onClick={onStart} role="button">
        <span className="my-activity-button-text">התחילו - بلشو!</span>{' '}
        <span className="glyphicon glyphicon-play my-activity-button"></span>
      </a>{' '}
      <a ref={detailsRef} id="detailsBtn" className="btn btn-danger btn-xl rtl two-options" onClick={onExplain || scrollToDetails} role="button">
        <span className="my-activity-button-text">הסבר - شرح</span>{' '}
        <span className="glyphicon glyphicon-info-sign my-activity-button"></span>
      </a>
    </>
  );
}
