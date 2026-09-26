// The screens of the meetings page. Markup (ids, classes, texts) matches what public/meetingsScript.js
// and headerFooterScript.js used to write with innerHTML, so main.css applies unchanged. {' '} marks the
// places where the legacy markup had whitespace between inline elements, which renders as a space.

const INNER_PATH =
  'M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z';
const OUTER_PATH =
  'M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z';

export function Spinner({ className = 'spinner', top }) {
  return (
    <svg className={className} viewBox="0 0 50 50" style={top ? { top } : undefined}>
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
}

const openInNewTab = (url) => () => window.open(url, '_blank');

// --- Right column ---

export function Subheadline({ subheadline }) {
  if (!subheadline) return null;
  if (subheadline.type === 'answerQuestions') {
    return (
      <div className="subheadline">
        ענו על השאלות הבאות
        <br />
        כדי להצטרף למפגש
        <br />
        جاوبوا على الاسئلة التالية
        <br />
        عشان تنضموا للقاء
      </div>
    );
  }
  // Number of open rooms
  return (
    <div className="subheadline">
      <span style={{ color: 'green' }}>
        {subheadline.lang === 'Hebrew' ? (
          <>
            כרגע יש <b>{subheadline.count}</b> קבוצות במפגש
          </>
        ) : (
          <>
            حاليا فيه <b>{subheadline.count}</b> مجموعات باللقاﺀ
          </>
        )}
      </span>
    </div>
  );
}

// --- "Join our groups" (no or wrong password) ---

export function GenericScreen() {
  return (
    <div id="SocialGroupsDetails" className="text-center rtl">
      <h1 className="socialGroupsTop" id="SocialGroupsHebrewHeadline">
        הצטרפו לקבוצות שלנו כדי לקבל לינק למפגש הקרוב!
      </h1>
      <h1 id="SocialGroupsArabicHeadline">انضموا لمجموعاتنا عشان تستقبلوا رابط للقاﺀ القريب!</h1>
      <div id="facebookSection">
        <img className="socialMediaSectionIcon" src="socialMedia/facebookIcon.png" />
        <div>
          <a
            className="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton"
            onClick={openInNewTab('https://www.facebook.com/groups/Arabic.Hebrew.Meetings')}
            role="button"
          >
            <span className="mySocialGroupButtonText">
              ישראלים ופלסטינים
              <br />
              إسرائيليين وفلسطينيين
            </span>
          </a>{' '}
          <a
            className="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton"
            onClick={openInNewTab('https://www.facebook.com/groups/Arabic.Hebrew.Online')}
            role="button"
          >
            <span className="mySocialGroupButtonText">
              משתתפים מכל העולם
              <br />
              مشتركين من كل العالم
            </span>
          </a>
        </div>
      </div>
      <div id="whatsappSection">
        <img className="socialMediaSectionIcon" src="socialMedia/whatsAppIcon.png" />
        <div>
          <a
            className="btn btn-success btn-xl rtl two-options socialGroupButton whatsappButton socialGroupsBottom"
            onClick={openInNewTab('https://forms.gle/uNcGD9cN7Cfc2SoJ8')}
            role="button"
          >
            <span className="mySocialGroupButtonText">
              הרשמה לקבוצות
              <br />
              التسجيل للمجموعات
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Countdown until the meeting starts ---

const plural = (n, unit) => (n === 1 ? unit : unit + 's');

export function CountdownScreen({ distance, meetingInfo, previewClass }) {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const before = 'המפגש עדיין לא התחיל!' + '<br>' + 'اللقاء لسا ما بدا!';
  let after = meetingInfo[5] + '<br>' + meetingInfo[3] + '<br>' + meetingInfo[7];
  if (meetingInfo[9] == 'TRUE') {
    after += '<br>' + 'توقيت القدس - שעון ירושלים';
  }

  return (
    <div className="select-ctr">
      <div className={previewClass}></div>
      <div id="before-countdown" className="countdown-message before-countdown" dangerouslySetInnerHTML={{ __html: before }} />
      <ul className="countdown ltr">
        <li>
          <span id="days" className="days">{days}</span>
          <p id="days_ref" className="days_ref">{plural(days, 'day')}</p>
        </li>{' '}
        <li className="seperator">.</li>{' '}
        <li>
          <span id="hours" className="hours">{hours}</span>
          <p id="hours_ref" className="hours_ref">{plural(hours, 'hour')}</p>
        </li>{' '}
        <li className="seperator">:</li>{' '}
        <li>
          <span id="minutes" className="minutes">{minutes}</span>
          <p id="minutes_ref" className="minutes_ref">{plural(minutes, 'minute')}</p>
        </li>{' '}
        <li className="seperator">:</li>{' '}
        <li>
          <span id="seconds" className="seconds">{seconds}</span>
          <p id="seconds_ref" className="seconds_ref">{plural(seconds, 'second')}</p>
        </li>
      </ul>
      <div id="after-countdown" className="countdown-message after-countdown" dangerouslySetInnerHTML={{ __html: after }} />
    </div>
  );
}

// --- Room picker: native language, then level + rooms ---

// A menu button (the animated white boxes). `option` is { className, dataVal, text, id? }.
export function MenuOption({ option, onClick }) {
  return (
    <div id={option.id} className={option.className} data-val={option.dataVal} onClick={(e) => onClick(e.currentTarget, option)}>
      {option.text}
    </div>
  );
}

export function LanguageScreen({ previewClass, onOptionClick }) {
  return (
    <div className="select-ctr">
      <div className={previewClass}>
        מה היא שפת האם שלכם?
        <br />
        شو لغة الام تبعتكم؟
      </div>
      <div className="cntr rtl"></div>
      <div className="options" id="options">
        <MenuOption option={{ className: 'input input-1', dataVal: 'Hebrew', text: 'עברית' }} onClick={onOptionClick} />
        <MenuOption option={{ className: 'input input-2', dataVal: 'Arabic', text: 'عربي' }} onClick={onOptionClick} />
      </div>
    </div>
  );
}

const LEVEL_TEXTS = {
  Hebrew: {
    title: ['סמנו את הרמה שלכם בערבית', 'ובחרו קבוצה להצטרף אליה:'],
    Advanced: 'רמה מתקדמת',
    Intermediate: 'רמה בינונית',
    Beginner: 'רמה בסיסית',
  },
  Arabic: {
    title: ['اختاروا مستواكم في اللغة العبرية', 'واختاروا مجموعة تنضموا لالها:'],
    Advanced: 'مستوى متقدم',
    Intermediate: 'مستوى متوسط',
    Beginner: 'مستوى منخفض',
  },
};

function LevelRadio({ id, lang, level, iconIndex, onLevel }) {
  return (
    <label htmlFor={id} className="btn-radio level-label">
      <input type="radio" onClick={() => onLevel(level)} id={id} name="radio-grp" />
      <svg className={`option-${iconIndex}-${lang.toLowerCase()}`} width="20px" height="20px" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="9"></circle>
        <path d={INNER_PATH} className="inner"></path>
        <path d={OUTER_PATH} className="outer"></path>
      </svg>{' '}
      <span>{LEVEL_TEXTS[lang][level]}</span>
    </label>
  );
}

export function LevelsScreen({ lang, previewClass, groupsSpinnerTop, optionsHeadline, options, optionsVersion, onLevel, onOptionClick }) {
  const texts = LEVEL_TEXTS[lang];
  return (
    <>
      <div id="my_spinner_groups">{groupsSpinnerTop && <Spinner className="spinner spinner_groups" top={groupsSpinnerTop} />}</div>
      <div className="select-ctr">
        <div className={previewClass}>
          {texts.title[0]}
          <br />
          {texts.title[1]}
        </div>
        <div className="cntr rtl display-above-600px">
          <LevelRadio id="rdo-1" lang={lang} level="Advanced" iconIndex={1} onLevel={onLevel} />
          <LevelRadio id="rdo-2" lang={lang} level="Intermediate" iconIndex={2} onLevel={onLevel} />
          <LevelRadio id="rdo-3" lang={lang} level="Beginner" iconIndex={3} onLevel={onLevel} />
        </div>
        <div className="cntr rtl display-under-600px">
          <LevelRadio id="rdo-4" lang={lang} level="Beginner" iconIndex={1} onLevel={onLevel} />
          <LevelRadio id="rdo-5" lang={lang} level="Intermediate" iconIndex={2} onLevel={onLevel} />
          <LevelRadio id="rdo-6" lang={lang} level="Advanced" iconIndex={3} onLevel={onLevel} />
        </div>
        <div className="optionsHeadline" id="optionsHeadline" style={optionsHeadline.visible ? { visibility: 'visible' } : undefined}>
          {optionsHeadline.text}
        </div>
        <div className="options" id="options">
          {/* New elements each time the options change (optionsVersion), like the legacy innerHTML: a reused
              button would keep the scale it was given by the fade-out animation. */}
          {options.map((option) => (
            <MenuOption key={`${optionsVersion}-${option.dataVal}`} option={option} onClick={onOptionClick} />
          ))}
        </div>
      </div>
    </>
  );
}

// --- Marked sessions: a details form that always ends with "details incorrect" ---

const MARKED_TEXTS = {
  Hebrew: {
    headline: ['ענו על השאלות הבאות', 'כדי להצטרף למפגש'],
    name: 'כתבו את השם שלכם בפייסבוק:',
    phone: 'כתבו את מספר הטלפון שלכם:',
    error: 'פרטים לא נכונים',
    whatsapp: ['שלחו לנו הודעה', 'דרך וואטסאפ'],
    facebook: ['שלחו לנו הודעה', 'דרך פייסבוק'],
  },
  Arabic: {
    headline: ['جاوبوا على الاسئلة التالية', 'عشان تنضموا للقاء'],
    name: 'اكتبوا اسمكم بالفيسبوك:',
    phone: 'اكتبوا رقم التلفون تبعكم:',
    error: 'تفاصيل مش صحيحة',
    whatsapp: ['ابعتولنا رسالة', 'على واتس اب'],
    facebook: ['ابعتولنا رسالة', 'على فيسبوك'],
  },
};

function MarkedForm({ lang, showError, onSubmit }) {
  const t = MARKED_TEXTS[lang];
  return (
    <form name="feedback" onSubmit={onSubmit}>
      {t.name}
      <br />
      <input className="form__email marked-form-field" type="text" placeholder="" name="marked_facebook_name" id="marked_facebook_name" required />
      <br />
      {t.phone}
      <br />
      <input className="form__email marked-form-field" type="text" placeholder="" name="marked_phone_number" id="marked_phone_number" required />
      <br />
      <button className="form__submit marked-form-submit">Submit</button>
      <br />
      {showError && (
        <>
          <div className="marked-error">
            <span className="glyphicon glyphicon-remove-sign marked-error-icon"></span> {t.error}
          </div>
          <div>
            <a
              className="btn btn-success btn-xl rtl two-options socialGroupButton whatsappButton"
              onClick={openInNewTab('https://wa.me/972557291206')}
              role="button"
            >
              <span className="mySocialGroupButtonText">
                {t.whatsapp[0]}
                <br />
                {t.whatsapp[1]}
              </span>
            </a>{' '}
            <a
              className="btn btn-info btn-xl rtl two-options socialGroupButton facebookButton"
              onClick={openInNewTab('https://m.me/nifgashim.ledaber')}
              role="button"
            >
              <span className="mySocialGroupButtonText">
                {t.facebook[0]}
                <br />
                {t.facebook[1]}
              </span>
            </a>
          </div>
          <br />
        </>
      )}
    </form>
  );
}

// formState: 'form' | 'sending' | 'error'
export function MarkedScreen({ lang, formState, onSubmit }) {
  const t = MARKED_TEXTS[lang];
  return (
    <div className="rtl text-center">
      <div className="marked-headline">
        {t.headline[0]}
        <br />
        {t.headline[1]}
      </div>
      <div id="marked_form" className="marked-form">
        {formState === 'sending' ? (
          <Spinner top="40%" />
        ) : (
          // keyed so the fields are empty again after a send, like the legacy re-rendered form
          <MarkedForm key={formState} lang={lang} showError={formState === 'error'} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
}
