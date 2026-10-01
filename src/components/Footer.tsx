import Link from "next/link";
import { site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const l = site.links;
  return (
    <footer className="mt-24 border-t-2 border-ink">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.04em]">One build a week, in your inbox.</h2>
          <p className="mt-2 text-muted">Lab notes, not tutorials. No spam, unsubscribe anytime.</p>
          <div className="mt-5"><NewsletterForm /></div>
        </div>
        <div className="grid grid-cols-2 gap-6 font-mono text-sm md:justify-self-end">
          <ul className="space-y-2">
            {site.nav.map((n) => <li key={n.href}><Link className="navlink" href={n.href}>{n.label}</Link></li>)}
          </ul>
          <ul className="space-y-2">
            <li><a className="navlink" href={l.email}>email</a></li>
            <li><a className="navlink" href={l.github}>github ↗</a></li>
            <li><a className="navlink" href={l.linkedin}>linkedin ↗</a></li>
            <li><a className="navlink" href={l.x}>x ↗</a></li>
            <li><a className="navlink" href="/rss.xml">rss</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap pb-8 font-mono text-xs text-muted">© {new Date().getFullYear()} Yash · built with Next.js, in public</div>
    </footer>
  );
}
