import { useState } from 'react';
import { createPortal } from 'react-dom';
import songs from '../data/songs.json';
import { saveAction } from '../lib/tracking.js';
import './Songs.css';

// "שירים - اغاني": a list of Arabic and Hebrew songs; picking one shows its lyrics at the top of the page.
// Replaces public/songsScript.js. Mounted on #songs (the list); the chosen song is rendered into
// #my-text-box through a portal.

const LANG_HEBREW = 1; // tracking values used by the legacy script
const LANG_ARABIC = 2;

// Lyrics are stored with " | " between lines.
const lyricsToHtml = (lyrics) => lyrics.replace(/ \| /g, '<br>').replace(/\| /g, '<br>').replace(/ \|/g, '<br>');

const LABELS = { hebrew: 'עברית', arabic: 'عربي', taatik: 'תעתיק' };

// One language of the song: a small label, its title (if any) and its lyrics (if any).
function SongSection({ name, title, lyrics }) {
  if (title === '' && lyrics === '') return null;
  return (
    <section className={`song-card__section song-card__section--${name}`} lang={name === 'arabic' ? 'ar' : 'he'}>
      <div className="song-card__label">{LABELS[name]}</div>
      {title !== '' && <h3 className="song-card__title" dangerouslySetInnerHTML={{ __html: title }} />}
      {lyrics !== '' && <p className="song-card__lyrics" dangerouslySetInnerHTML={{ __html: lyricsToHtml(lyrics) }} />}
    </section>
  );
}

function Song({ lang, song }) {
  const hebrew = <SongSection key="hebrew" name="hebrew" title={song.HebrewTitle} lyrics={song.HebrewLyrics} />;
  const arabic = <SongSection key="arabic" name="arabic" title={song.ArabicTitle} lyrics={song.ArabicLyrics} />;
  const taatik = <SongSection key="taatik" name="taatik" title={song.TaatikTitle} lyrics={song.TaatikLyrics} />;
  // The song's own language comes first.
  const sections = lang === LANG_HEBREW ? [hebrew, arabic, taatik] : [arabic, taatik, hebrew];

  return (
    <div className="song-card" id="song">
      {song.Link !== '' && (
        <a className="song-card__listen" target="_blank" href={song.Link}>
          <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
          <span>
            שמעו את השיר - <span lang="ar">اسمعوا الاغنية</span>
          </span>
        </a>
      )}
      {sections}
    </div>
  );
}

function SongLinks({ list, lang, titleField, onSelect }) {
  return list.map((song, i) => (
    <h2 className="activityContent" key={i}>
      <a
        title={song[titleField]}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onSelect(lang, i);
        }}
        dangerouslySetInnerHTML={{ __html: song[titleField] }}
      />
    </h2>
  ));
}

export default function Songs() {
  const [selected, setSelected] = useState(null); // { lang, i }

  function selectSong(lang, i) {
    saveAction('songs', 'getSong', { lang, i });
    setSelected({ lang, i });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const song = selected && (selected.lang === LANG_HEBREW ? songs.hebrew : songs.arabic)[selected.i];

  return (
    <>
      {song && createPortal(<Song lang={selected.lang} song={song} />, document.getElementById('my-text-box'))}
      <div className="row text-center">
        <figure className="col-sm-6">
          <h2 className="details-headline-end">שירים בערבית</h2>
          <SongLinks list={songs.arabic} lang={LANG_ARABIC} titleField="ArabicTitle" onSelect={selectSong} />
        </figure>
        <figure className="col-sm-6">
          {/* The legacy markup left this div unclosed; the browser closed it at </figure>, so the
              Hebrew titles have always been inside it (its .row margins affect their layout). */}
          <div className="row text-center">
            <h2 className="details-headline-end">שירים בעברית</h2>
            <SongLinks list={songs.hebrew} lang={LANG_HEBREW} titleField="HebrewTitle" onSelect={selectSong} />
          </div>
        </figure>
      </div>
    </>
  );
}
