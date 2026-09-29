// The "thank you" state shown after sending a form (FeedbackForm, SuggestionForm): a check mark,
// "תודה! شكرا!" and a button back to the form.
export default function FormThanks({ onBack }) {
  return (
    <div className="form__thanks" role="status">
      <div className="form__thanks-icon" aria-hidden="true">
        <span className="glyphicon glyphicon-ok"></span>
      </div>
      <p className="form__thanks-text">
        תודה! <span lang="ar">شكرا!</span>
      </p>
      <button type="button" className="form__back" onClick={onBack}>
        חזרה - <span lang="ar">رجوع</span>
      </button>
    </div>
  );
}

// The forms' submit button: "שליחה - إرسال" with a send icon.
export function SubmitButton() {
  return (
    <button className="form__submit">
      <span>
        שליחה - <span lang="ar">إرسال</span>
      </span>
      <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
    </button>
  );
}
