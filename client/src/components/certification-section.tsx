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
    <section className="section-padding py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Recognized Certification</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">Every completed course earns a personalized certificate that employees can showcase and organizations can verify.</p>
            
            <div className="space-y-4">
              {certificationFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${feature.gradient} w-8 h-8 rounded mr-3 flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-sm">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Three Levels of Recognition</h3>
              <p className="text-gray-600">Certificates get more impressive as you advance through difficulty levels</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Beginner Certificate Preview */}
              <div className="text-center">
                <div className="bg-white border-2 border-green-200 rounded-lg shadow-lg p-4 mb-3 transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">STARTER</span>
                  </div>
                  <h4 className="font-semibold text-green-700 text-sm">Beginner</h4>
                  <p className="text-xs text-gray-600">Clean & Professional</p>
                </div>
                <div className="text-xs text-gray-500">Foundation Level</div>
              </div>
              
              {/* Intermediate Certificate Preview */}
              <div className="text-center">
                <div className="bg-white border-2 border-blue-200 rounded-lg shadow-xl p-4 mb-3 transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">EXPERT</span>
                  </div>
                  <h4 className="font-semibold text-blue-700 text-sm">Intermediate</h4>
                  <p className="text-xs text-gray-600">Enhanced Design</p>
                </div>
                <div className="text-xs text-gray-500">Professional Level</div>
              </div>
              
              {/* Advanced Certificate Preview */}
              <div className="text-center">
                <div className="bg-black border-2 border-purple-400 rounded-lg shadow-2xl p-4 mb-3 transform hover:scale-105 transition-transform relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MASTER</span>
                  </div>
                  <h4 className="font-semibold text-purple-400 text-sm">Advanced</h4>
                  <p className="text-xs text-gray-300">Premium & Elite</p>
                </div>
                <div className="text-xs text-gray-500">Elite Level</div>
              </div>
            </div>

            <div className="certificate-preview w-full max-w-lg mx-auto">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-full bg-white border-4 border-gradient-to-br from-purple-200 to-blue-200 rounded-lg shadow-2xl p-6">
                  {/* Certificate Header */}
                  <div className="text-center mb-4">
                    <div className="flex justify-center items-center mb-3">
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-2 mr-3">
                        <span className="text-white text-lg">🛡️</span>
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-800">Security Enhance</h1>
                        <p className="text-xs text-gray-600">Cybersecurity Training Platform</p>
                      </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto w-16"></div>
                  </div>

                  {/* Certificate Content */}
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Certificate of Excellence</h2>
                    <p className="text-gray-600 text-sm mb-3">This certifies that</p>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
                      Sarah Johnson
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">has successfully completed</p>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Cybersecurity Fundamentals</h4>
                    <p className="text-gray-600 text-sm mb-4">with a score of 95%</p>
                  </div>

                  {/* Certificate Footer */}
                  <div className="flex justify-between text-xs text-gray-600 mb-4">
                    <div>
                      <span className="font-semibold">Date</span><br />
                      June 15, 2024
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">Certificate ID</span><br />
                      SE-CF-2024-8742
                    </div>
                  </div>

                  {/* Verification */}
                  <div className="text-center pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Digitally signed and verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
