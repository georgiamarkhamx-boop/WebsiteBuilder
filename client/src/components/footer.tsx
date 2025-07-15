export default function Footer() {
  const footerLinks = {
    product: [
      { name: "Courses", href: "#courses" },
      { name: "Services", href: "#services" },
      { name: "Dashboard", href: "#dashboard" },
      { name: "Pricing", href: "#pricing" }
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Blog", href: "#" }
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ]
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#') && sectionId !== '#') {
      const element = document.getElementById(sectionId.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="feature-icon feature-icon-purple">
                🛡️
              </div>
              <span className="ml-2 text-xl font-bold">Security Enhance</span>
            </div>
            <p className="text-gray-400 text-sm md:text-base">Making cybersecurity training effective, engaging, and accessible for everyone.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Security Compliance Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="mb-6">
            <h4 className="font-semibold mb-4 text-white text-center">🔒 Enterprise Security & Compliance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium text-white mb-2">Security Standards</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✓ OWASP Top 10 Compliant</li>
                  <li>✓ ISO 27001 Aligned</li>
                  <li>✓ SOC 2 Type II</li>
                  <li>✓ NIST Cybersecurity Framework</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium text-white mb-2">Data Protection</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✓ GDPR Compliant</li>
                  <li>✓ CCPA Compliant</li>
                  <li>✓ AES-256 Encryption</li>
                  <li>✓ TLS 1.3 Transport Security</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium text-white mb-2">Security Features</h5>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✓ Multi-Factor Authentication</li>
                  <li>✓ Password Hashing (Bcrypt)</li>
                  <li>✓ Rate Limiting & DDoS Protection</li>
                  <li>✓ Security Headers (HSTS, CSP)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-6 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
              <p>&copy; 2024 Security Enhance. All rights reserved.</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">🛡️ Secure</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">✓ Compliant</span>
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">🔒 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
