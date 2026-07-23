import { ProtectedContact } from "./protected-contact";

const services = [
  {
    index: "01",
    label: "MIGRATION / MODERNIZATION",
    title: "Migracje i modernizacja AWS",
    description:
      "Od oceny środowiska i planu migracji po modernizację aplikacji i platform z wykorzystaniem agentów AI.",
    details: [
      "Migration strategy",
      "Application modernization",
      "AI-assisted delivery",
    ],
  },
  {
    index: "02",
    label: "DEVOPS / PLATFORM",
    title: "DevOps i platform engineering",
    description:
      "Platformy, automatyzacja i procesy, które skracają drogę od pomysłu do stabilnej produkcji.",
    details: ["CI/CD", "Infrastructure as Code", "Developer experience"],
  },
  {
    index: "03",
    label: "COST / VALUE",
    title: "FinOps i optymalizacja",
    description:
      "Pełna widoczność kosztów, odpowiedzialność zespołów i optymalizacja bez hamowania rozwoju.",
    details: ["Cost visibility", "Unit economics", "Optimization"],
  },
  {
    index: "04",
    label: "AGENTIC / AI",
    title: "Agentic AI na AWS",
    description:
      "Od trafnego przypadku użycia po bezpieczne rozwiązanie agentowe osadzone w Twoim środowisku.",
    details: ["Use-case discovery", "Architecture", "Guardrails"],
  },
];

