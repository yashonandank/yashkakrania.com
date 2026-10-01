import Link from "next/link";
import { site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.04em]">Get new posts when I remember to write them.</h2>
          <p className="mt-2 text-muted">No spam. I can barely send one email a week.</p>
          <div className="mt-5"><NewsletterForm /></div>
        </div>
        <div className="grid grid-cols-2 gap-6 font-mono text-sm md:justify-self-end">
          <ul className="space-y-2">
            {site.nav.map((n) => <li key={n.href}><Link className="navlink" href={n.href}>{n.label}</Link></li>)}
          </ul>
          <ul className="space-y-2">
            {site.contact.map((c) => <li key={c.href}><a className="navlink" href={c.href}>{c.label}</a></li>)}
            <li><a className="navlink" href="/rss.xml">rss</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap pb-8 font-mono text-xs text-muted">© {new Date().getFullYear()} Yash · built with Next.js, too much coffee and mild confusion</div>
    </footer>
  );
}
