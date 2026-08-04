"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MagneticButton({ href, className = "", children, strength = 14, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof window === "undefined") return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    let raf = 0;

    const reset = () => {
      node.style.transform = "";
    };

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / (rect.width / 2);
      const dy = (event.clientY - cy) / (rect.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(reset);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength]);

  return (
    <Link ref={ref} href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
