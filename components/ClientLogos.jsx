"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The clients, in the slot the marquee used to occupy and the proof bar took
 * over from it.
 *
 * Adding a client is adding a row to `clients` in lib/data.js and dropping the
 * file in /public/assets/clients. Nothing here changes, which is the same deal
 * the case study makes.
 *
 * Every logo is flattened to a translucent white silhouette in CSS, so a row of
 * marks from different brands reads as one band rather than a colour clash, and
 * no logo needs to know what colour the page is. It also means the source file's
 * colour is irrelevant - only its shape and its transparency matter.
 *
 * A client whose mark carries no wordmark of its own can set `showName`, and the
 * name is set in type beside it. That is our typesetting, not their lockup, so
 * it is real text rather than baked into their artwork.
 *
 * Logos keep their own proportions and are never stretched to a common box:
 * every one of these is somebody's trademark and squashing it to tidy up a row
 * is not ours to do.
 *
 * They are not matched on height either, which is the obvious thing and the
 * wrong one. A wide lockup with its name in it and a square mark on its own,
 * set to the same height, do not look the same size - the square one occupies a
 * quarter of the width and reads as an afterthought. So a logo shorter than the
 * reference gets some height back, by the square root of how far off it is and
 * capped, which lands between matching height (too small) and matching area
 * (grotesquely large). Real logo walls do the same thing by hand.
 *
 * ---- when the row does not fit ----
 *
 * The row is one line that never wraps. While it fits, it sits centred and
 * still. When it does not - a narrow phone, or enough clients - it becomes a
 * marquee instead of stacking into rows.
 *
 * Three things make that seamless rather than the usual janky loop:
 *
 *   1. The track holds two identical copies and translates by exactly -50%.
 *      Each copy carries its own trailing gap as padding, so half the track is
 *      precisely one copy plus one gap and the wrap point is invisible. A gap
 *      on the track instead would make half the track one copy plus half a gap,
 *      and the row would jolt every lap.
 *   2. The second copy is decorative: its links are rendered as plain spans, so
 *      nothing inside an aria-hidden subtree can take focus.
 *   3. It only turns on when the content genuinely overflows, measured from the
 *      real laid-out width and re-measured on resize. Below that it is an
 *      ordinary centred row with no animation at all.
 *
 * Under prefers-reduced-motion nothing scrolls by itself; the row becomes a
 * scroll container the visitor moves at their own pace.
 */

/* The aspect ratio the row is tuned around - roughly what a horizontal lockup
   with a wordmark in it comes out at. */
const REFERENCE_RATIO = 3.9;
const MAX_BOOST = 1.5;
/* Pixels per second. Slow enough to read a mark as it goes past. */
const SPEED = 42;

function boost(width, height) {
  if (!width || !height) return 1;
  const ratio = width / height;
  if (ratio >= REFERENCE_RATIO) return 1;
  return Math.min(MAX_BOOST, Math.sqrt(REFERENCE_RATIO / ratio));
}

function Logo({ client, decorative }) {
  /* alt is empty because the link or the wrapper carries the name - otherwise
     every logo announces itself twice. */
  const mark = (
    <Image
      src={client.logo}
      alt=""
      width={client.width}
      height={client.height}
      /* Height is fixed and width follows the lockup's own ratio, so the widest
         of these lands around 300px. Without saying so, next/image sizes from
         the source file and a smaller original gets served under-resolved. */
      sizes="320px"
      className="clients__logo"
      style={{ "--boost": boost(client.width, client.height).toFixed(3) }}
    />
  );

  /* When the name is on screen it is the accessible name already, so the
     wrapper must not repeat it - otherwise it is announced twice. */
  const inner = client.showName ? (
    <>
      {mark}
      <span className="clients__name">{client.name}</span>
    </>
  ) : (
    mark
  );

  /* The duplicate copy is inside an aria-hidden subtree, so it must not hold a
     link: a focusable element hidden from the accessibility tree is a trap for
     anyone tabbing through. */
  if (decorative) {
    return <span className="clients__item">{inner}</span>;
  }

  if (client.url) {
    return (
      <a
        className="clients__item"
        href={client.url}
        target="_blank"
        rel="noreferrer"
        aria-label={client.showName ? undefined : `${client.name} (opens in a new tab)`}
      >
        {inner}
      </a>
    );
  }

  if (client.showName) {
    return <span className="clients__item">{inner}</span>;
  }

  return (
    <span className="clients__item" role="img" aria-label={client.name}>
      {inner}
    </span>
  );
}

export default function ClientLogos({ clients = [] }) {
  const viewportRef = useRef(null);
  const listRef = useRef(null);
  const [marquee, setMarquee] = useState(false);
  const [duration, setDuration] = useState(0);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;
    /* The first copy only - once the second exists, the track is twice as wide
       and would keep re-triggering itself. */
    const content = list.scrollWidth;
    const fits = content <= viewport.clientWidth;
    setMarquee(!fits);
    setDuration(Math.max(12, Math.round(content / SPEED)));
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    /* Logos are images: the row's real width is not known until they decode. */
    const imgs = [...viewport.querySelectorAll("img")];
    imgs.forEach((img) => img.addEventListener("load", measure));
    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", measure));
    };
  }, [measure, clients.length]);

  if (!clients.length) return null;

  const row = (decorative) =>
    clients.map((client) => (
      <li key={client.slug}>
        <Logo client={client} decorative={decorative} />
      </li>
    ));

  return (
    <section className="clients" aria-label="Clients">
      <div className="clients__viewport" ref={viewportRef}>
        <div
          className="clients__track"
          data-marquee={marquee}
          style={{ "--marquee-duration": `${duration}s` }}
        >
          <ul className="clients__list" ref={listRef}>
            {row(false)}
          </ul>
          {marquee ? (
            <ul className="clients__list" aria-hidden="true">
              {row(true)}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
