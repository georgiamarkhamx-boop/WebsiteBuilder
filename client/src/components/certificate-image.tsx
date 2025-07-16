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
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden relative">
      {/* Diagonal geometric background elements inspired by the reference */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top diagonal section with cyber-tech gradient */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-slate-700 via-blue-800 to-cyan-900 transform -skew-y-3 origin-top-left scale-110"></div>
        
        {/* Bottom diagonal section */}
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-tl from-blue-900 via-purple-800 to-slate-700 transform skew-y-2 origin-bottom-right scale-110"></div>
        
        {/* Diagonal accent stripe */}
        <div className="absolute top-20 left-0 w-full h-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 transform -skew-y-3 origin-top-left scale-110"></div>
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-8 h-full gap-1 p-4">
            {[...Array(96)].map((_, i) => (
              <div key={i} className={`bg-blue-400 ${i % 3 === 0 ? 'opacity-100' : 'opacity-30'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main certificate content */}
      <div className="relative z-10 bg-gradient-to-br from-gray-50 to-white p-12">
        
        {/* Header with cyber-tech styling */}
        <div className="text-left mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-700 tracking-wide mb-1">
                CERTIFICATE
              </h1>
              <h2 className="text-lg text-slate-600 tracking-widest uppercase font-light">
                OF CYBER EXCELLENCE
              </h2>
            </div>
            
            {/* Premium cyber award badge */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-bold text-xs">CYBER</div>
                    <Shield className="w-6 h-6 text-white mx-auto my-1" />
                    <div className="text-white font-bold text-xs">EXPERT</div>
                  </div>
                </div>
              </div>
              {/* Award ribbon */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-red-500 to-red-700 clip-path-ribbon"></div>
            </div>
          </div>
        </div>

        {/* Certification statement */}
        <div className="mb-8">
          <p className="text-slate-600 text-sm uppercase tracking-wide mb-4">
            This certificate is presented to
          </p>
          
          {/* Recipient name with elegant script styling */}
          <div className="mb-6">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-700 mb-2 italic">
              {name}
            </h3>
            <div className="w-64 h-px bg-slate-400"></div>
          </div>
        </div>

        {/* Course achievement description */}
        <div className="mb-8">
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            For successfully demonstrating advanced cybersecurity competency and completing comprehensive training in digital protection protocols, threat analysis, and security implementation. This achievement represents mastery of critical skills essential for modern cyber defense.
          </p>
          
          {/* Course title with tech styling */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
            <h4 className="text-xl font-bold text-slate-800 mb-1">{course}</h4>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1 text-orange-500" />
                <span>Score: <span className="font-bold text-green-600">{score}%</span></span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                <span>Verified & Authenticated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with credentials */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
          {/* Date section */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Date</p>
            <p className="text-sm font-semibold text-slate-700">{date}</p>
            <div className="w-24 h-px bg-slate-400 mt-2"></div>
          </div>
          
          {/* Signature section */}
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Digital Signature</p>
            <p className="text-sm font-semibold text-slate-700">Dr. Alex Chen, CISSP</p>
            <p className="text-xs text-slate-500">Chief Security Officer</p>
            <div className="w-24 h-px bg-slate-400 mt-2 ml-auto"></div>
          </div>
        </div>

        {/* Tech-inspired footer with verification */}
        <div className="mt-8 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">
                <div className="grid grid-cols-3 gap-px">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${i % 2 === 0 ? 'bg-slate-700' : 'bg-slate-400'} rounded-sm`} />
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-500">
                <p className="font-mono">ID: {certificateId}</p>
                <p>Verify: cyberenhance.security/verify</p>
              </div>
            </div>
            
            <div className="text-right text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Security Enhance</p>
              <p>Cyber Training Institute</p>
            </div>
          </div>
        </div>

        {/* Cyber security watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3 pointer-events-none">
          <div className="flex items-center justify-center">
            <Shield className="w-48 h-48 text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
}