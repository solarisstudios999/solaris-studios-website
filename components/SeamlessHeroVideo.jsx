"use client";

import { useEffect, useRef, useState } from "react";

export default function SeamlessHeroVideo({ src, poster }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return undefined;

    const handleCanPlay = () => setLoaded(true);

    /* The event may already have fired. This is a client component, so the
       browser starts fetching the video while React is still hydrating, and on
       anything but a slow connection `canplay` lands before this effect gets
       to listen for it - the listener then never runs, `loaded` stays false,
       and the video sits at opacity 0 behind the poster forever. Which is what
       it did: the hero was a still image on every device.

       readyState is the state the event announces, so asking for it directly
       covers the case where the announcement has been and gone. */
    if (node.readyState >= 2) {
      setLoaded(true);
    } else {
      node.addEventListener("canplay", handleCanPlay, { once: true });
      /* Belt and braces: canplay can be skipped when a decoded frame is
         already available. */
      node.addEventListener("loadeddata", handleCanPlay, { once: true });
    }

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
        node.removeEventListener("loadeddata", handleCanPlay);
        observer.disconnect();
      };
    }

    const playPromise = node.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }

    return () => {
      node.removeEventListener("canplay", handleCanPlay);
      node.removeEventListener("loadeddata", handleCanPlay);
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
