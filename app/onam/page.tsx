"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import {
  ArrowUpRight,
  BowlFood,
  Clock,
  Confetti,
  FlowerLotus,
  MusicNotes,
  Play,
  UsersThree,
} from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./onam.module.css";

const JOIN_FORM_URL = "https://forms.gle/ajbEX18S3ryEoFgC8?utm_source=wmsc.in";

const backdropSlides = [
  {
    src: "/onam-cinematic-hero-a.jpg",
    alt: "Joyful Maveli artwork from the WMSC Onam 1.0 poster",
  },
  {
    src: "/onam-cinematic-celebration.jpg",
    alt: "Traditional Kerala Kathakali and cultural celebration",
  },
];

const celebrationCards = [
  {
    icon: FlowerLotus,
    title: "Culture, alive",
    tags: ["Performance", "Heritage", "Colour", "Community"],
    text: "Cultural programmes that bring Kerala’s stories, art forms and festive spirit to the heart of Whitefield.",
  },
  {
    icon: MusicNotes,
    title: "Rhythm, together",
    tags: ["Music", "Dance", "Talent", "Stage"],
    text: "A vibrant stage for familiar rhythms, joyful movement and the remarkable talent within our own community.",
  },
  {
    icon: BowlFood,
    title: "A feast of joy",
    tags: ["Onasadhya", "Games", "Family", "Surprises"],
    text: "From a generous Onasadhya to games and surprises, every moment is designed to be shared and remembered.",
  },
];

const entrance = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

function FixedScrollSlider() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Slide 1 (Maveli): visible at top, gently fades out as user scrolls past 30%
  const heroOpacity = useTransform(smoothProgress, [0, 0.22, 0.52], [1, 0.9, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.52], [1, 1.05]);
  const heroY = useTransform(smoothProgress, [0, 0.52], [0, -25]);

  // Slide 2 (Celebration): smoothly fades in and scales smoothly as user scrolls into the celebration section
  const celebrationOpacity = useTransform(smoothProgress, [0.22, 0.55, 1], [0, 1, 1]);
  const celebrationScale = useTransform(smoothProgress, [0.22, 1], [1.05, 1]);
  const celebrationY = useTransform(smoothProgress, [0.22, 1], [25, 0]);

  return (
    <div className={styles.fixedBackdrop} aria-hidden="true">
      <motion.div
        className={styles.fixedSlide}
        style={{
          opacity: prefersReducedMotion ? 1 : heroOpacity,
          scale: prefersReducedMotion ? 1 : heroScale,
          y: prefersReducedMotion ? 0 : heroY,
        }}
      >
        <img
          src={backdropSlides[0].src}
          alt={backdropSlides[0].alt}
          className={styles.maveliImage}
        />
      </motion.div>

      <motion.div
        className={styles.fixedSlide}
        style={{
          opacity: prefersReducedMotion ? 1 : celebrationOpacity,
          scale: prefersReducedMotion ? 1 : celebrationScale,
          y: prefersReducedMotion ? 0 : celebrationY,
        }}
      >
        <img
          src={backdropSlides[1].src}
          alt={backdropSlides[1].alt}
          className={styles.celebrationImage}
        />
      </motion.div>
    </div>
  );
}

