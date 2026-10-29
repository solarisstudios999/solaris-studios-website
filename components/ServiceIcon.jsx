/**
 * The five discipline marks.
 *
 * Drawn here rather than loaded as files, for two reasons that both come from
 * where they are used - inside a pill about 26px tall.
 *
 * Size. The supplied artwork was illustrative: ~150px artboards with fine
 * linework and, on three of them, words set inside the drawing. At 26px the
 * words were unreadable and the busier marks collapsed into a red smudge.
 * These are built for the size they are shown at instead - one stroke weight,
 * no fills, nothing finer than the stroke itself, no type inside the shape.
 *
 * Colour. An external file in an <img> is an isolated document, so it cannot
 * see `currentColor` and has to carry its own fill. That is what made the red
 * artwork vanish on the red active pill. Inline, these inherit the colour of
 * the label beside them, so the active state fixes itself and no second
 * "active" asset is needed.
 *
 * Shapes are deliberately plain - a browser is a browser, a magnifier is a
 * magnifier. The one that earns its keep is Strategy: concentric rings, which
 * is the same figure the section's orbit diagram is already drawing.
 */

const PATHS = {
  /* Identity: two primitives overlapping - a form language rather than a logo. */
  "brand-identity": (
    <>
      <rect x="3.25" y="3.25" width="11.5" height="11.5" rx="2.5" />
      <circle cx="15.25" cy="15.25" r="5.5" />
    </>
  ),
  /* Web: a browser chrome, the most literal shape that survives 20px. */
  "web-experience": (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 9h19" />
      <path d="M5.75 6.5h.01M8.25 6.5h.01" />
    </>
  ),
  /* Content: a play triangle in a frame. */
  "content-creation": (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="M10.25 9.25 15.5 12l-5.25 2.75Z" />
    </>
  ),
  /* Strategy: rings and a centre - positioning, and an echo of the orbit. */
  "brand-strategy": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  /* Discovery: a magnifier. */
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20.5 20.5" />
    </>
  ),
};

export default function ServiceIcon({ slug, className = "" }) {
  const art = PATHS[slug];
  if (!art) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {art}
    </svg>
  );
}
