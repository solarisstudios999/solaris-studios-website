"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 3 - Process as a sunrise.
 *
 * Six stages read as one day: Discover at sunrise, Improve as it sets. A sun
 * climbs the arc as the section passes the viewport, and each stage lights as
 * the sun reaches it.
 *
 * The sun rides a parabola in CSS - `2t(1-t)` - which is exactly the curve the
 * SVG quadratic `Q 50,0 100,100` traces, so the dot sits on the drawn line at
 * every width without a single hardcoded pixel.
 *
 * The scroll handler only runs while the section is on screen, gated by an
 * IntersectionObserver, and is rAF-coalesced. Under reduced motion the sun
 * parks at noon and every stage is lit - the information survives, the travel
 * does not.
 */
export default function ProcessArc({ stages = [] }) {
  const ref = useRef(null);
  const [arc, setArc] = useState(0.5);
  const [still, setStill] = useState(false);

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

  return (
    <div className="parc" ref={ref} style={{ "--arc": still ? 0.5 : arc }}>
      <div className="parc__sky">
        <svg
          className="parc__path"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,100 Q50,0 100,100" vectorEffect="non-scaling-stroke" />
        </svg>

        {stages.map((stage, index) => {
          const t = index / last;
          return (
            <span
              key={stage.title}
              className="parc__node"
              data-lit={still || arc >= t - 0.02}
              style={{ "--t": t, "--ty": 2 * t * (1 - t) }}
              aria-hidden="true"
            />
          );
        })}

        <span className="parc__sun" aria-hidden="true" />
      </div>

      <ol className="parc__stages">
        {stages.map((stage, index) => {
          const t = index / last;
          return (
            <li
              key={stage.title}
              className="parc__stage"
              data-lit={still || arc >= t - 0.02}
            >
              <span className="parc__num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="parc__title">{stage.title}</h3>
              <p className="parc__body">{stage.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
