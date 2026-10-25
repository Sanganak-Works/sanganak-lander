import type { Metadata } from "next";
import styles from "@/components/editorial/editorial.module.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Services · Sanganak Works",
  description:
    "AI workflow advice and agent builds for small teams that want their hours back.",
};

export default function ServicesPage() {
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

      <section className={styles.offerings} aria-label="Services offered">
        <article className={`${styles.offeringCard} ${styles.auditCard}`}>
          <div className={styles.offeringCopy}>
            <h2>AI Workflow Audit</h2>
            <p>
              A 60-minute structured walkthrough of how your team actually works. You get
              an effort-impact matrix, three to seven tool or agent prescriptions, and a
              four-day quick-start plan.
            </p>
          </div>
          <p className={styles.offeringMeta}>
            60 MINUTES · 5+ HRS/WEEK BACK OR IT&apos;S FREE
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

      <section className={styles.servicesFooter} aria-label="Start an engagement">
        <p className={styles.servicesStatement}>
          Every engagement starts with the audit. If it doesn&apos;t surface at least five
          hours a week for your team, the audit is free. Anything worth automating after
          that, we build.
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
