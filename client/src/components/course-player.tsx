import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, PlayCircle, Book, Award, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@shared/schema";
import CourseCompletionCertificate from "./course-completion-certificate";

interface CoursePlayerProps {
  course: Course;
  onComplete: (courseId: number, score: number) => void;
  onClose: () => void;
}

interface Module {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'simulation';
  content: string;
  duration: number;
  questions?: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function CoursePlayer({ course, onComplete, onClose }: CoursePlayerProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [courseScore, setCourseScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Generate comprehensive course modules based on course content
  const getModulesForCourse = (course: Course): Module[] => {
    // Tech for Founders Courses
    if (course.category === "founders") {
      return getFoundersCourseModules(course);
    }
    
    // AI & Business Courses  
    if (course.category === "ai_business") {
      return getAIBusinessCourseModules(course);
    }
    
    // Default cybersecurity courses
    return getCybersecurityCourseModules(course);
  };

  const getFoundersCourseModules = (course: Course): Module[] => {
    return [
      {
        id: 1,
        title: "Welcome & Learning Objectives",
        type: 'text' as const,
        content: `
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-bold mb-4">Welcome to ${course.title}</h2>
              <div class="text-4xl mb-4">${course.icon}</div>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">What You'll Learn:</h3>
              <ul class="space-y-2 text-sm">
                <li>✓ Essential technology stack components</li>
                <li>✓ Cost-effective scaling strategies</li>
                <li>✓ Security best practices for startups</li>
                <li>✓ Team collaboration tools</li>
                <li>✓ Performance optimization techniques</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Why This Matters:</h3>
              <p class="text-sm">90% of startups fail due to poor technology decisions. The right tech stack can save you $50K+ and 6 months of development time while ensuring scalability for growth.</p>
            </div>
          </div>
        `,
        duration: 8
      },
      {
        id: 2,
        title: "3D Tech Stack Builder",
        type: 'simulation' as const,
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg">
              <h3 class="font-bold mb-3">🏗️ IMMERSIVE TECH STACK BUILDER</h3>
              <p>Step into a 3D virtual environment where you'll architect and build your technology stack from the ground up.</p>
            </div>
            
            <div class="bg-gray-900 text-white p-6 rounded-lg">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-orange-400 font-bold">DEVELOPMENT ENVIRONMENT ACTIVE</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-800 p-4 rounded border border-orange-500">
                  <div class="text-orange-400 font-semibold mb-2">🎯 Frontend Layer</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-orange-900 p-2 rounded">
                      <div class="text-orange-300">React.js - User Interface</div>
                      <div class="text-orange-300">Next.js - Framework</div>
                      <div class="text-orange-300">Tailwind - Styling</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ Performance: 95/100</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded border border-blue-500">
                  <div class="text-blue-400 font-semibold mb-2">🗄️ Backend Layer</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-blue-900 p-2 rounded">
                      <div class="text-blue-300">Node.js - Runtime</div>
                      <div class="text-blue-300">Express - API</div>
                      <div class="text-blue-300">PostgreSQL - Database</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ Scalability: Ready</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded border border-purple-500">
                  <div class="text-purple-400 font-semibold mb-2">☁️ Cloud Layer</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-purple-900 p-2 rounded">
                      <div class="text-purple-300">AWS/Vercel - Hosting</div>
                      <div class="text-purple-300">CDN - Content Delivery</div>
                      <div class="text-purple-300">Auto-scaling - Traffic</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ Cost: $12/month</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded border border-green-500">
                  <div class="text-green-400 font-semibold mb-2">🔒 Security Layer</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-green-900 p-2 rounded">
                      <div class="text-green-300">SSL/TLS - Encryption</div>
                      <div class="text-green-300">OAuth - Authentication</div>
                      <div class="text-green-300">Rate Limiting - Protection</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ Security Score: A+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 class="font-bold text-blue-800 mb-2">🎮 Interactive Challenge</h4>
              <p class="text-blue-700 text-sm">Drag and drop technology components to build your optimal tech stack. Consider factors like cost, scalability, and team expertise.</p>
            </div>
          </div>
        `,
        duration: 35
      },
      {
        id: 3,
        title: "Tech Stack Architecture Quiz",
        type: 'quiz' as const,
        content: "Test your knowledge of building scalable tech stacks",
        duration: 15,
        questions: [
          {
            id: 1,
            question: "In the 3D Tech Stack Builder, what was the estimated monthly cost for a complete scalable stack?",
            options: [
              "$5/month",
              "$12/month", 
              "$50/month",
              "$200/month"
            ],
            correctAnswer: 1,
            explanation: "✅ The Cloud Layer showed $12/month for a complete scalable stack including hosting, CDN, and auto-scaling capabilities."
          },
          {
            id: 2,
            question: "According to the Security Layer in the simulation, what achieved an A+ security score?",
            options: [
              "Password protection only",
              "SSL/TLS, OAuth, and Rate Limiting combined",
              "Expensive security software", 
              "Manual security reviews"
            ],
            correctAnswer: 1,
            explanation: "✅ The combination of SSL/TLS encryption, OAuth authentication, and rate limiting protection achieved the A+ security score."
          },
          {
            id: 3,
            question: "What was the performance score achieved by the Frontend Layer in the tech stack builder?",
            options: [
              "85/100",
              "90/100",
              "95/100", 
              "100/100"
            ],
            correctAnswer: 2,
            explanation: "✅ The Frontend Layer with React.js, Next.js, and Tailwind achieved a 95/100 performance score, showing excellent optimization."
          }
        ]
      },
      {
        id: 4,
        title: "Action Plan & Certification",
        type: 'text' as const,
        content: `
          <div class="space-y-6">
            <div class="text-center">
              <div class="text-4xl mb-4">🎉</div>
              <h2 class="text-2xl font-bold mb-2">Congratulations!</h2>
              <p class="text-gray-600">You've completed the ${course.title} training</p>
            </div>
            
            <div class="bg-orange-50 p-6 rounded-lg">
              <h3 class="font-bold text-orange-800 mb-4">🚀 Your Tech Stack Action Plan:</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div class="font-medium">Start with MVP Stack</div>
                    <div class="text-sm text-gray-600">Begin with React + Node.js + PostgreSQL for rapid prototyping</div>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div class="font-medium">Implement Security First</div>
                    <div class="text-sm text-gray-600">Set up SSL, OAuth, and rate limiting from day one</div>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div class="font-medium">Plan for Scale</div>
                    <div class="text-sm text-gray-600">Design your architecture to handle 10x growth from the start</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-6 rounded-lg">
              <h3 class="font-bold text-blue-800 mb-2">📜 Digital Certificate</h3>
              <p class="text-sm text-blue-700">Your tech stack certification is being generated and will be available for download and LinkedIn sharing.</p>
            </div>
          </div>
        `,
        duration: 10
      }
    ];
  };

  const getAIBusinessCourseModules = (course: Course): Module[] => {
    return [
      {
        id: 1,
        title: "Welcome & Learning Objectives",
        type: 'text' as const,
        content: `
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-bold mb-4">Welcome to ${course.title}</h2>
              <div class="text-4xl mb-4">${course.icon}</div>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">What You'll Learn:</h3>
              <ul class="space-y-2 text-sm">
                <li>✓ AI tools for business automation</li>
                <li>✓ ROI measurement and optimization</li>
                <li>✓ Practical implementation strategies</li>
                <li>✓ Risk management and compliance</li>
                <li>✓ Future-proofing your business</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Why This Matters:</h3>
              <p class="text-sm">Companies using AI see 247% average ROI increase and 40% productivity gains. Don't get left behind - learn to leverage AI for competitive advantage.</p>
            </div>
          </div>
        `,
        duration: 8
      },
      {
        id: 2,
        title: "3D AI Command Center",
        type: 'simulation' as const,
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
              <h3 class="font-bold mb-3">🚀 IMMERSIVE AI COMMAND CENTER</h3>
              <p>Enter a virtual AI laboratory where you'll interact with cutting-edge tools in a 3D workspace environment.</p>
            </div>
            
            <div class="bg-gray-900 text-white p-6 rounded-lg">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-cyan-400 font-bold">AI SYSTEMS ONLINE - NEURAL NETWORK ACTIVE</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-800 p-4 rounded border border-blue-500">
                  <div class="text-blue-400 font-semibold mb-2">🎯 Prompt Lab</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-blue-900 p-2 rounded">
                      <div class="text-blue-300">ChatGPT Integration</div>
                      <div class="text-blue-300">Custom Prompt Library</div>
                      <div class="text-blue-300">A/B Testing Suite</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ Input Quality: 94%</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded border border-purple-500">
                  <div class="text-purple-400 font-semibold mb-2">🤖 Automation Hub</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-purple-900 p-2 rounded">
                      <div class="text-purple-300">Workflow Automation</div>
                      <div class="text-purple-300">Email Processing</div>
                      <div class="text-purple-300">Data Analysis</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ Efficiency: +340%</div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded border border-green-500">
                  <div class="text-green-400 font-semibold mb-2">📊 Analytics Hub</div>
                  <div class="text-sm space-y-2">
                    <div class="bg-green-900 p-2 rounded">
                      <div class="text-green-300">Performance Metrics</div>
                      <div class="text-green-300">ROI Tracking</div>
                      <div class="text-green-300">Predictive Insights</div>
                    </div>
                    <div class="bg-green-800 p-2 rounded">
                      <div class="text-green-300">✅ ROI Impact: +247%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 bg-gray-800 p-4 rounded border border-yellow-500">
                <div class="text-yellow-400 font-semibold mb-2">🧪 Testing Chamber</div>
                <div class="text-sm">
                  <div class="text-yellow-300 mb-2">Running 1,247 AI optimization iterations...</div>
                  <div class="bg-yellow-900 p-2 rounded">
                    <div class="text-yellow-300">Success Rate: 89% | Processing Speed: 12.3x faster</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 class="font-bold text-blue-800 mb-2">🎮 Interactive Challenge</h4>
              <p class="text-blue-700 text-sm">Configure AI models and optimization parameters to maximize business ROI. Monitor real-time performance metrics.</p>
            </div>
          </div>
        `,
        duration: 35
      },
      {
        id: 3,
        title: "AI Business Implementation Quiz",
        type: 'quiz' as const,
        content: "Test your understanding of AI business applications",
        duration: 15,
        questions: [
          {
            id: 1,
            question: "In the AI Command Center simulation, what was the most important factor for prompt optimization?",
            options: [
              "Using complex technical language",
              "Providing specific context and clear instructions",
              "Making prompts as short as possible",
              "Using multiple AI models simultaneously"
            ],
            correctAnswer: 1,
            explanation: "✅ Specificity and clear context are crucial for effective AI prompts. The simulation showed 94% input quality when prompts included detailed instructions and specific requirements."
          },
          {
            id: 2,
            question: "Based on the Analytics Hub in the 3D lab, what was the average ROI impact of properly implemented AI?",
            options: [
              "+150%",
              "+200%",
              "+247%",
              "+300%"
            ],
            correctAnswer: 2,
            explanation: "✅ The Analytics Hub showed a +247% ROI impact when AI tools are properly configured and integrated into business workflows."
          },
          {
            id: 3,
            question: "The Testing Chamber demonstrated that successful AI implementation requires:",
            options: [
              "Perfect results on the first try",
              "Continuous iteration and testing",
              "Expensive enterprise software",
              "Technical expertise only"
            ],
            correctAnswer: 1,
            explanation: "✅ The Testing Chamber showed 1,247 iterations with 89% success rate, demonstrating that continuous testing and refinement are key to AI success."
          }
        ]
      },
      {
        id: 4,
        title: "Action Plan & Certification",
        type: 'text' as const,
        content: `
          <div class="space-y-6">
            <div class="text-center">
              <div class="text-4xl mb-4">🎉</div>
              <h2 class="text-2xl font-bold mb-2">Congratulations!</h2>
              <p class="text-gray-600">You've completed the ${course.title} training</p>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-lg">
              <h3 class="font-bold text-purple-800 mb-4">🤖 Your AI Implementation Action Plan:</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div class="font-medium">Start with ChatGPT Integration</div>
                    <div class="text-sm text-gray-600">Begin automating content creation and customer service</div>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div class="font-medium">Measure and Optimize</div>
                    <div class="text-sm text-gray-600">Track ROI metrics and continuously refine your AI workflows</div>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div class="font-medium">Scale Strategically</div>
                    <div class="text-sm text-gray-600">Expand AI integration based on proven results and business needs</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-6 rounded-lg">
              <h3 class="font-bold text-blue-800 mb-2">📜 Digital Certificate</h3>
              <p class="text-sm text-blue-700">Your AI business certification is being generated and will be available for download and LinkedIn sharing.</p>
            </div>
          </div>
        `,
        duration: 10
      }
    ];
  };

  const getCybersecurityCourseModules = (course: Course): Module[] => {
    const baseModules = [
      {
        id: 1,
        title: "Welcome & Learning Objectives",
        type: 'text' as const,
        content: `
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-bold mb-4">Welcome to ${course.title}</h2>
              <div class="text-4xl mb-4">${course.icon}</div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">What You'll Learn:</h3>
              <ul class="space-y-2 text-sm">
                <li>✓ Core concepts and terminology</li>
                <li>✓ Real-world attack scenarios</li>
                <li>✓ Hands-on defensive techniques</li>
                <li>✓ Best practices for your role</li>
                <li>✓ Emergency response procedures</li>
              </ul>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">Why This Matters:</h3>
              <p class="text-sm">Cybersecurity incidents cost organizations an average of $4.45 million per breach. This training will help you become a human firewall, protecting your organization from the 95% of attacks that target people, not technology.</p>
            </div>
          </div>
        `,
        duration: 8
      },
      {
        id: 2,
        title: "Interactive Video Learning",
        type: 'video' as const,
        content: `
          <div class="space-y-4">
            <div class="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center text-white">
              <div class="text-center">
                <div class="text-6xl mb-4">🎬</div>
                <h3 class="text-xl font-bold mb-2">Expert-Led Training Video</h3>
                <p class="text-sm opacity-90">Interactive lessons with real cybersecurity experts</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-3 rounded text-center">
                <div class="text-2xl mb-1">📊</div>
                <div class="text-xs font-medium">Interactive Slides</div>
              </div>
              <div class="bg-gray-50 p-3 rounded text-center">
                <div class="text-2xl mb-1">🎯</div>
                <div class="text-xs font-medium">Real Examples</div>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🎥 Video Chapters:</h4>
              <ul class="text-sm space-y-1">
                <li>• Introduction to ${course.title}</li>
                <li>• Common Attack Vectors</li>
                <li>• Recognition Techniques</li>
                <li>• Response Protocols</li>
                <li>• Case Studies & Examples</li>
              </ul>
            </div>
          </div>
        `,
        duration: 25
      },
      {
        id: 3,
        title: "Hands-On Simulation",
        type: 'simulation' as const,
        content: `
          <div class="space-y-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 class="font-bold text-red-800 mb-2">🚨 LIVE SIMULATION</h3>
              <p class="text-red-700 text-sm">You're about to experience a realistic cybersecurity scenario. Make decisions as if this were happening in your actual workplace.</p>
            </div>
            
            <div class="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="ml-2 text-sm font-medium">Outlook - Inbox</span>
              </div>
              
              <div class="border-l-4 border-red-500 pl-4 mb-4">
                <div class="text-sm font-medium mb-1">From: ceo@company.com</div>
                <div class="text-sm font-medium mb-1">Subject: URGENT - Need Gift Cards ASAP</div>
                <div class="text-xs text-gray-500 mb-3">Received: 2 minutes ago</div>
                <div class="text-sm">
                  Hi,<br><br>
                  I need you to purchase 5 x $100 Amazon gift cards for a client meeting TODAY. Please send me the codes ASAP as I'm in meetings all day and can't do this myself.<br><br>
                  Thanks!<br>
                  CEO
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🎯 Your Mission:</h4>
              <p class="text-sm">This is a sophisticated social engineering attack. Choose your response carefully - your decision will affect your organization's security posture.</p>
            </div>
          </div>
        `,
        duration: 30
      }
    ];

    // Add course-specific advanced modules
    if (course.title === "Phishing Awareness") {
      baseModules.push({
        id: 4,
        title: "Advanced Phishing Detection",
        type: 'quiz' as const,
        content: "Master the art of spotting sophisticated phishing attempts",
        duration: 15,
        questions: [
          {
            id: 1,
            question: "You receive an email claiming to be from your bank asking you to verify your account. The email looks legitimate with proper logos and formatting. What's the FIRST thing you should do?",
            options: [
              "Click the link and verify your account immediately",
              "Check the sender's email address carefully",
              "Call your bank directly using the number on your card",
              "Forward the email to your IT department"
            ],
            correctAnswer: 2,
            explanation: "Always verify suspicious requests through a separate, trusted communication channel. Banks will never ask for sensitive information via email."
          },
          {
            id: 2,
            question: "Which of these URL patterns is MOST LIKELY to be a phishing attempt?",
            options: [
              "https://amazon.com/account/signin",
              "https://arnazon.com/account/signin",
              "https://secure.amazon.com/signin",
              "https://amazon.com/secure/account"
            ],
            correctAnswer: 1,
            explanation: "Typosquatting (arnazon vs amazon) is a common phishing technique. Always double-check URLs for subtle misspellings."
          },
          {
            id: 3,
            question: "Your colleague forwards you an email with a suspicious attachment claiming to be an invoice. The email has urgency language. What should you do?",
            options: [
              "Open the attachment to see what it contains",
              "Save the attachment and scan it with antivirus",
              "Ask your colleague to verify they actually sent it",
              "Delete the email immediately"
            ],
            correctAnswer: 2,
            explanation: "Email accounts can be compromised. Always verify suspicious emails with the sender through a different communication method."
          }
        ]
      });
    }

    // Board-Level Cybersecurity Leadership - Premium Interactive TTX
    if (course.title === "Board-Level Cybersecurity Leadership") {
      baseModules.splice(2, 0, {
        id: 3,
        title: "Executive Crisis Decision Simulator",
        type: 'simulation' as const,
        content: `
          <div class="space-y-6">
            <div class="bg-red-50 border-l-4 border-red-500 p-6">
              <h3 class="font-bold text-red-800 mb-3">🚨 BOARD CRISIS SIMULATION</h3>
              <p class="text-red-700">A major ransomware attack has just hit your organization. You are the CEO in an emergency board meeting. The clock is ticking and critical decisions must be made NOW.</p>
            </div>
            
            <div class="bg-gray-900 text-white p-6 rounded-lg">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-red-400 font-bold">LIVE INCIDENT - T+02:47:33</span>
              </div>
              
              <div class="space-y-4">
                <div class="bg-gray-800 p-4 rounded">
                  <div class="text-yellow-400 font-semibold">CISO Report:</div>
                  <div class="text-sm mt-2">
                    • All production systems encrypted<br>
                    • Customer database compromised<br>
                    • Ransom demand: $2.5M Bitcoin<br>
                    • Recovery time: 72+ hours without backups
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded">
                  <div class="text-blue-400 font-semibold">Legal Counsel:</div>
                  <div class="text-sm mt-2">
                    • GDPR notification required within 72 hours<br>
                    • Potential regulatory fines: €20M+<br>
                    • Class action lawsuit risk: HIGH
                  </div>
                </div>
                
                <div class="bg-gray-800 p-4 rounded">
                  <div class="text-green-400 font-semibold">Communications:</div>
                  <div class="text-sm mt-2">
                    • Media inquiries flooding in<br>
                    • Stock price down 12% in pre-market<br>
                    • Customer service overwhelmed
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 class="font-semibold text-yellow-800 mb-2">⏰ IMMEDIATE DECISION REQUIRED</h4>
              <p class="text-yellow-700 text-sm">The board must make a unanimous decision on ransomware payment. What is your recommendation as CEO?</p>
            </div>
          </div>
        `,
        duration: 45
      });
      
      baseModules.push({
        id: 5,
        title: "Reputational Risk Assessment",
        type: 'quiz' as const,
        content: "Strategic decision-making for cybersecurity incidents with reputational impact",
        duration: 20,
        questions: [
          {
            id: 1,
            question: "Your company faces a data breach affecting 100,000 customers. The media is already reporting it. What should be your FIRST communication priority?",
            options: [
              "Issue a statement minimizing the impact",
              "Coordinate with legal before any communication",
              "Immediately notify affected customers directly",
              "Hold a press conference to control the narrative"
            ],
            correctAnswer: 2,
            explanation: "Customer notification should be the first priority. Transparency and direct communication build trust, while delays worsen reputational damage."
          },
          {
            id: 2,
            question: "The incident response team estimates 2 weeks for full recovery, but customers are demanding immediate answers. How do you balance transparency with uncertainty?",
            options: [
              "Provide daily updates even if there's no progress",
              "Wait until you have complete information before communicating",
              "Communicate what you know and commit to regular updates",
              "Redirect customer concerns to your legal team"
            ],
            correctAnswer: 2,
            explanation: "Balanced transparency involves sharing confirmed information while committing to regular updates. This builds trust without creating false expectations."
          },
          {
            id: 3,
            question: "Three months after the incident, you're considering cyber insurance premium increases of 300%. How should the board approach this decision?",
            options: [
              "Accept the increase to maintain coverage",
              "Shop for alternative insurers immediately",
              "Implement security improvements first, then renegotiate",
              "Self-insure to avoid premium increases"
            ],
            correctAnswer: 2,
            explanation: "Demonstrating improved security posture through concrete measures can help negotiate better terms and shows insurers your commitment to risk reduction."
          }
        ]
      });
    }

    // Zero-to-One Security Maturity - Comprehensive Foundation
    if (course.title === "Zero-to-One Security Maturity") {
      baseModules.splice(2, 0, {
        id: 3,
        title: "Security Program Blueprint",
        type: 'text' as const,
        content: `
          <div class="space-y-6">
            <div class="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h3 class="font-bold text-blue-800 mb-3">🏗️ BUILDING YOUR SECURITY FOUNDATION</h3>
              <p class="text-blue-700">This module provides a step-by-step blueprint for organizations starting from zero cybersecurity infrastructure.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">✅ Phase 1: Immediate Actions (Week 1-2)</h4>
                <ul class="text-sm text-green-700 space-y-1">
                  <li>• Enable multi-factor authentication</li>
                  <li>• Implement password managers</li>
                  <li>• Basic endpoint protection</li>
                  <li>• Email security configuration</li>
                </ul>
              </div>
              
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Phase 2: Foundation Building (Week 3-8)</h4>
                <ul class="text-sm text-yellow-700 space-y-1">
                  <li>• Security policy development</li>
                  <li>• Employee training program</li>
                  <li>• Incident response planning</li>
                  <li>• Backup and recovery systems</li>
                </ul>
              </div>
            </div>
            
            <div class="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <h4 class="font-bold mb-4">📋 Interactive Security Maturity Checklist</h4>
              <div class="space-y-3">
                <div class="flex items-center p-3 bg-gray-50 rounded">
                  <input type="checkbox" class="mr-3 h-4 w-4 text-blue-600">
                  <span class="text-sm">Password policy implemented (8+ characters, complexity requirements)</span>
                </div>
                <div class="flex items-center p-3 bg-gray-50 rounded">
                  <input type="checkbox" class="mr-3 h-4 w-4 text-blue-600">
                  <span class="text-sm">MFA enabled for all administrative accounts</span>
                </div>
                <div class="flex items-center p-3 bg-gray-50 rounded">
                  <input type="checkbox" class="mr-3 h-4 w-4 text-blue-600">
                  <span class="text-sm">Employee security awareness training scheduled</span>
                </div>
                <div class="flex items-center p-3 bg-gray-50 rounded">
                  <input type="checkbox" class="mr-3 h-4 w-4 text-blue-600">
                  <span class="text-sm">Incident response contact list created</span>
                </div>
              </div>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-lg">
              <h4 class="font-bold text-purple-800 mb-3">🎯 Budget Planning Tool</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded border">
                  <div class="text-2xl font-bold text-green-600">$2,500</div>
                  <div class="text-sm text-gray-600">Small Business<br>(1-10 employees)</div>
                </div>
                <div class="bg-white p-4 rounded border">
                  <div class="text-2xl font-bold text-yellow-600">$15,000</div>
                  <div class="text-sm text-gray-600">Medium Business<br>(11-50 employees)</div>
                </div>
                <div class="bg-white p-4 rounded border">
                  <div class="text-2xl font-bold text-red-600">$50,000+</div>
                  <div class="text-sm text-gray-600">Enterprise<br>(50+ employees)</div>
                </div>
              </div>
            </div>
          </div>
        `,
        duration: 35
      });
    }

    // Global Privacy Laws Navigator - International Compliance
    if (course.title === "Global Privacy Laws Navigator") {
      baseModules.push({
        id: 4,
        title: "Jurisdiction-Specific Compliance",
        type: 'simulation' as const,
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
              <h3 class="font-bold mb-3">🌍 GLOBAL PRIVACY COMPLIANCE SIMULATOR</h3>
              <p>Your multinational company operates across different jurisdictions. Navigate the complex web of privacy laws to ensure compliance.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 class="font-semibold text-blue-800 mb-2">🇪🇺 European Operations</h4>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li>• GDPR compliance required</li>
                  <li>• Data Protection Officer needed</li>
                  <li>• 72-hour breach notification</li>
                  <li>• Right to be forgotten</li>
                </ul>
              </div>
              
              <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 class="font-semibold text-yellow-800 mb-2">🇺🇸 California Operations</h4>
                <ul class="text-sm text-yellow-700 space-y-1">
                  <li>• CCPA compliance required</li>
                  <li>• Consumer rights notices</li>
                  <li>• Data sale opt-out options</li>
                  <li>• Privacy policy updates</li>
                </ul>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 class="font-semibold text-green-800 mb-2">🇸🇬 Singapore Operations</h4>
                <ul class="text-sm text-green-700 space-y-1">
                  <li>• PDPA compliance required</li>
                  <li>• Data breach notification</li>
                  <li>• Consent management</li>
                  <li>• Data localization rules</li>
                </ul>
              </div>
              
              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 class="font-semibold text-red-800 mb-2">🇬🇧 UK Operations</h4>
                <ul class="text-sm text-red-700 space-y-1">
                  <li>• UK GDPR compliance</li>
                  <li>• ICO registration</li>
                  <li>• Brexit implications</li>
                  <li>• Data transfer agreements</li>
                </ul>
              </div>
            </div>
            
            <div class="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <h4 class="font-bold mb-4">🎯 Scenario: International Data Transfer</h4>
              <p class="text-sm text-gray-700 mb-4">You need to transfer customer data from your EU subsidiary to your US headquarters for analysis. What compliance steps are required?</p>
            </div>
          </div>
        `,
        duration: 40
      });
    }

    baseModules.push({
      id: 5,
      title: "Action Plan & Certification",
      type: 'text' as const,
      content: `
        <div class="space-y-6">
          <div class="text-center">
            <div class="text-4xl mb-4">🎉</div>
            <h2 class="text-2xl font-bold mb-2">Congratulations!</h2>
            <p class="text-gray-600">You've completed the ${course.title} training</p>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="font-bold text-green-800 mb-4">🎯 Your Action Plan:</h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <div class="font-medium">Implement Daily Practices</div>
                  <div class="text-sm text-gray-600">Apply the security mindset to your daily work routines</div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <div class="font-medium">Share Knowledge</div>
                  <div class="text-sm text-gray-600">Educate your team about what you've learned</div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <div class="font-medium">Stay Updated</div>
                  <div class="text-sm text-gray-600">Continue learning about emerging threats</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="font-bold text-blue-800 mb-2">📜 Digital Certificate</h3>
            <p class="text-sm text-blue-700">Your completion certificate is being generated and will be available for download and LinkedIn sharing.</p>
          </div>
          
          <div class="bg-purple-50 p-6 rounded-lg">
            <h3 class="font-bold text-purple-800 mb-2">🚀 Next Steps</h3>
            <p class="text-sm text-purple-700">Continue your cybersecurity journey with our advanced courses and specialized training programs.</p>
          </div>
        </div>
      `,
      duration: 10
    });

    return baseModules;
  };

  const modules = getModulesForCourse(course);

  const currentModuleData = modules[currentModule];
  const progress = ((currentModule + 1) / modules.length) * 100;

  const handleModuleComplete = () => {
    const newCompletedModules = new Set(completedModules);
    newCompletedModules.add(currentModuleData.id);
    setCompletedModules(newCompletedModules);

    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    } else {
      // Course completed - show certificate
      const finalScore = calculateFinalScore();
      setCourseScore(finalScore);
      setShowCertificate(true);
      onComplete(course.id, finalScore);
    }
  };

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
    
    // Show immediate feedback after selecting answer
    setTimeout(() => {
      setShowQuizResults(true);
    }, 300);
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    handleModuleComplete();
  };

  const calculateFinalScore = () => {
    if (currentModuleData.questions) {
      const correctAnswers = currentModuleData.questions.filter(q => 
        quizAnswers[q.id] === q.correctAnswer
      ).length;
      return (correctAnswers / currentModuleData.questions.length) * 100;
    }
    return 100; // Full score for non-quiz modules
  };

  const renderModuleContent = () => {
    switch (currentModuleData.type) {
      case 'text':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Book className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Interactive Learning</span>
            </div>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: currentModuleData.content }}
            />
            <Button onClick={handleModuleComplete} className="w-full bg-blue-600 hover:bg-blue-700 btn-touch">
              Continue Learning <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Expert Video Training</span>
            </div>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: currentModuleData.content }}
            />
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Ready to Watch?</div>
                  <div className="text-sm opacity-90">Duration: {currentModuleData.duration} minutes</div>
                </div>
                <PlayCircle className="w-8 h-8" />
              </div>
            </div>
            <Button onClick={handleModuleComplete} className="w-full bg-green-600 hover:bg-green-700 btn-touch">
              Complete Video Training <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Live Simulation Exercise</span>
            </div>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: currentModuleData.content }}
            />
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700">Choose your response:</div>
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="text-left justify-start p-4 h-auto hover:bg-red-50 border-red-200"
                  onClick={() => alert("❌ Incorrect! This is exactly what the attacker wants. Never purchase gift cards based on email requests, even from executives.")}
                >
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium mr-3">A</span>
                    <span>Buy the gift cards immediately</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="text-left justify-start p-4 h-auto hover:bg-yellow-50 border-yellow-200"
                  onClick={() => alert("⚠️ Better, but still risky. Your manager might fall for the same trick. Always verify directly with the supposed sender.")}
                >
                  <div className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-3">B</span>
                    <span>Forward to your manager</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="text-left justify-start p-4 h-auto hover:bg-green-50 border-green-200"
                  onClick={() => alert("✅ Excellent! This is the correct response. Always verify unusual requests through a separate communication channel.")}
                >
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">C</span>
                    <span>Call the CEO directly to verify</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="text-left justify-start p-4 h-auto hover:bg-blue-50 border-blue-200"
                  onClick={() => alert("🤔 Not the best approach. You should verify first, then report to IT if confirmed malicious.")}
                >
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-3">D</span>
                    <span>Report to IT security</span>
                  </div>
                </Button>
              </div>
            </div>
            <Button onClick={handleModuleComplete} className="w-full bg-orange-600 hover:bg-orange-700 btn-touch">
              Complete Simulation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Knowledge Assessment</span>
            </div>
            
            {currentModuleData.questions && (
              <div className="space-y-6">
                {/* Question Progress */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Question {currentQuestionIndex + 1} of {currentModuleData.questions.length}</span>
                  <span>{Object.keys(quizAnswers).length}/{currentModuleData.questions.length} answered</span>
                </div>
                
                {/* Current Question */}
                {(() => {
                  const question = currentModuleData.questions[currentQuestionIndex];
                  return (
                    <Card className="border-l-4 border-blue-500">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Question {currentQuestionIndex + 1}
                        </CardTitle>
                        <CardDescription>
                          {question.question}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => {
                            const isSelected = quizAnswers[question.id] === optionIndex;
                            const isCorrect = showQuizResults && optionIndex === question.correctAnswer;
                            const isIncorrect = showQuizResults && isSelected && optionIndex !== question.correctAnswer;
                            
                            return (
                              <Button
                                key={optionIndex}
                                variant={isSelected ? "default" : "outline"}
                                className={`w-full text-left justify-start p-4 h-auto ${
                                  isCorrect ? 'bg-green-100 border-green-500 text-green-800' : 
                                  isIncorrect ? 'bg-red-100 border-red-500 text-red-800' : ''
                                }`}
                                onClick={() => !showQuizResults && handleQuizAnswer(question.id, optionIndex)}
                                disabled={showQuizResults}
                              >
                                <div className="flex items-center w-full">
                                  <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                                    isCorrect ? 'bg-green-200 text-green-800' : 
                                    isIncorrect ? 'bg-red-200 text-red-800' : 
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {String.fromCharCode(65 + optionIndex)}
                                  </span>
                                  <span className="flex-1">{option}</span>
                                  {isCorrect && <CheckCircle className="w-5 h-5 ml-2 text-green-600" />}
                                  {isIncorrect && <X className="w-5 h-5 ml-2 text-red-600" />}
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                        
                        {showQuizResults && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="font-medium text-blue-800 mb-2">Explanation:</div>
                            <div className="text-sm text-blue-700" dangerouslySetInnerHTML={{ __html: question.explanation }} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })()}
                
                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                      setShowQuizResults(false);
                    }}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Question
                  </Button>
                  
                  {currentQuestionIndex < currentModuleData.questions.length - 1 ? (
                    <Button
                      onClick={() => {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setShowQuizResults(false);
                      }}
                      disabled={!quizAnswers[currentModuleData.questions[currentQuestionIndex].id] || showQuizResults === false}
                    >
                      Next Question
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < currentModuleData.questions.length}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete Quiz
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div>Unknown module type</div>;
    }
  };

  if (showCertificate) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <CourseCompletionCertificate 
            course={course} 
            score={courseScore}
          />
          <div className="p-6 border-t">
            <Button onClick={onClose} className="w-full">
              Return to Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-gray-600 mt-1">{currentModuleData.title}</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderModuleContent()}
        </div>

        {/* Footer Navigation */}
        <div className="border-t p-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
              disabled={currentModule === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {currentModule + 1} of {modules.length}
              </span>
            </div>
            
            <Button
              onClick={() => setCurrentModule(Math.min(modules.length - 1, currentModule + 1))}
              disabled={currentModule === modules.length - 1}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
