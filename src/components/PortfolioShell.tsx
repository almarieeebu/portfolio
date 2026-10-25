"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies, site } from "@/lib/content";
import { detailPanels, panelHref, readPortfolioLocation, type PanelId, type WorkPart } from "@/lib/navigation";
import { AboutPanel } from "@/components/panels/AboutPanel";
import { ContactPanel } from "@/components/panels/ContactPanel";
import { HomePanel } from "@/components/panels/HomePanel";
import { PracticePanel } from "@/components/panels/PracticePanel";
import { WorkPanel } from "@/components/panels/WorkPanel";
import { InstallPortfolio } from "@/components/InstallPortfolio";

const sections = [{ id: "home" as const, label: "Home" }, ...detailPanels];

function resolveStudy(slug: string | null) {
  return caseStudies.find((item) => item.slug === slug)?.slug ?? caseStudies[0].slug;
}

export function PortfolioShell({ initialPanel, initialStudy, initialPart }: {
  initialPanel: PanelId;
  initialStudy: string | null;
  initialPart: WorkPart;
}) {
  const [panel, setPanel] = useState(initialPanel);
  const [study, setStudy] = useState(resolveStudy(initialStudy));
  const [part, setPart] = useState(initialPart);
  const [revealStudy, setRevealStudy] = useState(true);
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    function restore() {
      const state = readPortfolioLocation(window.location.search, window.location.hash);
      setPanel(state.panel);
      setStudy(resolveStudy(state.study));
      setPart(state.part);
      setRevealStudy(true);
    }
    restore();
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
    };
  }, []);

  function navigate(next: PanelId, nextStudy = study, resetView = true) {
    const nextPart = nextStudy === study ? part : "overview";
    setPanel(next);
    setStudy(resolveStudy(nextStudy));
    setPart(nextPart);
    setRevealStudy(resetView);
    const url = new URL(window.location.href);
    const destination = new URL(panelHref(next, nextStudy, nextPart), url);
    // Keep unrelated query parameters (e.g. campaign links) when switching sections.
    for (const key of ["panel", "study", "part"]) {
      const value = destination.searchParams.get(key);
      if (value === null) url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    }
    url.hash = "";
    const href = `${url.pathname}${url.search}`;
    if (href !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.pushState(null, "", href);
    }
    if (resetView) {
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() => stage.current?.focus({ preventScroll: true }));
    }
  }

  function onNavigate(event: React.MouseEvent<HTMLAnchorElement>, next: PanelId) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(next);
  }

  return (
    <div className="portfolio-site">
      <a href="#stage" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="site-container header-inner">
          <Link href="/" className="brand-link" onClick={(event) => onNavigate(event, "home")} aria-label={`${site.name}, home`}>
            <Image src="/icons/icon-192.png" alt="" width={36} height={36} className="brand-mark" />
            <span>{site.name}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Portfolio sections">
            {detailPanels.map((item) => (
              <a key={item.id} href={panelHref(item.id, study, part)}
                onClick={(event) => onNavigate(event, item.id)}
                aria-current={panel === item.id ? "page" : undefined}
                className={item.id === "contact" ? "header-contact" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/?panel=contact" className="mobile-contact" onClick={(event) => onNavigate(event, "contact")}>Contact</Link>
        </div>
      </header>

      <main id="stage" ref={stage} tabIndex={-1} className="portfolio-main">
        {panel === "home" ? (
          <HomePanel onWork={() => navigate("work")} onContact={() => navigate("contact")} onStudy={(slug) => navigate("work", slug)} />
        ) : (
          <section className="detail-section" aria-label={sections.find((item) => item.id === panel)?.label}>
            <h1 className="sr-only">{sections.find((item) => item.id === panel)?.label}</h1>
            <div className="site-container">
              <Link href="/" className="back-link" onClick={(event) => onNavigate(event, "home")}>Back to home</Link>
              <div key={panel} className="panel-in detail-content">
                {panel === "practice" && <PracticePanel />}
                {panel === "work" && <WorkPanel slug={study} revealStudy={revealStudy} onSlug={(slug) => navigate("work", slug, false)} />}
                {panel === "about" && <AboutPanel />}
                {panel === "contact" && <ContactPanel />}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <div><p className="footer-name">Let’s build something useful.</p><a href={`mailto:${site.email}`}>{site.email}</a></div>
          <InstallPortfolio />
          <p className="copyright">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>

      <nav className="mobile-nav" aria-label="Mobile portfolio sections">
        {sections.map((item) => (
          <a key={item.id} href={panelHref(item.id, study, part)} onClick={(event) => onNavigate(event, item.id)}
            aria-current={panel === item.id ? "page" : undefined}>
            {item.id === "practice" ? "Skills" : item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
