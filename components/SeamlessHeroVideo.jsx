"use client";

import { useEffect, useRef, useState } from "react";

export default function SeamlessHeroVideo({ src, poster }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return undefined;

    const handleCanPlay = () => setLoaded(true);
    node.addEventListener("canplay", handleCanPlay, { once: true });

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting) {
            const playPromise = node.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => {});
            }
          } else {
            node.pause();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(node);

      return () => {
        node.removeEventListener("canplay", handleCanPlay);
        observer.disconnect();
      };
    }

    const playPromise = node.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }

    return () => {
      node.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <div className="hero__video-stack" aria-hidden="true">
      <div
        className={`hero__video-fallback ${loaded ? "is-hidden" : ""}`}
        style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      />
      <video
        ref={videoRef}
        className={`hero__video ${loaded ? "is-active" : ""}`}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
