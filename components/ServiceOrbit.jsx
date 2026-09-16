"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/**
 * 2 - Services as a solar system.
 *
 * The sun sits on the left edge and the five disciplines fan out from it along
 * their orbits, closest first. Selecting one throws a shaft of light out to it
 * and opens it below, with what you actually get.
 *
 * The sun is at the edge rather than the middle for a plain reason: five labels
 * long enough to read need somewhere to go. Centred, the inner ones sit on top
 * of the sun and the outer ones run off the frame. Anchored left, every label
 * has the whole width to extend into and collisions become impossible to have
 * by accident. It also matches how light works everywhere else on this site -
 * one source, off to one side, and everything lit from it.
 *
 * Two deliberate restraints, because this is the idea most likely to tip into
 * gimmick:
 *
 * 1. The bodies do not orbit. They sit at fixed points on the rings. A moving
 *    click target is hostile, and nothing here would be easier to use for
 *    turning. Nothing here loops, either: the shaft of light simply arrives
 *    when you pick a discipline and then holds still. A connector that keeps
 *    crawling reads as a loading state, which is the opposite of what it
 *    means here.
 * 2. It is a real tablist - arrow keys, Home/End, roving tabindex - and below
 *    1000px the diagram vanishes and the same buttons reflow into an ordinary
 *    row of pills. Nothing about the content depends on the diagram.
 *
 * Geometry: every number below is read as a percentage of the stage - of its
 * width horizontally, of its height vertically. So a ring of radius r is just a
 * box 2r% by 2r% with a 50% border radius, and a body at (cx + r·cos, cy +
 * r·sin) lands exactly on it. The stage is wider than it is tall, so that one
 * convention also tilts the rings for free, with no squash constant to keep in
 * sync between the CSS and the JavaScript.
 *
 * The rings are CSS ellipses rather than SVG arcs: a bordered box needs no SVG
 * at all, and the stage clips it, which is what turns each ring into the arc we
 * actually want. The one thing that does need SVG is the shaft, because it has
 * to reach an arbitrary point at an arbitrary angle.
 */

/* Radii and angles measured from the sun. Chosen so no two labels can overlap
   (a label is about 22% of the stage wide and 10% tall, so any pair clears on
   one axis or the other) and so the innermost clears the sun's disc. */
/* Node and V8 serialise the tail of a float differently, and React fails
   hydration on the mismatch. Three places is far finer than a pixel. */
const round = (n) => Number(n.toFixed(3));

const SUN = { x: 8, y: 50 };

/* The light the sun throws at whichever discipline is open.

   A hard-edged wedge was the obvious shape and it looked like a paper cutout:
   light has no outline. So this is a soft blob instead - an ellipse lying along
   the line to the body, filled with a radial gradient that is hot where it
   leaves the sun and gone by the time it arrives. The ellipse is built lying
   flat and then rotated about the sun, which keeps the maths to one axis. */
const GLOW_GAP = 2;
const GLOW_WIDTH = 5.5;

function glow(place) {
  const length = Math.max(8, place.r - GLOW_GAP);
  return {
    cx: round(SUN.x + length / 2),
    cy: SUN.y,
    rx: round(length / 2),
    ry: GLOW_WIDTH,
    /* Rotated about the sun, so the blob swings to point at whichever body is
       open without its near end ever leaving the star. */
    rotate: `rotate(${round(place.a)} ${SUN.x} ${SUN.y})`,
  };
}

const PLACES = [
  { r: 26, a: -48 },
  { r: 32, a: 46 },
  { r: 44, a: 4 },
  { r: 56, a: 42 },
  { r: 70, a: -22 },
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

  const at = (index) => {
    const place = PLACES[index] || PLACES[PLACES.length - 1];
    const rad = (place.a * Math.PI) / 180;
    return {
      place,
      x: round(SUN.x + place.r * Math.cos(rad)),
      y: round(SUN.y + place.r * Math.sin(rad)),
    };
  };

  const current = services[active];
  const lit = glow(at(active).place);

  return (
    <div className="orbit">
      <div
        className="orbit__stage"
        role="tablist"
        aria-label="Core disciplines"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        {services.map((service, index) => (
          <span
            key={service.slug}
            className="orbit__ring"
            data-lit={index === active}
            style={{ "--r": at(index).place.r }}
            aria-hidden="true"
          />
        ))}

        {/* The shaft of light the sun throws at whichever discipline is open. */}
        <svg
          className="orbit__map"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Centred on the near end, so the falloff runs outward from the
                sun rather than from the middle of the blob. */}
            <radialGradient id="orbit-ray" cx="0" cy="0.5" r="1">
              {/* Coloured from CSS, not from stopColor: a presentation
                  attribute cannot resolve var(), and the accent changes with
                  the time of day. */}
              <stop className="orbit__ray-near" offset="0" />
              <stop className="orbit__ray-mid" offset="0.55" />
              <stop className="orbit__ray-far" offset="1" />
            </radialGradient>
          </defs>
          {/* Two elements, not one: the CSS `transform` property overrides the
              SVG `transform` attribute outright, so animating the ellipse would
              wipe its own rotation and leave the light pointing flat right at
              whatever you picked. The group takes the animation, the ellipse
              keeps the aim. Keyed on the discipline so the arrival replays. */}
          <g key={current.slug} className="orbit__ray">
            <ellipse
              cx={lit.cx}
              cy={lit.cy}
              rx={lit.rx}
              ry={lit.ry}
              transform={lit.rotate}
              fill="url(#orbit-ray)"
            />
          </g>
        </svg>

        <span className="orbit__sun" aria-hidden="true" />

        {services.map((service, index) => {
          const { x, y } = at(index);
          return (
            <button
              key={service.slug}
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
              onClick={() => setActive(index)}
            >
              <span className="orbit__dot" aria-hidden="true">
                {index + 1}
              </span>
              <span className="orbit__name">{service.title}</span>
            </button>
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
        <ul className="orbit__gives">
          {current.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link className="text-link" href={`/services#${current.slug}`}>
          Explore {current.title} →
        </Link>
      </div>
    </div>
  );
}
