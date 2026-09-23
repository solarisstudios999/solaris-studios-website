"use client";

import { useEffect, useRef, useState } from "react";

/* The arc lives in a band inset from both ends, because at t=0 and t=1 a sun
   sitting flush with the edge is half outside the page. These two numbers are
   the source of truth: the curve below is built from them, and they are handed
   to the CSS so the sun and the markers travel the same band. */
const PAD = 7;
const BAND = 86;

/* A quadratic whose control point is midway between the ends has x(t) linear in
   t, so x = PAD + BAND·t exactly - which is what lets the sun ride the curve
   with nothing but `left` and `bottom`. */
const CURVE = `M${PAD},100 Q${PAD + BAND / 2},0 ${PAD + BAND},100`;

/* Node and V8 serialise the tail of a float differently and React fails
   hydration on the mismatch. */
const round = (n) => Number(n.toFixed(3));

/**
 * 3 - Process as a day you can scrub.
 *
 * Six stages read as one day: Discover at sunrise, Improve as it sets. A sun
 * climbs the arc as the section passes the viewport, drawing its own trail
 * behind it, and the stage under the sun opens below.
 *
 * The sun rides a parabola in CSS - `2t(1-t)` - which is exactly the curve the
 * SVG quadratic `Q 50,0 100,100` traces, so the dot sits on the drawn line at
 * every width without a single hardcoded pixel. The trail is the same path
 * again, clipped at the x the sun has reached - which is exactly the stretch
 * it has covered, since x is linear in t on this curve. No second geometry to
 * keep in sync.
 *
 * Two things drive it, and only one at a time:
 *
 *   - Scrolling moves the sun, and the open stage follows whichever node the
 *     sun is nearest. The process plays out as you read it.
 *   - Touching the scale hands control over for good. The sun eases to the
 *     stage you picked and parks there. It should never fight you for the
 *     position afterwards.
 *
 * `--noon` (0 at the horizon, 1 overhead) drives the sky: the low sun swells
 * and reddens, the bloom under it fades as it sets. One number, derived from
 * the position, doing the work of a keyframe timeline.
 *
 * The scale is a real tablist with roving tabindex and arrow keys; the panels
 * are stacked in one grid cell so switching stage cannot jolt the page. Under
 * prefers-reduced-motion nothing is driven by scroll at all: the day opens on
 * its first stage and moves only when someone moves it. The interaction
 * survives in full; only the travel goes.
 */
export default function ProcessArc({ stages = [] }) {
  const ref = useRef(null);
  const tabs = useRef([]);
  const [arc, setArc] = useState(0);
  const [still, setStill] = useState(false);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setStill(true);
      return undefined;
    }

    let frame = 0;
    let active = false;

    const read = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const span = rect.height + window.innerHeight;
      const travelled = window.innerHeight - rect.top;
      setArc(Math.min(1, Math.max(0, travelled / span)));
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read);
    };

    const io = new IntersectionObserver(([entry]) => {
      const visible = Boolean(entry && entry.isIntersecting);
      if (visible === active) return;
      active = visible;
      if (visible) {
        window.addEventListener("scroll", onScroll, { passive: true });
        read();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });

    io.observe(node);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const last = Math.max(stages.length - 1, 1);

  /* Which stage is open: the one you chose, or whichever the sun is nearest.
     Under reduced motion there is no scroll position to read, so it opens on
     the first stage and moves only when asked. */
  const nearest = Math.min(last, Math.max(0, Math.round(arc * last)));
  const active = picked !== null ? picked : still ? 0 : nearest;
  /* Where the sun is. Once the day is being driven by hand - by a pick, or by
     reduced motion - it sits on the open stage rather than on the scroll. */
  const driven = picked !== null || still;
  const sun = driven ? active / last : arc;
  /* 0 on the horizon, 1 directly overhead. The parabola peaks at 0.5. */
  const noon = 4 * sun * (1 - sun);

  const choose = (index, focus = false) => {
    setPicked(index);
    if (!focus) return;
    const node = tabs.current[index];
    if (!node) return;
    node.focus();
    /* block:"nearest" so nudging the scale sideways never scrolls the page. */
    node.scrollIntoView({ block: "nearest", inline: "center" });
  };

  const onKeyDown = (event) => {
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    choose(next, true);
  };

  return (
    <div
      className="parc"
      ref={ref}
      data-parked={driven}
      style={{ "--arc": sun, "--noon": noon, "--pad": PAD, "--band": BAND }}
    >
      <div className="parc__sky">
        <svg
          className="parc__path"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="parc__track" d={CURVE} vectorEffect="non-scaling-stroke" />
          {/* The same curve, revealed to exactly where the sun has reached. */}
          {/* Revealed by a clip, not by a dash. Dashes were the obvious way and
              they are not portable here: the stroke is non-scaling, and WebKit
              measures dash lengths for a non-scaling stroke in device pixels
              rather than user units, so the pattern repeated along the curve
              and the trail rendered as broken segments in Safari. A clip has
              no such ambiguity. It is exact rather than an approximation,
              because the control point sits midway between the ends, which
              makes x linear in t - so clipping at x is clipping at t. */}
          <clipPath id="parc-reveal">
            <rect x="0" y="0" height="100" width={round(PAD + BAND * sun)} />
          </clipPath>
          <path className="parc__trail" d={CURVE} clipPath="url(#parc-reveal)" vectorEffect="non-scaling-stroke" />
        </svg>

        {stages.map((stage, index) => {
          const t = index / last;
          return (
            <span
              key={stage.title}
              className="parc__pip"
              data-lit={sun >= t - 0.02}
              data-open={index === active}
              style={{ "--t": t, "--ty": 2 * t * (1 - t) }}
              aria-hidden="true"
            />
          );
        })}

        <span className="parc__sun" aria-hidden="true" />
        <span className="parc__horizon" aria-hidden="true" />
      </div>

      <div
        className="parc__scale"
        role="tablist"
        aria-label="Process stages"
        onKeyDown={onKeyDown}
      >
        {stages.map((stage, index) => {
          const t = index / last;
          return (
            <button
              key={stage.title}
              type="button"
              role="tab"
              id={`parc-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`parc-panel-${index}`}
              tabIndex={index === active ? 0 : -1}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              className="parc__tab"
              data-lit={sun >= t - 0.02}
              onClick={() => choose(index)}
            >
              <span className="parc__tick" aria-hidden="true" />
              <span className="parc__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="parc__name">{stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* All six stacked in one grid cell, so the section never changes height
          when you switch. */}
      <div className="parc__deck">
        {stages.map((stage, index) => (
          <div
            key={stage.title}
            className="parc__panel"
            role="tabpanel"
            id={`parc-panel-${index}`}
            aria-labelledby={`parc-tab-${index}`}
            data-open={index === active}
          >
            <p className="parc__meta">
              <span className="parc__stage-num">
                Stage {String(index + 1).padStart(2, "0")}
              </span>
              <span className="parc__dur">{stage.duration}</span>
            </p>
            <h3 className="parc__title">{stage.title}</h3>
            <p className="parc__body">{stage.body}</p>
            <ul className="parc__gives">
              {stage.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
