"use client";

import { useEffect, useState } from "react";

const sections = [
  { href: "#shubharambh", label: "शुभारंभ" },
  { href: "#nimantran", label: "निमंत्रण" },
  { href: "#parichay", label: "नवयुगल" },
  { href: "#mangal-utsav", label: "मंगल आयोजन" },
  { href: "#parivaar", label: "परिवार" },
  { href: "#sthal", label: "मिलन स्थल" },
  { href: "#rsvp", label: "संपर्क" },
  { href: "#share", label: "साझा करें" },
];

export function InvitationNavigation() {
  const [activeSection, setActiveSection] = useState(sections[0].href);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveSection(`#${visibleEntry.target.id}`);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach(({ href }) => {
      const section = document.querySelector<HTMLElement>(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="invitation-nav" aria-label="निमंत्रण के अनुभाग">
      {sections.map(({ href, label }) => (
        <a href={href} key={href} aria-current={activeSection === href ? "location" : undefined}>{label}</a>
      ))}
    </nav>
  );
}
