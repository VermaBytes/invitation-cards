"use client";

import { useEffect, useState } from "react";
import { formatHindiDate, wedding } from "@/data/wedding";

export function ShareInvitation() {
  const [copied, setCopied] = useState(false);
  const [whatsAppShare, setWhatsAppShare] = useState("");
  const title = `${wedding.bride.name} एवं ${wedding.groom.name} का शुभविवाह`;
  const text = `${title} — ${formatHindiDate(wedding.wedding.date)}, ${wedding.wedding.time}।`;

  useEffect(() => {
    setWhatsAppShare(`https://wa.me/?text=${encodeURIComponent(`${text} ${window.location.href}`)}`);
  }, [text]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Invitation link could not be copied.", error);
      window.prompt("इस लिंक को कॉपी करें:", window.location.href);
    }
  }

  async function shareNative() {
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title, text, url: window.location.href });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Invitation could not be shared.", error);
      }
    }
  }

  return (
    <section className="share-section section-shell" id="share">
      <span className="eyebrow">स्नेह बांटें</span>
      <h2>इस शुभ निमंत्रण को साझा करें</h2>
      <div className="share-actions">
        <a href={whatsAppShare || "https://wa.me/"} target="_blank" rel="noreferrer" className="share-link">
          WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <button className="share-link" onClick={shareNative}>
          साझा करें <span aria-hidden="true">↗</span>
        </button>
        <button className="share-link" onClick={copyLink}>
          {copied ? "लिंक कॉपी हुआ ✓" : "लिंक कॉपी करें"}
        </button>
      </div>
    </section>
  );
}
