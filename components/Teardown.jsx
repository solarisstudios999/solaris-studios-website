"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * THE TEARDOWN - one layer, for review.
 *
 * The finished Aarna storefront with a layer peeled off it. Drag the seam down
 * and the identity comes away: its typefaces, its colour, its mark. Layout,
 * photography and copy stay, because those are other layers.
 *
 * Both frames are real renders of the live store. The stripped one was made by
 * actually switching that layer off on the real site and re-shooting it, not by
 * mocking up a "before". That matters: these are not invented drafts presented
 * as history. It is a teardown of the finished thing, and it is labelled as
 * one.
 *
 * The control is a real <input type="range">, so arrow keys, Home and End work
 * and it announces itself, with no extra wiring.
 */
export default function Teardown({ layers, caption }) {
  const [peel, setPeel] = useState(0);
  const removed = peel > 6;

  return (
    <figure className="td">
      <div className="td__frame" style={{ "--peel": `${peel}%` }}>
        {/* the layer underneath, always present */}
        <Image
          src={layers.off.src}
          alt={layers.off.alt}
          fill
          sizes="(min-width: 1080px) 880px, 100vw"
          quality={80}
          className="td__img"
        />

        {/* the finished store, clipped away from the top as you drag */}
        <div className="td__top">
          <Image
            src={layers.on.src}
            alt={layers.on.alt}
            fill
            sizes="(min-width: 1080px) 880px, 100vw"
            quality={80}
            className="td__img"
            priority
          />
        </div>

        <span className="td__seam" aria-hidden="true">
          <span className="td__grip" />
        </span>

        <span className="td__tag td__tag--on" data-dim={removed} aria-hidden="true">
          {layers.on.label}
        </span>
        <span className="td__tag td__tag--off" data-lit={removed} aria-hidden="true">
          {layers.off.label}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={peel}
          onChange={(event) => setPeel(Number(event.target.value))}
          className="td__range"
          aria-label={`Peel the ${layers.off.strips} layer off the finished store`}
        />
      </div>

      <figcaption className="td__caption">
        <span className="td__caption-strip" data-lit={removed}>
          {removed ? `Removed: ${layers.off.strips}` : "Drag down to take a layer off"}
        </span>
        <span className="td__caption-note">{caption}</span>
      </figcaption>
    </figure>
  );
}
