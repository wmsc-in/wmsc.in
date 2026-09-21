"use client";

import { ArrowLeft, ArrowRight, Palette, UsersThree } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type TouchEvent as ReactTouchEvent } from "react";
import { REGISTRATION_FORM_URL as JOIN_FORM_URL } from "../lib/registration";

const groups = [
  { icon: "🏏", name: "Sports & Games", note: "Cricket, badminton and friendly competition", tone: "sun" },
  { icon: <Palette size={32} weight="bold" />, name: "Cultural & Arts", note: "Music, dance, language and performance", tone: "coral" },
  { icon: "♟", name: "Cyber Alerts", note: "Trusted updates that keep neighbours safer", tone: "mint" },
  { icon: "↗", name: "Classifieds & Business", note: "Local finds, services and opportunities", tone: "blue" },
  { icon: "🏃", name: "Runners & Joggers", note: "Morning miles with familiar faces", tone: "lime" },
  { icon: "♥", name: "Charity & Blood Donation", note: "Showing up when our community needs us", tone: "rose" },
  { icon: "◉", name: "Riders Group", note: "Weekend roads and stories worth sharing", tone: "sand" },
  { icon: "✦", name: "Super Ladies League", note: "A joyful circle led by women", tone: "violet" },
  { icon: "💬", name: "General Community", note: "Everyday conversations and connections", tone: "green" },
];

const moments = [
  { malayalam: "ഓണം", title: "Onam, together", text: "Pookalam colours, a generous sadya and the unmistakable energy of a community celebrating as one.", number: "01" },
  { malayalam: "കായികം", title: "Play, every season", text: "From cricket mornings to casual runs, sport gives new neighbours the easiest way to become old friends.", number: "02" },
  { malayalam: "കരുതൽ", title: "Care that travels", text: "Blood donation, timely alerts and hands-on support—because community matters most when someone needs it.", number: "03" },
];

