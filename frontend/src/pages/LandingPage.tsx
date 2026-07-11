import Background from "../components/Background";
import CursorSpotlight from "../components/CursorSpotlight";
import ScrollProgressBar from "../components/ScrollProgressBar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import EcosystemPreview from "../components/EcosystemPreview";
import SimulationDashboard from "../components/SimulationDashboard";
import TechStack from "../components/TechStack";
import WhyEcoVerse from "../components/WhyEcoVerse";
import Team from "../components/Team";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Background />
      <CursorSpotlight />
      <ScrollProgressBar />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <EcosystemPreview />
        <SimulationDashboard />
        <TechStack />
        <WhyEcoVerse />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
