import ContactLine from "@/components/ContactLine";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { studio } from "@/lib/data";

export const metadata = {
  title: "Start Project",
  description: "Start a project with Solaris Studios.",
};

export default function ContactPage() {
  return (
    <Reveal as="section" className="contact-screen">
      <div className="contact-screen__intro">
        <p className="eyebrow">Contact</p>
        <h1>Tell us what you are building.</h1>
        <p>
          Share the idea, the challenge, or the next move. Press send and we will continue the conversation on WhatsApp.
        </p>
      </div>

      <div className="contact-screen__form">
        <ContactForm />
      </div>

      <div className="contact-screen__direct contact-links contact-links--compact">
        <p className="contact-kicker">Direct lines</p>
        <ContactLine icon="location">{studio.location}</ContactLine>
        <ContactLine as="a" icon="email" href={`mailto:${studio.email}`}>
          {studio.email}
        </ContactLine>
        <ContactLine as="a" icon="instagram" href={studio.instagramUrl} target="_blank" rel="noreferrer">
          {studio.instagram}
        </ContactLine>
        <ContactLine as="a" icon="whatsapp" href={studio.whatsappHref} target="_blank" rel="noreferrer">
          {studio.phone}
        </ContactLine>
      </div>
    </Reveal>
  );
}
