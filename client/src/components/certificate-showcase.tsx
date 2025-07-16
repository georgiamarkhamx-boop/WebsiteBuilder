import CertificateImage from './certificate-image';

export default function CertificateShowcase() {
  return (
    <div className="space-y-12 p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Three-Tier Certificate System</h2>
        <p className="text-lg text-gray-600">Certificates become more impressive as you advance through difficulty levels</p>
      </div>

      {/* Beginner Certificate */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">🌱 Beginner Level Certificate</h3>
          <p className="text-gray-600">Clean, professional design for foundation courses</p>
        </div>
        <CertificateImage
          name="Alex Thompson"
          course="Cybersecurity Basics"
          date="July 16, 2025"
          score={88}
          certificateId="SE-CB-2025-1001"
          difficulty="Beginner"
        />
      </div>

      {/* Intermediate Certificate */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">⚡ Intermediate Level Certificate</h3>
          <p className="text-gray-600">Enhanced design with tech elements for professional courses</p>
        </div>
        <CertificateImage
          name="Sarah Johnson"
          course="Advanced Threat Detection"
          date="July 16, 2025"
          score={95}
          certificateId="SE-ATD-2025-2001"
          difficulty="Intermediate"
        />
      </div>

      {/* Advanced Certificate */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-purple-400 mb-2">🏆 Advanced Level Certificate</h3>
          <p className="text-gray-300">Premium, elite-level design for expert courses - the "show-off worthy" certificate</p>
        </div>
        <CertificateImage
          name="Dr. Marcus Kane"
          course="Elite Cybersecurity Leadership"
          date="July 16, 2025"
          score={97}
          certificateId="SE-ECL-2025-3001"
          difficulty="Advanced"
        />
      </div>
    </div>
  );
}