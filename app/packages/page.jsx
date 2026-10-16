import Link from "next/link";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { packages, price, storeTeardown, studio } from "@/lib/data";

export const metadata = {
  title: "Packages",
  description:
    "What working with Solaris Studios costs, in rupees and dollars. Floors, not quotes.",
  /* Unfinished: the prices are settled but five of the six tiers have no
     scope written yet. Kept out of the index until they do, so a page that
     quotes a number without saying what it buys cannot be the first thing a
     buyer finds. Remove this, add the route to app/sitemap.js, and link it
     from the nav and the hero once the scope lands. */
  robots: { index: false, follow: false },
};

export default function PackagesPage() {
  const teardownHref = `${studio.whatsappHref}?text=${encodeURIComponent(
    storeTeardown.message
  )}`;

  return (
    <>
      <Reveal as="section" className="page-hero">
        <p className="eyebrow">Packages</p>
        <h1>What this costs.</h1>
        <p className="page-lede">
          Every figure below is a floor, not a quote. Scope moves the number, and
          we will tell you which way before you commit to anything.
        </p>
      </Reveal>

      <Reveal as="section" className="section packages">
        <ol className="packages__list">
          {packages.map((tier, index) => {
            const free = tier.rupees === 0;
            const money = free ? null : price(tier.rupees);
            return (
              <li className="package" id={tier.slug} key={tier.slug}>
                <div className="package__head">
                  <span className="package__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="package__name">{tier.name}</h2>
                </div>

                <p className="package__price">
                  {free ? (
                    <span className="package__free">Free</span>
                  ) : (
                    <>
                      <span className="package__from">From</span>
                      <span className="package__inr">{money.inr}</span>
                      <span className="package__usd">{money.usd}</span>
                      {tier.per ? (
                        <span className="package__per">per {tier.per}</span>
                      ) : null}
                    </>
                  )}
                </p>

                {tier.summary ? (
                  <p className="package__summary">{tier.summary}</p>
                ) : null}

                {tier.timeline ? (
                  <p className="package__timeline">
                    <span>Turnaround</span> {tier.timeline}
                  </p>
                ) : null}

                {tier.includes.length ? (
                  <ul className="package__includes">
                    {tier.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Why both columns are on the page at all, said plainly rather than
            left for someone to work out from the numbers. */}
        <p className="packages__note">
          Rupee prices are for work billed in India. Dollar prices are for work
          billed abroad. One rate across every tier, so the two columns stay in
          step.
        </p>
      </Reveal>

      <Reveal as="section" className="section packages__cta">
        <h2>Not sure which one you need?</h2>
        <p>{storeTeardown.promise}</p>
        <div className="packages__actions">
          <MagneticButton
            className="button button--primary"
            href={teardownHref}
            target="_blank"
            rel="noreferrer"
          >
            {storeTeardown.label}
          </MagneticButton>
          <Link className="button button--ghost" href="/contact">
            Start a project
          </Link>
        </div>
      </Reveal>
    </>
  );
}
