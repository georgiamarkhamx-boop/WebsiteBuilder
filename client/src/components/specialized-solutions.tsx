import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SpecializedSolutions() {
  const solutions = [
    {
      icon: "🏗️",
      title: "Zero-to-One Security Maturity Builder",
      description: "Start from scratch with our \"Cyber-in-a-Box\" solution for organizations with no existing security infrastructure.",
      tags: ["Charities", "Schools", "Startups", "Local Gov"],
      features: [
        "Plain-language security controls",
        "Ready-to-use templates & checklists",
        "Step-by-step implementation guides"
      ],
      buttonText: "Learn More",
      gradient: "feature-icon-green",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      icon: "🎯",
      title: "Sector-Specific Role-Based Training",
      description: "Tailored training modules for specific job roles and industry sectors, focusing on relevant threats and compliance requirements.",
      tags: ["Healthcare", "Education", "Non-Profit", "Finance"],
      features: [
        "Role-specific threat scenarios",
        "Industry-specific compliance guidance",
        "Customized learning paths"
      ],
      buttonText: "Explore Modules",
      gradient: "feature-icon-blue",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      icon: "📋",
      title: "Interactive Policy Builder + Scenario Tester",
      description: "Create, test, and refine your security policies through realistic scenarios that reveal gaps and weaknesses.",
      tags: ["Incident Response", "Data Breach", "Compliance"],
      features: [
        "Upload existing policies for testing",
        "Simulate real-world scenarios",
        "Identify and fix policy gaps"
      ],
      buttonText: "Try Demo",
      gradient: "feature-icon-purple",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      icon: "🌍",
      title: "Privacy & Data Protection with Local Laws",
      description: "Region-specific data protection training that adapts to your organization's geographic footprint and applicable regulations.",
      tags: ["GDPR", "CCPA", "PDPA", "HIPAA"],
      features: [
        "Location-based content delivery",
        "Multi-jurisdiction compliance",
        "Practical implementation guides"
      ],
      buttonText: "Learn More",
      gradient: "feature-icon-pink",
      badgeColor: "bg-pink-100 text-pink-800"
    },
    {
      icon: "🛡️",
      title: "Cyber Insurance Readiness Simulator",
      description: "Prepare for cyber insurance applications and reduce premiums by simulating insurer assessments and addressing gaps.",
      tags: ["Assessment", "Readiness", "Claims"],
      features: [
        "Insurer assessment simulation",
        "Premium reduction guidance",
        "Claims process training"
      ],
      buttonText: "Try Simulator",
      gradient: "feature-icon-green",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      icon: "👔",
      title: "Post-Incident Leadership Training",
      description: "Prepare executives for critical decisions after a breach with advanced tabletop exercises focused on the aftermath.",
      tags: ["Executive", "Board", "Leadership"],
      features: [
        "Regulatory notification decisions",
        "Ransom payment considerations",
        "Crisis communications"
      ],
      buttonText: "View Scenarios",
      gradient: "feature-icon-blue",
      badgeColor: "bg-blue-100 text-blue-800"
    }
  ];

  const handleSpecializedDemo = (type: string) => {
    alert(`${type} specialized solution demo would be shown here with tailored content and interactive examples.`);
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Specialized Solutions for Unique Needs</h2>
          <p className="text-lg text-gray-600">We've identified critical gaps in cybersecurity training and built targeted solutions to address them.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm card-hover animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`feature-icon ${solution.gradient} mb-4`}>
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
              <p className="text-gray-600 mb-4">{solution.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {solution.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className={solution.badgeColor}>
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
              
              <Button 
                variant="ghost" 
                className="text-primary hover:text-purple-800 p-0"
                onClick={() => handleSpecializedDemo(solution.title)}
              >
                {solution.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
