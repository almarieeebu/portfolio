import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recreatedNote, site, stories, type Story, type StoryPart } from "@/lib/content";
import { EvidenceBadge, Eyebrow, StackList, btnOutline, btnPrimary } from "@/components/bits";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) return { title: "Case study not found" };

  const url = `/work/${story.slug}`;
  return {
    title: story.title,
    description: story.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${story.title} · ${site.name}`,
      description: story.metaDescription,
      url: `${site.url}${url}`,
      type: "article",
    },
  };
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-deep" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink">{title}</h2>
      {children}
    </section>
  );
}

function PartBlock({ part }: { part: StoryPart }) {
  return (
    <article id={part.id} className="scroll-mt-20 rounded-2xl border border-paper-line bg-white p-5">
      <p className="text-xs font-semibold tracking-[0.14em] text-gold-deep uppercase">{part.kind}</p>
      <h3 className="mt-1 font-display text-lg font-semibold text-ink">{part.title}</h3>
      {part.shot ? (
        <figure className="mt-3 overflow-hidden rounded-xl border border-paper-line">
          <Image
            src={part.shot.src}
            alt={part.shot.alt}
            width={part.shot.w}
            height={part.shot.h}
            sizes="(min-width: 768px) 700px, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="bg-paper-soft px-3 py-2 text-xs text-ink-muted">{recreatedNote}</figcaption>
        </figure>
      ) : null}
      <h4 className="mt-4 text-sm font-semibold text-ink">Problem</h4>
      <p className="mt-1 text-base leading-relaxed text-ink-muted">{part.problem}</p>
      <h4 className="mt-4 text-sm font-semibold text-ink">What I built</h4>
      <Bullets items={part.built} />
      <h4 className="mt-4 text-sm font-semibold text-ink">Outcome</h4>
      <p className="mt-1 text-base leading-relaxed text-ink-muted">{part.outcome}</p>
      <p className="mt-3 flex flex-wrap gap-x-5 text-sm font-semibold">
        {part.demo ? (
          <Link href={part.demo} className="inline-flex min-h-11 items-center text-gold-deep underline underline-offset-2 hover:text-ink">
            Try the demo
          </Link>
        ) : null}
        {part.sourceUrl ? (
          <a
            href={part.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center text-gold-deep underline underline-offset-2 hover:text-ink"
          >
            Source on GitHub
          </a>
        ) : null}
      </p>
    </article>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = stories.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const story: Story = stories[index];
  const next = stories[(index + 1) % stories.length];

  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-paper">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <Link href="/#work" className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-deep hover:text-ink">
            &larr; All selected work
          </Link>
          <div className="mt-2">
            <Eyebrow>Case study</Eyebrow>
          </div>
          <h1 className="mt-2 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            {story.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-muted">{story.outcomeShort}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Kinds of evidence on this page">
            {story.evidence.map((kind) => (
              <li key={kind}>
                <EvidenceBadge kind={kind} />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={story.demo} className={btnPrimary}>
              {story.demoLabel}
            </Link>
            <a href={story.sourceUrl} target="_blank" rel="noreferrer noopener" className={btnOutline}>
              View source on GitHub
            </a>
          </div>
          {story.demoHint ? <p className="mt-2 text-sm text-ink-muted">{story.demoHint}</p> : null}

          <figure className="mt-8 overflow-hidden rounded-2xl border border-paper-line bg-white">
            <Image
              src={story.shot.src}
              alt={story.shot.alt}
              width={story.shot.w}
              height={story.shot.h}
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="border-t border-paper-line bg-paper-soft px-4 py-2 text-xs text-ink-muted">
              {recreatedNote} Screenshot of the browser simulation, not the production system.
            </figcaption>
          </figure>

          <dl className="mt-8 grid gap-4 rounded-2xl border border-paper-line bg-paper-soft p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-ink">Who it helps</dt>
              <dd className="mt-1 text-ink-muted">{story.helps}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">My role</dt>
              <dd className="mt-1 text-ink-muted">{story.role}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-ink">Stack</dt>
              <dd className="mt-2">
                <StackList items={story.stack} />
              </dd>
            </div>
          </dl>

          <Section title="Context and users">
            <p className="mt-3 text-base leading-relaxed text-ink">{story.context}</p>
          </Section>

          <Section title="Problem">
            <p className="mt-3 text-base leading-relaxed text-ink">{story.problem}</p>
          </Section>

          {story.built.length > 0 ? (
            <Section title="What I built">
              <Bullets items={story.built} />
            </Section>
          ) : null}

          {story.parts ? (
            <Section title={story.parts.heading}>
              {story.parts.note ? (
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{story.parts.note}</p>
              ) : null}
              <div className="mt-4 flex flex-col gap-5">
                {story.parts.items.map((part) => (
                  <PartBlock key={part.id} part={part} />
                ))}
              </div>
            </Section>
          ) : null}

          <Section title="Rules and design decisions">
            <Bullets items={story.decisions} />
          </Section>

          <Section title="Technical implementation">
            <Bullets items={story.technical} />
          </Section>

          <Section title="Outcome and evidence">
            <p className="mt-3 text-base leading-relaxed text-ink">{story.outcome}</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li>
                <EvidenceBadge kind="production" /> The problem and the work come from live school
                systems. That system is private, so it is shown here through recreations.
              </li>
              <li>
                <EvidenceBadge kind="demo-code" /> The rules are re-implemented in a public Frappe v15 app on
                sample data.{" "}
                <a href={story.sourceUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-gold-deep underline underline-offset-2">
                  Read the source
                </a>
                .
              </li>
              <li>
                <EvidenceBadge kind="simulation" /> The demo link runs the same rules in your browser.
                Changes stay in this browser only.
              </li>
            </ul>
          </Section>

          <nav aria-label="More case studies" className="mt-12 border-t border-paper-line pt-6">
            <p className="text-sm text-ink-muted">Next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="inline-flex min-h-11 items-center font-display text-lg font-semibold text-ink hover:text-gold-deep"
            >
              {next.title} &rarr;
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
