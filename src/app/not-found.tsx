import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-32">
      <div className="kicker">404</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Page not found.</h1>
      <p className="mt-6 max-w-xl text-xl text-muted">This page does not exist or has moved.</p>
      <Link href="/" className="btn mt-8">Back to home →</Link>
    </div>
  );
}
