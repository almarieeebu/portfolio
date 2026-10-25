/**
 * Site copy. Every claim here must trace to the CVs in public/, the
 * school_demo README, or the demo code. Missing facts are recorded in
 * CONTENT-CHECKLIST.md, never invented here.
 */
export const site = {
  name: "Almarie Bullo",
  initials: "AB",
  photo: "/almarie.jpg",
  roles: ["Software Developer", "Product Owner"],
  title: "Software Developer & Product Owner",
  company: "Livro Systems, Inc.",
  formerCompany: "Wela School Systems",
  tagline: "I turn complex school and business workflows into reliable software.",
  intro:
    "6+ years building enrollment, billing, and payment systems for schools, mostly on Frappe with Python, JavaScript, and SQL. Product Owner at Livro Systems since January 2026, after progressing from Junior to Senior Web Developer.",
  availability:
    "Open to Web Developer, Product Owner, and Quality Assurance roles · Remote or hybrid · UTC+8",
  email: "almariebullo@gmail.com",
  linkedin: "https://www.linkedin.com/in/almarie-alim-bullo/",
  github: "https://github.com/almarieeebu",
  url: "https://portfolio-almariebu.vercel.app",
};

export const resumes = [
  {
    href: "/cv-developer.html",
    label: "Résumé (web development, product ownership, QA)",
    note: "Includes my Product Owner role since January 2026. Also available as a PDF from the page.",
  },
];

export type EvidenceKind = "production" | "demo-code" | "simulation" | "sample";

export const evidenceKinds: Record<EvidenceKind, { label: string; hint: string }> = {
  production: {
    label: "Professional production experience",
    hint: "Work on live school systems. The production system is private, so it is shown through recreated demos.",
  },
  "demo-code": {
    label: "Public demonstration code",
    hint: "Installable Frappe v15 app that re-implements the business rules with sample data.",
  },
  simulation: {
    label: "Browser simulation",
    hint: "Runs in your browser with no server. Recreated demo using sample data.",
  },
  sample: {
    label: "Personal code sample",
    hint: "Built on my own to practise and show code. Not production work.",
  },
};

export const recreatedNote = "Recreated demo using sample data.";

const schoolDemoRepo = "https://github.com/almarieeebu/school_demo";
const schoolDemo = (anchor: string) => `${schoolDemoRepo}#${anchor}`;

export type Shot = { src: string; alt: string; w: number; h: number };

export type StoryPart = {
  id: string;
  /** "Separate contribution" or "Supporting example". */
  kind: string;
  title: string;
  problem: string;
  built: string[];
  outcome: string;
  demo?: string;
  sourceUrl?: string;
  shot?: Shot;
};

export type Story = {
  slug: string;
  title: string;
  metaDescription: string;
  /** Overview-card fields. */
  helps: string;
  problemShort: string;
  outcomeShort: string;
  role: string;
  /** Page fields. */
  context: string;
  problem: string;
  built: string[];
  parts?: { heading: string; note?: string; items: StoryPart[] };
  decisions: string[];
  technical: string[];
  outcome: string;
  evidence: EvidenceKind[];
  stack: string[];
  shot: Shot;
  demo: string;
  demoLabel: string;
  demoHint?: string;
  sourceUrl: string;
};

