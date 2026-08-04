const iconPaths = {
  email: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3.5 7.5 12 13l8.5-5.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  location: (
    <>
      <path d="M12 21c4-4.5 7-8 7-11a7 7 0 1 0-14 0c0 3 3 6.5 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20.5 5.5 16A8.5 8.5 0 1 1 9 19.5L4 20.5Z" />
      <path d="M9 9.5c.3-.6.7-.6 1-.6h.3c.2 0 .4.1.5.4l.6 1.5c.1.2.1.4-.1.6l-.5.6c.8 1.3 1.7 2.2 3 3l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.4c0 .3-.2.5-.4.7-.4.3-.9.4-1.4.4-3 0-7-3.9-7-7 0-.5.1-.9.5-1.3Z" />
    </>
  ),
};

export default function ContactLine({ as: Tag = "span", icon, children, className = "", ...props }) {
  return (
    <Tag className={`contact-line ${className}`.trim()} {...props}>
      <span className="contact-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          {iconPaths[icon]}
        </svg>
      </span>
      <span>{children}</span>
    </Tag>
  );
}
