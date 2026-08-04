import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__inner">
        <p className="eyebrow">Error 404</p>
        <h1 id="not-found-title">This signal has drifted off-orbit.</h1>
        <p>
          The page you were looking for is not in the studio archive. It may have moved, or it never existed.
        </p>
        <div className="not-found__actions">
          <Link className="button button--primary" href="/">Return home</Link>
          <Link className="button button--ghost" href="/contact">Get in touch</Link>
        </div>
        <div className="not-found__links" aria-label="Studio shortcuts">
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Work</Link>
          <Link href="/process">Process</Link>
          <Link href="/about">Studio</Link>
        </div>
      </div>
    </section>
  );
}