export const stories: Story[] = [
  {
    slug: "college-enrollment",
    title: "College admission and enrollment",
    metaDescription:
      "Case study: one approval path from college applicant to locked enrollment, with unit limits and a payment check. Frappe, Python, JavaScript.",
    helps: "Registrars, deans, and finance staff",
    problemShort:
      "Enrollment was split across the application, subjects, fees, and approvals, with no single path to a finished enrollment.",
    outcomeShort:
      "A student moves from application to a locked enrollment in one system, with payments and approvals checked on the form.",
    role: "Developer: built the forms, approval workflow, and validation rules.",
    context:
      "A school management system used by registrars, deans, finance officers, and cashiers. A college applicant becomes an enrolled student only after the right people approve the subjects and fees.",
    problem:
      "Enrollment was split across the application, the subject list, fees, and approvals. Registrars, deans, and finance staff had no single path from a new applicant to a finished enrollment.",
    built: [
      "Three connected forms: applicant, subject-and-fee, and enrolled student.",
      "A multi-step approval workflow: Draft, dean, registrar, finance.",
      "Validation rules: unit limits, term fees, and a payment check before enrollment can be locked.",
      "Safe re-runs: running enrollment again never wipes an already-enrolled student.",
    ],
    parts: {
      heading: "Supporting example",
      items: [
        {
          id: "basic-education",
          kind: "Supporting example",
          title: "Basic education enrollment",
          problem:
            "Basic-education records drifted after go-live: the wrong incoming grade, duplicate enrollments, and leftover records after withdrawal.",
          built: [
            "Fixed grade-level logic.",
            "Blocked duplicate enrollments.",
            "Cleaned up related records on withdrawal.",
            "Limited teachers to their own classes.",
          ],
          outcome:
            "Registrars can enroll, continue, and withdraw students without duplicate rows.",
          demo: "/demo/basic-ed-enrollment",
          sourceUrl: schoolDemo("case-study-2-basic-education-enrollment"),
        },
      ],
    },
    decisions: [
      "Finance cannot lock an enrollment until the paid down payment meets the term's requirement. The rule is checked on save and on submit, not left to a reviewer.",
      "Fee totals and units are computed on the server from the chosen subjects. Units sent by the browser are ignored.",
      "Enrollment is get-or-update by applicant and term, and the student payload is normalised without blanking existing data. A bad contact detail only warns; it does not stop the flow.",
    ],
    technical: [
      "Frappe v15 DocTypes: Applicant, a submittable Enrollment Assessment with subject and fee child tables, and Enrolled Student.",
      "Workflow with Draft, Pending Dean, Pending Registrar, Pending Finance, and a locked Enrolled state, plus Reject.",
      "Roles: Dean, Registrar, Finance Officer, Cashier. Each sees only the actions their state allows.",
      "Business rules live in a plain Python module with no Frappe imports, so they are tested with unittest and no bench.",
    ],
    outcome:
      "A student moves from application to a locked enrollment in one system. Payments and approvals are checked on the form, not over email. No usage figures are claimed here.",
    evidence: ["production", "demo-code", "simulation"],
    stack: ["Frappe", "Python", "JavaScript", "MariaDB"],
    shot: {
      src: "/work/college-enrollment.png",
      alt: "Enrollment demo with Mark Joseph's assessment pending finance and the down payment check blocking enrollment",
      w: 1105,
      h: 952,
    },
    demo: "/demo/college-enrollment?scenario=invalid-enrollment",
    demoLabel: "See how the workflow prevents an invalid enrollment",
    demoHint: "Opens as Finance Officer with a student who has not paid the down payment. The full workflow stays available.",
    sourceUrl: schoolDemo("case-study-1-college-admission-and-enrollment"),
  },
  {
    slug: "billing-and-payments",
    title: "School billing, payments, and cashiering",
    metaDescription:
      "Case study: term account closing, cashiering, online payments, and student discounts for school finance staff. Frappe, Python, SQL.",
    helps: "Cashiers and finance staff",
    problemShort:
      "At term end cashiers could not close accounts or post payments, fees paid online were retyped by hand, and discounts lived in several places.",
    outcomeShort:
      "Cashiers can close accounts and post payments including overpayments, and online payments and discounts land on the student account.",
    role: "Developer: four separate contributions to the billing system.",
    context:
      "The billing side of a school management system, used by cashiers and finance officers to charge fees, post payments, and close each term.",
    problem:
      "Finance work was held up in four different places: closing a term, posting payments at the cashier desk, recording fees paid online, and applying discounts.",
    built: [],
    parts: {
      heading: "Four separate contributions",
      note: "These were distinct pieces of work on the same billing system. They are grouped because they serve the same finance staff. They were not one project or one release.",
      items: [
        {
          id: "account-closing",
          kind: "Separate contribution",
          title: "Account closing and cashiering",
          problem:
            "At the end of each term, cashiers could not close student accounts or post payments, which stopped the cashier desk.",
          built: [
            "Account closing runs in the background and builds student ledgers.",
            "Clear on-screen messages when a closing cannot start.",
            "Down payment and reconciliation updates for cashiers.",
            "Overpayments stay on the student ledger instead of being dropped.",
            "Penalty dates fixed so a penalty is due on the date itself.",
          ],
          outcome: "Cashiers can close accounts and post payments, including overpayments.",
          demo: "/demo/account-closing",
          sourceUrl: schoolDemo("case-study-5-account-closing-and-cashiering"),
          shot: {
            src: "/work/billing-closing.png",
            alt: "Account closing demo showing student ledgers and a cash count",
            w: 1105,
            h: 613,
          },
        },
        {
          id: "online-payments",
          kind: "Separate contribution",
          title: "Online payments",
          problem:
            "Schools collect fees online, but staff still had to retype a paid fee onto the student account.",
          built: [
            "Online fee payments are pulled into billing.",
            "Paid amounts are allocated to the student's fees automatically.",
            "Payment links come from school settings, not hardcoded addresses.",
          ],
          outcome: "A fee paid online lands on the student account without someone retyping it.",
          demo: "/demo/online-payments",
          sourceUrl: schoolDemo("case-study-3-online-payments"),
          shot: {
            src: "/work/billing-payments.png",
            alt: "Online payments demo allocating a paid fee to the oldest due date",
            w: 1105,
            h: 564,
          },
        },
        {
          id: "student-discounts",
          kind: "Separate contribution",
          title: "Student discounts",
          problem:
            "Finance entered discounts in several places and had no single view of who received one.",
          built: [
            "Discounts calculated from the full assessment or from the remaining balance.",
            "Batch discounts that apply one rule to many students.",
            "A discount summary report filtered by school year, semester, and discount type.",
          ],
          outcome:
            "Finance can see who received a discount and apply a batch from one screen, without rebuilding numbers in a spreadsheet.",
          demo: "/demo/student-discounts",
          sourceUrl: schoolDemo("case-study-6-student-discounts"),
          shot: {
            src: "/work/billing-discounts.png",
            alt: "Student discounts demo with a batch rule and a summary report",
            w: 1105,
            h: 620,
          },
        },
      ],
    },
    decisions: [
      "Overpayment is kept as credit on the ledger instead of being rejected or dropped.",
      "A repeated delivery of the same online payment changes nothing. The gateway reference is the unique key, so two simultaneous deliveries cannot both succeed.",
      "Open fees are locked while a payment is allocated, so two payments cannot spend the same balance.",
      "A paid fee is allocated to the oldest due date first, and any extra becomes credit.",
      "Discounts are capped at their base, and a batch skips students who already have the discount.",
    ],
    technical: [
      "Account closing is queued to a background job with Queued, Running, Done, and Failed states, and builds one ledger per student.",
      "Online payments arrive through a signed webhook. The signature is checked with HMAC-SHA256 and a bad one is rejected with 401.",
      "A cash count reconciles counted cash against posted payments as Balanced, Over, or Short.",
      "Discount summary is a Frappe Script Report. Percent or fixed discounts run from a single rule function.",
      "Rules sit in a Frappe-free Python module and are tested with unittest.",
    ],
    outcome:
      "Each contribution closes the gap named above. The separate outcomes are listed under each contribution. No payment volumes or time savings are claimed here.",
    evidence: ["production", "demo-code", "simulation"],
    stack: ["Frappe", "Python", "JavaScript", "SQL", "Payment integration"],
    shot: {
      src: "/work/billing-closing.png",
      alt: "Account closing demo showing student ledgers and a cash count",
      w: 1105,
      h: 613,
    },
    demo: "/demo/account-closing",
    demoLabel: "Try the account closing demo",
    sourceUrl: schoolDemo("case-study-5-account-closing-and-cashiering"),
  },
  {
    slug: "roles-and-migration",
    title: "Roles and data migration",
    metaDescription:
      "Case study: restoring default roles, fee mappings, and missing file attachments after a platform upgrade. Frappe, Python, SQL, Linux.",
    helps: "System administrators and school staff after an upgrade",
    problemShort:
      "After a platform upgrade, staff had the wrong roles, school fees did not map, and some file records had no file on disk.",
    outcomeShort:
      "A migrated site opens with usable roles, mapped fees, and a way to recover attachments.",
    role: "Developer: set up default roles, fee mapping, and file recovery.",
    context:
      "A school's site was moved to a newer platform version. The data came across, but the people using it and the records they relied on did not line up.",
    problem:
      "After a platform version upgrade, staff had the wrong roles, school fees did not map, and some file records had no file on disk.",
    built: [
      "Set up default roles.",
      "Mapped school fees.",
      "Recovered missing file attachments without overwriting existing files.",
    ],
    decisions: [
      "Default roles follow the person's designation. Roles they already hold are kept, so the step is safe to run again.",
      "Fee codes that cannot be mapped are reported, not guessed.",
      "File recovery never overwrites a file already on disk, and reads only from a folder inside the site's private backups.",
    ],
    technical: [
      "Three actions in one Migration Tools screen: apply default roles, map legacy fees, recover files.",
      "Designation-to-role and fee-code maps are stored as DocTypes (Designation Role Map, Fee Code Map).",
      "All three actions need System Manager (fee mapping also allows Finance Officer).",
      "Rules sit in a Frappe-free Python module and are tested with unittest.",
    ],
    outcome:
      "A migrated site opens with usable roles, mapped fees, and a way to recover attachments. No counts of affected users or records are claimed here.",
    evidence: ["production", "demo-code", "simulation"],
    stack: ["Frappe", "Python", "SQL", "Linux"],
    shot: {
      src: "/work/roles-migration.png",
      alt: "Migration tools demo showing role assignment, fee mapping, and file recovery results",
      w: 1105,
      h: 648,
    },
    demo: "/demo/roles-and-migration",
    demoLabel: "Try the migration demo",
    sourceUrl: schoolDemo("case-study-8-roles-and-data-migration"),
  },
];

