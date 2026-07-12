import Background from "../components/Background";
import CursorSpotlight from "../components/CursorSpotlight";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import TrustedTech from "../components/TrustedTech";
import WhyEcoVerse from "../components/WhyEcoVerse";
import Builders from "../components/Builders";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Background />
      <CursorSpotlight />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Features />
        <DashboardPreview />
        <TrustedTech />
        <WhyEcoVerse />
        <Builders />
      </main>

      <Footer />
    </div>
  );
}