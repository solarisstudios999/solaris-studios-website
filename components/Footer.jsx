"use client";

import ContactLine from "@/components/ContactLine";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studio } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href="/">
          Solaris Studios
        </Link>
        <p>Brands / Web / Content Systems</p>
      </div>
      <address>
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
      </address>
    </footer>
  );
}
