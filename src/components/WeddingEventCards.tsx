"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatHindiDate, wedding } from "@/data/wedding";

export function WeddingEventCards() {
  const reduceMotion = useReducedMotion();
  const events = [
    { event: wedding.wedding, label: "मंगल आयोजन", number: "०१" },
    { event: wedding.departure, label: "शुभ प्रस्थान", number: "०२" },
  ];

  return (
    <section className="events-section section-shell" id="mangal-utsav">
      <div className="section-heading">
        <span className="eyebrow">शुभ अवसर</span>
        <h2>मंगल आयोजन</h2>
        <span className="heading-rule" />
      </div>
      <div className="events-grid">
        {events.map(({ event, label, number }, index) => (
          <motion.article
            className="event-card"
            key={event.ceremony}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
          >
            <div className="event-card-top">
              <span>{label}</span>
              <i>{number}</i>
            </div>
            <div className="event-icon" aria-hidden="true">{index === 0 ? "✧" : "❧"}</div>
            <h3>{event.ceremony}</h3>
            <p className="event-date">{formatHindiDate(event.date)}</p>
            <span className="event-divider" />
            <p className="event-time">{event.time}</p>
            {index === 0 && <p className="event-day">{wedding.wedding.day}</p>}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
