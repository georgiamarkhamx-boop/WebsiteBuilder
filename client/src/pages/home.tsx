import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturesSection from "@/components/features-section";
import AdvancedDashboard from "@/components/advanced-dashboard";
import AITTXSimulator from "@/components/ai-ttx-simulator";
import GamifiedLearning from "@/components/gamified-learning";
import SecurityAssessment from "@/components/security-assessment";
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
  const [activeView, setActiveView] = useState<'overview' | 'learning' | 'ttx' | 'assessment'>('overview');

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
        
        {/* Advanced Dashboard Section */}
        <section id="dashboard" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Centralized Security Command Center</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Integrated dashboard combining e-learning, TTX exercises, security assessments, analytics, and real-time threat monitoring
              </p>
            </div>
            
            <div className="mb-8 flex justify-center">
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setActiveView('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'overview' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview Dashboard
                </button>
                <button
                  onClick={() => setActiveView('learning')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'learning' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Gamified Learning
                </button>
                <button
                  onClick={() => setActiveView('ttx')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'ttx' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  AI TTX Simulator
                </button>
                <button
                  onClick={() => setActiveView('assessment')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'assessment' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Security Assessment
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeView === 'overview' && <AdvancedDashboard />}
              {activeView === 'learning' && <GamifiedLearning />}
              {activeView === 'ttx' && <AITTXSimulator />}
              {activeView === 'assessment' && <SecurityAssessment />}
            </div>
          </div>
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
