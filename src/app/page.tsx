"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { InvitationReveal } from "@/components/InvitationReveal";
import { CoupleSection } from "@/components/CoupleSection";
import { WeddingCountdown } from "@/components/WeddingCountdown";
import { WeddingEventCards } from "@/components/WeddingEventCards";
import { FamilySection } from "@/components/FamilySection";
import { VenueSection } from "@/components/VenueSection";
import { WhatsAppRSVP } from "@/components/WhatsAppRSVP";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { ShareInvitation } from "@/components/ShareInvitation";
import { WeddingFooter } from "@/components/WeddingFooter";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main>
      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeIntro
            key="envelope"
            onOpen={() => setOpened(true)}
            onOpening={() => window.dispatchEvent(new Event("wedding-envelope-open"))}
          />
        ) : (
          <motion.div
            key="invitation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9 }}
          >
            <InvitationReveal />
            <CoupleSection />
            <WeddingCountdown />
            <WeddingEventCards />
            <FamilySection />
            <VenueSection />
            <WhatsAppRSVP />
            <ShareInvitation />
            <WeddingFooter />
          </motion.div>
        )}
      </AnimatePresence>
      <BackgroundMusic visible={opened} />
    </main>
  );
}
