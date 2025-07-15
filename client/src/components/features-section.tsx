export default function FeaturesSection() {
  const features = [
    {
      icon: "🎮",
      title: "Fun, Interactive Learning",
      description: "Engaging scenarios, games, and quizzes that make security training enjoyable while ensuring knowledge retention.",
      gradient: "feature-icon-purple"
    },
    {
      icon: "👔",
      title: "Role-Based Training",
      description: "Tailored content for different roles, ensuring technical staff and general employees receive appropriate training for their responsibilities.",
      gradient: "feature-icon-blue"
    },
    {
      icon: "🏆",
      title: "Certification & Tracking",
      description: "Employees earn certificates upon completion, while businesses gain access to comprehensive dashboards tracking progress and maturity.",
      gradient: "feature-icon-green"
    },
    {
      icon: "🌍",
      title: "Real-World Scenarios",
      description: "Training based on actual incidents and threats, providing practical knowledge that employees can immediately apply.",
      gradient: "feature-icon-pink"
    },
    {
      icon: "📊",
      title: "Maturity Assessment",
      description: "Track your organization's security posture improvement over time with our comprehensive maturity scoring system.",
      gradient: "feature-icon-purple"
    },
    {
      icon: "🎬",
      title: "Multimedia Learning",
      description: "Diverse content formats including videos, quizzes, games, and simulations to accommodate different learning styles.",
      gradient: "feature-icon-blue"
    }
  ];

  return (
    <section className="section-padding py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose Security Enhance?</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Our platform combines engaging content with proven learning techniques to make cybersecurity training effective and enjoyable.</p>
        </div>
        
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white mobile-spacing p-4 md:p-6 rounded-lg shadow-sm card-hover animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`feature-icon ${feature.gradient} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
