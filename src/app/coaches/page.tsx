import type { Metadata } from "next";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "@/components/coaches/coaches.module.css";
import { Nav } from "@/components/nav";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  SARAS_URL,
  coachesContent as copy,
} from "./content";

// Copy lives in ./content.ts. This file only lays it out.

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
};

export default function CoachesPage() {
  const { hero, scene, howWeWork, demo, team, quote, cta } = copy;

  return (
    <>
      <Nav minimal />
      <main className={`${editorial.editorialPage} ${styles.page}`} id="main-content">
        <section className={styles.hero} aria-labelledby="coaches-title">
          <p className={`${styles.label} ${styles.heroLabel}`}>{hero.eyebrow}</p>
          <h1 id="coaches-title" className={styles.display}>
            {hero.headline}
          </h1>
          <div className={styles.heroAside}>
            <p>{hero.subhead}</p>
            <a className={styles.button} href={BOOKING_URL}>
              {hero.cta}
            </a>
          </div>
        </section>

        <section className={styles.scene} aria-labelledby="scene-title">
          <div className={styles.sceneIntro}>
            <p className={styles.label}>{scene.label}</p>
            <h2 id="scene-title" className={styles.display}>
              {scene.heading}
            </h2>
          </div>
          <ul className={styles.sceneList}>
            {scene.items.map((item) => (
              <li key={item.text}>
                <span className={`${styles.display} ${styles.sceneFigure}`}>
                  {item.figure}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p className={styles.sceneClosing}>{scene.closing}</p>
        </section>

        <section className={styles.how} aria-labelledby="how-title">
          <div className={styles.sectionHead}>
            <p className={styles.label}>{howWeWork.label}</p>
            <h2 id="how-title" className={styles.display}>
              {howWeWork.heading}
            </h2>
            <p>{howWeWork.lead}</p>
          </div>
          <ol className={styles.steps}>
            {howWeWork.steps.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.demo} aria-labelledby="demo-title">
          <div className={styles.demoCopy}>
            <p className={`${styles.label} ${styles.demoLabel}`}>{demo.label}</p>
            <h2 id="demo-title" className={styles.display}>
              {demo.heading}
            </h2>
            <p>{demo.body}</p>
            <p className={styles.disclaimer}>{demo.disclaimer}</p>
          </div>
          <figure className={styles.chat} aria-label="Illustrative check-in conversation">
            <figcaption className={styles.chatHeader}>
              <span>{demo.chatTitle}</span>
              <span>{demo.label}</span>
            </figcaption>
            <ol className={styles.chatBody}>
              {demo.messages.map((message) => (
                <li
                  key={message.time}
                  className={`${styles.message} ${
                    message.from === "student" ? styles.fromStudent : styles.fromAgent
                  }`}
                >
                  <p>{message.text}</p>
                  <span>
                    {message.from === "student" ? "Chandler" : "Check-in agent"} ·{" "}
                    {message.time}
                  </span>
                </li>
              ))}
            </ol>
            <div className={styles.coachNote}>
              <strong>{demo.note.title}</strong>
              <p>{demo.note.text}</p>
            </div>
          </figure>
        </section>

        <section className={styles.team} aria-labelledby="team-title">
          <div className={styles.sectionHead}>
            <p className={styles.label}>{team.label}</p>
            <h2 id="team-title" className={styles.display}>
              {team.heading}
            </h2>
          </div>
          <div className={styles.teamBody}>
            {team.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className={styles.teamLink} href={SARAS_URL}>
              {team.sarasLinkLabel}
            </a>
          </div>
        </section>

        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>

        <section className={styles.cta} aria-labelledby="cta-title">
          <div className={styles.ctaCopy}>
            <h2 id="cta-title" className={styles.display}>
              {cta.heading}
            </h2>
            <p>{cta.body}</p>
          </div>
          <div className={styles.ctaActions}>
            <a className={styles.button} href={BOOKING_URL}>
              {cta.button}
            </a>
            <p>{cta.emailLabel}</p>
            <a className={styles.ctaEmail} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL} →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
