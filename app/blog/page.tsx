import type { Metadata } from "next";
import BlogNavigation from "./blog-navigation";
import styles from "./blog.module.css";

const sourceUrl = "https://bangalorejalakam.com/the-whitefield-malayali-social-club-organized-an-executive-committee-meeting/";
const joinUrl = "https://forms.gle/ajbEX18S3ryEoFgC8?utm_source=wmsc.in";

const title = "വൈറ്റ്ഫീൽഡ് മലയാളി സോഷ്യൽ ക്ലബ് പ്രവർത്തക സമിതി യോഗം സംഘടിപ്പിച്ചു";
const description = "വൈറ്റ്ഫീൽഡ് മലയാളി സോഷ്യൽ ക്ലബ്ബിൻ്റെ പ്രവർത്തക സമിതി യോഗത്തിൽ വരാനിരിക്കുന്ന ഓണാഘോഷ പരിപാടികളുടെ ഒരുക്കങ്ങൾ ചർച്ച ചെയ്തു.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${title} — WMSC`,
  description,
};

export default function BlogPage() {
  return (
    <main id="top" className={styles.page}>
      <div className={styles.announcement}>
        <span>WMSC വാർത്തകൾ</span>
        <p>Community news from Whitefield</p>
        <time dateTime="2026-09-04">04 September 2026</time>
      </div>

      <BlogNavigation />

      <article className={styles.article}>
        <div className={styles.hero}>
          <div className={styles.heroIntro}>
            <a className={styles.backLink} href="/">
              <span aria-hidden="true">←</span> Back to WMSC
            </a>
            <p className={styles.kicker}><span /> Association News</p>
            <h1 lang="ml">{title}</h1>
            <div className={styles.meta}>
              <p><span>Published</span><time dateTime="2026-09-04">04 September 2026</time></p>
              <p><span>Location</span>Whitefield, Bengaluru</p>
            </div>
          </div>

          <p className={styles.heroMark} aria-hidden="true">ഒരുമ</p>
        </div>

        <figure className={styles.leadImage}>
          <img
            src="/wmsc-executive-committee-meeting.jpg"
            alt="WMSC executive committee members, club members and their families at the meeting"
            width="872"
            height="547"
          />
          <figcaption>
            <span>WMSC executive committee meeting</span>
            <span>Whitefield · Bengaluru</span>
          </figcaption>
        </figure>

        <div className={styles.storyGrid}>
          <aside className={styles.storyAside} aria-label="Article summary">
            <span className={styles.storyNumber}>01</span>
            <p lang="ml">കൂട്ടായ്മയുടെ<br />പുതിയ ചുവട്</p>
          </aside>

          <div className={styles.storyBody} lang="ml">
            <p className={styles.lede}>വൈറ്റ്ഫീൽഡ് മലയാളി സോഷ്യൽ ക്ലബ്ബിൻ്റെ (WMSC) പ്രവർത്തക സമിതി യോഗം സംഘടിപ്പിച്ചു. വരാനിരിക്കുന്ന ഓണാഘോഷ പരിപാടികളുമായി ബന്ധപ്പെട്ട ഒരുക്കങ്ങളും വിവിധ പരിപാടികളുടെ നടത്തിപ്പും യോഗത്തിൽ വിശദമായി ചർച്ച ചെയ്തു.</p>

            <p>വൈറ്റ്ഫീൽഡ് മലയാളി സോഷ്യൽ ക്ലബ് പ്രവർത്തക സമിതി അംഗങ്ങൾക്കൊപ്പം ക്ലബ് അംഗങ്ങളും കുടുംബാംഗങ്ങളും യോഗത്തിൽ പങ്കെടുത്തു. ഓണാഘോഷം കൂടുതൽ വിപുലമായും എല്ലാവരെയും ഉൾക്കൊള്ളുന്ന രീതിയിലും സംഘടിപ്പിക്കുന്നതിനായുള്ള വിവിധ നിർദ്ദേശങ്ങളും ആശയങ്ങളും യോഗത്തിൽ പങ്കുവെച്ചു.</p>

            <p>അംഗങ്ങളുടെയും കുടുംബങ്ങളുടെയും സജീവ പങ്കാളിത്തം യോഗത്തിന് കൂടുതൽ ആവേശവും കൂട്ടായ്മയും പകർന്നു. ഓണത്തിൻ്റെ സ്നേഹവും സൗഹൃദവും മലയാളി കൂട്ടായ്മയുടെ ഐക്യവും ഉയർത്തിപ്പിടിക്കുന്ന മികച്ചൊരു ആഘോഷത്തിനായുള്ള ഒരുക്കങ്ങൾക്ക് യോഗം തുടക്കം കുറിച്ചു.</p>

            <div className={styles.sourceNote}>
              <span>Source</span>
              <p>
                Originally published by Bangalore Jalakam.{' '}
                <a href={sourceUrl} target="_blank" rel="noreferrer">Read the original article <span aria-hidden="true">↗</span></a>
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className={styles.communityNote} aria-label="Join WMSC">
        <p lang="ml">കൂടെ കൂടാം</p>
        <div>
          <h2>Community begins by showing up.</h2>
          <a href={joinUrl} target="_blank" rel="noreferrer">Join WMSC <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <img src="/logo.png" alt="WMSC emblem" />
          <div><strong>WMSC</strong><p>Whitefield Malayali<br />Social Club</p></div>
        </div>
        <p>Kerala in our hearts.<br />Whitefield at our doorstep.</p>
        <div className={styles.footerLinks}>
          <a href="/">Home</a>
          <a href="/onam/">Onam 1.0</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
