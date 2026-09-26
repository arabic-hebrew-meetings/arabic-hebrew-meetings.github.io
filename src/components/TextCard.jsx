// A card with lines of text, e.g. the original, its transliteration and its translation.
// Lines are rendered as HTML (the legacy scripts used innerHTML, and some data contains <br>);
// they only ever come from the site's own data files.
export default function TextCard({ lines }) {
  return (
    <div className="rectangle">
      {lines.map(({ id, html }) => (
        <h2 key={id} className="rtl activityContent" id={id} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  );
}
