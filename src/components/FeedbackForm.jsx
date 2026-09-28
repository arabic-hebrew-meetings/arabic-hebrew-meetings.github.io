import { useState } from 'react';
import { postToGoogleForm, saveAction } from '../lib/tracking.js';

const FEEDBACK_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfy9Cenad7cEtTJ2p9ebx-5Je2yYAPL3OSTmAyH6zXtLJgmEA/formResponse';

function isNotSpam(content) {
  return !(content != null && content.includes('http://bit.ly/') && content.includes('traffic'));
}

// Google Forms supports a single line per input, so convert multiline text to a single line.
const toSingleLine = (text) => text.replace(/\r/g, ' . ').replace(/\n/g, ' . ');

// "Got an idea or feedback for us?" form. Replaces handleFeedback() from headerFooterScript.js.
// `page` is the tracking name of the page it's shown on ("homepage" or "meetings").
export default function FeedbackForm({ page }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const feedbackName = form.elements.feeback_name.value;
    const feedbackContent = form.elements.feedback_content.value;
    const nameNotEmpty = feedbackName.trim() != '';
    const contentNotEmpty = feedbackContent.trim() != '';

    if (nameNotEmpty && contentNotEmpty && isNotSpam(feedbackContent)) {
      const name = toSingleLine(feedbackName);
      const content = toSingleLine(feedbackContent);
      postToGoogleForm(FEEDBACK_FORM_URL, { 'entry.354079520': name, 'entry.1032780145': content });
      saveAction(page, 'success_sending_feedback', { name, content });
      setSent(true);
    } else if (!nameNotEmpty && !contentNotEmpty) {
      saveAction(page, 'error_sending_feedback', { error: 'name empty AND content empty' });
      alert('בבקשה מלאו את שמכם ואת תוכן ההודעה');
    } else if (!contentNotEmpty) {
      saveAction(page, 'error_sending_feedback', { error: 'content empty', name: feedbackName });
      alert('בבקשה מלאו את תוכן ההודעה');
    } else if (!nameNotEmpty) {
      saveAction(page, 'error_sending_feedback', { error: 'name empty', content: feedbackContent });
      alert('בבקשה מלאו את שמכם');
    }
    // Spam is dropped silently.
  }

  if (sent) {
    return (
      <div className="form__thanks" role="status">
        <div className="form__thanks-icon" aria-hidden="true">
          <span className="glyphicon glyphicon-ok"></span>
        </div>
        <p className="form__thanks-text">
          תודה! <span lang="ar">شكرا!</span>
        </p>
        <button type="button" className="form__back" onClick={() => setSent(false)}>
          חזרה - <span lang="ar">رجوع</span>
        </button>
      </div>
    );
  }

  return (
    <form name="feedback" onSubmit={handleSubmit}>
      <label className="form__field">
        <span className="form__label">שם</span>
        <input className="form__email" type="text" placeholder="" name="feeback_name" id="feeback_name" required />
      </label>
      <label className="form__field">
        <span className="form__label">תוכן ההודעה</span>
        <textarea
          className="form__message"
          cols="30"
          placeholder=""
          name="feedback_content"
          id="feedback_content"
          required
          rows="5"
        ></textarea>
      </label>
      <button className="form__submit">
        <span>
          שליחה - <span lang="ar">إرسال</span>
        </span>
        <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
      </button>
    </form>
  );
}
