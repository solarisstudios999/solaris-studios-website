"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * One launch, presented as a browser frame you can step through.
 *
 * This is the single treatment for every project - pass any entry from
 * `projects` in lib/data.js and it renders the same way. Adding the next
 * client means adding data, not building a new section.
 *
 * The switcher is a real tablist: arrow keys move between shots, the URL bar
 * changes with the screen, and the frame is the tabpanel.
 *
 * It advances on its own every 4s so the panel is alive on arrival, and stops
 * permanently the moment someone touches it - it should never fight the
 * visitor for control. Under prefers-reduced-motion it never auto-advances.
 */
export default function CaseStudy({ project, priority = false }) {
  const shots = project.shots || [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);
  const tabRefs = useRef([]);

  /* Only run the rotation while the panel is actually on screen. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry && entry.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || shots.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % shots.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, inView, shots.length]);

  /* Any deliberate interaction hands control over for good. */
  const choose = useCallback((index) => {
    setPaused(true);
    setActive(index);
  }, []);

  const onKeyDown = (event) => {
    const last = shots.length - 1;
    let next = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    tabRefs.current[next]?.focus();
  };

  const current = shots[active] || null;
  const panelId = `case-${project.slug}-panel`;

  return (
    <article className="case" ref={rootRef}>
      <div className="case__frame-col">
        <div
          className="case__frame"
          role="tabpanel"
          id={panelId}
          aria-labelledby={`case-${project.slug}-tab-${active}`}
        >
          <div className="case__bar" aria-hidden="true">
            <span className="case__dots">
              <span />
              <span />
              <span />
            </span>
            <span className="case__url">{current ? current.path : project.domain}</span>
          </div>

          <div className="case__screen">
            {shots.map((shot, index) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1080px) 660px, (min-width: 640px) 92vw, 100vw"
                quality={82}
                priority={priority && index === 0}
                data-active={index === active}
              />
            ))}
          </div>
        </div>

        {shots.length > 1 ? (
          <div
            className="case__tabs"
            role="tablist"
            aria-label={`${project.title} screens`}
            onKeyDown={onKeyDown}
          >
            {shots.map((shot, index) => (
              <button
                key={shot.label}
                type="button"
                role="tab"
                id={`case-${project.slug}-tab-${index}`}
                aria-selected={index === active}
                aria-controls={panelId}
                tabIndex={index === active ? 0 : -1}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                className="case__tab"
                onClick={() => choose(index)}
              >
                {shot.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="case__body">
        <p className="eyebrow">
          {project.title} - {project.status}
        </p>
        <h3 className="case__title">{project.tagline}</h3>

        <dl className="case__lines">
          {project.lines.map((line) => (
            <div className="case__line" key={line.term}>
              <dt>{line.term}</dt>
              <dd>{line.detail}</dd>
            </div>
          ))}
        </dl>

        {project.meta ? (
          <dl className="case__meta">
            {project.meta.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="case__actions">
          <a
            className="button button--primary"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            Visit the live store →
          </a>
          <Link className="text-link" href="/process">
            See how we work →
          </Link>
        </div>
      </div>
    </article>
  );
}
