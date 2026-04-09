import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import LuxuryShowcase from "@/components/LuxuryShowcase";
import FeaturedProperties from "@/components/FeaturedProperties";
import TeamIntroSection from "@/components/TeamIntroSection";
import ChairmanSection from "@/components/ChairmanSection";
import BoardSection from "@/components/BoardSection";
import SpacesInspireSection from "@/components/SpacesInspireSection";
import LuxuryElevatesSection from "@/components/LuxuryElevatesSection";
import PropertyPlaybookSection from "@/components/PropertyPlaybookSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <SearchSection />
    <LuxuryShowcase />
    <FeaturedProperties />
    <TeamIntroSection />
    <ChairmanSection />
    <BoardSection />
    <SpacesInspireSection />
    <LuxuryElevatesSection />
    <PropertyPlaybookSection />
    <AboutSection />
    <TestimonialsSection />
    <ContactSection />
    <Footer />
    <WhatsAppButton />
    <ChatBot />
  </div>
);

export default Index;
