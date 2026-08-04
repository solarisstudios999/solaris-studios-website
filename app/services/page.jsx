import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export const metadata = {
  title: "Services",
  description: "Practical services for growing brands by Solaris Studios.",
};

export default function ServicesPage() {
  return (
    <>
      <Reveal as="section" className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>Five disciplines, one connected practice.</h1>
        <p className="page-lede">
          Pick a single focus or bring us in across the full brand, website, content, and search experience.
          Either way, the same team carries the work from first call to launch.
        </p>
      </Reveal>

      <Reveal as="section" className="section service-detail">
        {services.map((service, index) => (
          <article className="service-showcase" id={service.slug} key={service.title}>
            <div className="service-showcase__head">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{service.title}</h2>
            </div>
            <div className="service-showcase__body">
              <p>{service.body}</p>
              <div className="tag-list" aria-label={`${service.title} deliverables`}>
                {service.deliverables.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </>
  );
}
