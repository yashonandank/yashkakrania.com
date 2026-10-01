import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-32">
      <div className="kicker">404 · activation not found</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Off the manifold.</h1>
      <Link href="/" className="btn mt-8">Back home →</Link>
    </div>
  );
}
