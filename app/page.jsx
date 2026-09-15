import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SeamlessHeroVideo from "@/components/SeamlessHeroVideo";
import CaseStudy from "@/components/CaseStudy";
import { marqueeWords, processStages, projects, services, testimonials } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="hero hero--video" aria-labelledby="hero-title">
        <SeamlessHeroVideo src="/assets/video/hero.mp4" poster="/assets/video/hero-poster.webp" />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__content">
          <p className="eyebrow">Independent studio · Bangalore</p>
          <h1 id="hero-title">Brand systems that feel inevitable.</h1>
          <span className="red-rule" aria-hidden="true" />
          <p className="hero__lede">
            A small studio building brand, web, and content systems for founders who want clarity without losing edge.
          </p>
          <div className="hero__actions" aria-label="Primary actions">
            <MagneticButton className="button button--primary" href="/contact">
              Start a project
            </MagneticButton>
            <Link className="button button--ghost" href="/services">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <Marquee items={marqueeWords} />

      <Reveal as="section" className="section section--intro" id="about">
        <div className="section__index">01 / About</div>
        <div className="section__body section__body--wide">
          <h2>We help brands feel easier to understand, easier to trust, and easier to choose.</h2>
          <div className="intro-copy">
            <p>
              Solaris works with founders and teams who want their brand, website, and content to feel
              clear without becoming ordinary.
            </p>
            <p>
              We bring structure, taste, and practical execution into one focused process - with the same
              people from first call to launch.
            </p>
          </div>
          <div className="brand-principles" aria-label="What we do">
            <span>Position</span>
            <span>Design</span>
            <span>Build</span>
            <span>Iterate</span>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section section--services" aria-labelledby="disciplines-title">
        <div className="section__head">
          <p className="eyebrow">02 / Core disciplines</p>
          <h2 id="disciplines-title">The pieces we can help with.</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-card__top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Link href={`/services#${service.slug}`}>Explore</Link>
              </div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section section--work" aria-labelledby="work-title">
        <div className="section__head">
          <p className="eyebrow">03 / Work</p>
          <h2 id="work-title">Creative systems built to hold attention.</h2>
        </div>
        {projects.length > 0 ? (
          <CaseStudy project={projects[0]} />
        ) : (
          <p className="page-lede">New work is in production - coming soon.</p>
        )}
        <div className="section__more">
          <Link className="text-link" href="/portfolio">See all work →</Link>
        </div>
      </Reveal>

      <Reveal as="section" className="section process-preview" aria-labelledby="process-preview-title">
        <div className="section__index">04 / Process</div>
        <div className="section__body">
          <h2 id="process-preview-title">A clear process from idea to launch.</h2>
          <div className="process-chips">
            {processStages.slice(0, 3).map((stage, index) => (
              <article key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/process">
            See the full sequence →
          </Link>
        </div>
      </Reveal>

      {testimonials.length > 0 ? (
        <Reveal as="section" className="section section--testimonials" aria-labelledby="testimonials-title">
          <div className="section__head">
            <p className="eyebrow">05 / In their words</p>
            <h2 id="testimonials-title">What founders say after launch.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.quote}>
                <span className="testimonial-card__mark" aria-hidden="true">"</span>
                <p className="testimonial-card__quote">{item.quote}</p>
                <p className="testimonial-card__author">
                  <span>{item.author}</span>
                  <span>{item.role}</span>
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      ) : null}

      <Reveal as="section" className="section home-cta" aria-label="Start a project">
        <div className="home-cta__inner">
          <p className="eyebrow">Next move</p>
          <h2>Have something you want to shape?</h2>
          <p>We are taking a small number of new projects this quarter. WhatsApp is the fastest way in.</p>
          <div className="home-cta__actions">
            <MagneticButton className="button button--primary" href="/contact">Start a project</MagneticButton>
            <Link className="button button--ghost" href="/about">Studio</Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
