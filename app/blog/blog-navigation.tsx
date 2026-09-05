"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./blog.module.css";

const joinUrl = "https://forms.gle/ajbEX18S3ryEoFgC8?utm_source=wmsc.in";

const navigation = [
  { href: "/#about", label: "Our story" },
  { href: "/#community", label: "Community" },
  { href: "/#moments", label: "What we do" },
  { href: "/onam/", label: "Onam 1.0" },
  { href: "/blog/", label: "News" },
  { href: "/#faq", label: "Questions" },
];

export default function BlogNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/" aria-label="WMSC home">
          <img src="/logo.png" alt="" />
          <span>
            <strong>WMSC</strong>
            <small>Whitefield Malayali Social Club</small>
          </span>
        </Link>

        <div className={`${styles.navLinks} ${menuOpen ? styles.menuOpen : ""}`}>
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.label}
              aria-current={item.label === "News" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className={styles.joinLink} href={joinUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Join WMSC <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
