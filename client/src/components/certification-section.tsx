export default function CertificationSection() {
  const certificationFeatures = [
    {
      icon: "🏆",
      title: "Personalized Achievements",
      description: "Each certificate includes the employee's name, course details, and completion date.",
      gradient: "feature-icon-green"
    },
    {
      icon: "✓",
      title: "Digital Verification",
      description: "QR codes and unique identifiers make certificates easily verifiable by employers and clients.",
      gradient: "feature-icon-blue"
    },
    {
      icon: "💼",
      title: "LinkedIn Integration",
      description: "Certificates can be directly added to LinkedIn profiles to showcase security expertise.",
      gradient: "feature-icon-purple"
    },
    {
      icon: "📋",
      title: "Compliance Documentation",
      description: "Certificates help organizations demonstrate compliance with security requirements and regulations.",
      gradient: "feature-icon-pink"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recognized Certification</h2>
            <p className="text-lg text-gray-600 mb-6">Every completed course earns a personalized certificate that employees can showcase and organizations can verify.</p>
            
            <div className="space-y-4">
              {certificationFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${feature.gradient} w-8 h-8 rounded mr-3 flex items-center justify-center`}>
                    <span className="text-white text-sm">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="certificate-preview w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Professional certificate achievements" 
                className="w-full h-32 object-cover rounded-md mb-4" 
              />
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate of Completion</h3>
              <p className="text-gray-600 mb-4">This certifies that</p>
              <h4 className="text-lg font-semibold text-primary mb-2">Sarah Johnson</h4>
              <p className="text-gray-600 mb-2">has successfully completed</p>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Cybersecurity Fundamentals</h4>
              <p className="text-gray-600 mb-4">with a score of 95%</p>
              
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Date</span><br />
                  June 15, 2023
                </div>
                <div>
                  <span className="font-semibold">Certificate ID</span><br />
                  SE-CF-2023-8742
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Authorized by <span className="font-semibold">Security Enhance</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
