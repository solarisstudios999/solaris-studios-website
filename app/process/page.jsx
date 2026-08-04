import Link from "next/link";
import Reveal from "@/components/Reveal";
import { processStages } from "@/lib/data";

export const metadata = {
  title: "Process",
  description: "The Solaris Studios process from idea to launch.",
};

export default function ProcessPage() {
  return (
    <>
      <Reveal as="section" className="page-hero">
        <p className="eyebrow">Process</p>
        <h1>A clear process from idea to launch.</h1>
        <p className="page-lede">
          Six stages. The same team end-to-end. Every decision tied back to who you serve and what they need to feel.
        </p>
      </Reveal>

      <Reveal as="section" className="section process-list">
        <ol className="process-rail">
          {processStages.map((stage, index) => (
            <li key={stage.title} className="process-step">
              <span className="process-step__node" aria-hidden="true">
                <span className="process-step__node-inner">{String(index + 1).padStart(2, "0")}</span>
              </span>
              <div className="process-step__content">
                <header className="process-step__head">
                  <h2>{stage.title}</h2>
                </header>
                <p>{stage.body}</p>
                <ul className="process-step__deliverables" aria-label={`${stage.title} deliverables`}>
                  {stage.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className="section process-cta" aria-label="Start a project with Solaris">
        <div className="home-cta__inner">
          <p className="eyebrow">Next move</p>
          <h2>Ready to start at stage one?</h2>
          <p>Tell us a little about the brand and where you are stuck. We will take it from there.</p>
          <div className="home-cta__actions">
            <Link className="button button--primary" href="/contact">Start a project</Link>
            <Link className="button button--ghost" href="/portfolio">See the work</Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
