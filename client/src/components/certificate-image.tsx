import { Shield, Award, CheckCircle2, Star, Crown } from "lucide-react";

interface CertificateImageProps {
  name?: string;
  course?: string;
  date?: string;
  score?: number;
  certificateId?: string;
}

export default function CertificateImage({ 
  name = "Sarah Johnson", 
  course = "Cybersecurity Fundamentals",
  date = "June 15, 2024",
  score = 95,
  certificateId = "SE-CF-2024-8742"
}: CertificateImageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* Elegant outer border with gradient */}
      <div className="p-4 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Ornate header border */}
          <div className="h-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"></div>
          
          <div className="p-12 relative">
            {/* Decorative corner elements */}
            <div className="absolute top-6 left-6 w-16 h-16 border-l-4 border-t-4 border-blue-300 rounded-tl-2xl opacity-50"></div>
            <div className="absolute top-6 right-6 w-16 h-16 border-r-4 border-t-4 border-purple-300 rounded-tr-2xl opacity-50"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-blue-300 rounded-bl-2xl opacity-50"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-4 border-b-4 border-purple-300 rounded-br-2xl opacity-50"></div>
            
            {/* Watermark background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-3">
              <Shield className="w-72 h-72 text-gray-200" />
            </div>
            
            <div className="relative z-10">
              {/* Premium header */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 tracking-wide">
                      SECURITY ENHANCE
                    </h1>
                    <p className="text-sm text-gray-600 tracking-widest uppercase font-semibold">
                      Professional Training Institute
                    </p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full flex items-center justify-center shadow-xl">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="w-64 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full mx-auto"></div>
              </div>

              {/* Certificate title with premium styling */}
              <div className="text-center mb-10">
                <h2 className="text-5xl font-bold text-gray-800 mb-4 tracking-wide">
                  CERTIFICATE
                </h2>
                <h3 className="text-2xl font-semibold text-gray-700 tracking-widest">
                  OF PROFESSIONAL COMPLETION
                </h3>
                <div className="flex justify-center mt-4">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </div>
              </div>

              {/* Formal declaration */}
              <div className="text-center mb-8">
                <p className="text-xl text-gray-700 italic mb-6 font-light">
                  This is to hereby certify that
                </p>
                
                {/* Recipient name with elegant styling */}
                <div className="relative mb-6">
                  <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 mb-3 tracking-wide">
                    {name}
                  </h3>
                  <div className="w-96 h-px bg-gray-400 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-1 tracking-wide">CERTIFIED PROFESSIONAL</p>
                </div>
                
                <p className="text-xl text-gray-700 mb-6 font-light">
                  has successfully demonstrated mastery and completed all requirements for
                </p>
              </div>

              {/* Course details in premium box */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 mb-8 shadow-inner">
                <h4 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4">
                  {course}
                </h4>
                <div className="flex justify-center items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                    <span className="text-lg font-semibold text-gray-700">
                      Achievement Score: <span className="text-2xl text-green-600 font-bold">{score}%</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="text-lg font-semibold text-gray-700">Verified Excellence</span>
                  </div>
                </div>
              </div>

              {/* Official credentials section */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Date of Completion</p>
                  <p className="text-lg font-bold text-gray-800">{date}</p>
                  <div className="w-24 h-px bg-gray-400 mx-auto mt-2"></div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-2">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Authenticated</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Certificate ID</p>
                  <p className="text-lg font-bold font-mono text-gray-800">{certificateId}</p>
                  <div className="w-24 h-px bg-gray-400 mx-auto mt-2"></div>
                </div>
              </div>

              {/* Authority signatures */}
              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-40 h-px bg-gray-400 mx-auto mb-3"></div>
                  <p className="text-sm font-bold text-gray-800">Dr. Elena Rodriguez</p>
                  <p className="text-xs text-gray-600">Chief Training Officer</p>
                  <p className="text-xs text-gray-500">Security Enhance Institute</p>
                </div>
                <div className="text-center">
                  <div className="w-40 h-px bg-gray-400 mx-auto mb-3"></div>
                  <p className="text-sm font-bold text-gray-800">Michael Chen, CISSP</p>
                  <p className="text-xs text-gray-600">Director of Certification</p>
                  <p className="text-xs text-gray-500">Cybersecurity Excellence Board</p>
                </div>
              </div>

              {/* Verification footer */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-center items-center space-x-6 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className={`w-1 h-1 ${i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-400'} rounded-sm`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-600 font-semibold">Digital Verification Available</p>
                    <p className="text-xs text-gray-500">securityenhance.com/verify/{certificateId}</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
                  This certificate represents successful completion of rigorous cybersecurity training meeting industry standards. 
                  The holder has demonstrated comprehensive knowledge and practical skills in cybersecurity best practices and protocols.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom border */}
          <div className="h-3 bg-gradient-to-r from-blue-800 via-purple-600 to-blue-600"></div>
        </div>
      </div>
    </div>
  );
}