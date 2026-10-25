import { evidenceKinds, type EvidenceKind } from "@/lib/content";

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-gold-deep";
export const btnOutline =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-ink/30 px-5 text-sm font-semibold text-ink transition hover:border-gold-deep hover:text-gold-deep";
export const btnGold =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-bold text-night transition hover:bg-gold-bright";
export const btnOutlineDark =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-night-muted/50 px-5 text-sm font-semibold text-night-ink transition hover:border-gold hover:text-gold";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.16em] text-gold-deep uppercase">{children}</p>
  );
}

export function EvidenceBadge({ kind }: { kind: EvidenceKind }) {
  const { label, hint } = evidenceKinds[kind];
  return (
    <span
      title={hint}
      className="inline-flex items-center rounded-full border border-gold-line bg-gold-soft px-3 py-1 text-xs font-semibold text-ink"
    >
      {label}
    </span>
  );
}

export function StackList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full border px-3 py-1 text-sm ${
            dark ? "border-night-line text-night-ink" : "border-paper-line bg-white/60 text-ink"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
