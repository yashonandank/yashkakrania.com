"use client";
/**
 * Signature hero: a 2-cluster "embedding cloud" with the steering vector drawn between
 * the cluster centroids. Your cursor pushes points away; they spring back.
 *
 * How it works (the same loop any game or simulation uses):
 *  1. useRef gives us the <canvas> element after React renders it.
 *  2. useEffect runs once in the browser: set up points, start a requestAnimationFrame loop.
 *  3. Each frame: move points (spring toward home + cursor repulsion), then draw.
 *  4. The cleanup function (returned from useEffect) stops the loop when the page changes.
 *
 * Performance: pauses when scrolled off-screen, caps pixel ratio at 2, fewer points on
 * phones, and draws one static frame if the visitor prefers reduced motion.
 */
import { useEffect, useRef } from "react";

export function EmbeddingCloud({ label = "v_persuasion" }: { label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const host = canvas.parentElement!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, t = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };
    let colors = { pt: "150,170,200", pt2: "198,255,61", accent: "#c6ff3d" };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = { pt: s.getPropertyValue("--pt").trim(), pt2: s.getPropertyValue("--pt2").trim(), accent: s.getPropertyValue("--accent").trim() };
      if (reduce) draw();
    };
    const resize = () => {
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const N = innerWidth < 700 ? 90 : 190;
    const g = () => Math.random() + Math.random() + Math.random() - 1.5; // cheap bell curve
    const narrow = innerWidth < 700;
    const pts = Array.from({ length: N }, (_, i) => {
      const cl = i % 2;
      const hx = (cl ? (narrow ? 0.7 : 0.8) : narrow ? 0.45 : 0.6) + g() * 0.11;
      const hy = (cl ? 0.22 : 0.45) + g() * 0.13;
      return { hx, hy, x: 0, y: 0, vx: 0, vy: 0, cl };
    });

    function step() {
      t += 0.01;
      for (const p of pts) {
        p.vx += (p.hx * W + Math.sin(t + p.hy * 9) * 6 - p.x) * 0.02;
        p.vy += (p.hy * H + Math.cos(t + p.hx * 9) * 6 - p.y) * 0.02;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 16000) { const f = ((16000 - d2) / 16000) * 2.2, d = Math.sqrt(d2) || 1; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        p.vx *= 0.86; p.vy *= 0.86; p.x += p.vx; p.y += p.vy;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 3000) { ctx.strokeStyle = `rgba(${colors.pt},${((1 - d2 / 3000) * 0.25).toFixed(3)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const c = [{ x: 0, y: 0, n: 0 }, { x: 0, y: 0, n: 0 }];
      for (const p of pts) {
        c[p.cl].x += p.x; c[p.cl].y += p.y; c[p.cl].n++;
        ctx.fillStyle = p.cl ? `rgba(${colors.pt2},.9)` : `rgba(${colors.pt},.7)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.cl ? 2.2 : 1.8, 0, 7); ctx.fill();
      }
      const [c0, c1] = c.map((k) => ({ x: k.x / k.n, y: k.y / k.n }));
      ctx.strokeStyle = colors.accent; ctx.fillStyle = colors.accent; ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(c0.x, c0.y); ctx.lineTo(c1.x, c1.y); ctx.stroke(); ctx.setLineDash([]);
      const ang = Math.atan2(c1.y - c0.y, c1.x - c0.x);
      ctx.beginPath(); ctx.moveTo(c1.x, c1.y);
      ctx.lineTo(c1.x - 12 * Math.cos(ang - 0.4), c1.y - 12 * Math.sin(ang - 0.4));
      ctx.lineTo(c1.x - 12 * Math.cos(ang + 0.4), c1.y - 12 * Math.sin(ang + 0.4));
      ctx.closePath(); ctx.fill();
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = c1.x > W - 120 ? "right" : "left";
      ctx.fillText(label, c1.x + (ctx.textAlign === "right" ? -10 : 10), c1.y - 12);
    }

    function loop() { step(); draw(); if (visible) raf = requestAnimationFrame(loop); }

    resize(); readColors();
    for (const p of pts) { p.x = p.hx * W; p.y = p.hy * H; }

    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    addEventListener("resize", resize);
    addEventListener("themechange", readColors);
    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(host);

    if (reduce) draw(); else loop();

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", resize); removeEventListener("themechange", readColors);
    };
  }, [label]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
