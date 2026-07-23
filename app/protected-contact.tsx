"use client";

import { useState } from "react";

const emailKey = 91;
const encodedEmail = [
  55, 43, 117, 34, 41, 46, 54, 51, 56, 50, 56, 48, 62, 47, 50, 51, 56, 41,
  58, 27, 47, 48, 58, 47, 53, 52, 48,
];

function decodeEmail() {
  return [...encodedEmail]
    .reverse()
    .map((value) => String.fromCharCode(value ^ emailKey))
    .join("");
}

export function ProtectedContact() {
  const [email, setEmail] = useState<string | null>(null);

  if (email) {
    const subject = encodeURIComponent("Porozmawiajmy o chmurze");

    return (
      <a
        className="button button-light contact-email-link"
        href={`mailto:${email}?subject=${subject}`}
        aria-label={`Napisz na adres ${email}`}
      >
        <span>{email}</span>
        <span className="button-arrow" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <button
      className="button button-light contact-reveal-button"
      type="button"
      onClick={() => setEmail(decodeEmail())}
      aria-label="Pokaż adres e-mail do kontaktu"
    >
      <span>Umówmy rozmowę</span>
      <span className="button-arrow" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}
