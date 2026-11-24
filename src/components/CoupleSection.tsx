"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";

type Photo = (typeof wedding.photos)[keyof typeof wedding.photos];

function PhotoFrame({
  photo,
  kind,
}: {
  photo: Photo;
  kind: "bride" | "groom" | "couple";
}) {
  return (
    <div className={`portrait-placeholder portrait-placeholder--${kind}`}>
      {photo.src ? (
        <img src={photo.src} alt={photo.alt} />
      ) : (
        <>
          <span className="portrait-halo" />
          {kind === "couple" ? (
            <span className="portrait-pair" aria-hidden="true">
              <i /><i />
            </span>
          ) : (
            <span
              className={`portrait-figure portrait-figure--${kind}`}
              aria-hidden="true"
            >
              <i />
            </span>
          )}
          <span className="portrait-caption">{photo.label}</span>
        </>
      )}
    </div>
  );
}

export function CoupleSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="couple-section section-shell" id="parichay">
      <div className="section-heading">
        <span className="eyebrow">मंगल मिलन</span>
        <h2>शुभ परिणय</h2>
        <span className="heading-rule" />
      </div>
      <div className="couple-grid">
        <motion.article
          className="person-card"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <PhotoFrame photo={wedding.photos.bride} kind="bride" />
          <span className="person-label">वधू</span>
          <h3>{wedding.bride.name}</h3>
          <p><span className="person-detail-label">माता-पिता</span><br />{wedding.bride.parents}</p>
        </motion.article>
        <span className="couple-ampersand">संग</span>
        <motion.article
          className="person-card"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <PhotoFrame photo={wedding.photos.groom} kind="groom" />
          <span className="person-label">वर</span>
          <h3>{wedding.groom.name}</h3>
          <p><span className="person-detail-label">पिता</span><br />{wedding.groom.father}<br />{wedding.groom.residence}</p>
        </motion.article>
        <motion.article
          className="couple-photo-card"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <PhotoFrame photo={wedding.photos.couple} kind="couple" />
          <span className="person-label">शुभ विवाह</span>
          <h3>{wedding.bride.name} <i>संग</i> {wedding.groom.name}</h3>
        </motion.article>
      </div>
    </section>
  );
}
