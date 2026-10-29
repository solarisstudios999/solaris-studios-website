import Link from "next/link";
import Reveal from "@/components/Reveal";
import CaseStudy from "@/components/CaseStudy";
import { clients, projects } from "@/lib/data";

export const metadata = {
  title: "Work",
  description: "Recent launches by Solaris Studios - brand, web, and content systems shaped to fit together.",
};

export default function PortfolioPage() {
  /* "Also shipped" is whatever is left after the case studies, worked out
     rather than listed. It used to exclude Aarna by name, which meant
     promoting a client to a full case study silently left them in both
     places - which is exactly what happened the day Earthiva got one. */
  const studied = new Set(projects.map((project) => project.slug));
  const alsoShipped = clients.filter(
    (client) => client.work && !studied.has(client.slug)
  );

  return (
    <>
      <Reveal as="section" className="page-hero">
        <p className="eyebrow">Work</p>
        <h1>Creative systems built to hold attention.</h1>
        <p className="page-lede">
          A selection of recent launches. Brand, web, and content pieces shaped to fit together.
        </p>
      </Reveal>

      {projects.length > 0 ? (
        <>
          <Reveal as="section" className="section">
            {projects.map((project, index) => (
              <CaseStudy key={project.slug} project={project} priority={index === 0} />
            ))}
          </Reveal>

          {/* The logos under the hero were four marks and no story. This says
              what each engagement actually was, so none of them is a name we
              are borrowing. Written from what the studio did, not dressed up:
              a product catalogue is a product catalogue. */}
          <Reveal as="section" className="section also-shipped" aria-labelledby="also-title">
            <div className="section__head">
              <p className="eyebrow">Also shipped</p>
              <h2 id="also-title">The rest of the work.</h2>
            </div>
            <dl className="also-shipped__list">
              {alsoShipped
                .map((client) => (
                  <div className="also-shipped__row" key={client.slug}>
                    <dt>{client.name}</dt>
                    <dd>
                      {client.work}
                      <span className="also-shipped__where">{client.where}</span>
                    </dd>
                  </div>
                ))}
            </dl>
          </Reveal>
        </>
      ) : (
        <Reveal as="section" className="archive-note">
          <p className="eyebrow">Coming soon</p>
          <h2>Coming Soon!!</h2>
          <p>
            Brand systems, websites, and content launches are in production right now - and they land
            on this page in the coming weeks. If you want yours to be next, the door is open.
          </p>
          <Link className="button button--primary" href="/contact">Start a project</Link>
        </Reveal>
      )}
    </>
  );
}
