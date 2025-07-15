import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onShowTryIt: () => void;
  onShowSignup: () => void;
}

export default function CTASection({ onShowTryIt, onShowSignup }: CTASectionProps) {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Cybersecurity Training?</h2>
        <p className="text-lg mb-8 opacity-90">Join thousands of organizations who trust Security Enhance to keep their teams secure.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg"
            variant="secondary"
            onClick={onShowTryIt}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Try It First - No Email Required
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onShowSignup}
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
