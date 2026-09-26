const activities = [
  { href: 'questions.html', label: 'שואלים אחד את השני  -   منسأل بعض' },
  { href: 'describePhoto.html', label: 'מה רואים בתמונה?  -   شو شايفين بالصّورة؟' },
  { href: 'three.html', label: 'שלושה דברים  -   ثلاثة أشياء' },
  { href: 'discussions.html', label: 'מועדון דיבייט  -   نادي النقاش' },
  { href: '21questions.html', label: 'מפורסמים  -  مشاهير' },
  { href: 'story.html', label: 'בונים ביחד סיפור  -  نبني مع بعض قصة' },
  { href: 'songs.html', label: 'שירים - اغاني' },
  { href: 'countryCity.html', label: 'ארץ עיר  -   إنسان حيوان نبات' },
  { href: 'jokes.html', label: 'בדיחות  -  نكت' },
  { href: 'picture.html', label: 'היכרות בעזרת תמונות - تعارف عن طريق الصور' },
  { href: 'slang.html', label: 'סלנג - مصطلحات عامية' },
  { href: 'sayings.html', label: 'פתגמים  -  امثال' },
  { href: 'fastest.html', label: 'הזוג הכי מהיר  -   أسرع اثنين' },
  { href: 'truth-or-lie.html', label: 'אמת או שקר  -  صدق او كذب' },
  { href: 'wind.html', label: 'הרוח נושבת  -  تهب الريح' },
];

// Renders the contents of <nav id="header">. The mobile toggle and the dropdown are still
// driven by Bootstrap 3's jQuery plugin through the data-toggle attributes.
export default function Navbar() {
  return (
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a href="/index.html" className="navbar-brand">נפגשים לדבר &nbsp; نلتقي لنحكي</a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown rtl">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              פעילויות &nbsp; فعاليات <b className="caret"></b>
            </a>
            <ul className="dropdown-menu dropdown-menu-right" style={{ textAlign: 'right' }}>
              {activities.map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
