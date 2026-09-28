import { useState } from 'react';
import { postToGoogleForm } from '../lib/tracking.js';
import FormThanks, { SubmitButton } from './FormThanks.jsx';

// "Suggest new content" form of an activity: one text field sent to the activity's Google Form in the
// background (like FeedbackForm), then a thank-you state; no new tab. main.jsx replaces each activity's
// static <form action="…/formResponse"> with this, reading formUrl / fieldName / placeholder from it, so
// the static form still works (in a new tab) if this script doesn't load.
export default function SuggestionForm({ formUrl, fieldName, placeholder }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const text = event.currentTarget.elements[fieldName].value;
    if (text.trim() === '') {
      alert('בבקשה מלאו את תוכן ההודעה');
      return;
    }
    postToGoogleForm(formUrl, { [fieldName]: text });
    setSent(true);
  }

  if (sent) {
    return <FormThanks onBack={() => setSent(false)} />;
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <textarea className="form__message" cols="30" placeholder={placeholder} name={fieldName} required rows="5"></textarea>
      <SubmitButton />
    </form>
  );
}
