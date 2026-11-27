"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatHindiDate, wedding } from "@/data/wedding";

export function WeddingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="wedding-hero" id="shubharambh">
      <div className="hero-ornament hero-ornament--left" aria-hidden="true">❧</div>
      <div className="hero-ornament hero-ornament--right" aria-hidden="true">❧</div>
      <div className="wedding-hero-inner">
        <motion.div
          className="hero-portrait-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-portrait-frame">
            <img src={wedding.photos.couple.src} alt={wedding.photos.couple.alt} fetchPriority="high" />
          </div>
          <span className="hero-frame-corner hero-frame-corner--tl" aria-hidden="true">❧</span>
          <span className="hero-frame-corner hero-frame-corner--tr" aria-hidden="true">❧</span>
          <span className="hero-frame-corner hero-frame-corner--bl" aria-hidden="true">❧</span>
          <span className="hero-frame-corner hero-frame-corner--br" aria-hidden="true">❧</span>
        </motion.div>
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          <span className="hero-eyebrow">॥ शुभ विवाह ॥</span>
          <h1>
            <span>{wedding.bride.name}</span>
            <i aria-hidden="true">&amp;</i>
            <span>{wedding.groom.name}</span>
          </h1>
          <span className="hero-divider" aria-hidden="true"><i>✦</i></span>
          <p className="hero-date">{wedding.wedding.day}, {formatHindiDate(wedding.wedding.date)}</p>
          <p className="hero-time">{wedding.wedding.time}</p>
          <a className="hero-cta" href="#nimantran">शुभ निमंत्रण पढ़ें <span aria-hidden="true">↓</span></a>
        </motion.div>
      </div>
      <a className="hero-scroll-cue" href="#nimantran" aria-label="निमंत्रण तक नीचे जाएँ">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
