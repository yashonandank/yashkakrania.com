"use client";
/**
 * Small motion building blocks, reused across pages.
 *
 * "use client" (top line) tells Next.js this file runs in the browser too. By default,
 * Next.js components render only on the server and ship plain HTML. Anything that
 * reacts to the mouse, scroll or timers needs to be a client component.
 *
 * All of them respect the OS "reduce motion" setting via Motion's useReducedMotion().
 */
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fades + slides children up when they scroll into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Big heading whose letters rise out of a mask, one after another. */
export function RiseText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex overflow-hidden ${className ?? ""}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={reduce ? false : { y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 + i * 0.06, ease: [0.7, 0, 0.2, 1] }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Wraps a button/link so it's pulled toward the cursor. Springs make it feel physical. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  return (
    <motion.span
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

/** Cycles through words with a "decoding" scramble effect. */
export function Scramble({ words, interval = 3200 }: { words: string[]; interval?: number }) {
  const [text, setText] = useState(words[0]);
  const reduce = useReducedMotion();
  const idx = useRef(0);
  useEffect(() => {
    if (reduce || words.length < 2) return;
    const chars = "!<>-_/[]{}=+*^?#01";
    let raf = 0;
    const id = setInterval(() => {
      idx.current = (idx.current + 1) % words.length;
      const to = words[idx.current];
      let frame = 0;
      const tick = () => {
        let out = "";
        for (let i = 0; i < to.length; i++) out += i < frame / 2 ? to[i] : chars[(Math.random() * chars.length) | 0];
        setText(out);
        if (frame++ < to.length * 2) raf = requestAnimationFrame(tick);
        else setText(to);
      };
      tick();
    }, interval);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, [words, interval, reduce]);
  return <span className="font-mono text-accent">{text}</span>;
}
