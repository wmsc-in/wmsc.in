import Link from "next/link";
import StructuredData from "../structured-data";
import { pageMetadata, pageSchema, breadcrumbSchema } from "../../lib/seo";
import { REGISTRATION_FORM_URL } from "../../lib/registration";
import styles from "./registration.module.css";

const title = "Onam Registration";
const description = "Register for Onam with Whitefield Malayali Social Club.";

export const dynamic = "force-static";
export const metadata = pageMetadata({ title, description, path: "/registration/" });

export default function RegistrationPage() {
  return (
    <main className={styles.page}>
      <StructuredData data={[pageSchema("/registration/", title, description), breadcrumbSchema("/registration/", title)]} />
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="WMSC home">
          <img src="/logo.svg" alt="" width="56" height="60" />
          <span><strong>WMSC</strong><small>Whitefield Malayali Social Club</small></span>
        </a>
        <Link href="/onam/" className={styles.backLink}>← Back to Onam</Link>
      </header>
      <section className={styles.registration} aria-labelledby="registration-title">
        <h1 id="registration-title">Onam Registration</h1>
        <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(REGISTRATION_FORM_URL)});` }} />
        <p>Redirecting to the registration form…</p>
        <a className={styles.backLink} href={REGISTRATION_FORM_URL}>Continue to Google Form →</a>
      </section>
    </main>
  );
}
