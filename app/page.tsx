import AppPreviewSection from "@/components/AppPreviewSection";
import BercorpSection from "@/components/BercorpSection";
import ComparativoSection from "@/components/ComparativoSection";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { RespaldoLegalBand } from "@/components/LegalTicker";
import Navbar from "@/components/Navbar";
import PlanesSection from "@/components/PlanesSection";
import ProyectosSection from "@/components/ProyectosSection";
import SimuladorSection from "@/components/SimuladorSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProyectosSection />
        <PlanesSection />
        <HowItWorksSection />
        <RespaldoLegalBand />
        <BercorpSection />
        <SimuladorSection />
        <ComparativoSection />
        <AppPreviewSection />
        <FormSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  );
}
