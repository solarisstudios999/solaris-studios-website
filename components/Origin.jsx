import Image from "next/image";

/**
 * Two photographs twenty years apart, shown as a pair rather than a
 * before/after wipe.
 *
 * A wipe needs both frames to share a composition. These do not - one is a
 * class of fifteen where the two of them are faces in the back row, the other
 * is a close portrait. Forcing them into one frame would read as two unrelated
 * pictures. Shown side by side, the crowd becomes the point: two of these kids
 * started a studio.
 *
 * The ring marking them is drawn in SVG over the image in percentage
 * coordinates, so it tracks the photo at every size. `vector-effect` keeps the
 * stroke even despite the non-uniform viewBox.
 *
 * Photos are resolved against disk on the server, so this degrades to a
 * designed placeholder rather than breaking if a file is missing.
 */
export default function Origin({ origin, photos }) {
  const { then: thenPhoto, now: nowPhoto } = photos;
  const ring = origin.ring;

  return (
    <div className="origin">
      <div className="origin__plates">
        <figure className="origin__plate origin__plate--then">
          <div className="origin__frame origin__frame--wide">
            {thenPhoto ? (
              <>
                <Image
                  src={thenPhoto.src}
                  alt={thenPhoto.alt}
                  fill
                  sizes="(min-width: 1080px) 660px, 92vw"
                  quality={82}
                  className="origin__img"
                />
                <svg
                  className="origin__ring"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <ellipse
                    cx={ring.cx}
                    cy={ring.cy}
                    rx={ring.rx}
                    ry={ring.ry}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </>
            ) : (
              <p className="origin__placeholder-note">
                Missing: /public{origin.photos[0].src}
              </p>
            )}
            <span className="origin__year">{origin.metYear}</span>
          </div>
          <figcaption className="origin__caption">{origin.thenCaption}</figcaption>
        </figure>

        <figure className="origin__plate origin__plate--now">
          <div className="origin__frame origin__frame--tall">
            {nowPhoto ? (
              <Image
                src={nowPhoto.src}
                alt={nowPhoto.alt}
                fill
                sizes="(min-width: 1080px) 320px, 92vw"
                quality={82}
                className="origin__img"
              />
            ) : (
              <p className="origin__placeholder-note">
                Missing: /public{origin.photos[1].src}
              </p>
            )}
            <span className="origin__year">{origin.nowYear}</span>
          </div>
          <figcaption className="origin__caption">{origin.nowCaption}</figcaption>
        </figure>
      </div>

      <div className="origin__body">
        <p className="origin__years">{origin.nowYear - origin.metYear}</p>
        <div>
          <p className="origin__lead">{origin.lead}</p>
          <p className="origin__note">{origin.note}</p>
        </div>
      </div>
    </div>
  );
}
