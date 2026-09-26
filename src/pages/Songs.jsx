import { useState } from 'react';
import { createPortal } from 'react-dom';
import songs from '../data/songs.json';
import { saveAction } from '../lib/tracking.js';

// "שירים - اغاني": a list of Arabic and Hebrew songs; picking one shows its lyrics at the top of the page.
// Replaces public/songsScript.js. Mounted on #songs (the list); the chosen song is rendered into
// #my-text-box through a portal.

const LANG_HEBREW = 1; // tracking values used by the legacy script
const LANG_ARABIC = 2;

// Lyrics are stored with " | " between lines.
const lyricsToHtml = (lyrics) => lyrics.replace(/ \| /g, '<br>').replace(/\| /g, '<br>').replace(/ \|/g, '<br>');

const Title = ({ html }) => <h2 className="rtl activityContent" style={{ textDecoration: 'underline' }} dangerouslySetInnerHTML={{ __html: html }} />;
const Lyrics = ({ html }) => <h2 className="rtl activityContent" dangerouslySetInnerHTML={{ __html: html }} />;
const Separator = () => <h2 className="my-line">* * * * * * *</h2>;

function Song({ lang, song }) {
  // Each language section is its title (if any) followed by its lyrics (if any).
  const section = (name, title, lyrics) => [
    title !== '' && <Title key={`${name}-title`} html={title} />,
    lyrics !== '' && <Lyrics key={`${name}-lyrics`} html={lyricsToHtml(lyrics)} />,
  ];
  const hebrew = section('hebrew', song.HebrewTitle, song.HebrewLyrics);
  const arabic = section('arabic', song.ArabicTitle, song.ArabicLyrics);
  const taatik = section('taatik', song.TaatikTitle, song.TaatikLyrics);

  // Separators go between sections, counted by how many titles the song has.
  const titles = [song.HebrewTitle, song.ArabicTitle, song.TaatikTitle].filter((t) => t !== '').length;
  const line1 = titles >= 2 && <Separator key="line1" />;
  const line2 = titles >= 3 && <Separator key="line2" />;

  // The song's own language comes first.
  const content =
    lang === LANG_HEBREW ? [hebrew, line1, arabic, line2, taatik] : [arabic, line1, taatik, line2, hebrew];

  return (
    <div className="rectangle">
      <div id="song">
        {content}
        {song.Link !== '' && (
          <h2 className="activityContent">
            <a target="_blank" href={song.Link}>
              שמעו את השיר - اسمعوا الاغنية
            </a>
          </h2>
        )}
      </div>
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
