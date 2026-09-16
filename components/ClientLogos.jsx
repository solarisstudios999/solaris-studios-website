import Image from "next/image";

/**
 * The clients, in the slot the marquee used to occupy and the proof bar took
 * over from it.
 *
 * Adding a client is adding a row to `clients` in lib/data.js and dropping the
 * file in /public/assets/clients. Nothing here changes, which is the same deal
 * the case study makes.
 *
 * Every logo is flattened to a translucent white silhouette in CSS, so a row
 * of marks from different brands reads as one band rather than a colour
 * clash, and no logo needs to know what colour the page is. It also means the
 * source file's colour is irrelevant - only its shape and its transparency
 * matter.
 *
 * A client whose mark carries no wordmark of its own can set `showName`, and
 * the name is set in type beside it. That is our typesetting, not their
 * lockup, so it is real text rather than baked into their artwork: it stays
 * selectable, it scales, it is obvious what it is, and nobody later mistakes a
 * PNG we composed for the logo they actually own.
 *
 * Logos keep their own proportions and are never stretched to a common box:
 * every one of these is somebody's trademark and squashing it to tidy up a row
 * is not ours to do.
 *
 * They are not matched on height either, which is the obvious thing and the
 * wrong one. A wide lockup with its name in it and a square mark on its own,
 * set to the same height, do not look the same size - the square one occupies
 * a quarter of the width and reads as an afterthought. So a logo shorter than
 * the reference gets some height back, by the square root of how far off it is
 * and capped, which lands between matching height (too small) and matching
 * area (grotesquely large). Real logo walls do the same thing by hand.
 */

/* The aspect ratio the row is tuned around - roughly what a horizontal lockup
   with a wordmark in it comes out at. */
const REFERENCE_RATIO = 3.9;
const MAX_BOOST = 1.5;

function boost(width, height) {
  if (!width || !height) return 1;
  const ratio = width / height;
  if (ratio >= REFERENCE_RATIO) return 1;
  return Math.min(MAX_BOOST, Math.sqrt(REFERENCE_RATIO / ratio));
}
export default function ClientLogos({ clients = [] }) {
  if (!clients.length) return null;

  return (
    <section className="clients" aria-label="Clients">
      <ul className="clients__list">
        {clients.map((client) => {
          /* alt is empty because the link or the wrapper carries the name -
             otherwise every logo announces itself twice. */
          const mark = (
            <Image
              src={client.logo}
              alt=""
              width={client.width}
              height={client.height}
              /* Height is fixed and width follows the lockup's own ratio, so
                 the widest of these lands around 300px. Without saying so,
                 next/image sizes from the source file instead and a smaller
                 original gets served under-resolved on a retina screen. */
              sizes="320px"
              className="clients__logo"
              style={{ "--boost": boost(client.width, client.height).toFixed(3) }}
            />
          );

          /* When the name is on screen it is the accessible name already, so
             the wrapper must not repeat it - otherwise it is announced twice. */
          const inner = client.showName ? (
            <>
              {mark}
              <span className="clients__name">{client.name}</span>
            </>
          ) : (
            mark
          );

          return (
            <li key={client.slug}>
              {client.url ? (
                <a
                  className="clients__item"
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={client.showName ? undefined : `${client.name} (opens in a new tab)`}
                >
                  {inner}
                </a>
              ) : client.showName ? (
                <span className="clients__item">{inner}</span>
              ) : (
                <span className="clients__item" role="img" aria-label={client.name}>
                  {mark}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
