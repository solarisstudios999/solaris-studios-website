"use client";

import { useState } from "react";
import { studio } from "@/lib/data";

const projectOptions = [
  "Brand Identity",
  "Web Experience",
  "Content Creation",
  "Brand Strategy",
  "Search Engine Optimisation",
];

const WHATSAPP_NUMBER = studio.whatsappNumber || "919187416656";

const defaultNote = "We reply on WhatsApp within a few hours, usually faster.";

export default function ContactForm() {
  const [note, setNote] = useState(defaultNote);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const project = (data.get("project") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const lines = [
      "Hi Solaris Studios,",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Project: ${project}`,
      "",
      "About the project:",
      message,
    ];

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    setNote("Opening WhatsApp with your details ready to send.");
    setSubmitted(true);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setSubmitting(false);
      setNote(defaultNote);
      form.reset();
    }, 1400);
  }

  return (
    <form className={`contact-form ${submitted ? "is-submitted" : ""}`} onSubmit={handleSubmit} noValidate={false}>
      <label>
        <span>Name</span>
        <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" placeholder="you@brand.com" autoComplete="email" required />
      </label>
      <label>
        <span>Project</span>
        <select name="project" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {projectOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          rows="5"
          placeholder="A few quiet details are enough to begin."
          required
          minLength={10}
        />
      </label>
      <button className="button button--primary contact-form__submit" type="submit" disabled={submitting}>
        <span>{submitting ? "Opening WhatsApp…" : "Send via WhatsApp"}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.65 18.35 4.25 21.5l3.35-1.1A8.55 8.55 0 1 0 3.55 13.1a8.4 8.4 0 0 0 2.1 5.25Z" />
          <path d="M8.95 8.55c.25-.42.46-.46.76-.46h.38c.25 0 .43.12.55.38l.78 1.82c.1.25.06.45-.12.66l-.5.56c.76 1.36 1.78 2.38 3.15 3.14l.58-.52c.2-.18.42-.2.66-.1l1.78.84c.25.12.36.3.36.56v.34c0 .32-.13.56-.4.74-.45.31-.95.45-1.52.45-3.42 0-8.02-4.58-8.02-8 0-.55.15-1.04.56-1.61Z" />
        </svg>
      </button>
      <p className="form-note" aria-live="polite">{note}</p>
    </form>
  );
}
