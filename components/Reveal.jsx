"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0,
  stagger = false,
  threshold = 0.12,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            window.setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const composed = [className, visible ? "is-visible" : "", stagger ? "is-stagger" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} data-reveal className={composed} {...props}>
      {children}
    </Tag>
  );
}