const heroSlides = [
  {
    image: "/inaguration.png",
    alt: "WMSC Grand Inauguration ceremony with members and dignitaries celebrating community spirit",
    malayalam: "ഉദ്ഘാടനം",
    label: "WMSC Inauguration · Grand Opening",
    title: "Where our journey begins.",
    description: "United by heritage, thriving in Whitefield—celebrating the official grand launch of WMSC.",
    position: "center center",
  },
  {
    image: "/hero-kathakali.webp",
    alt: "Kathakali performer in traditional costume at a Kerala temple courtyard",
    malayalam: "കഥകളി",
    label: "Kathakali · Classical art",
    title: "Stories painted in colour.",
    description: "A little bit of Kerala. Right here in Whitefield.",
    position: "67% center",
  },
  {
    image: "/hero-theyyam.webp",
    alt: "Theyyam performer in vivid ceremonial costume in a sacred Kerala grove",
    malayalam: "തെയ്യം",
    label: "Theyyam · Living ritual",
    title: "Rhythm, ritual, remembrance.",
    description: "Sacred colour, living memory and a rhythm that still brings us together.",
    position: "68% center",
  },
  {
    image: "/hero-vallam-kali.webp",
    alt: "Vallam Kali snake boat team racing across Kerala backwaters",
    malayalam: "വള്ളംകളി",
    label: "Vallam Kali · One team",
    title: "One boat. One beat.",
    description: "Every oar moving as one—Kerala’s most exhilarating expression of teamwork.",
    position: "62% center",
  },
  {
    image: "/hero-valla-sadya.webp",
    alt: "Kerala community sharing a traditional Valla Sadya on banana leaves",
    malayalam: "വള്ളസദ്യ",
    label: "Valla Sadya · Shared joy",
    title: "A feast that gathers everyone.",
    description: "Banana leaves, generous flavours and the joy of sitting down together.",
    position: "58% center",
  },
  {
    image: "/hero-coconut-hills.webp",
    alt: "Coconut palms, calm backwaters and misty green Kerala hills",
    malayalam: "കേരളം",
    label: "Kerala · Always close",
    title: "Green horizons. Familiar calm.",
    description: "Coconut palms, quiet water and a landscape that always feels like home.",
    position: "62% center",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroCarouselRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const heroPausedRef = useRef(false);
  const heroResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (heroPaused || menuOpen) return;
    const autoplay = window.setInterval(() => {
      if (heroPausedRef.current) return;
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);
    return () => window.clearInterval(autoplay);
  }, [heroPaused, menuOpen]);

  const goToHeroSlide = (requestedIndex: number) => {
    const index = Math.max(0, Math.min(heroSlides.length - 1, requestedIndex));
    setActiveHeroSlide(index);
  };

  const pauseHeroTemporarily = () => {
    heroPausedRef.current = true;
    setHeroPaused(true);
    if (heroResumeTimerRef.current) window.clearTimeout(heroResumeTimerRef.current);
    heroResumeTimerRef.current = window.setTimeout(() => {
      heroPausedRef.current = false;
      setHeroPaused(false);
      heroResumeTimerRef.current = null;
    }, 6500);
  };

  const beginHeroSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || (event.target as HTMLElement).closest("button, a")) return;
    pauseHeroTemporarily();
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const updateHeroSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const start = swipeStartRef.current;
    if (!start) return;
    const horizontalDistance = event.clientX - start.x;
    const verticalDistance = event.clientY - start.y;
    if (Math.abs(horizontalDistance) < 44 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance) * 1.1) return;

    swipeStartRef.current = null;
    goToHeroSlide(activeHeroSlide + (horizontalDistance < 0 ? 1 : -1));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const finishHeroSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;

    const horizontalDistance = event.clientX - start.x;
    const verticalDistance = event.clientY - start.y;
    if (Math.abs(horizontalDistance) < 48 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return;
    goToHeroSlide(activeHeroSlide + (horizontalDistance < 0 ? 1 : -1));
  };

  const beginHeroTouch = (event: ReactTouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) return;
    const touch = event.touches[0];
    if (!touch) return;
    pauseHeroTemporarily();
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const updateHeroTouch = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    const touch = event.touches[0];
    if (!start || !touch) return;
    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    if (Math.abs(horizontalDistance) < 36 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance) * 1.05) return;

    event.preventDefault();
    swipeStartRef.current = null;
    goToHeroSlide(activeHeroSlide + (horizontalDistance < 0 ? 1 : -1));
  };

  return (
    <main id="top" className="home-page">
      <div className="announcement">
        <span>നമസ്കാരം</span>
        <p>Malayalis of Whitefield, this is your community.</p>
        <a href={JOIN_FORM_URL}>Come say hello <span aria-hidden="true">↗</span></a>
      </div>

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="WMSC home">
          <img src="/logo.svg" alt="" />
          <span><strong>WMSC</strong><small>Whitefield Malayali Social Club</small></span>
        </a>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
          <a href="#moments" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="/onam/" onClick={() => setMenuOpen(false)}>Onam 1.0</a>
          <a href="/blog/" onClick={() => setMenuOpen(false)}>News</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Questions</a>
          <a className="nav-cta" href={JOIN_FORM_URL}>Join WMSC <span aria-hidden="true">↗</span></a>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        ><span /><span /></button>
      </nav>

      <aside className="onam-launch-banner" aria-label="Onam 1.0 featured celebration">
        <div className="onam-launch-copy">
          <span className="onam-launch-badge">Featured</span>
          <p><strong>Onam 1.0</strong><span>Kerala’s grand celebration is coming to Whitefield.</span></p>
        </div>
        <a href="/onam/">Explore Onam details <ArrowRight size={18} weight="bold" /></a>
      </aside>

      <section className="hero" id="motion" aria-label="Kerala culture in motion">
        <div
          className="hero-art hero-carousel"
          ref={heroCarouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Kerala culture highlights"
          onPointerDown={beginHeroSwipe}
          onPointerMove={updateHeroSwipe}
          onPointerUp={finishHeroSwipe}
          onPointerLeave={(event) => {
            if (swipeStartRef.current) finishHeroSwipe(event);
          }}
          onPointerCancel={() => { swipeStartRef.current = null; }}
          onTouchStart={beginHeroTouch}
          onTouchMove={updateHeroTouch}
          onTouchEnd={() => { swipeStartRef.current = null; }}
          onTouchCancel={() => { swipeStartRef.current = null; }}
        >
          <div className="hero-slides" aria-live="off">
            {heroSlides.map((slide, index) => (
              <figure
                className={`hero-slide ${index === activeHeroSlide ? "is-active" : ""}`}
                key={slide.image}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${heroSlides.length}: ${slide.label}`}
                aria-hidden={index !== activeHeroSlide}
              >
                <div className="hero-slide-media">
                  <img
                    src={slide.image}
                    alt={index === activeHeroSlide ? slide.alt : ""}
                    style={{ objectPosition: slide.position }}
                    draggable={false}
                  />
                </div>
                <figcaption className="hero-slide-content">
                  <span>{slide.label}</span>
                  <p>{slide.malayalam}</p>
                  {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                  <small>{slide.description}</small>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="hero-topline">
            <p className="hero-carousel-badge"><span /> Kerala, in motion</p>
            <p className="hero-slide-counter" aria-live="polite">
              <strong>{String(activeHeroSlide + 1).padStart(2, "0")}</strong>
              <span>/</span>
              {String(heroSlides.length).padStart(2, "0")}
            </p>
          </div>
          <div className="hero-carousel-controls" onPointerDown={(event) => event.stopPropagation()} onTouchStart={(event) => event.stopPropagation()}>
            <button
              className="hero-arrow"
              onClick={() => { pauseHeroTemporarily(); goToHeroSlide(activeHeroSlide - 1); }}
              disabled={activeHeroSlide === 0}
              aria-label="Show previous carousel image"
            ><ArrowLeft size={20} weight="bold" /></button>
            <div className="hero-dots" aria-label="Choose a carousel image">
              {heroSlides.map((slide, index) => (
                <button
                  className={index === activeHeroSlide ? "is-active" : ""}
                  key={slide.image}
                  onClick={() => { pauseHeroTemporarily(); goToHeroSlide(index); }}
                  aria-label={`Show ${slide.label}`}
                  aria-current={index === activeHeroSlide ? "true" : undefined}
                ><span /></button>
              ))}
            </div>
            <button
              className="hero-arrow"
              onClick={() => { pauseHeroTemporarily(); goToHeroSlide(activeHeroSlide + 1); }}
              disabled={activeHeroSlide === heroSlides.length - 1}
              aria-label="Show next carousel image"
            ><ArrowRight size={20} weight="bold" /></button>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Community highlights">
        <div>
          <span>Culture & arts</span><i>✦</i><span>Sports & games</span><i>✦</i><span>Care & support</span><i>✦</i><span>Local connections</span><i>✦</i>
          <span aria-hidden="true">Culture & arts</span><i aria-hidden="true">✦</i><span aria-hidden="true">Sports & games</span><i aria-hidden="true">✦</i><span aria-hidden="true">Care & support</span><i aria-hidden="true">✦</i><span aria-hidden="true">Local connections</span><i aria-hidden="true">✦</i>
        </div>
      </div>

      <section className="about section" id="about">
        <div className="section-kicker reveal"><span>01</span> Our story</div>
        <div className="about-grid">
          <div className="about-head reveal">
            <p className="malayalam-word">സ്വാഗതം</p>
            <h2>Home is a feeling.<br /><em>We bring it closer.</em></h2>
          </div>
          <div className="about-copy reveal">
            <p className="lead">WMSC is a social club built by and for Malayalis living in Whitefield and nearby Bengaluru neighbourhoods.</p>
            <p>What began with simple WhatsApp conversations has grown into interest groups, celebrations, play, local help and friendships that make a big city feel more personal.</p>
            <div className="about-signature"><span aria-hidden="true"><UsersThree size={28} weight="bold" /></span><p><strong>Everyone has a place here.</strong><br />New to Bengaluru or here for years—you’re welcome.</p></div>
          </div>
        </div>
        <div className="values reveal">
          <article><span>01</span><h3>Belong</h3><p>Find familiar language, food, stories and people—without needing an introduction.</p></article>
          <article><span>02</span><h3>Celebrate</h3><p>Keep Kerala’s traditions alive while creating fresh, local memories together.</p></article>
          <article><span>03</span><h3>Contribute</h3><p>Share a skill, lend a hand, start a game or simply show up for your neighbours.</p></article>
        </div>
      </section>

      <section className="community section" id="community">
        <div className="community-intro reveal">
          <div className="section-kicker light"><span>02</span> Find your people</div>
          <h2>A club with room for<br /><em>every part of you.</em></h2>
          <p>Inspired by the active WhatsApp circles that keep WMSC moving every day.</p>
        </div>
        <div className="group-grid">
          {groups.map((group, index) => (
            <a className={`group-card ${group.tone} reveal`} key={group.name} href={JOIN_FORM_URL}>
              <span className="group-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="group-icon" aria-hidden="true">{group.icon}</span>
              <span className="group-content"><strong>{group.name}</strong><small>{group.note}</small></span>
              <span className="group-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="moments section" id="moments">
        <div className="moments-heading reveal">
          <div className="section-kicker"><span>03</span> The WMSC rhythm</div>
          <h2>More than a group chat.<br /><em>A community in motion.</em></h2>
        </div>
        <div className="moments-list">
          {moments.map((moment) => (
            <article className="moment reveal" key={moment.number}>
              <div className="moment-number">{moment.number}</div>
              <p className="moment-malayalam">{moment.malayalam}</p>
              <div><h3>{moment.title}</h3><p>{moment.text}</p></div>
              <span aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-story">
        <div className="feature-photo reveal">
          <img src="/wmsc-community-hero.png" alt="A warm WMSC community moment" />
          <p><span>From Kerala</span><strong>12°N</strong></p>
          <p><span>To Whitefield</span><strong>13°N</strong></p>
        </div>
        <div className="feature-copy reveal">
          <p className="malayalam-word">ഒരുമ</p>
          <h2>Different journeys.<br />One shared <em>home.</em></h2>
          <p>WMSC makes it easier to arrive, connect and participate. Join the general community first, then choose the circles that match your interests.</p>
          <a className="button button-light" href={JOIN_FORM_URL}>Find your circle <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="steps section">
        <div className="steps-title reveal">
          <div className="section-kicker"><span>04</span> Start here</div>
          <h2>Three easy steps<br />to say <em>hello.</em></h2>
        </div>
        <div className="steps-grid reveal">
          <article><span>1</span><h3>Tell us about you</h3><p>Share your name, neighbourhood and the communities you’re interested in.</p></article>
          <article><span>2</span><h3>Meet a WMSC admin</h3><p>A volunteer will help you find the right official WhatsApp groups.</p></article>
          <article><span>3</span><h3>Join in your own way</h3><p>Attend an event, play a game, help a neighbour—or begin with a simple hello.</p></article>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-title reveal">
          <div className="section-kicker"><span>05</span> Good to know</div>
          <h2>Questions,<br /><em>answered.</em></h2>
        </div>
        <div className="faq-list reveal">
          <details><summary>Who can join WMSC?<span>+</span></summary><p>Malayalis and families living in Whitefield and nearby Bengaluru areas who want to connect with the local community are welcome.</p></details>
          <details><summary>Is there a membership fee?<span>+</span></summary><p>Submitting an interest request is free. If a specific event or activity has a shared cost, its organising team will communicate that clearly in advance.</p></details>
          <details><summary>How do I join a WhatsApp group?<span>+</span></summary><p>Use the join form on this website. A WMSC volunteer can then guide you to the official general or interest-based group that fits.</p></details>
          <details><summary>Can I volunteer or start an activity?<span>+</span></summary><p>Absolutely. WMSC grows through members who bring ideas, time and skills. Mention it in the join form and the team can connect with you.</p></details>
        </div>
      </section>

      <section className="join-banner" id="join">
        <div className="join-flower" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <p className="malayalam-word">കൂടെ കൂടാം</p>
        <h2>Your Whitefield<br />community is <em>waiting.</em></h2>
        <p>Bring your stories, your ideas and your favourite sadya debate.</p>
        <a className="button button-primary" href={JOIN_FORM_URL}>Join WMSC today <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><img src="/logo.svg" alt="WMSC emblem" /><div><strong>WMSC</strong><p>Whitefield Malayali<br />Social Club</p></div></div>
          <p>Kerala in our hearts.<br />Whitefield at our doorstep.</p>
          <div className="footer-links"><a href="#about">Our story</a><a href="#community">Community</a><a href="#moments">What we do</a><a href="/onam/">Onam 1.0</a><a href="/blog/">News</a><a className="footer-join" href={JOIN_FORM_URL}>Join us</a></div>
          <div className="footer-social">
            <p>Follow the community</p>
            <div>
              <button type="button" aria-label="Facebook link coming soon"><span aria-hidden="true">f</span>Facebook</button>
              <button type="button" aria-label="YouTube link coming soon"><span className="youtube-mark" aria-hidden="true">▶</span>YouTube</button>
              <a href="https://www.instagram.com/whitefieldmalayalisocialclub" target="_blank" rel="noreferrer" aria-label="WMSC on Instagram"><span aria-hidden="true">◎</span>Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><span>Whitefield · Bengaluru · Karnataka</span><span className="footer-credit">Built for community by <a href="https://www.soance.com/" target="_blank" rel="noreferrer">Soance Innovations</a> with love.</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
