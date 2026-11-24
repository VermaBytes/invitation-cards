import { wedding } from "@/data/wedding";
import { GaneshaEmblem } from "./GaneshaEmblem";

export function WeddingFooter() {
  return (
    <footer className="wedding-footer">
      <GaneshaEmblem small />
      <p>आपकी उपस्थिति हमारे लिए सौभाग्य एवं हर्ष का विषय होगी।</p>
      <strong>{wedding.bride.name} <i>&amp;</i> {wedding.groom.name}</strong>
      <span>सादर आमंत्रित</span>
      <small>समस्त मौर्य परिवार</small>
    </footer>
  );
}
