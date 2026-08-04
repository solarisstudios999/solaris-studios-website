export default function Marquee({ items = [], speed = 28 }) {
  // Duplicate the items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            <span className="marquee__text">{item}</span>
            <span className="marquee__star" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M12 2 14.4 9.6 22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"
                />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
