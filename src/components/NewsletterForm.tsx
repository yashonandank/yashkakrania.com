import { site } from "@/lib/site";

/**
 * Buttondown's embed form: a plain HTML form that posts straight to Buttondown.
 * No JavaScript or backend needed. Set `buttondownUser` in src/lib/site.ts;
 * until then this shows an RSS link instead.
 */
export function NewsletterForm() {
  if (!site.buttondownUser) {
    return (
      <p className="font-mono text-sm text-muted">
        Email signup coming soon (it&apos;s on the list, somewhere around item 40). Until then there&apos;s{" "}
        <a href="/rss.xml" className="text-accent underline">RSS</a>, like it&apos;s 2005.
      </p>
    );
  }
  return (
    <form
      action={`https://buttondown.com/api/emails/embed-subscribe/${site.buttondownUser}`}
      method="post"
      target="_blank"
      className="flex max-w-md flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="bd-email" className="sr-only">Email</label>
      <input id="bd-email" type="email" name="email" required placeholder="you@domain.com" className="input flex-1" />
      <button type="submit" className="btn">I&apos;m in →</button>
    </form>
  );
}
