"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const particles = [
  { left: "8%", top: "22%", delay: "0s", duration: "12s" },
  { left: "19%", top: "73%", delay: "3s", duration: "15s" },
  { left: "37%", top: "42%", delay: "1.5s", duration: "13s" },
  { left: "62%", top: "18%", delay: "5s", duration: "16s" },
  { left: "78%", top: "64%", delay: "2s", duration: "14s" },
  { left: "92%", top: "35%", delay: "4s", duration: "11s" },
];

export function WeddingAmbience() {
  const reduceMotion = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      const visible = document.visibilityState === "visible";
      setPageVisible(visible);
      document.body.classList.toggle("page-hidden", !visible);
    };
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      document.body.classList.remove("page-hidden");
    };
  }, []);

  if (reduceMotion) return null;

  return (
    <div className={`wedding-ambience${pageVisible ? "" : " wedding-ambience--paused"}`} aria-hidden="true">
      {particles.map((particle) => (
        <i
          className="ambience-particle"
          key={particle.left}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
      <i className="ambience-petal ambience-petal--one" />
      <i className="ambience-petal ambience-petal--two" />
      <i className="ambience-petal ambience-petal--three" />
    </div>
  );
}
