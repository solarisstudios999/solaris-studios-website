"use client";

import { useEffect, useState } from "react";

/**
 * 6 - The studio knows what time it is.
 *
 * Shows the time in Bangalore, and sets a `data-daypart` attribute on <html>
 * that shifts the accent hue with the studio's own clock - rose at dawn, clear
 * red at midday, amber at dusk, ember at night. Studio time, not the visitor's,
 * so everyone sees the same thing at the same moment.
 *
 * Nothing announces it. Observant visitors find it.
 *
 * Every accent pair was measured before use: the accent clears 4.5:1 as text on
 * black, and the button surface clears 4.5:1 under white, at all four times of
 * day. One candidate dusk colour failed at 4.26:1 and was replaced.
 *
 * Renders nothing until mounted, so the server and client markup agree - a
 * clock rendered on the server is wrong by definition.
 */
function daypartFor(hour) {
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

export default function StudioClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const read = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(now);
      const get = (type) => parts.find((part) => part.type === type)?.value ?? "00";
      const hour = Number(get("hour"));
      setTime(`${get("hour")}:${get("minute")}`);
      document.documentElement.dataset.daypart = daypartFor(hour);
    };

    read();
    const id = window.setInterval(read, 30000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="studio-clock">
      <span className="studio-clock__dot" aria-hidden="true" />
      Bangalore {time} IST
    </span>
  );
}
