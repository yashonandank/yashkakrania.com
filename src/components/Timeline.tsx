"use client";
/**
 * Interactive timeline for the About page:
 *  - filter chips by kind (work / founded / built / education)
 *  - a progress line that fills as you scroll (Motion's useScroll)
 *  - each entry expands on click to show its blurb
 */
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import type { Entry } from "@/data/about";

const KINDS = ["all", "work", "founded", "built", "education"] as const;

export function Timeline({ entries }: { entries: Entry[] }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  // scrollYProgress goes 0 → 1 as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const shown = entries.map((e, i) => ({ e, i })).filter(({ e }) => kind === "all" || e.kind === kind);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`chip ${kind === k ? "!bg-accent !text-accent-ink" : ""}`}>{k}</button>
        ))}
      </div>
      <ol ref={ref} className="relative pl-8">
        <span className="absolute top-0 bottom-0 left-[7px] w-[2px] bg-line" />
        <motion.span className="absolute top-0 bottom-0 left-[7px] w-[2px] origin-top bg-accent" style={{ scaleY: reduce ? 1 : scaleY }} />
        <AnimatePresence initial={false}>
          {shown.map(({ e, i }) => (
            <motion.li key={i} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative border-b border-line">
              <span className={`absolute top-7 -left-[31px] h-4 w-4 rounded-full border-2 border-accent ${open === i ? "bg-accent" : "bg-bg"}`} />
              <button onClick={() => setOpen(open === i ? null : i)} className="group w-full py-5 text-left" aria-expanded={open === i}>
                <span className="font-mono text-xs text-muted">{e.period} · <span className="text-accent uppercase">{e.kind}</span></span>
                <span className="mt-1 block text-2xl font-bold tracking-tight transition-transform group-hover:translate-x-1 md:text-3xl">{e.title}</span>
                <span className="block text-muted">{e.org}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <span className="block max-w-2xl pb-5">{e.blurb}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}
