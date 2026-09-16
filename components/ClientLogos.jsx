import Image from "next/image";

/**
 * The clients, in the slot the marquee used to occupy and the proof bar took
 * over from it.
 *
 * Adding a client is adding a row to `clients` in lib/data.js and dropping the
 * file in /public/assets/clients. Nothing here changes, which is the same deal
 * the case study makes.
 *
 * The only thing worth a decision per logo is `tone`, and it is a fact about
 * the artwork rather than a taste call: a mark drawn in a dark colour is
 * invisible on this page, so it gets a light plate to sit on. Reversed artwork
 * needs no plate and always looks better, so it is worth asking a client for.
 *
 * Logos are real images at their own proportions, never stretched to a common
 * box: every one of these is somebody's trademark and squashing it to tidy up
 * a row is not ours to do. They are matched on height instead, which is how
 * the eye compares them anyway.
 */
export default function ClientLogos({ clients = [], label = "Clients" }) {
  if (!clients.length) return null;

  return (
    <section className="clients" aria-label="Clients">
      <p className="clients__label">{label}</p>

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
                  data-tone={client.tone}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${client.name} (opens in a new tab)`}
                >
                  {mark}
                </a>
              ) : (
                <span className="clients__item" data-tone={client.tone} role="img" aria-label={client.name}>
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
