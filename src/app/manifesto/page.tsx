import type { Metadata } from "next";
import styles from "@/components/editorial/editorial.module.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Manifesto · Sanganak Works",
  description: "We believe that with the right intent, you can just do things.",
};

const complaints = [
  "About the back-breaking, mind-numbing ordeals they have to do everyday just so they can move 1% forward, while their smaller competitors are making laps around them.",
  "About the very fact that they could've done from home (or their hometown) is the same thing they'll do after communting for an hour to the office, just with worse focus and temper.",
  "About how they're threatened about losing their jobs due to AI, while they still can't now imagine doing their job without it.",
] as const;

export default function ManifestoPage() {
  return (
    <>
      <Nav />
      <main className={styles.editorialPage} id="main-content">
      <header className={styles.manifestoHero}>
        <h1>
          You can just
          <br />
          do things.
        </h1>
        <div className={styles.manifestoMeta} aria-label="Article details">
          <span>INDIA / POST-AGI / INDEPENDENT</span>
          <span>READ TIME · 06 MIN</span>
        </div>
      </header>

      <section className={styles.manifestoBodyOne} aria-label="Manifesto, part one">
        <div className={styles.manifestoColumn}>
          <p>
            You wake up and look at your X timeline. Your feed is riddled with news of labs
            — American, Chinese, Japanese, occasionally Indian — building amazing things and
            pushing your imagination of what&apos;s possible.
          </p>
          <p>
            You get out of your house, ready for work, only to realize that the pothole in
            your road got even bigger due to the rain last night, the construction noises
            still persistent. The air still smells like shit and the people are hunched over
            their phones and lonely.
          </p>
          <p>
            You pop open your phone, book a Rapido, head over to LinkedIn to hear people
            complain.
          </p>
          <aside className={styles.complaintCallout}>
            <p>They are still complaining:</p>
            <ul aria-label="Complaints">
              {complaints.map((complaint) => (
                <li key={complaint}>{complaint}</li>
              ))}
            </ul>
          </aside>
        </div>
        <div className={styles.manifestoColumn}>
          <p>
            And yet almost every company talks about AI transformation, how engineers will
            be out of jobs over the next 12 months (you&apos;ve been hearing this for 15
            months straight), how big techs are pushing employees to burn more tokens to
            bake in “more AI” into their product.
          </p>
          <p>
            After all this, you look up. Still the ugly dumping grounds, the musty smell,
            the honking during traffic, the dread of showing up to work and making up reasons
            why that AI feature is more important than serving real users.
          </p>
        </div>
      </section>

      <blockquote className={styles.manifestoQuote}>
        <p>
          How do they say everything has changed,
          <br />
          when nothing around you has changed at all?
        </p>
      </blockquote>

      <section className={styles.manifestoBodyTwo} aria-label="Manifesto, part two">
        <div className={styles.manifestoClosingColumn}>
          <p>
            We attributed the reason to a divide — opening up quickly and dangerously. While
            AI enables only some agentic people to do life-changing work, nothing really
            changes for the anxious student, the overworked doctor, the unaware career
            consultant, for you.
          </p>
          <p>
            This divide is dangerous. It leads to decay and prevents India from becoming the
            land where people want to stay and make great things.
          </p>
          <p className={styles.manifestoSmall}>
            While we cannot take on everything all at once, we&apos;re reimagining what it
            means to run a company in the post-AGI age, solving problems for the world from
            India.
          </p>
        </div>
        <div className={`${styles.manifestoClosingColumn} ${styles.manifestoSmall}`}>
          <p>
            We believe that win-win games can be created and everyone could benefit off them.
            We also believe that you can work on something meaningful, from a place and with
            people you like, and yet not burn yourself out in the process.
          </p>
          <p>
            We believe that if you have great ideas, then you have all the help in the world
            at your fingertips to go execute them.
          </p>
          <p className={styles.highlightedBelief}>
            We believe that with the right intent, you can just do things.
          </p>
          <p>We envision this future for us, and for all the others who we build for.</p>
          <a className={styles.manifestoContact} href="mailto:contact@sanganak.ai">
            contact@sanganak.ai →
          </a>
        </div>
      </section>
      </main>
    </>
  );
}
