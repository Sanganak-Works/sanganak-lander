// All copy for /coaches lives in this file. Edit freely; the page only lays it out.
//
// Rules for this page (Wave 1 coach outreach, 2026-10-25):
// - No prices, packages, guarantees, user counts, outcome claims, integrations,
//   or coach-dashboard features.
// - No labels such as "AI-native", "agency", "services firm" or "holding company".
// - Any example uses invented sitcom characters and is labelled as illustrative.

// Every "book a conversation" button on /coaches reads from this one constant.
export const BOOKING_URL = "https://cal.com/samyak-sahu/intro";

export const CONTACT_EMAIL = "contact@sanganak.ai";

export const SARAS_URL = "https://sarasgmat.com";

export const coachesContent = {
  meta: {
    title: "Coaches · Sanganak",
    description:
      "We take the busywork between sessions off test-prep coaches, so their attention goes to their students.",
  },

  hero: {
    eyebrow: "FOR TEST-PREP COACHES · GMAT / GRE / LSAT / MCAT / CFA",
    headline: "Your students need you. The rest of your week doesn't.",
    subhead:
      "The real limit on a coaching practice isn't skill or demand. It's your attention, spread across every student between sessions. We find the one job that eats your week and take it off you.",
    cta: "Book a free 20-minute conversation →",
  },

  scene: {
    label: "BETWEEN SESSIONS",
    heading: "Tuesday, 10:40 p.m.",
    items: [
      { figure: "14", text: "students, each on a different week of their plan." },
      { figure: "3", text: "practice tests to review before tomorrow's sessions." },
      { figure: "23", text: "unread messages. Five of them ask the same question." },
      { figure: "1", text: "study plan to rewrite, because a test date moved." },
      { figure: "2", text: "students who went quiet last week. You meant to check in." },
    ],
    closing:
      "None of it is coaching, and all of it waits on you. It's often why a good practice stops taking new students.",
    teamLine: "Running a team? Multiply that by every tutor, then add keeping track of all of them.",
  },

  howWeWork: {
    label: "HOW WE WORK",
    heading: "Built like software. Works like a hire.",
    lead: "We don't automate the coaching. We take the load around it.",
    steps: [
      {
        number: "01",
        title: "A conversation",
        body: "Twenty minutes on where your week actually goes. No deck, no platform to sign up for.",
      },
      {
        number: "02",
        title: "We find the one job",
        body: "The work that takes the most of your time and needs you the least. Chasing homework, reviewing practice tests, rewriting plans, answering the same questions, intake and scheduling.",
      },
      {
        number: "03",
        title: "We build it to your spec",
        body: "Agents built on our own setup, shaped around how you already coach: your method, your tone, your rules for when something needs you.",
      },
      {
        number: "04",
        title: "You step in when you're needed",
        body: "The routine follow-ups run without you. When a student is stuck, slipping or upset, it comes to you.",
      },
    ],
  },

  demo: {
    label: "ILLUSTRATIVE MOCK",
    heading: "A check-in on a Wednesday night.",
    body: "The student gets a check-in and a next step. You get a short note before Thursday's session, instead of twenty messages.",
    disclaimer:
      "Illustrative only. Invented sitcom characters, not real students, and not a screen from a live product.",
    otherExams: "Same rhythm for an LSAT PrepTest review, an MCAT full-length or a CFA mock.",
    chatTitle: "Chandler · GMAT prep · coach: Ross",
    messages: [
      {
        from: "agent",
        time: "Wed 7:30 p.m.",
        text: "Hi Chandler. Quick check-in before Thursday's session with Ross. How did the Data Sufficiency set go?",
      },
      {
        from: "student",
        time: "7:52 p.m.",
        text: "Did 12 of 20. Then the rate problems started and I just stopped.",
      },
      {
        from: "agent",
        time: "7:53 p.m.",
        text: "Twelve is real progress. Which one stopped you?",
      },
      {
        from: "student",
        time: "7:55 p.m.",
        text: "Q13. Two trains. Could I BE more confused?",
      },
      {
        from: "agent",
        time: "7:56 p.m.",
        text: "Let's do one together now. Ten minutes, then you're done for the night. I'll tell Ross that rates are where to start on Thursday.",
      },
    ],
    note: {
      title: "Note for Ross, before Thursday",
      text: "Chandler did 12 of 20 Data Sufficiency questions. Stuck on rate problems from Q13. Sounded discouraged; worth starting there.",
    },
  },

  team: {
    label: "WHO'S BEHIND THIS",
    heading: "We've sat on the student's side of the table.",
    paragraphs: [
      "Sam (Samyak Sahu) built Saras, an AI accountability coach that GMAT students talk to over chat between study sessions. The work between sessions looks much the same for the GRE, LSAT, MCAT and CFA.",
      "We've taken a lot of these exams ourselves. We know coaching is emotional work, and we don't want to automate that part. We want to take the load around it.",
      "The team comes from Atlassian, Siemens, Nomura and BITS Pilani.",
    ],
    sarasLinkLabel: "See Saras →",
  },

  quote: "AI won't replace great coaches. It will make them harder to compete with.",

  cta: {
    heading: "Tell us where your week goes.",
    body: "Twenty minutes, free. You talk, we listen, and we'll tell you plainly whether there's a job worth taking off you.",
    button: "Book a free 20-minute conversation →",
    emailLabel: "OR WRITE TO",
  },
} as const;
