"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";

export function FamilySection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="family-section section-shell" id="parivaar">
      <div className="section-heading">
        <span className="eyebrow">स्नेहिल परिवार</span>
        <h2>आपके अपने</h2>
        <span className="heading-rule" />
      </div>
      <motion.div
        className="family-panel ornamental-frame"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75 }}
      >
        <div className="family-relations">
          <div>
            <p className="family-kicker">वधू के माता-पिता</p>
            <p className="family-relation-name">{wedding.bride.parents}</p>
          </div>
          <div>
            <p className="family-kicker">वर के पिता</p>
            <p className="family-relation-name">{wedding.groom.father}</p>
          </div>
        </div>
        <p className="family-kicker">निमंत्रणकर्ता</p>
        <h3>{wedding.invitation.host}</h3>
        <span className="ornament-divider" aria-hidden="true"><span /><i>❧</i><span /></span>
        <p className="family-kicker">स्वागताकांक्षी</p>
        <div className="welcoming-list">
          {wedding.family.welcoming.map((name) => <span key={name}>{name}</span>)}
        </div>
        <p className="family-kicker family-kicker--wellwishers">शुभेच्छु</p>
        <p className="wellwishers">{wedding.family.wellWishers}</p>
        <div className="family-contacts">
          {wedding.contacts.map((number) => (
            <a key={number} href={`tel:${number}`} aria-label={`फोन करें ${number}`}>
              {number}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
