"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Two photographs of the same two people, twenty years apart, sharing one
 * frame. Drag the handle to move between them.
 *
 * The control is a real <input type="range">, not a div listening for pointer
 * events - so it is keyboard operable with arrow keys, Home and End for free,
 * and announces itself to assistive tech without any extra wiring. It sits
 * transparent over the whole frame, so dragging anywhere in the image works.
 *
 * `photos` is filtered on the server to those that exist on disk, so the
 * section renders a designed placeholder rather than breaking while the
 * pictures are still being taken.
 */
export default function Origin({ origin, photos }) {
  const [pos, setPos] = useState(50);
  const ready = photos.then && photos.now;

  return (
    <div className="origin">
      <div className="origin__figure">
        {ready ? (
          <>
            <div className="origin__frame" style={{ "--pos": `${pos}%` }}>
              {/* the later photo is the base layer; the earlier one is clipped over it */}
              <Image
                src={photos.now.src}
                alt={photos.now.alt}
                fill
                sizes="(min-width: 1080px) 620px, 92vw"
                quality={82}
                className="origin__img"
              />
              <div className="origin__clip">
                <Image
                  src={photos.then.src}
                  alt={photos.then.alt}
                  fill
                  sizes="(min-width: 1080px) 620px, 92vw"
                  quality={82}
                  className="origin__img"
                />
              </div>

              <span className="origin__seam" aria-hidden="true" />
              <span className="origin__year origin__year--then" aria-hidden="true">
                {origin.metYear}
              </span>
              <span className="origin__year origin__year--now" aria-hidden="true">
                {origin.nowYear}
              </span>

              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={pos}
                onChange={(event) => setPos(Number(event.target.value))}
                className="origin__range"
                aria-label={`Move between ${origin.metYear} and ${origin.nowYear}`}
              />
            </div>
            <p className="origin__hint">
              Drag to move between {origin.metYear} and {origin.nowYear}
            </p>
          </>
        ) : (
          <div className="origin__frame origin__frame--empty">
            <p className="eyebrow">Photographs pending</p>
            <p className="origin__placeholder-note">
              Drop then.jpg and now.jpg into /public/assets/about/
            </p>
          </div>
        )}
      </div>

      <div className="origin__body">
        <p className="origin__years">
          {origin.nowYear - origin.metYear}
        </p>
        <p className="origin__lead">{origin.lead}</p>
        <p className="origin__note">{origin.note}</p>
      </div>
    </div>
  );
}
