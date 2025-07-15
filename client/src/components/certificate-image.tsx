import { Shield, Award, CheckCircle2 } from "lucide-react";

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
    <div className="w-full max-w-2xl mx-auto bg-white border-8 border-gradient-to-br from-purple-200 to-blue-200 rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-4 mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Security Enhance</h1>
              <p className="text-sm text-gray-600">Cybersecurity Training Platform</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto w-24"></div>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Certificate of Completion</h2>
          <p className="text-gray-600">This certifies that</p>
        </div>

        {/* Recipient Name */}
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            {name}
          </h3>
          <p className="text-gray-600 text-lg">has successfully completed the course</p>
        </div>

        {/* Course Name */}
        <div className="text-center mb-8">
          <h4 className="text-2xl font-semibold text-gray-800 mb-2">{course}</h4>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1 text-purple-600" />
              <span>Score: {score}%</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {/* Date and Certificate ID */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-8">
          <div>
            <p className="font-semibold">Date of Completion</p>
            <p>{date}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Certificate ID</p>
            <p>{certificateId}</p>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex justify-center items-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-2">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs text-gray-600">Digital Verification</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
              <div className="grid grid-cols-4 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 ${i % 3 === 0 ? 'bg-gray-800' : 'bg-gray-400'} rounded-sm`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600">QR Code</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            This certificate is digitally signed and verified by Security Enhance
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Verify at: security-enhance.com/verify/{certificateId}
          </p>
        </div>
      </div>
    </div>
  );
}