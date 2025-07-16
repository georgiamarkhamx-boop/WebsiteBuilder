import CertificateImage from './certificate-image';
import { Course } from '@shared/schema';

interface CourseCompletionCertificateProps {
  course: Course;
  score: number;
  studentName?: string;
}

export default function CourseCompletionCertificate({ 
  course, 
  score, 
  studentName = "Sarah Johnson" 
}: CourseCompletionCertificateProps) {
  const generateCertificateId = () => {
    const prefix = course.difficulty === 'Beginner' ? 'SE-BG' : 
                   course.difficulty === 'Advanced' ? 'SE-AD' : 'SE-IN';
    const date = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}-${date}-${random}`;
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
        <p className="text-gray-600">You've completed the {course.title} training</p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
          {course.difficulty} Level Certificate
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg text-center">
        <h3 className="font-bold text-xl mb-2">🏆 Certificate Earned!</h3>
        <p className="text-sm opacity-90 mb-4">Your {course.difficulty} level certificate is ready for download</p>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
          <div className="text-lg font-bold">
            {course.difficulty === 'Beginner' ? 'CYBER STARTER' : 
             course.difficulty === 'Advanced' ? 'CYBER MASTER' : 'CYBER EXPERT'}
          </div>
          <div className="text-sm opacity-90">Professional Certification • Score: {score}%</div>
        </div>
      </div>

      <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
        <h4 className="font-semibold text-gray-800 mb-4 text-center">Your Official Certificate</h4>
        <CertificateImage
          name={studentName}
          course={course.title}
          date={today}
          score={score}
          certificateId={generateCertificateId()}
          difficulty={course.difficulty}
        />
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-4">🎯 Next Steps:</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <div className="font-medium">Share Your Achievement</div>
              <div className="text-sm text-gray-600">Add this certificate to your LinkedIn profile and professional portfolio</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <div className="font-medium">Continue Learning</div>
              <div className="text-sm text-gray-600">
                Advance to {course.difficulty === 'Beginner' ? 'Intermediate' : 
                           course.difficulty === 'Intermediate' ? 'Advanced' : 'Expert'} level courses
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <div className="font-medium">Apply Your Knowledge</div>
              <div className="text-sm text-gray-600">Implement the security practices you've learned in your daily work</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}