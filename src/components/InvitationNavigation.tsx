const sections = [
  { href: "#nimantran", label: "निमंत्रण" },
  { href: "#parichay", label: "नवयुगल" },
  { href: "#mangal-utsav", label: "मंगल आयोजन" },
  { href: "#parivaar", label: "परिवार" },
  { href: "#sthal", label: "मिलन स्थल" },
];

export function InvitationNavigation() {
  return (
    <nav className="invitation-nav" aria-label="निमंत्रण के अनुभाग">
      {sections.map(({ href, label }) => (
        <a href={href} key={href}>{label}</a>
      ))}
    </nav>
  );
}
