import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getNumberOfOpenRooms, getRoomOptions, getRoomUrl, buildDataString } from '../../lib/meetings/rooms.js';
import { initialMeetingData, loadMeetingData } from '../../lib/meetings/sheet.js';
import { sha256Hex } from '../../lib/meetings/sha256.js';
import { getUserSourceAndMeetingDate } from '../../lib/meetings/source.js';
import { getQueryParam } from '../../lib/queryParams.js';
import { getSessionId, postToGoogleForm, saveAction, saveMeetingEntry } from '../../lib/tracking.js';
import { CountdownScreen, GenericScreen, LanguageScreen, LevelsScreen, MarkedScreen, Spinner, Subheadline } from './screens.jsx';

// The meetings page ("כניסה למפגש"): password check, countdown, then the room picker.
// Replaces public/meetingsScript.js (and the meetings helpers in headerFooterScript.js). The flow and the
// order of tracking calls follow the legacy functions, which keep their names here (handleChoice,
// displayMenu, ...). Mounted on .main-div with data-activity="meetings"; data-ignore-countdown skips
// the countdown (meetingsIgnoreCountdown.html).
//
// The experimental share-test pages (sharetryagain*, sharedImageTry*) had two bugs, reproduced on purpose
// so they behave exactly as before:
// - data-legacy-bug-no-sha256: they didn't load sha256.js, so checking a ?pwd= threw
//   "SHA256 is not defined" and the page stopped (nothing shown, nothing tracked).
// - data-legacy-bug-no-headline-id: their headline had no id="headline", so showing the
//   "join our groups" page (no password) threw when clearing it, and the page stayed empty.

const FEEDBACK_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfy9Cenad7cEtTJ2p9ebx-5Je2yYAPL3OSTmAyH6zXtLJgmEA/formResponse';
const REFRESH_INTERVAL = 600000; // re-read the sheet every 10 minutes

// Like TweenMax 1.16: a new tween takes over properties of running ones, and transforms stay 2D
// (3D transforms move the buttons to a GPU layer, which renders their text slightly differently).
gsap.defaults({ overwrite: 'auto', force3D: false });

const groupText = (lang) => (lang == 'Hebrew' ? "קבוצה מס' " : 'مجموعة رقم ');
const moreGroupsText = (lang) => (lang == 'Hebrew' ? 'קבוצות נוספות' : 'مجموعات اخرى');
const recommendedHeadline = (lang) => (lang == 'Hebrew' ? 'הקבוצה המומלצת לך:' : 'المجموعة المقترحة لك:');
const optionClass = (n) => `input input-${n}-after-radio-buttons`;
const singleLine = (text) => text.replace(/\r/g, ' . ').replace(/\n/g, ' . ');

const initialView = {
  headlineCleared: false,
  subheadline: null, // null | { type: 'answerQuestions' } | { type: 'openRooms', lang, count }
  countdownSpinner: false,
  screen: { type: 'empty' }, // see renderScreen()
  previewActive: false, // the legacy displayMenu() toggled .active on the question box every call
  menu: null, // { version, fromHidden }: run the menu animation after this render
  measure: null, // { version, selector, add } | { version, fixed }: update #leftCol's min-height after this render
};

