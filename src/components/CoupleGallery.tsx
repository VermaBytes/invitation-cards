"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";

export function CoupleGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="couple-gallery-section section-shell" aria-labelledby="couple-gallery-title">
      <motion.div
        className="couple-gallery"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="couple-gallery-copy">
          <span className="eyebrow eyebrow--light">एक साथ, एक नई शुरुआत</span>
          <h2 id="couple-gallery-title">शुभ मिलन</h2>
          <span className="gallery-divider" aria-hidden="true">✦</span>
          <p>{wedding.bride.name}<i> संग </i>{wedding.groom.name}</p>
        </div>
        <div className="couple-gallery-frame">
          <img src={wedding.photos.couple.src} alt={wedding.photos.couple.alt} loading="lazy" decoding="async" />
        </div>
        <span className="gallery-ornament" aria-hidden="true">❧</span>
      </motion.div>
    </section>
  );
}
