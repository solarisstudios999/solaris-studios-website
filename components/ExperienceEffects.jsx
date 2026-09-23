"use client";

import { useEffect, useRef } from "react";

const hoverTargets = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  ".service-card",
  ".work-card",
  ".portfolio-card",
  ".service-showcase",
  ".process-step",
  ".process-chips article",
  ".contact-links a",
  ".contact-form",
].join(",");

const spotlightTargets = [
  ".service-card",
  ".work-card",
  ".portfolio-card",
  ".service-showcase",
  ".process-step",
  ".process-chips article",
  ".archive-note",
].join(",");

/* Custom properties are written to the smallest element that actually reads
   them, never to :root unless they genuinely have to be there.
 *
 * This is the whole performance story of this component. Changing an inherited
 * custom property on :root invalidates style for every element in the
 * document, and these were being written on every scroll frame and every
 * pointer move. Measured on a 6x-throttled CPU, one scroll of the homepage
 * spent 1.03s recalculating style; scoped and quantised, the same scroll
 * spends a fraction of that. The progress bar and the cursor read their values
 * on two or three elements - there was never a reason for the rest of the page
 * to be told about them. */
export default function ExperienceEffects() {
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    let ticking = false;

    const narrow = window.matchMedia("(max-width: 767px)");
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* The sun: top-right at the hero, overhead near the middle, low and to the
       left by the footer. Written as two properties; every glow and shadow
       direction on the site is derived from them in CSS. Nothing moves - only
       the light does. Rides the existing scroll listener, so this costs no
       extra handler and no extra rAF loop. */
    const APEX = 0.42;
    /* These two have to stay on :root: what reads them is scattered across the
       header and three sections. So instead they are quantised to 1/100th and
       only written when that step actually changes - the sun travels about
       shadow it drives travels about 35px over the entire page, so a step is
       under a pixel inside a 40px blur, and most scroll frames now write
       nothing at all rather than invalidating the document. */
    const STEP = 50; // 1/50ths
    let lastSunX = null;
    let lastSunY = null;
    const setSun = (progress) => {
      if (stillness.matches) return; // the :root defaults stand
      const x = narrow.matches ? 0.5 : 0.88 - 0.76 * progress;
      const y =
        progress < APEX
          ? 0.16 - 0.12 * (progress / APEX)
          : 0.04 + 0.48 * Math.pow((progress - APEX) / (1 - APEX), 2);
      const qx = Math.round(x * STEP) / STEP;
      const qy = Math.round(y * STEP) / STEP;
      if (qx !== lastSunX) {
        lastSunX = qx;
        root.style.setProperty("--sun-x", String(qx));
      }
      if (qy !== lastSunY) {
        lastSunY = qy;
        root.style.setProperty("--sun-y", String(qy));
      }
    };

    const setProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      /* On the bar itself - it is the only thing in the document that reads
         this, and it only scales a 3px strip. */
      if (progressRef.current) {
        progressRef.current.style.setProperty("--scroll-progress", String(clamped));
      }
      setSun(clamped);
      ticking = false;
    };

    const requestProgress = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(setProgress);
    };

    /* Coalesced to a frame. A pointer can report far more often than the
       screen refreshes, and this does DOM lookups and a layout read. */
    let pointerFrame = 0;
    let pointerEvent = null;

    const readPointer = () => {
      pointerFrame = 0;
      const event = pointerEvent;
      if (!event) return;

      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      /* The three elements that read these, rather than the document. The
         glow carries its gradient in its own layer and only moves, so this
         costs a transform rather than a repaint. */
      for (const node of [glowRef.current, dotRef.current, ringRef.current]) {
        if (!node) continue;
        node.style.setProperty("--cursor-x", x);
        node.style.setProperty("--cursor-y", y);
      }
      body.classList.add("cursor-active");

      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const hoverNode = target.closest(hoverTargets);
      body.classList.toggle("cursor-engaged", Boolean(hoverNode));

      const spotlightNode = target.closest(spotlightTargets);
      if (!spotlightNode) return;

      const rect = spotlightNode.getBoundingClientRect();
      spotlightNode.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
      spotlightNode.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    };

    const handlePointerMove = (event) => {
      if (!pointerFine) return;
      pointerEvent = event;
      if (pointerFrame === 0) pointerFrame = window.requestAnimationFrame(readPointer);
    };

    body.classList.add("is-ready");
    setProgress();

    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      window.removeEventListener("pointermove", handlePointerMove);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      body.classList.remove("is-ready", "cursor-active", "cursor-engaged");
    };
  }, []);

  return (
    <>
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