const process = [
  {
    step: "01",
    title: "Diagnoza",
    description:
      "Porządkujemy cele, ograniczenia, ryzyka i prawdziwy punkt startu.",
  },
  {
    step: "02",
    title: "Blueprint",
    description:
      "Projektujemy docelową architekturę, priorytety i mierzalny plan działania.",
  },
  {
    step: "03",
    title: "Wdrożenie",
    description:
      "Pracujemy razem z Twoim zespołem, automatyzując i przekazując wiedzę.",
  },
  {
    step: "04",
    title: "Ewolucja",
    description:
      "Mierzymy efekty, optymalizujemy i rozwijamy platformę wraz z biznesem.",
  },
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">
        Przejdź do treści
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Architekci Chmury — strona główna">
          <span className="brand-mark" aria-hidden="true">
            AC
          </span>
          <span>Architekci Chmury</span>
        </a>

        <nav className="main-nav" aria-label="Główna nawigacja">
          <a href="#uslugi">Usługi</a>
          <a href="#podejscie">Podejście</a>
          <a href="#ekspert">O mnie</a>
        </nav>

        <a className="header-cta" href="#kontakt">
          Porozmawiajmy <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" id="main-content">
          <div className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            AWS CLOUD CONSULTING / POLSKA
          </div>
          <h1>
            Budujemy
            <br />
            przewagę
            <br />
            na <span>AWS.</span>
          </h1>
          <p className="hero-lead">
            Doradztwo chmurowe dla firm, które chcą działać szybciej,
            bezpieczniej i bardziej efektywnie.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#kontakt">
              <span>Porozmawiajmy o Twojej chmurze</span>
              <span className="button-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <span className="hero-note">OD STRATEGII DO DZIAŁAJĄCEJ PLATFORMY</span>
          </div>
        </div>

        <div className="blueprint" aria-hidden="true">
          <div className="blueprint-caption">
            <span>ARCHITEKTURA</span>
            <span>PRZEWAGI</span>
          </div>
          <p>
            Projektujemy chmurę jak system biznesowy — każdy element ma cel,
            koszt i właściciela.
          </p>
          <span className="blueprint-tag blueprint-tag-top">SECURITY / SCALE</span>
          <span className="blueprint-tag blueprint-tag-bottom">COST / VALUE</span>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="diamond diamond-outer" />
          <div className="diamond diamond-middle" />
          <div className="diamond diamond-core">
            <span>AWS</span>
          </div>
          <div className="blueprint-code">BLUEPRINT AC—2026.07</div>
          <div className="scroll-label">PRZEWIŃ PO ZAKRES ↓</div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Najważniejsze kompetencje">
        <div className="proof-item">
          <span>A / 01</span>
          <strong>20+ lat w IT</strong>
        </div>
        <div className="proof-item">
          <span>A / 02</span>
          <strong>AWS Ambassador</strong>
        </div>
        <div className="proof-item proof-item-wide">
          <span>A / 03</span>
          <strong>Migracje · Modernizacja · Agenci AI</strong>
        </div>
      </section>

      <section className="section services" id="uslugi">
        <div className="section-intro">
          <div>
            <span className="section-code">01 / ZAKRES</span>
            <h2>Jedna chmura. Pełny kontekst.</h2>
          </div>
          <p>
            Łączę perspektywę architekta, operatora i doradcy. Dzięki temu
            decyzje technologiczne wspierają cele biznesowe, zamiast tworzyć
            kolejną warstwę złożoności.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.index}>
              <div className="service-topline">
                <span>{service.index}</span>
                <span>{service.label}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section approach" id="podejscie">
        <div className="approach-visual" aria-hidden="true">
          <div className="approach-axis approach-axis-x" />
          <div className="approach-axis approach-axis-y" />
          <div className="approach-ring approach-ring-one" />
          <div className="approach-ring approach-ring-two" />
          <div className="approach-core">AWS</div>
          <span className="axis-label axis-label-top">TECHNOLOGIA</span>
          <span className="axis-label axis-label-side">BIZNES</span>
        </div>

        <div className="approach-content">
          <span className="section-code">02 / MODEL WSPÓŁPRACY</span>
          <h2>Architektura to decyzje, nie diagramy.</h2>
          <p className="approach-lead">
            Każdy projekt zaczynamy od właściwego pytania: jaki rezultat ma
            przynieść chmura i jak sprawdzimy, że go osiągnęliśmy?
          </p>
          <ol className="process-list">
            {process.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section expert" id="ekspert">
        <div className="expert-heading">
          <span className="section-code">03 / EKSPERT</span>
          <h2>
            Doświadczenie od infrastruktury
            <br />
            po <em>agentic AI.</em>
          </h2>
        </div>
        <div className="expert-grid">
          <div className="expert-statement">
            <p className="expert-lead">
              Od ponad 20 lat pracuję na styku infrastruktury, architektury i
              biznesu. To doświadczenie nauczyło mnie, że najlepsza
              architektura nie zaczyna się od usługi AWS — zaczyna się od
              zrozumienia ludzi, procesów, ryzyka i ekonomii produktu.
            </p>
            <p>
              Współpracuję z największymi firmami i organizacjami, głównie z
              segmentu mid-size i enterprise w Europie oraz USA. Najmocniej
              koncentruję się na migracji i modernizacji środowisk AWS — także
              z wykorzystaniem agentów AI, co przyspiesza analizę, planowanie i
              realizację zmian. Wspierając biznesy z różnych sektorów, łączę
              techniczną głębię z językiem decyzji biznesowych, dlatego równie
              swobodnie pracuję z zespołami inżynierskimi, jak i z kadrą
              zarządzającą.
            </p>
            <p>
              Wiedzą dzielę się także poza projektami: podczas AWS Summits,
              re:Invent, AWS Community Days i meetupów w Polsce oraz na świecie,
              a także na łamach miesięcznika IT Professional. Dobra prezentacja
              nie jest dla mnie dodatkiem — to narzędzie, które zamienia
              złożoną technologię w jasne decyzje i buduje porozumienie między
              biznesem a IT.
            </p>
          </div>
          <div className="expert-spec">
            <div>
              <span>ZASIĘG</span>
              <strong>Europa · USA</strong>
            </div>
            <div>
              <span>SKALA</span>
              <strong>Mid-size · Enterprise</strong>
            </div>
            <div>
              <span>WYRÓŻNIENIA</span>
              <strong>
                AWS Ambassador · AWS Community Builder · AWS Black Belt —
                Containers
              </strong>
            </div>
            <div>
              <span>GŁÓWNY KIERUNEK</span>
              <strong className="expert-focus">
                Migracje i modernizacja AWS — również z użyciem agentów AI
              </strong>
            </div>
            <div>
              <span>SCENA I MEDIA</span>
              <strong>
                AWS Summits · re:Invent · Community Days ·{" "}
                <a
                  href="https://itprofessional.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IT Professional <span aria-hidden="true">↗</span>
                </a>
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="kontakt">
        <div className="contact-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="section-code">04 / KONTAKT</span>
        <h2>
          Masz wyzwanie
          <br />
          w chmurze?
        </h2>
        <p>
          Zacznijmy od konkretnej rozmowy o architekturze, kosztach lub kolejnym
          etapie rozwoju Twojej platformy.
        </p>
        <div className="contact-reveal" aria-live="polite">
          <ProtectedContact />
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            AC
          </span>
          <span>Architekci Chmury</span>
        </a>
        <p>Architektura AWS, która pracuje dla biznesu.</p>
        <span>© 2026 ARCHITEKCI CHMURY</span>
      </footer>
    </main>
  );
}
