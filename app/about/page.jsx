import Link from "next/link";
import Reveal from "@/components/Reveal";
import { studio, team } from "@/lib/data";

export const metadata = {
  title: "Studio",
  description: "Solaris Studios is an independent brand, web, and content studio based in Bangalore.",
};

const beliefs = [
  {
    title: "Clarity is a feature.",
    body: "We earn attention by being easier to read, easier to navigate, and easier to act on — not louder.",
  },
  {
    title: "Systems beat one-offs.",
    body: "We design pieces that fit together so your team can keep shipping without rebuilding the brand each quarter.",
  },
  {
    title: "Taste is execution.",
    body: "Strategy without craft stays on slides. We carry every decision through to the pixel and the paragraph.",
  },
  {
    title: "Quiet confidence travels.",
    body: "We prefer brands that hold up across a launch, a press hit, and a quiet Tuesday morning.",
  },
];

const numbers = [
  { value: String(studio.yearFounded), label: "Year founded" },
  { value: "5+", label: "Projects shipped" },
  { value: "5", label: "Disciplines" },
  { value: "4", label: "People in studio" },
];

export default function AboutPage() {
  return (
    <>
      <Reveal as="section" className="page-hero">
        <p className="eyebrow">Studio</p>
        <h1>A small studio shaping calm, considered brands.</h1>
        <p className="page-lede">
          Solaris is an independent brand, web, and content studio based in {studio.location}.
          We work with founders and teams who want clarity without losing edge.
        </p>
      </Reveal>

      <Reveal as="section" className="section about-numbers" aria-label="Studio in numbers">
        <div className="about-numbers__grid">
          {numbers.map((stat) => (
            <article key={stat.label} className="about-numbers__cell">
              <span className="about-numbers__value">{stat.value}</span>
              <span className="about-numbers__label">{stat.label}</span>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section section--intro" id="about-story">
        <div className="section__index">01 / Story</div>
        <div className="section__body section__body--wide">
          <h2>We started Solaris because the work we wanted to do did not fit the agency mould.</h2>
          <div className="intro-copy">
            <p>
              Small teams kept asking for one studio that could think across brand, website, content,
              and search — without handing the project off three times. So we built one.
            </p>
            <p>
              Today, Solaris is a focused practice. We pick a small number of projects each quarter
              and bring them through one connected process, with the same people from first call to launch.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section section--services" aria-labelledby="beliefs-title">
        <div className="section__head">
          <p className="eyebrow">02 / Beliefs</p>
          <h2 id="beliefs-title">How we work, in four lines.</h2>
        </div>
        <div className="beliefs-grid">
          {beliefs.map((belief, index) => (
            <article className="belief-card" key={belief.title}>
              <span className="belief-card__index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{belief.title}</h3>
              <p>{belief.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section section--services" id="about-team" aria-labelledby="team-title">
        <div className="section__head">
          <p className="eyebrow">03 / People</p>
          <h2 id="team-title">One studio, one accountable team.</h2>
        </div>
        <div className="team-grid">
          {team.map((member, index) => (
            <article className="team-card" key={member.name}>
              <span className={`team-card__avatar team-card__avatar--${index + 1}`} aria-hidden="true">
                {member.initial}
              </span>
              <div className="team-card__body">
                <h3>{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section about-cta" aria-label="Start a project with Solaris">
        <div className="about-cta__inner">
          <p className="eyebrow">Next step</p>
          <h2>Have something you want to shape with us?</h2>
          <p>We are taking on a small number of projects each quarter. WhatsApp is the fastest way in.</p>
          <div className="about-cta__actions">
            <Link className="button button--primary" href="/contact">Start a project</Link>
            <Link className="button button--ghost" href="/portfolio">See the work</Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
