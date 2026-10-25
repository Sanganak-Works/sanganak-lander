import type { Metadata } from "next";
import styles from "@/components/editorial/editorial.module.css";
import { Nav } from "@/components/nav";
import { CalEmbed } from "@/components/booking/cal-embed";
import { LOOM_URL, LoomVideo, toLoomEmbedUrl } from "@/components/booking/loom-video";

export const metadata: Metadata = {
  title: "Services · Sanganak Works",
  description:
    "AI workflow advice and agent builds for small teams that want their hours back.",
};

export default function ServicesPage() {
  const hasIntroVideo = toLoomEmbedUrl(LOOM_URL) !== null;

  const booking = (
    <section className={styles.bookingSection} aria-labelledby="booking-title">
      <div
        className={`${styles.bookingIntro} ${hasIntroVideo ? styles.bookingIntroWithVideo : ""}`}
      >
        <div className={styles.bookingCopy}>
          <h2 id="booking-title">Start with a free 20-minute intro</h2>
          <p>
            No pitch deck. Tell us where your week goes, and we&apos;ll tell you plainly
            whether there&apos;s a job worth taking off your plate with AI tools.
          </p>
        </div>
        <LoomVideo url={LOOM_URL} />
      </div>
      <div className={styles.bookingEmbed} data-testid="booking-embed">
        <CalEmbed />
      </div>
    </section>
  );

  const offerings = (
    <section className={styles.offerings} aria-label="Services offered">
      <article className={`${styles.offeringCard} ${styles.auditCard}`}>
        <div className={styles.offeringCopy}>
          <h2>AI Workflow Audit</h2>
          <p>
            A 60-minute call on how your practice actually runs, from your calendar to
            your inbox to your students&apos; week. Within three days you get an
            effort-impact matrix, three to seven tool or agent prescriptions, and a
            four-day quick-start plan.
          </p>
        </div>
        <p className={styles.offeringMeta}>
          60-MINUTE CALL · PLAN IN 3 DAYS
        </p>
      </article>

      <article className={`${styles.offeringCard} ${styles.buildCard}`}>
        <div className={styles.offeringCopy}>
          <h2>Agent builds</h2>
          <p>
            When the audit points at a workflow worth automating, we build the agent that
            runs it. One workflow, one agent, constrained and observable — no black boxes.
          </p>
        </div>
        <p className={styles.offeringMeta}>
          SCOPED PER PROJECT · MONTHLY RETAINERS
        </p>
      </article>
    </section>
  );

  return (
    <>
      <Nav />
      <main className={styles.editorialPage} id="main-content">
      <section className={styles.servicesIntro} aria-labelledby="services-title">
        <h1 id="services-title" className={styles.servicesTitle}>
          Reclaim your hours
        </h1>
        <p className={styles.servicesLead}>
          Most AI advice is written for enterprises with AI budgets. We work with small
          teams that just want their hours back, and we only prescribe what we would run
          ourselves.
        </p>
      </section>

      {/* With an intro video, booking leads; without one, the cards lead. */}
      {hasIntroVideo ? (
        <>
          {booking}
          {offerings}
        </>
      ) : (
        <>
          {offerings}
          {booking}
        </>
      )}

      <section className={styles.servicesFooter} aria-label="Start an engagement">
        <p className={styles.servicesStatement}>
          A new AI tool drops every day. We test them so you don&apos;t have to, and we
          only bring you what actually earns its place in your week.
        </p>
        <div className={styles.contactStack}>
          <p>WRITE TO US AT</p>
          <a className={styles.contactButton} href="mailto:contact@sanganak.ai">
            contact@sanganak.ai →
          </a>
        </div>
      </section>
      </main>
    </>
  );
}
