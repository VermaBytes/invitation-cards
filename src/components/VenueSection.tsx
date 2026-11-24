"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";

export function VenueSection() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(wedding.venue.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Venue address could not be copied.", error);
      window.prompt("इस पते को कॉपी करें:", wedding.venue.address);
    }
  }

  return (
    <section className="venue-section section-shell" id="sthal">
      <motion.div
        className="venue-card"
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="venue-art" aria-hidden="true">
          <span className="venue-sun" />
          <span className="venue-arch"><i /><b /></span>
          <span className="venue-ground" />
        </div>
        <div className="venue-copy">
          <span className="eyebrow">शुभ मिलन स्थल</span>
          <h2>{wedding.venue.name}</h2>
          <p>{wedding.venue.address}</p>
          <div className="venue-actions">
            {wedding.venue.mapsUrl && (
              <a className="gold-button" href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer">
                <span>Google Maps में पता खोजें</span><span aria-hidden="true">↗</span>
              </a>
            )}
            <button className="gold-button gold-button--outline" onClick={copyAddress}>
              {copied ? "पता कॉपी हुआ ✓" : "पता कॉपी करें"}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
