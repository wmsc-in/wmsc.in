"use client";

import { type FormEvent, useEffect, useState } from "react";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const openJoin = () => {
    setSubmitted(false);
    setJoinOpen(true);
    setMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="top">
      <div className="announcement">
        <span>നമസ്കാരം</span>
        <p>Malayalis of Whitefield, this is your community.</p>
        <button onClick={openJoin}>Come say hello <span aria-hidden="true">↗</span></button>
      </div>

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="WMSC home">
          <img src="/wmsc-logo.png" alt="" />
          <span><strong>WMSC</strong><small>Whitefield Malayali Social Club</small></span>
        </a>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
          <a href="#moments" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Questions</a>
          <button className="nav-cta" onClick={openJoin}>Join WMSC <span aria-hidden="true">↗</span></button>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        ><span /><span /></button>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow animate-in"><span /> Namaskaram, Whitefield!</p>
          <h1 className="animate-in delay-one">A little bit of <em>Kerala.</em><br />Right here in Whitefield.</h1>
          <p className="hero-lede animate-in delay-two">
            A warm, welcoming community for Malayalis to meet, celebrate,
            play, help and feel at home in Bengaluru.
          </p>
          <div className="hero-actions animate-in delay-three">
            <button className="button button-primary" onClick={openJoin}>Join our community <span aria-hidden="true">↗</span></button>
            <a className="text-link" href="#community">Explore WMSC <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof animate-in delay-three">
            <div className="avatar-stack" aria-hidden="true"><span>മ</span><span>വ</span><span>ക</span></div>
            <p><strong>10+ vibrant groups</strong><br />One connected community</p>
          </div>
        </div>

        <div className="hero-art animate-in delay-two">
          <img src="/wmsc-community-hero.png" alt="Malayali families and friends enjoying a community gathering in Whitefield" />
          <div className="hero-wash" />
          <div className="sun-disc"><span>W</span></div>
          <div className="event-card">
            <p>Rooted in Kerala · Growing in Bengaluru</p>
            <strong>നമ്മുടെ സ്വന്തം കൂട്ടായ്മ</strong>
            <h2>Familiar culture.<br />New connections.</h2>
          </div>
          <div className="hero-caption"><span>01</span><p>Celebrating roots.<br />Creating new memories.</p></div>
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
            <button className={`group-card ${group.tone} reveal`} key={group.name} onClick={openJoin}>
              <span className="group-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="group-icon" aria-hidden="true">{group.icon}</span>
              <span className="group-content"><strong>{group.name}</strong><small>{group.note}</small></span>
              <span className="group-arrow" aria-hidden="true">↗</span>
            </button>
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
          <button className="button button-light" onClick={openJoin}>Find your circle <span aria-hidden="true">↗</span></button>
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
        <button className="button button-primary" onClick={openJoin}>Join WMSC today <span aria-hidden="true">↗</span></button>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><img src="/wmsc-logo.png" alt="WMSC emblem" /><div><strong>WMSC</strong><p>Whitefield Malayali<br />Social Club</p></div></div>
          <p>Kerala in our hearts.<br />Whitefield at our doorstep.</p>
          <div className="footer-links"><a href="#about">Our story</a><a href="#community">Community</a><a href="#moments">What we do</a><button onClick={openJoin}>Join us</button></div>
        </div>
        <div className="footer-bottom"><span>Whitefield · Bengaluru · Karnataka</span><span>Built for community, with സ്നേഹം.</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {joinOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setJoinOpen(false); }}>
          <div className="join-modal" role="dialog" aria-modal="true" aria-labelledby="join-title">
            <button className="modal-close" onClick={() => setJoinOpen(false)} aria-label="Close join form">×</button>
            {!submitted ? (
              <>
                <p className="modal-kicker">Welcome home</p>
                <h2 id="join-title">Come be part of<br /><em>WMSC.</em></h2>
                <p className="modal-intro">Leave your details and a club volunteer can help you find the right official WMSC community.</p>
                <form onSubmit={handleSubmit}>
                  <label><span>Your name</span><input name="name" type="text" autoComplete="name" placeholder="How should we call you?" required /></label>
                  <div className="field-row">
                    <label><span>WhatsApp number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91" required /></label>
                    <label><span>Your area</span><input name="area" type="text" placeholder="e.g. Kadugodi" required /></label>
                  </div>
                  <label><span>Most interested in</span><select name="interest" defaultValue=""><option value="" disabled>Choose a community</option>{groups.map((group) => <option key={group.name}>{group.name}</option>)}</select></label>
                  <label className="consent"><input type="checkbox" required /><span>I’m happy for a WMSC volunteer to contact me about joining.</span></label>
                  <button className="button button-primary" type="submit">Send my interest <span aria-hidden="true">↗</span></button>
                </form>
                <small className="privacy-note">Your details are only used to help you connect with the right WMSC group.</small>
              </>
            ) : (
              <div className="success-state">
                <span aria-hidden="true">✓</span><p className="modal-kicker">Interest received</p><h2 id="join-title">നന്ദി!</h2><p>Thanks for reaching out. A WMSC volunteer can take it from here.</p><button className="button button-primary" onClick={() => setJoinOpen(false)}>Back to the website</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
