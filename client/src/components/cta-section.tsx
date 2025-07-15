import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onShowTryIt: () => void;
  onShowSignup: () => void;
}

export default function CTASection({ onShowTryIt, onShowSignup }: CTASectionProps) {
  return (
    <section className="py-12 sm:py-16 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-sm sm:text-lg mb-6 sm:mb-8 opacity-90 px-4">Join thousands of organizations improving their security posture with our comprehensive training platform.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md sm:max-w-none mx-auto">
          <Button 
            size="lg"
            variant="secondary"
            onClick={onShowTryIt}
            className="bg-white text-primary hover:bg-gray-100 text-sm sm:text-base px-4 sm:px-6"
          >
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
