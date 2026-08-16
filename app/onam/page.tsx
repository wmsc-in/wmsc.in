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
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./onam.module.css";

const heroBackdrops = [
  "/onam-cinematic-hero-a.jpg",
  "/onam-cinematic-hero-b.jpg",
];

const celebrationBackdrops = [
  "/onam-cinematic-celebration-a.jpg",
  "/onam-cinematic-celebration-b.jpg",
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

function FadingBackdrop({ sources, label }: { sources: string[]; label: string }) {
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const frameRefs = useRef<Array<number | null>>(sources.map(() => null));
  const activeIndexRef = useRef(0);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const images = imageRefs.current.filter((image): image is HTMLImageElement => Boolean(image));
    const frames = frameRefs.current;
    if (!images.length) return;

    const fadeTo = (image: HTMLImageElement, target: number, duration: number, index: number) => {
      const runningFrame = frameRefs.current[index];
      if (runningFrame !== null) cancelAnimationFrame(runningFrame);

      const startOpacity = Number.parseFloat(image.style.opacity || window.getComputedStyle(image).opacity || "0");
      const startTime = performance.now();

      const step = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        image.style.opacity = String(startOpacity + (target - startOpacity) * eased);
        if (progress < 1) {
          frameRefs.current[index] = requestAnimationFrame(step);
        } else {
          frameRefs.current[index] = null;
        }
      };

      frameRefs.current[index] = requestAnimationFrame(step);
    };

    images.forEach((image) => { image.style.opacity = "0"; });
    const firstImage = images[0];
    const revealFirst = () => fadeTo(firstImage, 1, prefersReducedMotion ? 1 : 700, 0);
    if (firstImage.complete) revealFirst();
    else firstImage.addEventListener("load", revealFirst, { once: true });

    if (!prefersReducedMotion && sources.length > 1) {
      const cycle = () => {
        const current = activeIndexRef.current;
        const next = (current + 1) % images.length;
        images[next].style.opacity = "0";
        fadeTo(images[current], 0, 650, current);
        fadeTo(images[next], 1, 650, next);
        activeIndexRef.current = next;
        cycleTimerRef.current = setTimeout(cycle, 6100);
      };
      cycleTimerRef.current = setTimeout(cycle, 6100);
    }

    return () => {
      firstImage.removeEventListener("load", revealFirst);
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      frames.forEach((frame) => { if (frame !== null) cancelAnimationFrame(frame); });
    };
  }, [prefersReducedMotion, sources]);

  return (
    <div className={styles.backdrop} role="img" aria-label={label}>
      {sources.map((source, index) => (
        <img
          key={source}
          ref={(element) => { imageRefs.current[index] = element; }}
          src={source}
          alt=""
          aria-hidden="true"
        />
      ))}
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
      <header className={styles.navbar}>
        <a className={`${styles.logoButton} ${styles.liquidGlass}`} href="/" aria-label="WMSC home">
          <img src="/logo.png" alt="" />
        </a>

        <nav className={`${styles.navPill} ${styles.liquidGlass}`} aria-label="Onam navigation">
          <a href="#onam-top">Home</a>
          <a href="#celebration">Programme</a>
          <a href="#celebration">Traditions</a>
          <a href="https://www.instagram.com/whitefieldmalayalisocialclub" target="_blank" rel="noreferrer">Community</a>
          <a href="/#join">Plan your Onam</a>
          <a className={styles.navAction} href="/#join">Join WMSC <ArrowUpRight size={18} weight="bold" /></a>
        </nav>

        <a className={`${styles.mobileHome} ${styles.liquidGlass}`} href="/">WMSC</a>
      </header>

      <section className={styles.hero} aria-labelledby="onam-title">
        <FadingBackdrop sources={heroBackdrops} label="Joyful Maveli artwork from the WMSC Onam 1.0 poster" />

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
              <a className={`${styles.primaryAction} ${styles.liquidGlassStrong}`} href="/#join">
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
        <FadingBackdrop sources={celebrationBackdrops} label="Maveli tug-of-war and festive Onam programme artwork" />

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
            <a className={`${styles.footerAction} ${styles.liquidGlassStrong}`} href="/#join">Be part of Onam 1.0 <ArrowUpRight size={19} weight="bold" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
