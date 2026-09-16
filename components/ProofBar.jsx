/**
 * Replaces the marquee. A looping ticker of service names said nothing and was
 * cropped mid-word at both edges; this states four facts instead, set once and
 * still. Precise small numbers read as more confident than vague large claims.
 */
export default function ProofBar({ items = [] }) {
  return (
    <section className="proofbar" aria-label="Solaris Studios in numbers">
      <ul className="proofbar__list">
        {items.map((item) => (
          <li className="proofbar__item" key={item.label}>
            <span className="proofbar__value">{item.value}</span>
            <span className="proofbar__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
