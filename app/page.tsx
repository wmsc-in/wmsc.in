"use client";

import { ArrowDown, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

const ZOHO_FORM_URL = "https://forms.zohopublic.in/rajileshpanolisoa1/form/EventRegistration/formperma/JlTPulLc6fSQ_eCq9wDQWDoPQDlxNiOf2gwviDgy3lU";
const ZOHO_FORM_ID = "zf_div_JlTPulLc6fSQ_eCq9wDQWDoPQDlxNiOf2gwviDgy3lU";
const ZOHO_INITIAL_HEIGHT_PX = 1093;
const ZOHO_FOOTER_CROP_PX = 230;
const ZOHO_MIN_VISIBLE_HEIGHT_PX = 520;
const WHATSAPP_JOIN_URL = "https://chat.whatsapp.com/EICxDD6fcK04TztRnZqOJ9";
const JOIN_FORM_URL = "https://forms.gle/ajbEX18S3ryEoFgC8?utm_source=wmsc.in";

type ZohoLeadConfig = {
  utmPNameArr: string[];
  utmcustPNameArr?: string[];
  isSameDomian?: boolean;
};

type ZohoTrackingWindow = typeof window & {
  ZFAdvLead?: ZohoLeadConfig;
  zfutm_zfAdvLead?: { zfautm_gC_enc: (name: string) => string | undefined };
  ZFLead?: ZohoLeadConfig;
  zfutm_zfLead?: { zfutm_gC_enc: (name: string) => string | undefined };
};

const groups = [
  { icon: "🏏", name: "Sports & Games", note: "Cricket, badminton and friendly competition", tone: "sun" },
  { icon: "ക", name: "Cultural & Arts", note: "Music, dance, language and performance", tone: "coral" },
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
  const [joinOpen, setJoinOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const zohoContainerRef = useRef<HTMLDivElement>(null);
  const heroCarouselRef = useRef<HTMLDivElement>(null);
  const heroSlideRefs = useRef<Array<HTMLElement | null>>([]);
  const heroScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeHeroSlideRef = useRef(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setJoinOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = joinOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [joinOpen]);

  useEffect(() => {
    const carousel = heroCarouselRef.current;
    if (!carousel) return;

    const slides = heroSlideRefs.current.filter((slide): slide is HTMLElement => Boolean(slide));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!slides.length || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = slides.map((slide) => slide.querySelector<HTMLElement>(".hero-slide-media"));
      const captions = slides.map((slide) => slide.querySelector<HTMLElement>(".hero-slide-content"));

      gsap.set(slides, {
        autoAlpha: 0,
        xPercent: 0,
        z: -220,
        scale: 0.88,
        rotationY: 13,
        transformOrigin: "center center",
        transformPerspective: 1600,
      });
      gsap.set(media, { scale: 1.12, rotationX: 0, rotationY: 0, transformPerspective: 1400 });
      gsap.set(captions, { autoAlpha: 0, y: 64, rotationX: -10, z: 80, transformPerspective: 1200 });
      gsap.set(slides[0], { autoAlpha: 1, xPercent: 0, z: 0, scale: 1, rotationY: 0 });
      gsap.set(captions[0], { autoAlpha: 1, y: 0, rotationX: 0, z: 80 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      for (let index = 1; index < slides.length; index += 1) {
        const outgoing = slides[index - 1];
        const incoming = slides[index];
        const outgoingCaption = captions[index - 1];
        const incomingMedia = media[index];
        const incomingCaption = captions[index];
        const position = index - 1;

        if (outgoingCaption) {
          timeline.to(outgoingCaption, {
            autoAlpha: 0,
            y: -36,
            rotationX: 8,
            duration: 0.55,
            ease: "power2.in",
          }, position);
        }

        timeline
          .to(outgoing, {
            autoAlpha: 0,
            xPercent: -22,
            z: -260,
            scale: 0.84,
            rotationY: -12,
            duration: 1,
          }, position)
          .fromTo(incoming, {
            autoAlpha: 0,
            xPercent: 26,
            z: -280,
            scale: 0.84,
            rotationY: 14,
          }, {
            autoAlpha: 1,
            xPercent: 0,
            z: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
          }, position)
          .fromTo(incomingMedia, {
            scale: 1.22,
          }, {
            scale: 1.05,
            duration: 1.15,
            ease: "power2.out",
          }, position)
          .fromTo(incomingCaption, {
            autoAlpha: 0,
            y: 64,
            rotationX: -10,
            z: 45,
          }, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            z: 80,
            duration: 0.72,
            ease: "power3.out",
          }, position + 0.22);
      }

      heroScrollTriggerRef.current = ScrollTrigger.create({
        animation: timeline,
        trigger: carousel,
        start: "top top",
        end: () => `+=${window.innerHeight * (slides.length - 1)}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (slides.length - 1),
          directional: false,
          inertia: false,
          duration: { min: 0.3, max: 0.75 },
          delay: 0.6,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const nextIndex = Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1)));
          if (activeHeroSlideRef.current !== nextIndex) {
            activeHeroSlideRef.current = nextIndex;
            setActiveHeroSlide(nextIndex);
          }
        },
      });
    }, carousel);

    ScrollTrigger.refresh();
    return () => {
      heroScrollTriggerRef.current?.kill();
      heroScrollTriggerRef.current = null;
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!joinOpen || formSubmitted || !zohoContainerRef.current) return;

    const container = zohoContainerRef.current;
    const trackingWindow = window as ZohoTrackingWindow;
    let iframeSrc = `${ZOHO_FORM_URL}?zf_rszfm=1`;
    let iframeHasLoaded = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const appendParameter = (name: string, value: string | undefined) => {
      if (value) iframeSrc += `${iframeSrc.includes("?") ? "&" : "?"}${name}=${value}`;
    };

    try {
      const advancedLead = trackingWindow.ZFAdvLead;
      const advancedEncoder = trackingWindow.zfutm_zfAdvLead;
      if (advancedLead && advancedEncoder) {
        advancedLead.utmPNameArr.forEach((parameter) => {
          const isCustom = advancedLead.utmcustPNameArr?.includes(parameter) ?? false;
          const outputName = advancedLead.isSameDomian && !isCustom ? `zf_${parameter}` : parameter;
          appendParameter(outputName, advancedEncoder.zfautm_gC_enc(parameter));
        });
      }

      const lead = trackingWindow.ZFLead;
      const leadEncoder = trackingWindow.zfutm_zfLead;
      if (lead && leadEncoder) {
        lead.utmPNameArr.forEach((parameter) => {
          appendParameter(parameter, leadEncoder.zfutm_gC_enc(parameter));
        });
      }
    } catch {
      // Zoho tracking globals are optional.
    }

    if (!/[?&]referrername=/.test(iframeSrc)) {
      let referrer = window.location.href;
      try {
        referrer = window.self !== window.top
          ? window.top?.location.href ?? referrer
          : (/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(referrer) ? referrer : "");
      } catch {
        // Cross-origin parent pages are intentionally ignored.
      }

      if (referrer.length > 1800) {
        const queryIndex = referrer.indexOf("?");
        if (queryIndex > -1) referrer = referrer.substring(0, queryIndex);
        if (referrer.length > 1800) referrer = referrer.substring(0, 1800);
      }
      if (referrer) appendParameter("referrername", encodeURIComponent(referrer));
    }

    const iframe = document.createElement("iframe");
    iframe.src = iframeSrc;
    iframe.className = "zoho-form";
    iframe.title = "WMSC Event Registration";
    iframe.setAttribute("aria-label", "Event Registration");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.style.height = `${ZOHO_INITIAL_HEIGHT_PX}px`;
    iframe.style.width = "100%";
    iframe.style.transition = "height 0.5s ease";

    const detectSuccessfulNavigation = () => {
      // Ignore the form's initial document load. A successful submission is
      // the only subsequent same-iframe navigation in this one-page form:
      // Zoho opens the configured thank-you page in the iframe.
      if (!iframeHasLoaded) {
        iframeHasLoaded = true;
        return;
      }
      setFormSubmitted(true);
    };

    iframe.addEventListener("load", detectSuccessfulNavigation);
    container.style.height = `${Math.max(ZOHO_INITIAL_HEIGHT_PX - ZOHO_FOOTER_CROP_PX, ZOHO_MIN_VISIBLE_HEIGHT_PX)}px`;
    container.replaceChildren(iframe);

    const applyZohoHeight = (fullHeight: number) => {
      iframe.style.height = `${fullHeight}px`;
      container.style.height = `${Math.max(fullHeight - ZOHO_FOOTER_CROP_PX, ZOHO_MIN_VISIBLE_HEIGHT_PX)}px`;
    };

    const resizeZohoForm = (event: MessageEvent) => {
      if (typeof event.data !== "string") return;
      if (event.source !== iframe.contentWindow) return;
      const frameData = event.data.split("|");
      if (frameData.length !== 2 && frameData.length !== 3) return;

      const [permalink, rawHeight] = frameData;
      const parsedHeight = Number.parseInt(rawHeight, 10);
      if (!permalink || !Number.isFinite(parsedHeight) || !iframe.src.includes("formperma") || !iframe.src.includes(permalink)) return;

      const fullHeight = parsedHeight + 15;
      const nextHeight = `${fullHeight}px`;
      if (iframe.style.height === nextHeight) return;

      if (frameData.length === 3) {
        iframe.scrollIntoView();
        resizeTimer = setTimeout(() => { applyZohoHeight(fullHeight); }, 500);
      } else {
        applyZohoHeight(fullHeight);
      }
    };

    window.addEventListener("message", resizeZohoForm, false);
    return () => {
      window.removeEventListener("message", resizeZohoForm, false);
      iframe.removeEventListener("load", detectSuccessfulNavigation);
      if (resizeTimer) clearTimeout(resizeTimer);
      container.replaceChildren();
    };
  }, [joinOpen, formSubmitted]);

  // Preserved for modal popup
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openJoin = () => {
    setFormSubmitted(false);
    setJoinOpen(true);
    setMenuOpen(false);
  };

  const goToHeroSlide = (requestedIndex: number) => {
    const index = Math.max(0, Math.min(heroSlides.length - 1, requestedIndex));
    const scrollTrigger = heroScrollTriggerRef.current;
    activeHeroSlideRef.current = index;
    setActiveHeroSlide(index);

    if (scrollTrigger) {
      const destination = scrollTrigger.start + window.innerHeight * index;
      scrollTrigger.scroll(destination);
      ScrollTrigger.update();
      return;
    }

  };

  const tiltActiveHeroSlide = (clientX: number, clientY: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const carousel = heroCarouselRef.current;
    const slide = heroSlideRefs.current[activeHeroSlideRef.current];
    const media = slide?.querySelector<HTMLElement>(".hero-slide-media");
    if (!carousel || !media) return;

    const bounds = carousel.getBoundingClientRect();
    const horizontal = (clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (clientY - bounds.top) / bounds.height - 0.5;
    gsap.to(media, {
      x: horizontal * 14,
      y: vertical * 10,
      rotationY: horizontal * 5,
      rotationX: vertical * -4,
      duration: 0.75,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const resetActiveHeroTilt = () => {
    const slide = heroSlideRefs.current[activeHeroSlideRef.current];
    const media = slide?.querySelector<HTMLElement>(".hero-slide-media");
    if (media) gsap.to(media, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.85, ease: "power3.out" });
  };

  return (
    <main id="top">
      <div className="announcement">
        <span>നമസ്കാരം</span>
        <p>Malayalis of Whitefield, this is your community.</p>
        <a href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Come say hello <span aria-hidden="true">↗</span></a>
      </div>

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="WMSC home">
          <img src="/logo.png" alt="" />
          <span><strong>WMSC</strong><small>Whitefield Malayali Social Club</small></span>
        </a>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
          <a href="#moments" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="/onam/" onClick={() => setMenuOpen(false)}>Onam 1.0</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Questions</a>
          <a className="nav-cta" href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Join WMSC <span aria-hidden="true">↗</span></a>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        ><span /><span /></button>
      </nav>

      <section className="hero" id="motion" aria-label="Kerala culture in motion">
        <div
          className="hero-art hero-carousel"
          ref={heroCarouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Kerala culture highlights"
          onPointerMove={(event) => tiltActiveHeroSlide(event.clientX, event.clientY)}
          onPointerLeave={resetActiveHeroTilt}
        >
          <div className="hero-slides" aria-live="off">
            {heroSlides.map((slide, index) => (
              <figure
                className={`hero-slide ${index === activeHeroSlide ? "is-active" : ""}`}
                key={slide.image}
                ref={(element) => { heroSlideRefs.current[index] = element; }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${heroSlides.length}: ${slide.label}`}
                aria-hidden={index !== activeHeroSlide}
              >
                <div className="hero-slide-media">
                  <img src={slide.image} alt={index === activeHeroSlide ? slide.alt : ""} style={{ objectPosition: slide.position }} />
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
          <div className="hero-carousel-controls">
            <button
              className="hero-arrow"
              onClick={() => goToHeroSlide(activeHeroSlide - 1)}
              disabled={activeHeroSlide === 0}
              aria-label="Show previous carousel image"
            ><ArrowLeft size={20} weight="bold" /></button>
            <div className="hero-dots" aria-label="Choose a carousel image">
              {heroSlides.map((slide, index) => (
                <button
                  className={index === activeHeroSlide ? "is-active" : ""}
                  key={slide.image}
                  onClick={() => goToHeroSlide(index)}
                  aria-label={`Show ${slide.label}`}
                  aria-current={index === activeHeroSlide ? "true" : undefined}
                ><span /></button>
              ))}
            </div>
            <button
              className="hero-arrow"
              onClick={() => goToHeroSlide(activeHeroSlide + 1)}
              disabled={activeHeroSlide === heroSlides.length - 1}
              aria-label="Show next carousel image"
            ><ArrowRight size={20} weight="bold" /></button>
          </div>
          <p className="hero-scroll-hint">Scroll to travel <ArrowDown size={16} weight="bold" /></p>
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
            <div className="about-signature"><span>വ</span><p><strong>Everyone has a place here.</strong><br />New to Bengaluru or here for years—you’re welcome.</p></div>
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
            <a className={`group-card ${group.tone} reveal`} key={group.name} href={JOIN_FORM_URL} target="_blank" rel="noreferrer">
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
          <a className="button button-light" href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Find your circle <span aria-hidden="true">↗</span></a>
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
        <a className="button button-primary" href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Join WMSC today <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><img src="/logo.png" alt="WMSC emblem" /><div><strong>WMSC</strong><p>Whitefield Malayali<br />Social Club</p></div></div>
          <p>Kerala in our hearts.<br />Whitefield at our doorstep.</p>
          <div className="footer-links"><a href="#about">Our story</a><a href="#community">Community</a><a href="#moments">What we do</a><a href="/onam/">Onam 1.0</a><a className="footer-join" href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Join us</a></div>
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

      {joinOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setJoinOpen(false); }}>
          <div className="join-modal zoho-modal" role="dialog" aria-modal="true" aria-labelledby="join-title">
            <button className="modal-close" onClick={() => setJoinOpen(false)} aria-label="Close join form">×</button>
            {formSubmitted ? (
              <div className="zoho-success" role="status" aria-live="polite">
                <span className="success-icon" aria-hidden="true"><i /></span>
                <p className="modal-kicker">Registration complete</p>
                <h2 id="join-title">Thank you!</h2>
                <p>Your registration is complete. Join the official WMSC WhatsApp community to stay connected.</p>
                <a className="button success-join-button" href={WHATSAPP_JOIN_URL} target="_blank" rel="noreferrer">
                  Click here to Join Now <span aria-hidden="true">↗</span>
                </a>
              </div>
            ) : (
              <>
                <p className="modal-kicker">Welcome home</p>
                <h2 id="join-title">Come be part of <em>WMSC.</em></h2>
                <p className="modal-intro">Complete the registration form below and a club volunteer can help you find the right official WMSC community.</p>
                <div id={ZOHO_FORM_ID} ref={zohoContainerRef} className="zoho-form-shell" />
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
