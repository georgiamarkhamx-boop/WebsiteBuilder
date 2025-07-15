import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle2, 
  Flag, 
  Users, 
  Shield, 
  BookOpen,
  AlertTriangle,
  Globe,
  Award,
  FileText,
  Clock,
  Target
} from "lucide-react";

interface CourseModule {
  id: string;
  title: string;
  type: 'intro' | 'personalization' | 'content' | 'compliance' | 'assessment' | 'completion';
  content: string;
  interactive: boolean;
  branchingLogic?: BranchingLogic;
  questions?: Question[];
  duration: number;
  country?: string;
  role?: string;
  complianceFramework?: string;
}

interface BranchingLogic {
  condition: string;
  branches: {
    value: string;
    nextModule: string;
    content: string;
  }[];
}

interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scenario' | 'drag_drop' | 'interactive';
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  roleSpecific?: boolean;
}

interface UserPersonalization {
  country: string;
  role: string;
  complianceFramework: string;
  industry: string;
}

export default function EnhancedCoursePlayer() {
  const [currentModule, setCurrentModule] = useState(0);
  const [personalization, setPersonalization] = useState<UserPersonalization>({
    country: '',
    role: '',
    complianceFramework: '',
    industry: ''
  });
  const [courseProgress, setCourseProgress] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample course: Cyber Security Basics with branching
  const courseModules: CourseModule[] = [
    {
      id: 'welcome',
      title: 'Welcome & Personalization Setup',
      type: 'personalization',
      content: 'Welcome to Cybersecurity Basics! Let\'s personalize your experience.',
      interactive: true,
      duration: 5,
      questions: [
        {
          id: 'country',
          question: 'What country are you in?',
          type: 'multiple_choice',
          options: ['United States', 'United Kingdom', 'European Union', 'Canada', 'Australia'],
          correctAnswer: '',
          explanation: 'This determines relevant laws and regulations in your training.'
        },
        {
          id: 'role',
          question: 'What\'s your role?',
          type: 'multiple_choice',
          options: ['Employee', 'Manager', 'IT Professional', 'HR', 'C-Suite'],
          correctAnswer: '',
          explanation: 'Role-based examples will be tailored to your responsibilities.'
        },
        {
          id: 'compliance',
          question: 'Which compliance standard applies to your company?',
          type: 'multiple_choice',
          options: ['Cyber Essentials', 'NIST Framework', 'ISO 27001', 'GDPR', 'None'],
          correctAnswer: '',
          explanation: 'Compliance modules will be customized to your framework.'
        }
      ]
    },
    {
      id: 'intro',
      title: 'What is Cybersecurity?',
      type: 'content',
      content: 'Cybersecurity is how we protect computers, data, and systems from being attacked.',
      interactive: true,
      duration: 10,
      questions: [
        {
          id: 'definitions',
          question: 'Match the definitions:',
          type: 'drag_drop',
          options: ['Threat', 'Vulnerability', 'Risk'],
          correctAnswer: 'threat-potential-danger,vulnerability-weakness,risk-probability-impact',
          explanation: 'Understanding these core concepts is fundamental to cybersecurity.'
        }
      ]
    },
    {
      id: 'threats',
      title: 'Common Threats',
      type: 'content',
      content: 'Learn about threats relevant to your role and industry.',
      interactive: true,
      duration: 15,
      branchingLogic: {
        condition: 'role',
        branches: [
          {
            value: 'Employee',
            nextModule: 'threats-employee',
            content: 'Employee-focused threats: phishing, unsafe websites, USB malware'
          },
          {
            value: 'IT Professional',
            nextModule: 'threats-it',
            content: 'IT-focused threats: misconfigurations, patching, insider threats'
          },
          {
            value: 'C-Suite',
            nextModule: 'threats-executive',
            content: 'Executive threats: ransomware, reputation damage, CEO fraud'
          }
        ]
      },
      questions: [
        {
          id: 'phishing',
          question: 'Which of these is a safe email to click?',
          type: 'multiple_choice',
          options: [
            'Urgent: Your account will be suspended',
            'Monthly security newsletter from IT',
            'Click here to claim your prize!',
            'Verify your password immediately'
          ],
          correctAnswer: 1,
          explanation: 'Legitimate emails from known sources are generally safe.',
          roleSpecific: true
        }
      ]
    },
    {
      id: 'hygiene',
      title: 'Cyber Hygiene Best Practices',
      type: 'content',
      content: 'Essential security practices for everyone.',
      interactive: true,
      duration: 20,
      questions: [
        {
          id: 'scenario',
          question: 'You\'re about to reuse your password for a new work account. What should you do?',
          type: 'scenario',
          options: [
            'Use the same password for convenience',
            'Create a unique, strong password',
            'Use a variation of your existing password',
            'Ask IT to create a password for you'
          ],
          correctAnswer: 1,
          explanation: 'Unique passwords prevent credential stuffing attacks.'
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Requirements',
      type: 'compliance',
      content: 'Compliance requirements based on your selections.',
      interactive: true,
      duration: 25,
      branchingLogic: {
        condition: 'complianceFramework',
        branches: [
          {
            value: 'Cyber Essentials',
            nextModule: 'compliance-ce',
            content: 'Cyber Essentials: Firewalls, secure settings, access control, malware protection, patch management'
          },
          {
            value: 'NIST Framework',
            nextModule: 'compliance-nist',
            content: 'NIST Framework: Identify, Protect, Detect, Respond, Recover'
          },
          {
            value: 'ISO 27001',
            nextModule: 'compliance-iso',
            content: 'ISO 27001: Risk management, policies, and controls'
          },
          {
            value: 'GDPR',
            nextModule: 'compliance-gdpr',
            content: 'GDPR: Data protection, privacy by design, breach notification'
          }
        ]
      },
      questions: [
        {
          id: 'compliance-quiz',
          question: 'Which control helps prevent ransomware?',
          type: 'multiple_choice',
          options: [
            'Regular backups',
            'Strong passwords',
            'Employee training',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'A layered approach is most effective against ransomware.'
        }
      ]
    },
    {
      id: 'legal',
      title: 'Legal & Regulatory Requirements',
      type: 'compliance',
      content: 'Country-specific legal requirements.',
      interactive: true,
      duration: 15,
      branchingLogic: {
        condition: 'country',
        branches: [
          {
            value: 'United Kingdom',
            nextModule: 'legal-uk',
            content: 'UK: GDPR, Cyber Essentials, ICO contact requirements'
          },
          {
            value: 'United States',
            nextModule: 'legal-us',
            content: 'US: CCPA, HIPAA (if applicable), NIST guidelines'
          },
          {
            value: 'European Union',
            nextModule: 'legal-eu',
            content: 'EU: GDPR, ENISA guidelines, NIS2 Directive'
          }
        ]
      },
      questions: [
        {
          id: 'breach-response',
          question: 'Your company suffers a data breach. What do you do?',
          type: 'scenario',
          options: [
            'Wait for IT to handle it',
            'Notify authorities within 72 hours',
            'Fix the issue first, then report',
            'Only report if customers ask'
          ],
          correctAnswer: 1,
          explanation: 'Most regulations require prompt notification of breaches.'
        }
      ]
    },
    {
      id: 'assessment',
      title: 'Final Assessment',
      type: 'assessment',
      content: 'Test your knowledge with role-based scenarios.',
      interactive: true,
      duration: 15,
      questions: [
        {
          id: 'final-scenario',
          question: 'You receive a suspicious email asking for confidential information. What\'s your best response?',
          type: 'scenario',
          options: [
            'Forward it to IT security',
            'Reply asking for verification',
            'Delete it immediately',
            'Report it through proper channels'
          ],
          correctAnswer: 3,
          explanation: 'Reporting through proper channels helps protect the organization.'
        }
      ]
    },
    {
      id: 'completion',
      title: 'Course Completion',
      type: 'completion',
      content: 'Congratulations! You\'ve completed the Cybersecurity Basics course.',
      interactive: false,
      duration: 5
    }
  ];

  const countries = [
    { code: 'US', name: 'United States', laws: ['CCPA', 'HIPAA', 'NIST'] },
    { code: 'UK', name: 'United Kingdom', laws: ['GDPR', 'Cyber Essentials', 'ICO'] },
    { code: 'EU', name: 'European Union', laws: ['GDPR', 'ENISA', 'NIS2'] },
    { code: 'CA', name: 'Canada', laws: ['PIPEDA', 'CCPA'] },
    { code: 'AU', name: 'Australia', laws: ['Privacy Act', 'ACSC'] }
  ];

  const roles = [
    { id: 'employee', name: 'Employee', threats: ['phishing', 'unsafe websites', 'USB malware'] },
    { id: 'manager', name: 'Manager', threats: ['social engineering', 'data handling', 'team security'] },
    { id: 'it', name: 'IT Professional', threats: ['misconfigurations', 'patching', 'insider threats'] },
    { id: 'hr', name: 'HR', threats: ['personnel security', 'data privacy', 'background checks'] },
    { id: 'c-suite', name: 'C-Suite', threats: ['ransomware', 'reputation damage', 'CEO fraud'] }
  ];

  const getCurrentModule = () => {
    return courseModules[currentModule];
  };

  const getPersonalizedContent = (module: CourseModule) => {
    if (module.branchingLogic) {
      const condition = module.branchingLogic.condition;
      const value = personalization[condition as keyof UserPersonalization];
      const branch = module.branchingLogic.branches.find(b => b.value === value);
      return branch ? branch.content : module.content;
    }
    return module.content;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handlePersonalizationComplete = () => {
    const countryAnswer = answers['country'];
    const roleAnswer = answers['role'];
    const complianceAnswer = answers['compliance'];
    
    setPersonalization({
      country: countryAnswer || '',
      role: roleAnswer || '',
      complianceFramework: complianceAnswer || '',
      industry: ''
    });
    
    setCurrentModule(1);
  };

  const nextModule = () => {
    if (currentModule < courseModules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCourseProgress(((currentModule + 1) / courseModules.length) * 100);
    }
  };

  const prevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCourseProgress(((currentModule - 1) / courseModules.length) * 100);
    }
  };

  const module = getCurrentModule();
  const personalizedContent = getPersonalizedContent(module);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Cybersecurity Basics
              </CardTitle>
              <CardDescription>
                Interactive course with personalized content and compliance modules
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Module {currentModule + 1} of {courseModules.length}</Badge>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                {module.duration} min
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">{Math.round(courseProgress)}%</span>
            </div>
            <Progress value={courseProgress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Personalization Display */}
          {personalization.country && (
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Country:</span>
                <Badge variant="outline">{personalization.country}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Role:</span>
                <Badge variant="outline">{personalization.role}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Framework:</span>
                <Badge variant="outline">{personalization.complianceFramework}</Badge>
              </div>
            </div>
          )}

          {/* Module Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">{module.title}</h2>
              {module.type === 'compliance' && (
                <Badge variant="default" className="bg-green-500">
                  <FileText className="w-3 h-3 mr-1" />
                  Compliance
                </Badge>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {personalizedContent}
              </p>
            </div>

            {/* Interactive Elements */}
            {module.interactive && module.questions && (
              <div className="space-y-6">
                {module.questions.map((question, index) => (
                  <Card key={question.id} className="border-2 border-blue-100">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Target className="w-5 h-5 text-blue-500 mt-1" />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{question.question}</h3>
                            
                            {question.type === 'multiple_choice' && (
                              <RadioGroup
                                value={answers[question.id] || ''}
                                onValueChange={(value) => handleAnswer(question.id, value)}
                              >
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                                    <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}
                            
                            {question.type === 'scenario' && (
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <button
                                    key={optionIndex}
                                    onClick={() => handleAnswer(question.id, option)}
                                    className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                                      answers[question.id] === option
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            )}
                            
                            {answers[question.id] && (
                              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-2 text-green-800">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span className="font-medium">Explanation:</span>
                                </div>
                                <p className="text-green-700 mt-1">{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Country-Specific Legal Information */}
            {module.type === 'compliance' && personalization.country && (
              <Card className="border-2 border-orange-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Globe className="w-5 h-5" />
                    Legal Requirements for {personalization.country}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {countries.find(c => c.name === personalization.country)?.laws.map((law, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-orange-50">
                          {law}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {law === 'GDPR' && 'Data protection and privacy requirements'}
                          {law === 'CCPA' && 'California Consumer Privacy Act compliance'}
                          {law === 'HIPAA' && 'Health information protection standards'}
                          {law === 'NIST' && 'National Institute of Standards and Technology framework'}
                          {law === 'Cyber Essentials' && 'UK government cybersecurity scheme'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Role-Specific Threats */}
            {module.id === 'threats' && personalization.role && (
              <Card className="border-2 border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="w-5 h-5" />
                    Threats Relevant to {personalization.role}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {roles.find(r => r.name === personalization.role)?.threats.map((threat, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-sm capitalize">{threat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Completion Summary */}
            {module.type === 'completion' && (
              <Card className="border-2 border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Award className="w-5 h-5" />
                    Course Completion Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {Object.keys(answers).length}
                        </div>
                        <div className="text-sm text-gray-600">Questions Answered</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {personalization.complianceFramework}
                        </div>
                        <div className="text-sm text-gray-600">Framework Covered</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Key Takeaways for {personalization.role}:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Recognize and report phishing attempts</li>
                        <li>• Implement strong password practices</li>
                        <li>• Understand your compliance obligations</li>
                        <li>• Know your incident response procedures</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Need Help?</h4>
                      <p className="text-sm">
                        Contact your cybersecurity lead at {personalization.country === 'United States' ? 'security@company.com' : 'security@company.com'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevModule}
              disabled={currentModule === 0}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {module.type === 'personalization' && (
                <Button 
                  onClick={handlePersonalizationComplete}
                  disabled={!answers['country'] || !answers['role'] || !answers['compliance']}
                >
                  Continue
                </Button>
              )}
              
              {module.type !== 'personalization' && module.type !== 'completion' && (
                <Button onClick={nextModule}>
                  Next Module
                </Button>
              )}
              
              {module.type === 'completion' && (
                <Button className="bg-green-500 hover:bg-green-600">
                  <Award className="w-4 h-4 mr-2" />
                  Get Certificate
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}