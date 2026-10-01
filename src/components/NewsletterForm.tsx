import { site } from "@/lib/site";

/**
 * Buttondown's embed form: a plain HTML form that posts straight to Buttondown.
 * No JavaScript or backend needed. Set `buttondownUser` in src/lib/site.ts.
 */
export function NewsletterForm() {
  return (
    <form
      action={`https://buttondown.com/api/emails/embed-subscribe/${site.buttondownUser}`}
      method="post"
      target="_blank"
      className="flex max-w-md flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="bd-email" className="sr-only">Email</label>
      <input id="bd-email" type="email" name="email" required placeholder="you@domain.com" className="input flex-1" />
      <button type="submit" className="btn">Subscribe →</button>
    </form>
  );
}
