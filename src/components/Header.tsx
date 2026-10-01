"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { site } from "@/lib/site";

/**
 * Theme toggle. The actual theme is a `data-theme` attribute on <html>; all colours in
 * globals.css read CSS variables that change with it. A tiny inline script in layout.tsx
 * sets it before first paint so there's no flash of the wrong theme.
 */
// useSyncExternalStore = "read a value that lives outside React (here, an HTML attribute)
// and re-render when it changes". On the server there's no document, so it returns null.
const subscribe = (cb: () => void) => { addEventListener("themechange", cb); return () => removeEventListener("themechange", cb); };
const getTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);
  function flip() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    window.dispatchEvent(new Event("themechange")); // re-renders this button + lets the canvas hero re-read colours
  }
  return (
    <button onClick={flip} className="chip" aria-label="Toggle colour theme">
      {theme === "light" ? "◑ dark" : "◐ light"}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-extrabold tracking-[-0.04em]">
          yash<span className="text-accent">.</span>
        </Link>
        <nav className="hidden gap-5 font-mono text-[13px] md:flex">
          {site.nav.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link key={l.href} href={l.href} className={`navlink ${active ? "is-active" : ""}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="chip md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="wrap flex flex-col gap-1 pb-4 md:hidden">
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-3xl font-extrabold tracking-tight">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
