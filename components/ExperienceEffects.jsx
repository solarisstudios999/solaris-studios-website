"use client";

import { useEffect } from "react";

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

export default function ExperienceEffects() {
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
    const setSun = (progress) => {
      if (stillness.matches) return; // the :root defaults stand
      const x = narrow.matches ? 0.5 : 0.88 - 0.76 * progress;
      const y =
        progress < APEX
          ? 0.16 - 0.12 * (progress / APEX)
          : 0.04 + 0.48 * Math.pow((progress - APEX) / (1 - APEX), 2);
      root.style.setProperty("--sun-x", String(Math.round(x * 1000) / 1000));
      root.style.setProperty("--sun-y", String(Math.round(y * 1000) / 1000));
    };

    const setProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      root.style.setProperty("--scroll-progress", String(clamped));
      setSun(clamped);
      ticking = false;
    };

    const requestProgress = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(setProgress);
    };

    const handlePointerMove = (event) => {
      if (!pointerFine) return;

      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
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

    body.classList.add("is-ready");
    setProgress();

    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      window.removeEventListener("pointermove", handlePointerMove);
      body.classList.remove("is-ready", "cursor-active", "cursor-engaged");
    };
  }, []);

  return (
    <>
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
