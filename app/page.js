export default function Home() {
  const services = [
    ["🔧", "Opravy motorov", "Diagnostika, servis a kompletné opravy motorov."],
    ["🛞", "Brzdy a podvozok", "Brzdové systémy, nápravy, tlmiče a podvozkové opravy."],
    ["⚙️", "Prevodovky", "Servis a opravy manuálnych aj automatických prevodoviek."],
    ["💻", "Diagnostika", "Profesionálna diagnostika a hľadanie príčin porúch."],
    ["🚗", "Karoséria", "Opravy karosérie a riešenie poškodení vozidla."],
    ["🛠️", "Kompletný servis", "Od bežnej údržby až po náročné mechanické opravy."],
  ];

  return (
    <main>
      <nav className="nav">
        <div className="logo">SD<span>car</span> <small>SERVIS</small></div>
        <div className="navlinks">
          <a href="#sluzby">Služby</a>
          <a href="#onas">O nás</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <a className="phone" href="tel:+421949460855">0949 460 855</a>
      </nav>

      <section className="hero">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">AUTOSERVIS • BREZA</p>
          <h1>Keď auto potrebuje<br /><strong>poriadny servis.</strong></h1>
          <p className="lead">Kompletné opravy automobilov od diagnostiky až po motor, brzdy, prevodovku a karosériu.</p>
          <div className="buttons">
            <a className="btn primary" href="tel:+421949460855">Zavolať do servisu</a>
            <a className="btn secondary" href="#sluzby">Pozrieť služby</a>
          </div>
        </div>
        <div className="heroBadge">SDcar<br /><span>SERVIS</span></div>
      </section>

      <section id="sluzby" className="section">
        <p className="eyebrow dark">ČO ROBÍME</p>
        <h2>Kompletný servis na jednom mieste</h2>
        <p className="sectionIntro">Mechanické opravy, diagnostika aj servis vozidiel. Každé auto riešime tak, ako keby bolo naše.</p>
        <div className="grid">
          {services.map(([icon, title, text]) => (
            <article className="card" key={title}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="onas" className="about">
        <div>
          <p className="eyebrow dark">SDcar SERVIS</p>
          <h2>Auto opravíme, nie iba „zmažeme chybu“.</h2>
          <p>Zaoberáme sa kompletnými opravami automobilov. Pri poruche hľadáme skutočnú príčinu a snažíme sa opravu urobiť kvalitne a rozumne.</p>
          <p>Motor • prevodovka • brzdy • podvozok • elektrika • diagnostika • karoséria</p>
        </div>
        <div className="aboutBox">
          <strong>BREZA</strong>
          <span>029 53</span>
          <a href="tel:+421949460855">0949 460 855</a>
        </div>
      </section>

      <section id="kontakt" className="contact">
        <p className="eyebrow">OBJEDNAJ SA</p>
        <h2>Má tvoje auto problém?</h2>
        <p>Ozvi sa a dohodneme si termín.</p>
        <div className="contactBtns">
          <a className="btn primary" href="tel:+421949460855">📞 0949 460 855</a>
          <a className="btn secondary light" href="mailto:stefan1dudasik@gmail.com">✉️ Napísať e-mail</a>
        </div>
      </section>

      <footer>
        <div className="logo">SD<span>car</span> <small>SERVIS</small></div>
        <p>© 2026 SDcar Servis • Breza 02953</p>
      </footer>
    </main>
  );
}