export type CodeSample = {
  title: string;
  summary: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
};

export const codeSamples: CodeSample[] = [
  {
    title: "Frappe contract tracker",
    summary:
      "A Frappe 15 app for a freelancer: draft, approved, and done contracts, payment checks against the balance, and an Unpaid Contracts report. 11 unit tests.",
    stack: ["Python", "Frappe", "MariaDB"],
    repoUrl: "https://github.com/almarieeebu/frappe-contract-tracker",
  },
  {
    title: "UI component kit",
    summary:
      "Button, Input, Modal, Table, and Toast in React, TypeScript, and Tailwind CSS. Keyboard accessible, with 19 unit tests (Vitest) and 10 end-to-end tests (Playwright).",
    stack: ["React", "TypeScript", "Tailwind CSS", "Playwright"],
    repoUrl: "https://github.com/almarieeebu/portfolio/tree/main/ui-kit",
    liveUrl: "https://ui-kit-almariebu.vercel.app/",
  },
];

export const experience = [
  {
    org: "Livro Systems, Inc.",
    roles: [
      {
        title: "Product Owner",
        dates: "January 2026 – Present",
        points: [
          "Own the school management system and ERP Livro, delivering feature and fix tickets with the development team.",
          "Turn school enrollment, billing, and payment processes into clear, deliverable system tickets.",
        ],
      },
      {
        title: "Senior Web Developer",
        dates: "April 2025 – December 2025",
        points: ["Delivered feature and fix tickets on the school management system and ERP Livro."],
      },
    ],
    erp: {
      title: "ERP Livro: employee lifecycle and access",
      text: "Develop and maintain features for employee onboarding, employee offboarding, and user access requests in the internal ERP.",
    },
  },
  {
    org: "Wela School Systems",
    roles: [
      {
        title: "Senior Web Developer",
        dates: "February 2024 – March 2025",
        points: [
          "Delivered tellering and billing tickets: payment status, fee allocation, matriculation, discounts, and statements of account.",
          "Delivered pre-enrollment and enrollment tickets for basic education and college.",
          "Configured role permissions for finance and registrar users.",
        ],
      },
      {
        title: "Mid-Senior Web Developer",
        dates: "September 2023 – February 2024",
        points: ["Resolved billing tickets on live production sites, including ledger adjustments and discounts."],
      },
      {
        title: "Junior Web Developer",
        dates: "March 2020 – September 2023",
        points: [
          "Developed online enrollment forms, grade slips and grading rules, and college billing features.",
        ],
      },
    ],
  },
];

export const capabilities = [
  { label: "Backend and data", items: "Python, SQL, MariaDB, REST APIs, permissions, background jobs, payment and SMS integrations" },
  { label: "Frontend", items: "HTML, CSS, JavaScript" },
  { label: "Business workflows", items: "Approvals, validation rules, billing and payment logic, reports, data migration" },
  { label: "Product ownership", items: "Turning school processes into clear tickets and coordinating delivery with developers" },
  { label: "Tools", items: "Git, GitHub, Linux" },
  { label: "Currently learning", items: "TypeScript, React, Tailwind CSS, Vitest, Playwright. Used on the code samples above, not yet in production work." },
];

export const contact = {
  lead: "Email is the fastest way to reach me. I usually reply within a few days.",
};
