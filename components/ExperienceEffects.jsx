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

    const setProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, progress))));
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
