"use client";
/**
 * Components you can use inside any .mdx post, e.g.
 *   <Callout kind="broke">Δ replies are longer on average…</Callout>
 *   <BarChart data={[0.51, 0.55, 0.62]} label="probe accuracy by layer" />
 *   <AttentionArcs text="I see your point, but…" />
 *   <GradioDemo src="https://yashonandank-steer.hf.space" />
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Callout({ kind = "note", title, children }: { kind?: "note" | "broke" | "idea"; title?: string; children: ReactNode }) {
  const label = title ?? { note: "Note", broke: "What broke", idea: "Idea" }[kind];
  return (
    <div className="callout">
      <b>{label}</b>
      <div>{children}</div>
    </div>
  );
}

export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="figure">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Minimal animated bar chart. Highlights the max bar. Hover a bar for its value. */
export function BarChart({ data, label, xLabels = ["", ""], format = (v: number) => `${Math.round(v * 100)}%` }: {
  data: number[]; label?: string; xLabels?: [string, string]; format?: (v: number) => string;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...data), min = Math.min(...data) * 0.9;
  return (
    <div>
      <div className="flex h-44 items-end gap-1.5 border-b border-muted pt-6">
        {data.map((v, i) => (
          <motion.div
            key={i}
            title={`${i}: ${format(v)}`}
            className={`group relative flex-1 origin-bottom ${v === max ? "bg-accent" : "bg-[rgba(var(--pt),.35)]"}`}
            style={{ height: `${((v - min) / (max - min)) * 100}%` }}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.025, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="pointer-events-none absolute -top-5 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] whitespace-nowrap group-hover:block">{format(v)}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[11px] text-muted">
        <span>{xLabels[0]}</span><span>{label}</span><span>{xLabels[1]}</span>
      </div>
    </div>
  );
}

/** Hover/tap a word to draw arcs to the words it "attends" to. Pass real weights, or it fakes them. */
export function AttentionArcs({ text, weights }: { text: string; weights?: number[][] }) {
  const words = text.split(" ");
  const wrap = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const [src, setSrc] = useState(-1);
  const [paths, setPaths] = useState<{ d: string; w: number; o: number }[]>([]);
  const reduce = useReducedMotion();

  const w = (i: number) =>
    weights?.[i] ?? words.map((_, j) => (j === i ? 0 : Math.exp(-Math.abs(i - j) / 2.5) * (0.4 + 0.6 * Math.abs(Math.sin((i + 1) * (j + 2) * 1.7)))));

  useEffect(() => {
    if (src < 0 || !wrap.current) { setPaths([]); return; }
    const wr = wrap.current.getBoundingClientRect(), row = w(src), mx = Math.max(...row);
    const a = els.current[src]!.getBoundingClientRect();
    const ax = a.left + a.width / 2 - wr.left, ay = a.top - wr.top + 4;
    setPaths(row.flatMap((v, j) => {
      if (j === src || v / mx < 0.25) return [];
      const b = els.current[j]!.getBoundingClientRect();
      const bx = b.left + b.width / 2 - wr.left, by = b.top - wr.top + 4, h = Math.min(56, 16 + Math.abs(bx - ax) * 0.18);
      return [{ d: `M${ax},${ay} C${ax},${ay - h} ${bx},${by - h} ${bx},${by}`, w: 1 + (5 * v) / mx, o: 0.35 + (0.65 * v) / mx }];
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div ref={wrap} className="relative" onPointerLeave={() => setSrc(-1)}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {paths.map((p, i) => (
          <motion.path key={`${src}-${i}`} d={p.d} fill="none" stroke="var(--accent)" strokeWidth={p.w} strokeLinecap="round" opacity={p.o}
            initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
        ))}
      </svg>
      <p className="pt-9 text-lg leading-[2.4] font-semibold md:text-2xl">
        {words.map((word, i) => (
          <span key={i}>
            <span
              ref={(el) => { els.current[i] = el; }}
              onPointerEnter={() => setSrc(i)}
              onClick={() => setSrc(i)}
              className={`inline-block cursor-crosshair px-0.5 leading-tight transition-colors ${src === i ? "bg-ink text-bg" : ""}`}
            >{word}</span>{" "}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Embeds a Hugging Face Space / Gradio app. Loads only when scrolled near, to keep pages fast. */
export function GradioDemo({ src, height = 520, title = "Interactive demo" }: { src: string; height?: number; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: "400px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="figure">
      {show && !src.includes("TODO") ? (
        <iframe src={src} title={title} width="100%" height={height} loading="lazy" className="border-0" allow="clipboard-write" />
      ) : (
        <div className="grid h-40 place-items-center text-center font-mono text-sm text-muted">[ {title}: Hugging Face Space goes here ]</div>
      )}
    </div>
  );
}