function BlurText({ children, className }: { children: string; className: string }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <h1 className={className} ref={containerRef}>
      {children.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={visible ? {
            filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0],
          } : undefined}
          transition={{
            delay: prefersReducedMotion ? 0 : index * 0.1,
            duration: prefersReducedMotion ? 0.01 : 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

export default function OnamPage() {
  const prefersReducedMotion = useReducedMotion();
  const motionTransition = (delay: number) => ({
    delay: prefersReducedMotion ? 0 : delay,
    duration: prefersReducedMotion ? 0.01 : 0.75,
    ease: "easeOut" as const,
  });

  return (
    <main className={styles.page} id="onam-top">
      <FixedScrollSlider />

      <header className={styles.navbar}>
        <a className={`${styles.logoButton} ${styles.liquidGlass}`} href="/" aria-label="WMSC home">
          <img src="/logo.png" alt="" />
        </a>

        <nav className={`${styles.navPill} ${styles.liquidGlass}`} aria-label="Onam navigation">
          <a href="#onam-top">Home</a>
          <a href="#celebration">Programme</a>
          <a href="#celebration">Traditions</a>
          <a href="https://www.instagram.com/whitefieldmalayalisocialclub" target="_blank" rel="noreferrer">Community</a>
          <a href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Plan your Onam</a>
          <a className={styles.navAction} href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Join WMSC <ArrowUpRight size={18} weight="bold" /></a>
        </nav>

        <a className={`${styles.mobileHome} ${styles.liquidGlass}`} href="/">WMSC</a>
      </header>

      <section className={styles.hero} aria-labelledby="onam-title">
        <div className={styles.heroLayer}>
          <div className={`${styles.heroContent} ${styles.liquidGlassStrong}`}>
            <motion.div className={`${styles.badge} ${styles.liquidGlass}`} variants={entrance} initial="hidden" animate="visible" transition={motionTransition(0.35)}>
              <span>New</span>
              <p>WMSC’s grand Onam celebration arrives in Whitefield</p>
            </motion.div>

            <BlurText className={styles.heroTitle}>One celebration. A thousand memories.</BlurText>

            <motion.p className={styles.heroSubtitle} variants={entrance} initial="hidden" animate="visible" transition={motionTransition(0.8)} id="onam-title">
              Onam 1.0 brings Kerala’s culture, music, movement and flavours
              together for one unforgettable Whitefield community celebration.
            </motion.p>

            <motion.div className={styles.heroActions} variants={entrance} initial="hidden" animate="visible" transition={motionTransition(1.05)}>
              <a className={`${styles.primaryAction} ${styles.liquidGlassStrong}`} href={JOIN_FORM_URL} target="_blank" rel="noreferrer">
                Join the celebration <ArrowUpRight size={20} weight="bold" />
              </a>
              <a className={styles.textAction} href="#celebration">
                View the programme <Play size={17} weight="fill" />
              </a>
            </motion.div>

            <motion.div className={styles.stats} variants={entrance} initial="hidden" animate="visible" transition={motionTransition(1.25)}>
              <article className={`${styles.statCard} ${styles.liquidGlass}`}>
                <Clock size={29} weight="regular" />
                <div><strong>One grand day</strong><span>Of culture, connection and celebration</span></div>
              </article>
              <article className={`${styles.statCard} ${styles.liquidGlass}`}>
                <UsersThree size={29} weight="regular" />
                <div><strong>One community</strong><span>Malayalis across Whitefield and nearby</span></div>
              </article>
            </motion.div>
          </div>

          <motion.div className={styles.traditionRail} variants={entrance} initial="hidden" animate="visible" transition={motionTransition(1.4)}>
            <span className={`${styles.railChip} ${styles.liquidGlass}`}>A celebration of culture, unity and tradition</span>
            <div><strong>Pookalam</strong><strong>Music</strong><strong>Dance</strong><strong>Onasadhya</strong><strong>Games</strong></div>
          </motion.div>
        </div>
      </section>

      <section className={styles.celebration} id="celebration" aria-labelledby="celebration-title">
        <div className={styles.celebrationLayer}>
          <motion.div className={styles.sectionHeader} initial={{ filter: "blur(10px)", opacity: 0, y: 28 }} whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={motionTransition(0.1)}>
            <div>
              <p>{"// Onam 1.0"}</p>
              <h2 id="celebration-title">Tradition,<br />reimagined.</h2>
            </div>
            <div className={`${styles.eventNote} ${styles.liquidGlass}`}>
              <span>Date and venue</span>
              <strong>To be announced</strong>
            </div>
          </motion.div>

          <div className={styles.cardGrid}>
            {celebrationCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article className={`${styles.capabilityCard} ${styles.liquidGlass}`} key={card.title} initial={{ filter: "blur(10px)", opacity: 0, y: 34 }} whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={motionTransition(0.18 + index * 0.12)}>
                  <div className={styles.cardTop}>
                    <span className={`${styles.iconTile} ${styles.liquidGlass}`}><Icon size={27} weight="regular" /></span>
                    <div className={styles.tags}>{card.tags.map((tag) => <span className={styles.liquidGlass} key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className={styles.cardCopy}>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className={styles.sectionFooter}>
            <p><Confetti size={18} weight="regular" /> Cultural programmes · Music and dance · Fun and games · Onasadhya · Surprises</p>
            <a className={`${styles.footerAction} ${styles.liquidGlassStrong}`} href={JOIN_FORM_URL} target="_blank" rel="noreferrer">Be part of Onam 1.0 <ArrowUpRight size={19} weight="bold" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
