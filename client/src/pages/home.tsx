import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturesSection from "@/components/features-section";
import DashboardSection from "@/components/dashboard-section";
import SpecializedSolutions from "@/components/specialized-solutions";
import CertificationSection from "@/components/certification-section";
import CoursesSection from "@/components/courses-section";
import PricingSection from "@/components/pricing-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import DemoModal from "@/components/modals/demo-modal";
import TryItModal from "@/components/modals/try-it-modal";
import MaturityModal from "@/components/modals/maturity-modal";
import LoginModal from "@/components/modals/login-modal";
import SignupModal from "@/components/modals/signup-modal";

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showTryItModal, setShowTryItModal] = useState(false);
  const [showMaturityModal, setShowMaturityModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleShowSignup = (plan?: string) => {
    setSelectedPlan(plan || null);
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleShowLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleShowTryIt = () => {
    setShowDemoModal(false);
    setShowTryItModal(true);
  };

  const handleShowMaturity = () => {
    setShowTryItModal(false);
    setShowMaturityModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col smooth-scroll">
      <Navigation 
        onShowLogin={() => setShowLoginModal(true)}
        onShowTryIt={() => setShowTryItModal(true)}
      />
      
      <main className="flex-grow">
        <HeroSection 
          onShowDemo={() => setShowDemoModal(true)}
        />
        <StatsSection />
        <FeaturesSection />
        <section id="dashboard">
          <DashboardSection />
        </section>
        <section id="services">
          <SpecializedSolutions />
        </section>
        <CertificationSection />
        <section id="courses">
          <CoursesSection onShowSignup={handleShowSignup} />
        </section>
        <section id="pricing">
          <PricingSection onShowSignup={handleShowSignup} />
        </section>
        <CTASection 
          onShowTryIt={() => setShowTryItModal(true)}
          onShowSignup={() => handleShowSignup('growth')}
        />
      </main>

      <Footer />

      {/* Modals */}
      <DemoModal 
        open={showDemoModal}
        onOpenChange={setShowDemoModal}
        onShowTryIt={handleShowTryIt}
      />
      
      <TryItModal 
        open={showTryItModal}
        onOpenChange={setShowTryItModal}
        onShowMaturity={handleShowMaturity}
      />
      
      <MaturityModal 
        open={showMaturityModal}
        onOpenChange={setShowMaturityModal}
        onShowSignup={() => handleShowSignup('growth')}
      />
      
      <LoginModal 
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onShowSignup={() => handleShowSignup()}
      />
      
      <SignupModal 
        open={showSignupModal}
        onOpenChange={setShowSignupModal}
        onShowLogin={handleShowLogin}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