export default function Meetings({ ignoreCountdown, legacyBugNoSha256, legacyBugNoHeadlineId }) {
  const [view, setView] = useState(initialView);
  const update = (changes) => setView((v) => ({ ...v, ...(typeof changes === 'function' ? changes(v) : changes) }));

  // The legacy script's global variables.
  const g = useRef({
    data: initialMeetingData(),
    isMeetingStarted: false,
    badPwd: false,
    isFirstPwdCheck: true,
    ignoreCountdown: ignoreCountdown != null,
    timers: new Set(),
  }).current;

  const leftColRef = useRef(null);
  const later = (fn, ms) => {
    const id = setTimeout(() => {
      g.timers.delete(id);
      fn();
    }, ms);
    g.timers.add(id);
  };

  // --- view helpers (what the legacy code did with innerHTML) ---

  const measure = (m) => update((v) => ({ measure: { ...m, version: (v.measure?.version || 0) + 1 } }));
  const showScreen = (screen, extra = {}) => update({ screen, previewActive: false, ...extra });

  function displayMenu(userLang, userLevel, userChoice) {
    update((v) => ({
      previewActive: !v.previewActive,
      menu: { version: (v.menu?.version || 0) + 1, fromHidden: userChoice != 'Room' },
    }));
  }

  function fadeOutMenu() {
    gsap.set(document.querySelectorAll('.input'), { scale: 1.2, opacity: 0, backgroundColor: '#fff' });
  }

  function displayNumberOfOpenRooms(userLang) {
    if (userLang == 'Hebrew' || userLang == 'Arabic') {
      update({ subheadline: { type: 'openRooms', lang: userLang, count: getNumberOfOpenRooms(g.data) } });
    }
  }

  // --- password and page-open tracking ---

  async function isApproved() {
    const code = getQueryParam('pwd');
    console.log('Checking code: ' + code);
    if (code != null && legacyBugNoSha256 != null) {
      throw new ReferenceError('SHA256 is not defined');
    }
    const isCodeApproved = code != null && (await sha256Hex(code)) == g.data.hashedMeetingCode;
    saveOpenMeetingPageDetails(isCodeApproved, code);
    return isCodeApproved;
  }

  function saveOpenMeetingPageDetails(isCodeApproved, codeParam) {
    if (g.isFirstPwdCheck) {
      g.isFirstPwdCheck = false; // only saved the first time the page checks the password
      const [sourceKey, meetingDate] = getUserSourceAndMeetingDate();
      saveAction('meetings', 'meetings_page_open', {
        source_key: sourceKey,
        meeting_date: meetingDate,
        is_approved: isCodeApproved,
        user_code: codeParam,
      });
    }
  }

  const isMarked = (sessionId) => g.data.markedSessionIds.some((id) => id == sessionId);

  // --- loading the sheet ---

  async function updateNextMeetingInfo(isFirstCall) {
    update({ countdownSpinner: true });
    later(() => updateNextMeetingInfo(), REFRESH_INTERVAL);
    try {
      await loadMeetingData(g.data);
    } catch (error) {
      console.log('failed to update meeting start time');
      console.log(error);
      return; // like the legacy .done(): nothing else happens, and the spinner stays
    }
    update({ countdownSpinner: false });
    try {
      if (await isApproved()) {
        if (isFirstCall || g.badPwd) {
          g.badPwd = false;
          handleCountdown();
        } else {
          g.badPwd = false;
        }
      } else {
        g.badPwd = true;
        g.isMeetingStarted = false;
        displayGenericPage();
      }
    } catch (error) {
      setTimeout(() => {
        throw error;
      });
    }
  }

  async function updateDataAndDisplayRecommendations(userLang, userLevel, userChoice, chosenData) {
    update((v) => ({
      screen: { ...v.screen, groupsSpinnerTop: v.screen.optionsHeadline?.visible ? '65%' : '70%' },
    }));
    try {
      await loadMeetingData(g.data);
    } catch (error) {
      console.log('failed to update data');
      console.log(error);
    }
    update((v) => ({ screen: { ...v.screen, groupsSpinnerTop: null } }));
    displayNumberOfOpenRooms(userLang);
    const sessionId = getSessionId('meetings', false);
    if (isMarked(sessionId)) {
      saveAction('meetings', 'marked_session_open_meeting', { session_id: sessionId });
      showScreen({ type: 'marked', lang: userLang, formState: 'form' });
    } else {
      displayRecommendedOptions(userLang, userLevel);
      displayMenu(userLang, userLevel, userChoice, chosenData);
    }
  }

  // --- countdown ---

  function handleCountdown() {
    if (g.badPwd) {
      return;
    }
    try {
      const countdownDate = new Date(g.data.nextMeetingInfo[1]).getTime();
      if (isNaN(countdownDate)) {
        throw 'Countdown is NaN';
      }
      // The sheet's time is UTC, parsed as local time, so compare it with "now" as UTC parts in local time.
      const now = new Date();
      const nowUTC = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      ).getTime();
      const distance = countdownDate - nowUTC;

      if (distance < 0 || g.ignoreCountdown) {
        if (!g.isMeetingStarted) {
          g.isMeetingStarted = true;
          handleChoice('', '', '');
        }
        later(handleCountdown, 60000); // check every minute whether a new countdown should start
      } else {
        g.isMeetingStarted = false;
        displayCountdown(distance);
        later(handleCountdown, 1000);
      }
    } catch (err) {
      console.log('failed to handle countdown');
      console.log(err);
      if (!g.isMeetingStarted) {
        g.isMeetingStarted = true;
        handleChoice('', '', '');
      }
      later(handleCountdown, 60000);
    }
  }

  function displayCountdown(distance) {
    update({ subheadline: null });
    showScreen({ type: 'countdown', distance, meetingInfo: g.data.nextMeetingInfo });
    measure({ selector: '#after-countdown', add: screen.width <= 600 ? 180 : 230 });
  }

  // --- screens ---

  function displayGenericPage() {
    // (the legacy code started with document.getElementById("headline").innerHTML = ``)
    if (!document.getElementById('headline')) {
      throw new TypeError("Cannot set properties of null (setting 'innerHTML')");
    }
    update({ headlineCleared: true, subheadline: null });
    showScreen({ type: 'generic' });
    measure({ fixed: '500px' });
  }

  function displayChooseNativeLanguage() {
    update({ subheadline: { type: 'answerQuestions' } });
    showScreen({ type: 'language' });
    measure({ selector: '.input-2', add: 100 });
  }

  function displayLevelOptions(userLang) {
    displayNumberOfOpenRooms(userLang);
    showScreen({
      type: 'levels',
      lang: userLang,
      groupsSpinnerTop: null,
      optionsHeadline: { text: recommendedHeadline(userLang), visible: false },
      options: [{ className: optionClass(1), dataVal: 'Choose-Native-Language-Back', text: 'Back' }],
      optionsVersion: 0,
    });
    measure({ selector: '.input-1-after-radio-buttons', add: 100 });
  }

  function roomOption(n, userLang, userLevel, roomNumber, roomType) {
    const data = buildDataString(userLang, userLevel, roomNumber);
    return {
      className: optionClass(n),
      dataVal: data,
      text: groupText(userLang) + roomNumber,
      room: { url: getRoomUrl(g.data, roomNumber), data, roomType },
    };
  }

  function displayRecommendedOptions(userLang, userLevel) {
    const { recommendedRooms, otherRooms } = getRoomOptions(g.data, userLang, userLevel);
    const options = recommendedRooms.map((room, i) => roomOption(i + 1, userLang, userLevel, room, 'Recommended'));
    let backOrder = recommendedRooms.length + 1;
    if (otherRooms.length > 0) {
      backOrder += 1;
      options.push({
        className: optionClass(recommendedRooms.length + 1),
        dataVal: userLang + '-' + userLevel + '-MoreOptions-' + otherRooms.join('_'),
        text: moreGroupsText(userLang),
      });
    }
    options.push({ className: optionClass(backOrder), dataVal: 'Choose-Native-Language-Back', text: 'Back' });
    update((v) => ({
      screen: {
        ...v.screen,
        options,
        optionsVersion: v.screen.optionsVersion + 1,
        optionsHeadline: { text: recommendedHeadline(userLang), visible: true },
      },
    }));
    measure({ selector: '.input-' + backOrder + '-after-radio-buttons', add: 100 });
  }

  function displayMoreOptions(userLang, userLevel, chosenData) {
    const otherRooms = chosenData.split('MoreOptions-')[1].split('_');
    const options = otherRooms.map((room, i) => roomOption(i + 1, userLang, userLevel, room, 'Other'));
    const backOrder = otherRooms.length + 1;
    // (the legacy data-val really ends with "Backk"; it's matched with includes("-Recommended-Back"))
    options.push({ id: 'back-button', className: optionClass(backOrder), dataVal: userLang + '-' + userLevel + '-Recommended-Backk', text: 'Back' });
    update((v) => ({
      screen: {
        ...v.screen,
        options,
        optionsVersion: v.screen.optionsVersion + 1,
        optionsHeadline: { ...v.screen.optionsHeadline, text: moreGroupsText(userLang) + ':' },
      },
    }));
    measure({ selector: '.input-' + backOrder + '-after-radio-buttons', add: 100 });
  }

  // --- choices ---

  function saveMeetingsActions(userLang, userLevel, userChoice, data) {
    if (data != null && data != '') {
      saveAction('meetings', 'select_choice', { choice: data });
    } else if (userLevel != null && userLevel != '' && userLang != null && userLang != '') {
      saveAction('meetings', 'select_choice', { choice: (userLang == 'Hebrew' ? 'H-Native-A-' : 'A-Native-H-') + userLevel });
    }
  }

  function handleChoice(userLang, userLevel, userChoice, chosenData) {
    fadeOutMenu();
    saveMeetingsActions(userLang, userLevel, userChoice, chosenData);
    if (userChoice != 'Room') {
      if (userLang != null && userLang != '') {
        if (userLevel != null && userLevel != '') {
          if (userChoice == 'More') {
            displayMoreOptions(userLang, userLevel, chosenData);
          } else {
            updateDataAndDisplayRecommendations(userLang, userLevel, userChoice, chosenData);
            return; // the menu is displayed after the data is updated
          }
        } else {
          displayLevelOptions(userLang);
        }
      } else {
        displayChooseNativeLanguage();
      }
    }
    displayMenu(userLang, userLevel, userChoice, chosenData);
  }

  // What a clicked menu button leads to, by its data-val.
  function handleMenuData(data) {
    const nativeLanguage = data.includes('H-Native') || data.includes('Hebrew') ? 'Hebrew' : 'Arabic';
    const level = ['Beginner', 'Intermediate', 'Advanced'].filter((l) => data.includes(l)).pop() || '';
    if (data == 'Choose-Native-Language-Back') return handleChoice('', '', 'Back', data);
    if (data == 'Arabic') return handleChoice('Arabic', '', '', data);
    if (data == 'Hebrew') return handleChoice('Hebrew', '', '', data);
    for (const [prefix, lang] of [['H-Native-A-', 'Hebrew'], ['A-Native-H-', 'Arabic']]) {
      for (const l of ['Beginner', 'Intermediate', 'Advanced']) {
        if (data.includes(prefix + l + '-Room')) return handleChoice(lang, l, 'Room', data);
      }
    }
    if (data.includes('MoreOptions')) return handleChoice(nativeLanguage, level, 'More', data);
    if (data.includes('-Recommended-Back')) return handleChoice(nativeLanguage, level);
  }

  function openMeeting(url, data, roomType) {
    const [sourceKey, meetingDate] = getUserSourceAndMeetingDate();
    const nativeLanguage = data.includes('H-Native') ? 'Hebrew' : 'Arabic';
    const otherLanguage = nativeLanguage == 'Hebrew' ? 'Arabic' : 'Hebrew';
    const level = ['Beginner', 'Intermediate', 'Advanced'].filter((l) => data.includes(l)).pop() || '';
    // (the legacy code recognised the endings Room-1 ... Room-12)
    const roomNumber = String(Array.from({ length: 12 }, (_, i) => i + 1).filter((n) => data.endsWith('Room-' + n)).pop() || '');
    saveMeetingEntry(nativeLanguage, otherLanguage + '-' + level, 'Room' + roomNumber + '-' + nativeLanguage, 'Room-' + roomNumber, roomType, sourceKey, meetingDate);
    window.open(url, '_blank');
  }

  // A menu button was clicked: the others fade out, it pulses, then the choice is handled.
  function onOptionClick(element, option) {
    if (option.room) {
      openMeeting(option.room.url, option.room.data, option.room.roomType);
    }
    const siblings = [...element.parentElement.children].filter((el) => el !== element && el.classList.contains('input'));
    gsap
      .timeline({ onComplete: () => handleMenuData(option.dataVal) })
      .to(siblings, { opacity: 0, duration: 0.25 })
      .to(element, { scale: 1.2, duration: 0.25 })
      .to(element, { scale: 1, duration: 0.25 });
  }

  const onLevel = (userLang) => (level) => handleChoice(userLang, level);

  // --- marked session form ---

  function onMarkedSubmit(userLang) {
    return (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const markedFacebook = form.elements.marked_facebook_name.value;
      const markedPhone = form.elements.marked_phone_number.value;
      const fbNotEmpty = markedFacebook.trim() != '';
      const phoneNotEmpty = markedPhone.trim() != '';
      const hebrew = userLang == 'Hebrew';
      if (fbNotEmpty && phoneNotEmpty) {
        const facebook = singleLine(markedFacebook);
        const phone = singleLine(markedPhone);
        getSessionId('meetings', true);
        postToGoogleForm(FEEDBACK_FORM_URL, { 'entry.354079520': facebook, 'entry.1032780145': phone });
        saveAction('meetings', 'marked_session_success_send_details', { markedFacebookName: facebook, markedPhoneNumber: phone });
        update((v) => ({ screen: { ...v.screen, formState: 'sending' } }));
        later(() => update((v) => ({ screen: { ...v.screen, formState: 'error' } })), 1000);
      } else if (!fbNotEmpty && !phoneNotEmpty) {
        saveAction('meetings', 'marked_session_error_send_details', { error: 'marked facebook empty AND marked phone empty' });
        alert(hebrew ? 'כתבו את השם שלכם בפייסבוק ואת מספר הטלפון שלכם' : 'اكتبوا اسمكم بالفيسبوك ورقم التلفون تبعكم');
      } else if (!phoneNotEmpty) {
        saveAction('meetings', 'marked_session_error_send_details', { error: 'marked phone empty', markedFacebookName: markedFacebook });
        alert(hebrew ? 'כתבו את מספר הטלפון שלכם' : 'اكتبوا رقم التلفون تبعكم');
      } else {
        saveAction('meetings', 'marked_session_error_send_details', { error: 'marked facebook empty', markedPhoneNumber: markedPhone });
        alert(hebrew ? 'כתבו את השם שלכם בפייסבוק' : 'اكتبوا اسمكم بالفيسبوك');
      }
    };
  }

  // --- effects ---

  useEffect(() => {
    updateNextMeetingInfo(true);
    return () => g.timers.forEach(clearTimeout);
  }, []);

  // #leftCol's min-height: the distance from its top to the given element, plus some room
  // (the legacy tryToFixLeftColMinHeight()). Runs before the menu animation, which scales the buttons.
  useLayoutEffect(() => {
    const m = view.measure;
    const leftCol = leftColRef.current;
    if (!m) return;
    if (m.fixed) {
      leftCol.style.minHeight = m.fixed;
      return;
    }
    try {
      const last = document.querySelector(m.selector);
      const distance = last.getBoundingClientRect().top - leftCol.getBoundingClientRect().top;
      leftCol.style.minHeight = distance + m.add + 'px';
    } catch (err) {
      console.log(err);
      console.log('failed to fix left col min height');
    }
  }, [view.measure?.version]);

  // The menu buttons pop in (the legacy displayMenu() animation).
  useLayoutEffect(() => {
    if (!view.menu) return;
    const inputs = document.querySelectorAll('.input');
    if (view.menu.fromHidden) {
      gsap.set(inputs, { scale: 1.2, opacity: 0 });
    }
    gsap.to(inputs, { scale: 1, opacity: 1, duration: 1.25, ease: 'elastic.out(1, 0.3)', stagger: 0.1 });
  }, [view.menu?.version]);

  // --- render ---

  const previewClass = 'selected-input input-preview' + (view.previewActive ? ' active' : '');

  function renderScreen() {
    const s = view.screen;
    switch (s.type) {
      case 'generic':
        return <GenericScreen />;
      case 'countdown':
        return <CountdownScreen distance={s.distance} meetingInfo={s.meetingInfo} previewClass={previewClass} />;
      case 'language':
        return <LanguageScreen previewClass={previewClass} onOptionClick={onOptionClick} />;
      case 'levels':
        return (
          <LevelsScreen
            lang={s.lang}
            previewClass={previewClass}
            groupsSpinnerTop={s.groupsSpinnerTop}
            optionsHeadline={s.optionsHeadline}
            options={s.options}
            optionsVersion={s.optionsVersion}
            onLevel={onLevel(s.lang)}
            onOptionClick={onOptionClick}
          />
        );
      case 'marked':
        return <MarkedScreen lang={s.lang} formState={s.formState} onSubmit={onMarkedSubmit(s.lang)} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="container">
        <div className="row-2-columns">
          <div id="leftCol" className="left-col" ref={leftColRef}>
            <div id="my_spinner_countdown">{view.countdownSpinner && <Spinner />}</div>
            <div className="flex-container">
              <section className="content rtl" id="question-area">
                {renderScreen()}
              </section>
            </div>
          </div>
          <div className="right-col rtl">
            <div className="row text-center">
              <div id={legacyBugNoHeadlineId != null ? undefined : 'headline'} className="headline">
                {!view.headlineCleared && (
                  <>
                    כניסה למפגש
                    <br />
                    الدخول للقاء
                  </>
                )}
              </div>
              <div id="subheadline">
                <Subheadline subheadline={view.subheadline} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">{/* just for margin from the footer */}</div>
    </>
  );
}
