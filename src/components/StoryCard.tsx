import Image from "next/image";
import Link from "next/link";
import { recreatedNote, type Story } from "@/lib/content";
import { StackList } from "@/components/bits";

export function StoryCard({ story, index }: { story: Story; index: number }) {
  const href = `/work/${story.slug}`;
  return (
    <article className="overflow-hidden rounded-2xl border border-paper-line bg-white shadow-sm">
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <figure className="border-b border-paper-line bg-paper-soft md:border-r md:border-b-0">
          <Link href={href} tabIndex={-1} aria-hidden="true">
            <Image
              src={story.shot.src}
              alt=""
              width={story.shot.w}
              height={story.shot.h}
              sizes="(min-width: 768px) 420px, 100vw"
              className="h-auto w-full"
            />
          </Link>
          <figcaption className="px-4 py-2 text-xs text-ink-muted">{recreatedNote}</figcaption>
        </figure>
        <div className="flex flex-col gap-3 p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-gold-deep uppercase">
            Story {index + 1}
          </p>
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
            <Link href={href} className="hover:text-gold-deep">
              {story.title}
            </Link>
          </h3>
          <dl className="space-y-2 text-sm leading-relaxed text-ink">
            <div>
              <dt className="font-semibold">Who it helps</dt>
              <dd className="text-ink-muted">{story.helps}</dd>
            </div>
            <div>
              <dt className="font-semibold">Problem</dt>
              <dd className="text-ink-muted">{story.problemShort}</dd>
            </div>
            <div>
              <dt className="font-semibold">Outcome</dt>
              <dd className="text-ink-muted">{story.outcomeShort}</dd>
            </div>
            <div>
              <dt className="font-semibold">My role</dt>
              <dd className="text-ink-muted">{story.role}</dd>
            </div>
          </dl>
          <StackList items={story.stack} />
          <Link
            href={href}
            className="mt-auto inline-flex min-h-11 items-center self-start rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-gold-deep"
          >
            Read the case study<span className="sr-only">: {story.title}</span>
            <span aria-hidden="true">&nbsp;&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
