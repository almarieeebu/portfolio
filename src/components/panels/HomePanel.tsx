"use client";

import Image from "next/image";
import { caseStudies, site } from "@/lib/content";
import { workHref } from "@/lib/navigation";

export function HomePanel({ onWork, onContact, onStudy }: {
  onWork: () => void;
  onContact: () => void;
  onStudy: (slug: string) => void;
}) {
  const featured = caseStudies[0];
  const more = caseStudies.filter((item) => item.featured && item.slug !== featured.slug).slice(0, 2);

  function openStudy(event: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onStudy(slug);
  }

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Web development · Product · Quality</p>
            <h1 id="hero-title">I build reliable web <span>applications for real business workflows.</span></h1>
            <p className="hero-description">Python, JavaScript, SQL, and modern web tools.</p>
            <div className="hero-actions">
              <button type="button" className="button-primary" onClick={onWork}>See the projects</button>
              <a href={site.resume} className="button-secondary" target="_blank" rel="noopener noreferrer">View CV</a>
            </div>
            <div className="hero-links">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="hero-portrait">
            <Image src={site.photo} alt="Almarie Bullo" width={663} height={1024} preload sizes="(min-width: 768px) 440px, 240px" />
          </div>
        </div>
      </section>

      <section className="selected-work" aria-labelledby="selected-work-title">
        <div className="site-container">
          <div className="section-heading">
            <div><p className="eyebrow">Selected work</p><h2 id="selected-work-title">Real problems. Useful solutions.</h2></div>
            <button type="button" className="text-action" onClick={onWork}>View all projects</button>
          </div>
          <article className="featured-project">
            <figure>
              <a href={workHref(featured.slug, "overview")} onClick={(event) => openStudy(event, featured.slug)} aria-label={`View ${featured.title}`}>
                <Image src={featured.image!} alt={featured.imageAlt ?? featured.title} width={1400} height={900} sizes="(min-width: 768px) 50vw, 100vw" />
              </a>
              <figcaption>Illustrative demo. Not the actual production system.</figcaption>
            </figure>
            <div className="featured-copy">
              <p className="eyebrow">Featured project</p>
              <h3>{featured.title}</h3>
              <p>{featured.summary}</p>
              <ul className="stack-list" aria-label="Technologies">{featured.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
              <a className="project-link" href={workHref(featured.slug, "overview")} onClick={(event) => openStudy(event, featured.slug)}>View project</a>
            </div>
          </article>
          <div className="project-rows">
            {more.map((item) => (
              <a key={item.slug} href={workHref(item.slug, "overview")} onClick={(event) => openStudy(event, item.slug)}>
                <h3>{item.title}</h3><p>{item.summary}</p><span>View project</span>
              </a>
            ))}
          </div>
          <div className="home-contact"><p>{site.availability}</p><button type="button" onClick={onContact} className="text-action">Let’s talk</button></div>
        </div>
      </section>
    </>
  );
}
