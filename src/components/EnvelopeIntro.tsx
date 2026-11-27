"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatHindiDate, wedding } from "@/data/wedding";
import { GaneshaEmblem } from "./GaneshaEmblem";

const flecks = [
  [9, 18], [22, 72], [35, 14], [49, 84], [65, 12], [78, 70], [91, 28],
  [16, 43], [84, 48], [58, 34], [29, 91], [72, 90], [42, 62], [94, 82],
];
const petals = [
  { left: 17, delay: 0.4, duration: 9 },
  { left: 38, delay: 2.8, duration: 10 },
  { left: 64, delay: 1.7, duration: 8 },
  { left: 84, delay: 4.1, duration: 11 },
];

export function EnvelopeIntro({
  onOpen,
  onOpening,
}: {
  onOpen: () => void;
  onOpening: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const openingTimer = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => () => {
    if (openingTimer.current !== null) window.clearTimeout(openingTimer.current);
  }, []);

  function openEnvelope(skipAnimation = false) {
    if (isOpening) return;
    onOpening();
    setIsOpening(true);
    if (skipAnimation) {
      onOpen();
      return;
    }
    openingTimer.current = window.setTimeout(onOpen, reduceMotion ? 120 : 1050);
  }

  function skipOpening() {
    if (!isOpening) {
      openEnvelope(true);
      return;
    }
    if (openingTimer.current !== null) window.clearTimeout(openingTimer.current);
    onOpen();
  }

  return (
    <section className="envelope-screen" aria-label="विवाह निमंत्रण" data-page-hidden={!pageVisible}>
      <div className="ambient-grain" />
    <div className="light-rays" aria-hidden="true" />
      {flecks.map(([left, top], index) => (
        <motion.i
          key={`${left}-${top}`}
          className="gold-fleck"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={reduceMotion || !pageVisible ? false : { y: [0, -13, 0], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 3 + (index % 4), repeat: Infinity, delay: index * 0.13 }}
        />
      ))}
      {petals.map(({ left, delay, duration }) => (
        <motion.i
          key={left}
          className="rose-petal"
          style={{ left: `${left}%` }}
          initial={false}
          animate={reduceMotion || !pageVisible ? false : { y: ["-8vh", "103vh"], x: [0, 16, -12, 8], rotate: [0, 105, 235, 360], opacity: [0, 0.6, 0.55, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ))}
      <div className="envelope-heading">
        <span className="eyebrow eyebrow--light">एक मंगल निमंत्रण</span>
        <p>सप्रेम आमंत्रण</p>
      </div>
      <div className="envelope-stage">
        <motion.div
          className="envelope"
          initial={reduceMotion ? false : { opacity: 0, y: 30, rotateX: 9 }}
          animate={isOpening && !reduceMotion
            ? { opacity: 0.25, y: -18, scale: 0.96, rotateX: -5, rotateY: 3 }
            : { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="envelope-back" />
          <motion.div
            className="envelope-paper"
            animate={isOpening ? { y: -145, z: 55, rotateX: -5, rotateY: -3, opacity: 0, scale: 0.95 } : { y: 0, z: 0, rotateX: 0, rotateY: 0, opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.8, delay: isOpening && !reduceMotion ? 0.32 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="paper-border">
              <span className="paper-micro">शुभ विवाह</span>
              <GaneshaEmblem small />
              <div className="paper-names">
                <span>{wedding.bride.name}</span>
                <i>&amp;</i>
                <span>{wedding.groom.name}</span>
              </div>
              <span className="paper-date">{formatHindiDate(wedding.wedding.date)}</span>
            </div>
          </motion.div>
          <motion.div
            className="envelope-flap"
            initial={false}
            animate={{ rotateX: isOpening ? -178 : 0 }}
            style={{ transformOrigin: "top center" }}
            transition={{ duration: reduceMotion ? 0.12 : 0.7, ease: [0.6, 0, 0.3, 1] }}
          />
          <div className="envelope-front">
            <div className="envelope-fold envelope-fold--left" />
            <div className="envelope-fold envelope-fold--right" />
            <div className="envelope-fold envelope-fold--bottom" />
            <div className="envelope-stamp">
              <GaneshaEmblem />
            </div>
            <span className="envelope-recipient">बबली &amp; हृदयांश</span>
          </div>
        </motion.div>
        <motion.div
          className="seal"
          initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: isOpening ? 0.65 : 1, opacity: isOpening ? 0 : 1 }}
          transition={{ delay: 0.45, duration: 0.7, type: "spring" }}
          aria-hidden="true"
        >
          <span>शुभ</span>
          <b>॥</b>
          <span>विवाह</span>
        </motion.div>
      </div>
      <div className="envelope-footer">
        <p>बबली मौर्या <span>✦</span> हृदयांश संजय मौर्य</p>
        <button className="open-invitation" onClick={() => openEnvelope()} disabled={isOpening}>
          <span>{isOpening ? "शुभ निमंत्रण…" : "निमंत्रण खोलें"}</span>
          <span aria-hidden="true">↓</span>
        </button>
        <button className="skip-animation" onClick={skipOpening}>
          एनिमेशन छोड़ें
        </button>
        <small>सादर आमंत्रित</small>
      </div>
    </section>
  );
}
