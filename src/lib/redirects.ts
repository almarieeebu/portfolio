import { stories } from "./content.ts";

/** Old project slugs and where each now lives. Used by next.config.ts. */
export const legacyStudyTargets: Record<string, string> = {
  "college-enrollment": "/work/college-enrollment",
  "roles-and-migration": "/work/roles-and-migration",
  "account-closing": "/work/billing-and-payments#account-closing",
  "online-payments": "/work/billing-and-payments#online-payments",
  "student-discounts": "/work/billing-and-payments#student-discounts",
  "basic-ed-enrollment": "/work/college-enrollment#basic-education",
  "erp-livro": "/#experience",
  grading: "/#work",
  "sms-and-email": "/#work",
};

/** Old `?panel=` tabs and their sections on the home page. Handled client-side: a server redirect would loop on the carried-over query. */
export const legacyPanelTargets: Record<string, string> = {
  home: "/",
  practice: "/#capabilities",
  work: "/#work",
  about: "/#experience",
  contact: "/#contact",
};

type Redirect = {
  source: string;
  has?: { type: "query"; key: string; value: string }[];
  destination: string;
  permanent: boolean;
};

export function legacyRedirects(): Redirect[] {
  const slugs = Object.entries(legacyStudyTargets).flatMap(([slug, destination]) => [
    { source: `/work/${slug}`, destination, permanent: true },
    // Home-page destinations are handled client-side: the carried-over query would loop.
    ...(destination.startsWith("/#")
      ? []
      : [
          {
            source: "/",
            has: [{ type: "query" as const, key: "study", value: slug }],
            destination,
            permanent: true,
          },
        ]),
  ]);
  // `/work/<slug>` is a real page for the current slugs; redirect only the old ones.
  const current = new Set(stories.map((s) => `/work/${s.slug}`));
  return slugs.filter((r) => !current.has(r.source));
}

/** Old in-page anchors whose ids no longer exist on the home page. */
const hashAliases: Record<string, string> = {
  about: "#experience",
  testimonials: "#experience",
  erp: "#experience",
  practice: "#capabilities",
  "what-i-do": "#capabilities",
  skills: "#capabilities",
  process: "#capabilities",
  "product-thinking": "#capabilities",
};

/** Old `?panel=` and `#work/<slug>` links from the tabbed shell. Hashes never reach the server. */
export function legacyClientTarget(search: string, hash: string): string | null {
  const params = new URLSearchParams(search);
  const panel = params.get("panel");
  const oldStudy = params.get("study");
  if (oldStudy && legacyStudyTargets[oldStudy]?.startsWith("/#")) return legacyStudyTargets[oldStudy];
  const [head, study] = hash.replace(/^#/, "").split("/");
  if (head === "work" && study) return legacyStudyTargets[study] ?? "/#work";
  if (hashAliases[head]) return `/${hashAliases[head]}`;
  const fromPanel = panel ? legacyPanelTargets[panel] : null;
  return fromPanel && fromPanel !== "/" ? fromPanel : null;
}
