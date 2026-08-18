import type { Metadata } from "next";
import AboutSection from "@/src/features/website/components/home/AboutSection";
import AlliesSection from "@/src/features/website/components/home/AlliesSection";
import AlliesInfoSection from "@/src/features/website/components/home/AlliesInfoSection";
import AwardsSection from "@/src/features/website/components/home/AwardsSection";
import ContactSection from "@/src/features/website/components/home/ContactSection";
import FamilyReunionSection from "@/src/features/website/components/home/FamilyReunionSection";
import FeaturedPropertiesSection from "@/src/features/website/components/home/FeaturedPropertiesSection";
import Hero from "@/src/features/website/components/home/Hero";
import JoinSection from "@/src/features/website/components/home/JoinSection";
import ProspectingCtaSection from "@/src/features/website/components/home/ProspectingCtaSection";

export const metadata: Metadata = {
  title: "Keller Williams México | Bienes raíces y oportunidades",
  description: "Encuentra propiedades, agentes inmobiliarios y oportunidades para crecer con la red Keller Williams México.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <AwardsSection />
      <FeaturedPropertiesSection />
      <AboutSection />
      <JoinSection />
      <FamilyReunionSection />
      <AlliesSection />
      <AlliesInfoSection />
      <ProspectingCtaSection />
      <ContactSection />
    </main>
  );
}
