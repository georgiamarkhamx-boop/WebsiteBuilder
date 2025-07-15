import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onShowDemo: () => void;
}

export default function HeroSection({ onShowDemo }: HeroSectionProps) {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-fadeIn text-center md:text-left">
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Making Cybersecurity Fun, Interactive & Effective
            </h1>
            <p className="hero-subtitle text-base md:text-lg lg:text-xl mb-6 opacity-90 max-w-lg mx-auto md:mx-0">
              Bridging the human gap in security through engaging, interactive learning experiences that reduce incidents caused by human error.
            </p>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg mb-6 md:mb-8">
              <p className="font-medium text-sm md:text-base">
                <span className="text-yellow-200 font-bold">Did you know?</span> 95% of cybersecurity breaches are caused by human error. Our interactive training reduces this risk by up to 70%.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto md:mx-0">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={onShowDemo}
                className="bg-white text-primary hover:bg-gray-100 btn-touch w-full sm:w-auto"
              >
                Try Demo Module
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={scrollToPricing}
                className="btn-outline border-2 border-white text-white hover:bg-white hover:text-primary btn-touch w-full sm:w-auto font-medium shadow-md"
              >
                View Pricing
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block animate-slideIn">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 bg-red-400 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-green-400 rounded-full"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Professional team in cybersecurity training" 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center mb-3">
                  <div className="feature-icon-purple w-5 h-5 rounded mr-2 flex items-center justify-center">
                    <span className="text-sm">❓</span>
                  </div>
                  <span className="font-medium text-gray-800">Real-Life Scenario: Email Security</span>
                </div>
                <p className="text-gray-600 mb-3">
                  You've received an urgent email from your CEO asking for gift cards for a client. What would you do?
                </p>
                <div className="space-y-2">
                  <button 
                    onClick={onShowDemo}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded text-left text-sm transition-colors"
                  >
                    Reply with gift card information
                  </button>
                  <button 
                    onClick={onShowDemo}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded text-left text-sm transition-colors"
                  >
                    Forward to your manager
                  </button>
                  <button 
                    onClick={onShowDemo}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded text-left text-sm transition-colors"
                  >
                    Call the CEO directly to verify
                  </button>
                  <button 
                    onClick={onShowDemo}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded text-left text-sm transition-colors"
                  >
                    Report to IT security team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
