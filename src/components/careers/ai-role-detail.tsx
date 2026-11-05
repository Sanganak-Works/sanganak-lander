import { Nav } from "@/components/nav";
import { ApplyFooter, ManifestoLink, ProductBadge, SarasLink } from "./role-detail";
import styles from "./careers.module.css";

export function AiRoleDetail() {
  return (
    <>
      <Nav />
      <main className={styles.page} id="main-content">
      <section className={styles.aiHero} aria-labelledby="ai-role-title">
        <div className={`${styles.container} ${styles.aiHeroInner}`}>
          <div>
            <h1 className={styles.roleTitle} id="ai-role-title">
              AI Engineer (Contract)
            </h1>
            <div className={styles.chips} aria-label="Role details">
              <ProductBadge product="Saras" />
              <span className={styles.chip}>REMOTE</span>
              <span className={styles.chip}>3 MONTHS</span>
              <span className={styles.chip}>2+ YEARS</span>
            </div>
          </div>
          <div className={styles.prose}>
            <p>
              With <SarasLink />, we&apos;re building the accountability systems of the future for
              busy professionals. We&apos;re starting out by solving standardized test prep in a way
              that creates real outcomes for real users, beyond the benchmarks, with ambitions to
              make a huge dent in this $120B+ market.
            </p>
            <p>
              What we build through Saras feeds forward towards our even larger ambitions at
              Sanganak: to bring frontier technology to an exciting space where it can
              produce meaningful outcomes beyond benchmarks. We&apos;re independent, bootstrapped,
              remote-first but mission-oriented.
            </p>
            <p>
              The role involves dealing with a new class of software altogether, which is 80%
              configuration, 15% coding with agents and 5% tasteful intuition about systems. Which
              is why you&apos;d be expected to learn quickly, make mistakes and have a fun time working
              on important problem statements that matter to real people doing real things. Hermes,
              Codex and the rest of the stack are your co-workers; be ready to build the way
              engineering will get done in the future.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.aiScope} aria-label="Role scope">
        <div className={`${styles.container} ${styles.aiGrid}`}>
          <article className={styles.aiBlock}>
            <h2>About the role</h2>
            <ul>
              <li>
                Own and evolve the platform that Saras runs on, custom-built with open source
                components. Make onboarding repeatable, and automate as much of the work as
                possible. By eliminating the recurring work over time, you create room for the
                higher-leverage parts of the charter
              </li>
              <li>
                Build messaging gateways that help Saras scale across platforms while preserving
                continuity. Saras lives on Telegram today, with WhatsApp and iMessage on the roadmap
              </li>
              <li>
                Build the systems around the agent: conversational intake, personalized study
                plans, routines, payments and integrations with proprietary 3P platforms
              </li>
              <li>
                Share your learnings through social channels and, where it makes sense, make open
                source contributions to high-profile projects. Build career capital and exemplify
                how to build outcome-driven agents
              </li>
            </ul>
          </article>
          <div>
            <article className={styles.aiBlock}>
              <h2>The stack / open-ended</h2>
              <p>
                The stack is intentionally open-ended, but you&apos;ll work with autonomous AI agents,
                multi-tenant messaging, Docker, cron-driven automation, cloud deployment and agent
                frameworks in the Hermes/OpenClaw lineage. You&apos;ll also own the operational layer:
                per-profile logging, memory-integrity checks and gateway health. If you can reason
                about self-running agents and production cloud systems, you can pick up the
                specifics on the job.
              </p>
            </article>
            <p className={styles.callout}>
              This is not a research-only or pure backend role. You&apos;ll configure agents, write the
              code and docs, make product calls, and own decisions from day one.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.aiTerms} aria-labelledby="contract-terms">
        <div className={`${styles.container} ${styles.aiGrid}`}>
          <h2 className={styles.editorialTitle} id="contract-terms">
            Three months.<br />Real ownership.
          </h2>
          <div className={styles.aiBlock}>
            <ul>
              <li><strong>Duration:</strong> 3 months initial, with option to extend to 6 months by mutual agreement</li>
              <li><strong>Work style:</strong> Remote-first, with a sustainable rhythm that protects working hours, leaves room for mentorship, and makes wellness part of the way we work</li>
              <li><strong>Fixed component:</strong> ₹50k/month</li>
              <li><strong>Profit share:</strong> 10% of Saras&apos;s gross profit, paid at the end of the contract term, with no ceiling</li>
              <li><strong>Tooling:</strong> All AI tools and subscriptions, fully expensed</li>
              <li><strong>What could come next:</strong> If things work out between us and the business keeps booming, the role could convert to a founding engineer role with meaningful equity</li>
            </ul>
            <p className={styles.renegotiation}>
              After the 3-month period, we&apos;re open to renegotiate the terms of the contract subject
              to product trajectory and work performance.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.aiCriteria} aria-labelledby="criteria-title">
        <div className={`${styles.container} ${styles.aiGrid}`}>
          <h2 className={styles.editorialTitle} id="criteria-title">
            What we&apos;re looking for
          </h2>
          <div className={styles.aiBlock}>
            <p className={styles.criteriaLead}>
              Expecting the following at a minimum, with some exceptions for stellar profiles:
            </p>
            <ul>
              <li>2+ years of experience working on production-grade systems</li>
              <li>1+ years of experience building/contributing to AI projects; exposure to OpenClaw/Hermes frameworks is a strong plus</li>
              <li>Fluency with concepts of agent memory, self-continuing loops and agent skills</li>
              <li>Above all, apply only if this resonates with you strongly: <ManifestoLink /> — be prepared to ask and answer questions!</li>
            </ul>
            <p className={styles.resumeNote}>
              Applicants with compelling GitHub profiles or portfolios will be preferred over
              swanky resumes.
            </p>
          </div>
        </div>
      </section>
      <ApplyFooter compact />
      </main>
    </>
  );
}
