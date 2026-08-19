import AppPreviewSection from "@/components/AppPreviewSection";
import ComparativoSection from "@/components/ComparativoSection";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { RespaldoLegalBand, SociosEstrategicosBand } from "@/components/LegalTicker";
import Navbar from "@/components/Navbar";
import PlanesSection from "@/components/PlanesSection";
import ProyectosSection from "@/components/ProyectosSection";
import SimuladorSection from "@/components/SimuladorSection";
import StatsSection from "@/components/StatsSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <RespaldoLegalBand />
        <HowItWorksSection />
        <FormSection />
        <ComparativoSection />
        <PlanesSection />
        <ProyectosSection />
        <SociosEstrategicosBand />
        <AppPreviewSection />
        <SimuladorSection />
        {/* <EquipoSection /> */}
        <TestimonialsSection />
        {/* <FAQSection /> */}
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  );
}
