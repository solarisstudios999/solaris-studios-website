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

      {/* Outlined sign-off, borrowed from the studio's own reference. Purely
          decorative, so it is hidden from assistive tech and unselectable. */}
      <p className="footer-ghost" aria-hidden="true">
        Solar
        <span className="footer-ghost__i">
          <span className="footer-ghost__sol">
            <span className="footer-ghost__sun" />
            <span className="footer-ghost__orbit footer-ghost__orbit--1">
              <span className="footer-ghost__ring" />
              <span className="footer-ghost__spin"><span className="footer-ghost__ast"><i /></span></span>
            </span>
            <span className="footer-ghost__orbit footer-ghost__orbit--2">
              <span className="footer-ghost__ring" />
              <span className="footer-ghost__spin"><span className="footer-ghost__ast"><i /></span></span>
            </span>
            <span className="footer-ghost__orbit footer-ghost__orbit--3">
              <span className="footer-ghost__ring" />
              <span className="footer-ghost__spin"><span className="footer-ghost__ast"><i /></span></span>
            </span>
          </span>
          {/* dotless i - the sun above stands in for the tittle */}
          &#305;
        </span>
        s
      </p>

      <p className="footer-fine">
        <span>© {new Date().getFullYear()} Solaris Studios</span>
        <span>Brand, web and content, {studio.location}</span>
      </p>
    </footer>
  );
}
