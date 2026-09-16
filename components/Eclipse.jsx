"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 4 - The eclipse CTA.
 *
 * A disc crosses the sun as the panel passes the viewport; the corona flares at
 * totality. Purely a backdrop - the headline and buttons are plain markup that
 * never depend on this, so if the JavaScript fails the call to action is still
 * fully there. Gating copy on scroll would be trading conversion for theatre.
 *
 * Same gated, rAF-coalesced scroll pattern as the process arc: the listener
 * only exists while the panel is on screen. Under reduced motion it holds at
 * totality instead of animating.
 */
export default function Eclipse() {
  const ref = useRef(null);
  const [t, setT] = useState(0.5);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    let active = false;

    const read = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const span = rect.height + window.innerHeight;
      setT(Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span)));
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

  // 1 at totality, 0 at either edge
  const totality = 1 - Math.min(1, Math.abs(t - 0.5) * 2.6);

  return (
    <div
      className="eclipse"
      ref={ref}
      style={{ "--t": t, "--totality": totality }}
      aria-hidden="true"
    >
      <span className="eclipse__corona" />
      <span className="eclipse__sun" />
      <span className="eclipse__moon" />
    </div>
  );
}
