import { useEffect, useRef } from 'react';
import './ExplanationModal.css';

// The activity's "how to play" explanation in a modal dialog. Uses the native <dialog> (showModal), which
// handles focus, Escape and making the page behind inert. Closes with the X, the "בסדר - تمام" button,
// Escape, or a click on the backdrop.
//
// - open / onClose: controlled by the parent
// - explanation: { he: [paragraphs], ar: [paragraphs], credits?: [paragraphs] }
export default function ExplanationModal({ open, onClose, explanation }) {
  const dialogRef = useRef(null);
  const arabicRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      dialog.showModal();
      // Focus the dialog itself rather than its first button, so opening it with the mouse doesn't show a
      // focus ring on the X; Tab moves to the X from here.
      dialog.focus();
      dialog.querySelector('.explanation-modal__body').scrollTop = 0;
    } else if (!open && dialog.open) {
      dialog.close();
    }
    // Keep the page behind from scrolling while the modal is open.
    document.documentElement.classList.toggle('explanation-modal-open', open);
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('explanation-modal-open'), []);

  return (
    <dialog
      ref={dialogRef}
      className="explanation-modal"
      tabIndex={-1}
      dir="rtl"
      aria-labelledby="explanation-modal-title"
      onClose={onClose} // Escape, or dialog.close()
      onClick={(e) => e.target === dialogRef.current && onClose()} // a click on the backdrop
    >
      <div className="explanation-modal__header">
        <h2 id="explanation-modal-title" className="explanation-modal__title">
          <span>הסבר על הפעילות</span>
          <span lang="ar">شرح عن الفعالية</span>
        </h2>
        <button type="button" className="explanation-modal__close" onClick={onClose} aria-label="סגירה - إغلاق">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="explanation-modal__body">
        <button
          type="button"
          className="explanation-modal__jump"
          lang="ar"
          onClick={() => arabicRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          العربية ↓
        </button>
        <section className="explanation-modal__section" lang="he">
          {explanation.he.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
        <hr className="explanation-modal__divider" />
        <section className="explanation-modal__section" lang="ar" ref={arabicRef}>
          {explanation.ar.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
        {explanation.credits && (
          <section className="explanation-modal__credits" lang="he">
            {explanation.credits.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        )}
      </div>

      <div className="explanation-modal__footer">
        <button type="button" className="explanation-modal__ok" onClick={onClose}>
          בסדר - <span lang="ar">تمام</span>
        </button>
      </div>
    </dialog>
  );
}
