import { Shield, Award, CheckCircle2, Star, Crown } from "lucide-react";

interface CertificateImageProps {
  name?: string;
  course?: string;
  date?: string;
  score?: number;
  certificateId?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function CertificateImage({ 
  name = "Sarah Johnson", 
  course = "Cybersecurity Fundamentals",
  date = "June 15, 2024",
  score = 95,
  certificateId = "SE-CF-2024-8742",
  difficulty = "Intermediate"
}: CertificateImageProps) {
  // Define certificate styling based on difficulty level
  const getCertificateStyles = () => {
    switch (difficulty) {
      case 'Beginner':
        return {
          containerClass: "w-full max-w-4xl mx-auto bg-white shadow-lg overflow-hidden relative border-2 border-green-200",
          bgGradients: {
            top: "bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800",
            bottom: "bg-gradient-to-tl from-teal-700 via-green-800 to-emerald-700",
            accent: "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500"
          },
          badge: {
            outer: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
            inner: "bg-gradient-to-br from-green-300 to-emerald-400",
            text: "CYBER\nSTARTER"
          },
          title: "CERTIFICATE",
          subtitle: "OF COMPLETION",
          patternColor: "bg-green-400"
        };
      
      case 'Advanced':
        return {
          containerClass: "w-full max-w-4xl mx-auto bg-black shadow-2xl overflow-hidden relative border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500",
          bgGradients: {
            top: "bg-gradient-to-br from-purple-900 via-pink-900 to-red-900",
            bottom: "bg-gradient-to-tl from-red-900 via-purple-900 to-pink-900",
            accent: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-500"
          },
          badge: {
            outer: "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500",
            inner: "bg-gradient-to-br from-purple-300 to-pink-400",
            text: "CYBER\nMASTER"
          },
          title: "ELITE CERTIFICATE",
          subtitle: "OF MASTERY & EXCELLENCE",
          patternColor: "bg-purple-400"
        };
      
      default: // Intermediate
        return {
          containerClass: "w-full max-w-4xl mx-auto bg-white shadow-xl overflow-hidden relative",
          bgGradients: {
            top: "bg-gradient-to-br from-slate-700 via-blue-800 to-cyan-900",
            bottom: "bg-gradient-to-tl from-blue-900 via-purple-800 to-slate-700",
            accent: "bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
          },
          badge: {
            outer: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
            inner: "bg-gradient-to-br from-yellow-300 to-orange-400",
            text: "CYBER\nEXPERT"
          },
          title: "CERTIFICATE",
          subtitle: "OF CYBER EXCELLENCE",
          patternColor: "bg-blue-400"
        };
    }
  };

  const styles = getCertificateStyles();
  const isAdvanced = difficulty === 'Advanced';
  const textColorClass = isAdvanced ? 'text-white' : 'text-slate-700';
  const subtleTextClass = isAdvanced ? 'text-gray-300' : 'text-slate-600';
  const bgClass = isAdvanced ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-50 to-white';

  return (
    <div className={styles.containerClass}>
      {/* Diagonal geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top diagonal section */}
        <div className={`absolute top-0 left-0 w-full h-40 ${styles.bgGradients.top} transform -skew-y-3 origin-top-left scale-110`}></div>
        
        {/* Bottom diagonal section */}
        <div className={`absolute bottom-0 right-0 w-full h-32 ${styles.bgGradients.bottom} transform skew-y-2 origin-bottom-right scale-110`}></div>
        
        {/* Diagonal accent stripe */}
        <div className={`absolute top-20 left-0 w-full h-3 ${styles.bgGradients.accent} transform -skew-y-3 origin-top-left scale-110`}></div>
        
        {/* Advanced tier gets animated particles */}
        {isAdvanced && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-8 h-full gap-1 p-4">
            {[...Array(96)].map((_, i) => (
              <div key={i} className={`${styles.patternColor} ${i % 3 === 0 ? 'opacity-100' : 'opacity-30'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main certificate content */}
      <div className={`relative z-10 ${bgClass} p-12`}>
        
        {/* Header with tier-specific styling */}
        <div className="text-left mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${textColorClass} tracking-wide mb-1`}>
                {styles.title}
              </h1>
              <h2 className={`text-lg ${subtleTextClass} tracking-widest uppercase font-light`}>
                {styles.subtitle}
              </h2>
            </div>
            
            {/* Tier-specific award badge */}
            <div className="relative">
              <div className={`w-24 h-24 ${styles.badge.outer} rounded-full flex items-center justify-center shadow-xl`}>
                <div className={`w-20 h-20 ${styles.badge.inner} rounded-full flex items-center justify-center`}>
                  <div className="text-center">
                    {styles.badge.text.split('\n').map((line, i) => (
                      <div key={i} className="text-white font-bold text-xs">{line}</div>
                    ))}
                    <Shield className="w-6 h-6 text-white mx-auto my-1" />
                  </div>
                </div>
              </div>
              {/* Award ribbon */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-red-500 to-red-700"></div>
              
              {/* Advanced tier gets additional effects */}
              {isAdvanced && (
                <>
                  <div className="absolute -inset-2 rounded-full border-2 border-purple-400 animate-pulse"></div>
                  <div className="absolute -inset-4 rounded-full border border-pink-300 opacity-50 animate-ping"></div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Certification statement */}
        <div className="mb-8">
          <p className={`${subtleTextClass} text-sm uppercase tracking-wide mb-4`}>
            This certificate is presented to
          </p>
          
          {/* Recipient name with tier-specific styling */}
          <div className="mb-6">
            <h3 className={`text-4xl font-bold text-transparent bg-clip-text ${
              difficulty === 'Beginner' 
                ? 'bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700' 
                : difficulty === 'Advanced'
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400'
                : 'bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-700'
            } mb-2 italic`}>
              {name}
            </h3>
            <div className={`w-64 h-px ${isAdvanced ? 'bg-gray-400' : 'bg-slate-400'}`}></div>
          </div>
        </div>

        {/* Course achievement description - varies by tier */}
        <div className="mb-8">
          <p className={`${subtleTextClass} text-sm mb-4 leading-relaxed`}>
            {difficulty === 'Beginner' 
              ? 'For successfully completing foundational cybersecurity training and demonstrating essential knowledge in digital security practices. This achievement marks the beginning of a professional cybersecurity journey.'
              : difficulty === 'Advanced'
              ? 'For achieving elite-level mastery in advanced cybersecurity operations, demonstrating exceptional expertise in threat hunting, incident response, and strategic security leadership. This certification represents the pinnacle of cybersecurity excellence.'
              : 'For successfully demonstrating advanced cybersecurity competency and completing comprehensive training in digital protection protocols, threat analysis, and security implementation. This achievement represents mastery of critical skills essential for modern cyber defense.'
            }
          </p>
          
          {/* Course title with tier-specific styling */}
          <div className={`${
            difficulty === 'Beginner'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500'
              : difficulty === 'Advanced'
              ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-l-4 border-purple-400'
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500'
          } p-4 rounded-lg mb-4`}>
            <h4 className={`text-xl font-bold ${textColorClass} mb-1`}>{course}</h4>
            <div className={`flex items-center space-x-4 text-sm ${subtleTextClass}`}>
              <div className="flex items-center">
                <Award className={`w-4 h-4 mr-1 ${
                  difficulty === 'Beginner' ? 'text-green-500' :
                  difficulty === 'Advanced' ? 'text-purple-400' : 'text-orange-500'
                }`} />
                <span>Score: <span className="font-bold text-green-600">{score}%</span></span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                <span>Verified & Authenticated</span>
              </div>
              {difficulty === 'Advanced' && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>Elite Level</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section with credentials */}
        <div className={`grid grid-cols-2 gap-8 pt-6 border-t ${isAdvanced ? 'border-gray-600' : 'border-slate-200'}`}>
          {/* Date section */}
          <div>
            <p className={`text-xs ${subtleTextClass} uppercase tracking-widest mb-1`}>Date</p>
            <p className={`text-sm font-semibold ${textColorClass}`}>{date}</p>
            <div className={`w-24 h-px ${isAdvanced ? 'bg-gray-400' : 'bg-slate-400'} mt-2`}></div>
          </div>
          
          {/* Signature section - varies by tier */}
          <div className="text-right">
            <p className={`text-xs ${subtleTextClass} uppercase tracking-widest mb-1`}>Digital Signature</p>
            <p className={`text-sm font-semibold ${textColorClass}`}>
              {difficulty === 'Beginner' 
                ? 'Sarah Williams, GSEC'
                : difficulty === 'Advanced'
                ? 'Dr. Marcus Kane, CISSP'
                : 'Dr. Alex Chen, CISSP'
              }
            </p>
            <p className={`text-xs ${subtleTextClass}`}>
              {difficulty === 'Beginner' 
                ? 'Training Coordinator'
                : difficulty === 'Advanced'
                ? 'Elite Certification Authority'
                : 'Chief Security Officer'
              }
            </p>
            <div className={`w-24 h-px ${isAdvanced ? 'bg-gray-400' : 'bg-slate-400'} mt-2 ml-auto`}></div>
          </div>
        </div>

        {/* Tech-inspired footer with verification */}
        <div className={`mt-8 pt-4 border-t ${isAdvanced ? 'border-gray-600' : 'border-slate-200'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${isAdvanced ? 'bg-gray-700' : 'bg-slate-200'} rounded flex items-center justify-center`}>
                <div className="grid grid-cols-3 gap-px">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${i % 2 === 0 ? 
                      (isAdvanced ? 'bg-purple-400' : 'bg-slate-700') : 
                      (isAdvanced ? 'bg-gray-400' : 'bg-slate-400')
                    } rounded-sm`} />
                  ))}
                </div>
              </div>
              <div className={`text-xs ${subtleTextClass}`}>
                <p className="font-mono">ID: {certificateId}</p>
                <p>Verify: cyberenhance.security/verify</p>
              </div>
            </div>
            
            <div className={`text-right text-xs ${subtleTextClass}`}>
              <p className={`font-semibold ${textColorClass}`}>Security Enhance</p>
              <p>
                {difficulty === 'Beginner' 
                  ? 'Foundational Training'
                  : difficulty === 'Advanced'
                  ? 'Elite Cyber Academy'
                  : 'Cyber Training Institute'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Tier-specific watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3 pointer-events-none">
          <div className="flex items-center justify-center">
            <Shield className={`w-48 h-48 ${
              difficulty === 'Beginner' ? 'text-green-200' :
              difficulty === 'Advanced' ? 'text-purple-200' : 'text-blue-200'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}