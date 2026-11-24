"use client";

import { wedding } from "@/data/wedding";

export function WhatsAppRSVP() {
  const message = `नमस्ते, ${wedding.bride.name} एवं ${wedding.groom.name} के शुभविवाह का निमंत्रण प्राप्त हुआ। सादर धन्यवाद।`;
  const encodedMessage = encodeURIComponent(message);

  return (
    <section className="rsvp-section section-shell" id="rsvp">
      <span className="eyebrow">आपका शुभाशीष</span>
      <h2>आपकी उपस्थिति हमारे लिए अनमोल है</h2>
      <p>कृपया अपनी शुभकामनाएँ साझा करें।</p>
      <div className="rsvp-contacts">
        {wedding.contacts.map((number) => (
          <article className="rsvp-contact" key={number}>
            <strong>{number}</strong>
            <div>
              <a className="contact-action contact-action--call" href={`tel:${number}`}>
                कॉल करें
              </a>
              <a
                className="contact-action contact-action--whatsapp"
                href={`https://wa.me/91${number}?text=${encodedMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
