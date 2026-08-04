"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "Studio" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 12);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${isHome ? "" : "is-solid"}`}>
      <Link className="brand" href="/" aria-label="Solaris Studios home">
        <span className="brand__mark">
          <Image
            src="/assets/logo/solaris-logo.svg"
            alt=""
            width={42}
            height={42}
            priority
            sizes="42px"
          />
        </span>
        <span className="brand__name">Solaris Studios</span>
      </Link>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href || (item.href === "/" && pathname === "/") ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="site-nav__cta"
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
        >
          Start Project
        </Link>
      </nav>
      <Link className="header-cta" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
        Start Project
      </Link>
    </header>
  );
}
