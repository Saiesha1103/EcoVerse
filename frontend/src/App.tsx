import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedTech from "./components/TrustedTech";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DashboardPreview from "./components/DashboardPreview";
import WhyEcoVerse from "./components/WhyEcoVerse";
import Builders from "./components/Builders";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import SimulationPage from "./pages/SimulationPage";

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <TrustedTech />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <WhyEcoVerse />
        <Builders />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
      </Routes>
    </BrowserRouter>
  );
}