// Run with: node --experimental-strip-types --test src/lib/redirects.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { stories } from "./content.ts";
import { legacyClientTarget, legacyRedirects, legacyStudyTargets } from "./redirects.ts";

const pages = new Set(stories.map((s) => `/work/${s.slug}`));
const anchors = new Map(
  stories.map((s) => [`/work/${s.slug}`, new Set(s.parts?.items.map((p) => p.id))]),
);

test("every old project link lands on a real page or home section", () => {
  for (const [slug, target] of Object.entries(legacyStudyTargets)) {
    const [path, anchor] = target.split("#");
    if (path === "/") {
      assert.ok(["work", "experience"].includes(anchor), `${slug} -> ${target}`);
      continue;
    }
    assert.ok(pages.has(path), `${slug} -> ${target} is not a case-study page`);
    if (anchor) assert.ok(anchors.get(path)?.has(anchor), `${slug} -> missing #${anchor}`);
  }
});

test("no server redirect shadows a live case-study page", () => {
  for (const r of legacyRedirects()) assert.ok(!pages.has(r.source), r.source);
});

test("redirects never loop back through a carried-over query", () => {
  for (const r of legacyRedirects()) {
    const [path] = r.destination.split("#");
    assert.ok(path !== r.source || !r.has, `${r.source} -> ${r.destination}`);
  }
});

test("old tabbed-site links map to the new sections", () => {
  assert.equal(legacyClientTarget("?panel=contact", ""), "/#contact");
  assert.equal(legacyClientTarget("?panel=about", ""), "/#experience");
  assert.equal(legacyClientTarget("", "#work/account-closing"), "/work/billing-and-payments#account-closing");
  assert.equal(legacyClientTarget("", "#skills"), "/#capabilities");
  assert.equal(legacyClientTarget("", "#contact"), null);
  assert.equal(legacyClientTarget("", ""), null);
});

test("old ?study= links to home sections are redirected client-side", () => {
  assert.equal(legacyClientTarget("?panel=work&study=erp-livro", ""), "/#experience");
  assert.equal(legacyClientTarget("?panel=work&study=grading", ""), "/#work");
});
