import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="narrow" style={{ textAlign: 'center', paddingTop: 60 }}>
      <h1>404</h1>
      <p className="muted">We couldn’t find that page.</p>
      <Link href="/" className="btn btn--ghost" style={{ marginTop: 16 }}>
        Back home
      </Link>
    </section>
  );
}
