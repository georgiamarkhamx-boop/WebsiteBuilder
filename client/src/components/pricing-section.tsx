import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onShowSignup: (plan?: string) => void;
}

export default function PricingSection({ onShowSignup }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleContactSales = () => {
    alert('Contact sales modal would be shown here with a form to get in touch with our sales team.');
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams",
      monthlyPrice: 99,
      yearlyPrice: 79,
      employees: "1-20 employees",
      features: [
        "Core eLearning modules",
        "1 TTX scenario",
        "Basic reporting",
        "Email support"
      ],
      popular: false
    },
    {
      id: "growth",
      name: "Growth",
      description: "For growing organizations",
      monthlyPrice: 500,
      yearlyPrice: 400,
      employees: "Up to 100 employees",
      features: [
        "All eLearning modules",
        "Unlimited TTX scenarios",
        "Compliance coach",
        "Advanced analytics",
        "Priority support"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 999,
      yearlyPrice: 799,
      employees: "100+ employees",
      features: [
        "Everything in Growth",
        "Custom branding",
        "Maturity assessment",
        "Dedicated support",
        "API access"
      ],
      popular: false
    },
    {
      id: "consultants",
      name: "Consultants",
      description: "For security consultants",
      monthlyPrice: null,
      yearlyPrice: null,
      employees: "Revenue sharing",
      features: [
        "Reseller pricing",
        "Facilitator tools",
        "White-label options",
        "Training materials"
      ],
      popular: false,
      isCustom: true
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that fits your organization's needs</p>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mt-8">
            <div className="pricing-toggle w-64 h-12 relative">
              <div className={`pricing-toggle-slider ${isYearly ? 'yearly' : ''}`}></div>
              <button 
                onClick={() => setIsYearly(false)}
                className={`absolute left-0 top-0 w-1/2 h-full flex items-center justify-center text-sm font-medium z-10 ${
                  !isYearly ? 'text-white' : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`absolute right-0 top-0 w-1/2 h-full flex items-center justify-center text-sm font-medium z-10 ${
                  isYearly ? 'text-white' : 'text-gray-600'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const price = plan.isCustom ? null : (isYearly ? plan.yearlyPrice : plan.monthlyPrice);
            
            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-lg p-6 card-hover relative ${
                  plan.popular ? 'border-2 border-primary' : 'border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {plan.isCustom ? (
                      <span>Custom</span>
                    ) : (
                      <>
                        £{price}
                        <span className="text-sm text-gray-500">/month</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">{plan.employees}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  onClick={() => plan.isCustom ? handleContactSales() : onShowSignup(plan.id)}
                >
                  {plan.isCustom ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
