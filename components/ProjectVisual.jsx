function WebsiteVisual({ project, slug }) {
  return (
    <span className={`project-visual project-visual--website project-visual--${slug}`} aria-hidden="true">
      <span className="project-visual__browser-bar">
        <span className="project-visual__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="project-visual__domain">{project.domain}</span>
        <span className="project-visual__browser-icon" />
      </span>
      <span className="project-visual__screen">
        <span className="project-visual__brand">
          <span className="project-visual__brand-mark" />
          <span className="project-visual__brand-name">{project.title}</span>
          <span className="project-visual__brand-cta" />
        </span>
        <span className="project-visual__hero-line" />
        <span className="project-visual__hero-line project-visual__hero-line--two" />
        <span className="project-visual__copy-line" />
        <span className="project-visual__copy-line project-visual__copy-line--short" />
        <span className="project-visual__buttons">
          <span className="project-visual__button project-visual__button--primary" />
          <span className="project-visual__button" />
        </span>
        <span className="project-visual__feature">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="project-visual__shine" aria-hidden="true" />
      </span>
    </span>
  );
}

function CatalogVisual({ project }) {
  return (
    <span className="project-visual project-visual--catalog" aria-hidden="true">
      <span className="project-visual__catalog-stage">
        <span className="project-visual__catalog-shadow" />
        <span className="project-visual__spread">
          <span className="project-visual__page project-visual__page--left">
            <span className="project-visual__page-eyebrow">{project.title}</span>
            <span className="project-visual__page-title">
              <span>Product</span>
              <span>Catalog</span>
              <span className="project-visual__page-edition">2026</span>
            </span>
            <span className="project-visual__page-hero" />
            <span className="project-visual__page-footer">
              <span />
              <span />
            </span>
          </span>
          <span className="project-visual__page project-visual__page--right">
            <span className="project-visual__page-grid">
              <span className="project-visual__product project-visual__product--1" />
              <span className="project-visual__product project-visual__product--2" />
              <span className="project-visual__product project-visual__product--3" />
              <span className="project-visual__product project-visual__product--4" />
            </span>
            <span className="project-visual__page-caption">
              <span />
              <span />
              <span />
            </span>
          </span>
        </span>
      </span>
      <span className="project-visual__swatches" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    </span>
  );
}

function SocialVisual({ project }) {
  return (
    <span className="project-visual project-visual--social" aria-hidden="true">
      <span className="project-visual__phone">
        <span className="project-visual__notch" />
        <span className="project-visual__social-head">
          <span className="project-visual__social-avatar" />
          <span className="project-visual__social-handle">
            <span>{project.title.toLowerCase().replace(/\s+/g, "_")}</span>
            <span className="project-visual__social-sub">Bangalore · Auto</span>
          </span>
          <span className="project-visual__social-cta" />
        </span>
        <span className="project-visual__social-grid">
          {Array.from({ length: 9 }).map((_, itemIndex) => (
            <span className={`project-visual__post project-visual__post--${itemIndex + 1}`} key={itemIndex} />
          ))}
        </span>
        <span className="project-visual__social-bar">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      </span>
      <span className="project-visual__schedule" aria-hidden="true">
        <span className="project-visual__schedule-row">
          <span className="project-visual__schedule-dot" />
          <span />
        </span>
        <span className="project-visual__schedule-row">
          <span className="project-visual__schedule-dot project-visual__schedule-dot--red" />
          <span />
        </span>
        <span className="project-visual__schedule-row">
          <span className="project-visual__schedule-dot" />
          <span />
        </span>
      </span>
    </span>
  );
}

const slugMap = {
  "Arpitha Abhishek": "arpitha",
  "Earthiva": "earthiva",
  "S S Motors": "ss-motors",
  "Kishan Plastic Industries": "kishan",
};

export default function ProjectVisual({ project }) {
  const slug = slugMap[project.title] || "default";

  if (project.visual === "social") {
    return <SocialVisual project={project} />;
  }

  if (project.visual === "catalog") {
    return <CatalogVisual project={project} />;
  }

  return <WebsiteVisual project={project} slug={slug} />;
}
