import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Work",
  description: "Recent launches by Solaris Studios — brand, web, and content systems shaped to fit together.",
};

export default function PortfolioPage() {
  return (
    <>
      <Reveal as="section" className="page-hero">
        <p className="eyebrow">Work</p>
        <h1>Creative systems built to hold attention.</h1>
        <p className="page-lede">
          A selection of recent launches. Brand, web, and content pieces shaped to fit together.
        </p>
      </Reveal>

      <Reveal as="section" className="section portfolio-grid">
        {projects.map((project, index) => {
          const Card = project.url ? "a" : "article";

          return (
            <Card
              className={`portfolio-card ${index === 0 ? "portfolio-card--feature" : ""}`}
              href={project.url}
              target={project.url ? "_blank" : undefined}
              rel={project.url ? "noreferrer" : undefined}
              key={`${project.title}-${index}`}
            >
              <ProjectVisual project={project} index={index} />
              <p className="eyebrow">{project.category}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tag-list" aria-label={`${project.title} scope`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.url ? <span className="portfolio-card__link">Visit project →</span> : null}
            </Card>
          );
        })}
      </Reveal>

      <Reveal as="section" className="archive-note">
        <p className="eyebrow">Coming soon</p>
        <h2>More work is on the way.</h2>
        <p>
          Brand systems, websites, and content launches are in production right now — and they land
          on this page in the coming weeks. If you want yours to be next, the door is open.
        </p>
        <Link className="button button--primary" href="/contact">Start a project</Link>
      </Reveal>
    </>
  );
}
