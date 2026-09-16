"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/**
 * 2 - Services as a solar system.
 *
 * Five disciplines as bodies around the sun, closest first. Selecting one shows
 * it below.
 *
 * Two deliberate restraints, because this is the idea most likely to tip into
 * gimmick:
 *
 * 1. The bodies do not orbit. They sit at fixed points on the rings. A moving
 *    click target is hostile, and the arrangement carries the idea without the
 *    motion.
 * 2. It is a real tablist - arrow keys, Home/End, roving tabindex - and on
 *    narrow screens the same buttons reflow into an ordinary row of pills with
 *    the rings hidden. Nothing about the content depends on the diagram.
 */
/* Angles chosen so every label's centre stays within a safe horizontal band.
   The widest pill is about 29% of the stage, so an anchor past ~72% would run
   the label off the edge - which is exactly what an outer body at 18 degrees
   did. Radius still varies, so the rings read as a system; only the angle is
   constrained. */
const PLACES = [
  { r: 20, a: 200 },
  { r: 31, a: 310 },
  { r: 27, a: 60 },
  { r: 38, a: 240 },
  { r: 44, a: 95 },
];

export default function ServiceOrbit({ services = [] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  const onKeyDown = (event) => {
    const last = services.length - 1;
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const current = services[active];

  return (
    <div className="orbit">
      <div
        className="orbit__stage"
        role="tablist"
        aria-label="Core disciplines"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        <span className="orbit__sun" aria-hidden="true" />

        {services.map((service, index) => {
          const place = PLACES[index] || PLACES[PLACES.length - 1];
          const rad = (place.a * Math.PI) / 180;
          const x = 50 + place.r * Math.cos(rad);
          // squashed vertically so the rings read as tilted, not flat circles
          const y = 50 + place.r * 0.62 * Math.sin(rad);
          return (
            <span key={service.slug} className="orbit__slot">
              <span
                className="orbit__ring"
                style={{ "--r": `${place.r}%` }}
                aria-hidden="true"
              />
              <button
                type="button"
                role="tab"
                id={`orbit-tab-${service.slug}`}
                aria-selected={index === active}
                aria-controls="orbit-panel"
                tabIndex={index === active ? 0 : -1}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                className="orbit__body"
                style={{ "--x": `${x}%`, "--y": `${y}%` }}
                data-near={y > 50}
                onClick={() => setActive(index)}
              >
                <span className="orbit__dot" aria-hidden="true" />
                <span className="orbit__name">{service.title}</span>
              </button>
            </span>
          );
        })}
      </div>

      <div
        className="orbit__panel"
        role="tabpanel"
        id="orbit-panel"
        aria-labelledby={`orbit-tab-${current.slug}`}
      >
        <p className="orbit__index">
          {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
        </p>
        <h3 className="orbit__title">{current.title}</h3>
        <p className="orbit__body-copy">{current.body}</p>
        <Link className="text-link" href={`/services#${current.slug}`}>
          Explore {current.title} →
        </Link>
      </div>
    </div>
  );
}
