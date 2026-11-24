export const wedding = {
  bride: {
    name: "बबली मौर्या",
    parents: "श्रीमती सुमन देवी एवं श्री डॉ. बलराम मौर्य",
  },
  groom: {
    name: "हृदयांश संजय मौर्य",
    father: "श्री अवधराम मौर्य",
    residence: "ग्राम गौरिया, पोस्ट खरबहिया नं.-2, जिला खीरी, उत्तर प्रदेश.",
  },
  photos: {
    bride: { src: null, alt: "बबली मौर्या का चित्र", label: "वधू का चित्र" },
    groom: {
      src: null,
      alt: "हृदयांश संजय मौर्य का चित्र",
      label: "वर का चित्र",
    },
    couple: {
      src: null,
      alt: "बबली मौर्या एवं हृदयांश संजय मौर्य का चित्र",
      label: "नवयुगल का चित्र",
    },
  },
  invitation: {
    host: "डॉ. बलराम मौर्य",
    verseTitle: "॥ श्री गणेशाय नमः ॥",
    verse:
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    message:
      "परमपिता परमेश्वर की असीम अनुकम्पा से हमारी सुपुत्री बबली मौर्या एवं सुपुत्र हृदयांश संजय मौर्य के मांगलिक परिणय सूत्र में बंधने के शुभ अवसर पर आप सपरिवार सादर आमंत्रित हैं। अपनी स्नेहिल उपस्थिति एवं शुभाशीष प्रदान कर नवयुगल को अनुगृहीत करें।",
  },
  wedding: {
    date: "2026-12-07",
    day: "सोमवार",
    time: "रात्रि 8:00 बजे",
    ceremony: "वरपूजन एवं शुभविवाह",
    isoDateTime: "2026-12-07T20:00:00+05:30",
  },
  departure: {
    date: "2026-12-08",
    time: "प्रातः 9:00 बजे",
    ceremony: "कलेवा एवं विदाई",
    isoDateTime: "2026-12-08T09:00:00+05:30",
  },
  venue: {
    name: "निज निवास",
    address:
      "ग्राम अशोगापुर, पोस्ट नकहा, जिला लखीमपुर-खीरी, उत्तर प्रदेश, भारत.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%E0%A4%A8%E0%A4%BF%E0%A4%9C%20%E0%A4%A8%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B8%2C%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE%20%E0%A4%85%E0%A4%B6%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%AA%E0%A5%81%E0%A4%B0%2C%20%E0%A4%AA%E0%A5%8B%E0%A4%B8%E0%A5%8D%E0%A4%9F%20%E0%A4%A8%E0%A4%95%E0%A4%B9%E0%A4%BE%2C%20%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A4%BE%20%E0%A4%B2%E0%A4%96%E0%A5%80%E0%A4%AE%E0%A4%AA%E0%A5%81%E0%A4%B0-%E0%A4%96%E0%A5%80%E0%A4%B0%E0%A5%80%2C%20%E0%A4%89%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A4%B0%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A6%E0%A5%87%E0%A4%B6%2C%20%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4",
  },
  family: {
    welcoming: [
      "छन्नूलाल मौर्य",
      "दीपक मौर्य (एडवोकेट)",
      "शैलेन्द्र मौर्य",
      "मनोज कुमार",
    ],
    wellWishers:
      "राधेश्याम, लालशरण, शंकर दयाल, रामनरेश, मायराम, मोनू, सचिन एवं समस्त मौर्य परिवार व मित्रगण.",
  },
  contacts: ["9918229618", "6392738508", "9450200924"],
  siteUrl: "https://babaliwedssanjay.netlify.app",
  music: {
    tracks: [
      {
        title: "गणेश वंदना",
        src: "/music/ganesh-vandana.mp3",
        enabled: false,
      },
      { title: "शहनाई", src: "/music/shehnai.mp3", enabled: false },
      {
        title: "रोमांटिक वाद्य संगीत",
        src: "/music/romantic-instrumental.mp3",
        enabled: false,
      },
      {
        title: "विवाह उत्सव",
        src: "/music/wedding-celebration.mp3",
        enabled: false,
      },
    ],
  },
} as const;

export function formatHindiDate(date: string): string {
  const formatted = new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
  return toHindiDigits(formatted);
}

export function toHindiDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
}
