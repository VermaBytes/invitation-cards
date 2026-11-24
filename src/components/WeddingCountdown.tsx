"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { formatHindiDate, toHindiDigits, wedding } from "@/data/wedding";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(): Remaining {
  const difference = Math.max(0, new Date(wedding.wedding.isoDateTime).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function WeddingCountdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const reduceMotion = useReducedMotion();
  const isComplete = remaining !== null
    && remaining.days === 0
    && remaining.hours === 0
    && remaining.minutes === 0
    && remaining.seconds === 0;
  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section section-shell">
      <div className="countdown-inner">
        <span className="eyebrow eyebrow--light">मंगल घड़ी की प्रतीक्षा</span>
        <h2>शुभविवाह में शेष</h2>
        {isComplete ? (
          <p className="countdown-complete" role="status">शुभविवाह का मंगल समय आ गया है।</p>
        ) : (
          <div className="countdown-grid" aria-live="polite">
            {([
              ["दिन", remaining?.days],
              ["घंटे", remaining?.hours],
              ["मिनट", remaining?.minutes],
              ["सेकंड", remaining?.seconds],
            ] as const).map(([label, value], index) => (
              <motion.div
                className="countdown-unit"
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <strong>{value === undefined ? "—" : toHindiDigits(String(value).padStart(2, "0"))}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        )}
        <p>{wedding.wedding.day}, {formatHindiDate(wedding.wedding.date)} • {wedding.wedding.time}</p>
      </div>
    </section>
  );
}
