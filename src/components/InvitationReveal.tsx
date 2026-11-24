"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { wedding } from "@/data/wedding";
import { GaneshaEmblem } from "./GaneshaEmblem";

export function InvitationReveal() {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !cardRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".reveal-detail",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.13, ease: "power2.out", delay: 0.15 },
      );
    }, cardRef);
    return () => context.revert();
  }, []);

  return (
    <section className="invitation-section section-shell" ref={cardRef} id="nimantran">
      <div className="invitation-paper ornamental-frame">
        <span className="eyebrow reveal-detail">शुभ परिणय • २०२६</span>
        <GaneshaEmblem />
        <p className="invitation-verse-title reveal-detail">{wedding.invitation.verseTitle}</p>
        <p className="invitation-verse reveal-detail">{wedding.invitation.verse}</p>
        <div className="ornament-divider reveal-detail" aria-hidden="true">
          <span />
          <i>❧</i>
          <span />
        </div>
        <p className="invitation-message reveal-detail">{wedding.invitation.message}</p>
        <p className="invitation-signature reveal-detail">सादर — {wedding.invitation.host}</p>
        <p className="reveal-detail invitation-blessing">आपकी प्रतीक्षा में</p>
      </div>
    </section>
  );
}
