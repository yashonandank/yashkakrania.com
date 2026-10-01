"use client";
// Client component: holds the selected filter in state (like a Streamlit widget value).
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

const TYPES = ["all", "experiment", "build", "wildcard"] as const;

export function ProjectFilter({ items }: { items: { type: string; node: ReactNode }[] }) {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>("all");
  const shown = items.filter((i) => filter === "all" || i.type === filter);
  return (
    <>
      <div className="mt-10 mb-6 flex flex-wrap gap-2" role="tablist">
        {TYPES.map((t) => (
          <button key={t} role="tab" aria-selected={filter === t} onClick={() => setFilter(t)}
            className={`chip ${filter === t ? "!bg-accent !text-accent-ink" : ""}`}>{t === "all" ? "everything" : site.projectTypes[t]}</button>
        ))}
      </div>
      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((i, idx) => (
            <motion.div key={`${filter}-${idx}`} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
              {i.node}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && <p className="font-mono text-sm text-muted">Nothing here yet. Check back next week (I say, optimistically).</p>}
    </>
  );
}
