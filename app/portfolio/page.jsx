import Link from "next/link";
import Reveal from "@/components/Reveal";

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

      <Reveal as="section" className="archive-note">
        <p className="eyebrow">Coming soon</p>
        <h2>Coming Soon!!</h2>
        <p>
          Brand systems, websites, and content launches are in production right now — and they land
          on this page in the coming weeks. If you want yours to be next, the door is open.
        </p>
        <Link className="button button--primary" href="/contact">Start a project</Link>
      </Reveal>
    </>
  );
}
