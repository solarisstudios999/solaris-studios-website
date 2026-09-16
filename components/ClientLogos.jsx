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
 * Logos keep their own proportions and are never stretched to a common box:
 * every one of these is somebody's trademark and squashing it to tidy up a row
 * is not ours to do. They are matched on height instead, which is how the eye
 * compares them anyway.
 */
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
              className="clients__logo"
            />
          );

          return (
            <li key={client.slug}>
              {client.url ? (
                <a
                  className="clients__item"
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${client.name} (opens in a new tab)`}
                >
                  {mark}
                </a>
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
