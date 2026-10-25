import Image from "next/image";
import Link from "next/link";
import {
  capabilities,
  codeSamples,
  contact,
  evidenceKinds,
  experience,
  resumes,
  site,
  stories,
} from "@/lib/content";
import { Eyebrow, StackList, btnOutline, btnPrimary } from "@/components/bits";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { SiteHeader } from "@/components/SiteHeader";
import { StoryCard } from "@/components/StoryCard";

const linkClass = "font-semibold text-gold-deep underline underline-offset-2 hover:text-ink";

export default function Home() {
  return (
    <>
      <LegacyRedirect />
      <SiteHeader />
      <main id="main">
        <section className="bg-paper">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-16">
            <div>
              <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                {site.name}
                <span className="block text-gold-deep">{site.title}</span>
              </h1>
              <p className="mt-4 max-w-2xl font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">
                {site.tagline}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{site.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/#work" className={btnPrimary}>
                  Explore selected work
                </Link>
                <Link href="/#resume" className={btnOutline}>
                  View résumé
                </Link>
                <Link href="/#contact" className={btnOutline}>
                  Contact
                </Link>
              </div>
              <p className="mt-4 text-sm font-medium text-ink-muted">{site.availability}</p>
            </div>
            <Image
              src={site.photo}
              alt="Portrait of Almarie Bullo"
              width={663}
              height={1024}
              priority
              className="aspect-[4/5] w-40 rounded-2xl object-cover object-[center_18%] md:w-56"
            />
          </div>
        </section>

        <section id="work" className="scroll-mt-16 border-t border-paper-line bg-paper-soft">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Three school-system stories
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              Professional work on live school systems, shown through recreated demos built on
              sample data. Each case study separates what I built from what the demo only
              illustrates.
            </p>
            <div className="mt-8 flex flex-col gap-6">
              {stories.map((story, i) => (
                <StoryCard key={story.slug} story={story} index={i} />
              ))}
            </div>

            <div id="code-samples" className="mt-12 scroll-mt-16">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                Code samples
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                {evidenceKinds.sample.label}s: {evidenceKinds.sample.hint}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {codeSamples.map((sample) => (
                  <article
                    key={sample.title}
                    className="flex flex-col gap-3 rounded-2xl border border-paper-line bg-white p-5"
                  >
                    <h4 className="font-display text-base font-semibold text-ink">{sample.title}</h4>
                    <p className="text-sm leading-relaxed text-ink-muted">{sample.summary}</p>
                    <StackList items={sample.stack} />
                    <p className="mt-auto flex flex-wrap gap-x-5 text-sm">
                      {sample.liveUrl ? (
                        <a href={sample.liveUrl} target="_blank" rel="noreferrer noopener" className={`${linkClass} inline-flex min-h-11 items-center`}>
                          Live demo
                        </a>
                      ) : null}
                      <a href={sample.repoUrl} target="_blank" rel="noreferrer noopener" className={`${linkClass} inline-flex min-h-11 items-center`}>
                        Source on GitHub
                      </a>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="dark-zone scroll-mt-16 bg-night text-night-ink">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">Experience</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Developer since March 2020, Product Owner since January 2026
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {experience.map((org) => (
                <div key={org.org} className="rounded-2xl border border-night-line bg-night-soft p-5">
                  <h3 className="font-display text-lg font-semibold">{org.org}</h3>
                  <ol className="mt-3 space-y-4">
                    {org.roles.map((role) => (
                      <li key={role.title}>
                        <p className="font-semibold">{role.title}</p>
                        <p className="text-sm text-night-muted">{role.dates}</p>
                        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-night-muted marker:text-gold">
                          {role.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                  {"erp" in org && org.erp ? (
                    <div className="mt-4 border-t border-night-line pt-4">
                      <p className="font-semibold">{org.erp.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-night-muted">{org.erp.text}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <h3 id="capabilities" className="mt-12 scroll-mt-16 font-display text-xl font-semibold">
              Capabilities
            </h3>
            <dl className="mt-4 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {capabilities.map((c) => (
                <div key={c.label}>
                  <dt className="text-sm font-semibold text-gold">{c.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-night-muted">{c.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
            <div id="resume" className="scroll-mt-16">
              <Eyebrow>Résumé</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Résumé
              </h2>
              <ul className="mt-4 space-y-3">
                {resumes.map((r) => (
                  <li key={r.href} className="rounded-2xl border border-paper-line bg-white p-4">
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 items-center font-semibold text-ink underline decoration-gold-deep underline-offset-4 hover:text-gold-deep"
                    >
                      {r.label}
                    </a>
                    <p className="text-sm leading-relaxed text-ink-muted">{r.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div id="contact" className="scroll-mt-16">
              <Eyebrow>Contact</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Get in touch
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{contact.lead}</p>
              <p className="mt-4">
                <a
                  href={`mailto:${site.email}`}
                  className="text-lg font-semibold break-all text-gold-deep underline underline-offset-4 hover:text-ink"
                >
                  {site.email}
                </a>
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className={btnPrimary}>
                  Send an email
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className={btnOutline}>
                  LinkedIn
                </a>
                <a href={site.github} target="_blank" rel="noreferrer noopener" className={btnOutline}>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-paper-line bg-paper">
        <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-ink-muted sm:px-6">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </>
  );
}
