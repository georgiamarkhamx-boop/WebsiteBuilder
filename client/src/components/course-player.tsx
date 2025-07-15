import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, PlayCircle, Book, Award, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@shared/schema";

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

  // Generate course modules based on course content
  const modules: Module[] = [
    {
      id: 1,
      title: "Introduction",
      type: 'text',
      content: `Welcome to "${course.title}". ${course.description}`,
      duration: 5
    },
    {
      id: 2,
      title: "Core Concepts",
      type: 'video',
      content: `Learn the fundamental concepts of ${course.title.toLowerCase()}. This module covers the essential knowledge you need to understand the topic thoroughly.`,
      duration: 15
    },
    {
      id: 3,
      title: "Interactive Scenario",
      type: 'simulation',
      content: `Practice your skills with a real-world scenario related to ${course.title.toLowerCase()}. This hands-on exercise will test your understanding.`,
      duration: 20
    },
    {
      id: 4,
      title: "Knowledge Check",
      type: 'quiz',
      content: "Test your understanding with these questions.",
      duration: 10,
      questions: [
        {
          id: 1,
          question: `What is the most important aspect of ${course.title.toLowerCase()}?`,
          options: [
            "Following established procedures",
            "Staying updated with latest threats",
            "Regular training and awareness",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "All aspects are crucial for effective cybersecurity."
        },
        {
          id: 2,
          question: "How often should security training be conducted?",
          options: [
            "Once a year",
            "Quarterly",
            "Monthly",
            "Continuously"
          ],
          correctAnswer: 3,
          explanation: "Security training should be an ongoing process to stay current with evolving threats."
        },
        {
          id: 3,
          question: "What is the primary goal of this training?",
          options: [
            "Compliance only",
            "Reducing human error",
            "Passing audits",
            "Meeting requirements"
          ],
          correctAnswer: 1,
          explanation: "The main goal is to reduce human error and improve security awareness."
        }
      ]
    },
    {
      id: 5,
      title: "Course Summary",
      type: 'text',
      content: `Congratulations! You've completed the "${course.title}" course. You now have the knowledge and skills to apply these concepts in your work environment.`,
      duration: 5
    }
  ];

  const currentModuleData = modules[currentModule];
  const progress = ((currentModule + 1) / modules.length) * 100;

  const handleModuleComplete = () => {
    const newCompletedModules = new Set(completedModules);
    newCompletedModules.add(currentModuleData.id);
    setCompletedModules(newCompletedModules);

    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    } else {
      // Course completed
      const finalScore = calculateFinalScore();
      setCourseScore(finalScore);
      onComplete(course.id, finalScore);
    }
  };

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
    
    // Add visual feedback for selection
    console.log(`Selected answer ${answerIndex} for question ${questionId}`);
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
              <span className="text-sm font-medium text-gray-600">Reading Material</span>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{currentModuleData.content}</p>
            </div>
            <Button onClick={handleModuleComplete} className="w-full">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Video Content</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <PlayCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <p className="text-gray-700 mb-4">{currentModuleData.content}</p>
              <p className="text-sm text-gray-500">Duration: {currentModuleData.duration} minutes</p>
            </div>
            <Button onClick={handleModuleComplete} className="w-full btn-touch">
              Mark as Watched <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Interactive Simulation</span>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <Award className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">Scenario-Based Learning</h3>
                <p className="text-gray-700">{currentModuleData.content}</p>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h4 className="font-medium mb-2">Scenario:</h4>
                  <p className="text-sm text-gray-600">
                    You receive an email that appears to be from your IT department asking you to verify your credentials. 
                    The email looks legitimate but has some suspicious elements. What should you do?
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="text-left justify-start btn-touch p-4 h-auto">
                    Click the link and verify credentials
                  </Button>
                  <Button variant="outline" className="text-left justify-start btn-touch p-4 h-auto">
                    Forward to a colleague for verification
                  </Button>
                  <Button variant="outline" className="text-left justify-start btn-touch p-4 h-auto">
                    Contact IT department directly
                  </Button>
                  <Button variant="outline" className="text-left justify-start btn-touch p-4 h-auto">
                    Delete the email immediately
                  </Button>
                </div>
              </div>
            </div>
            <Button onClick={handleModuleComplete} className="w-full btn-touch">
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
                {currentModuleData.questions.map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-blue-500">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Question {index + 1}
                      </CardTitle>
                      <CardDescription>
                        {question.question}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = quizAnswers[question.id] === optionIndex;
                          return (
                            <Button
                              key={optionIndex}
                              variant={isSelected ? "default" : "outline"}
                              className={cn(
                                "w-full text-left justify-start btn-touch p-4 h-auto text-sm transition-all duration-200",
                                isSelected ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-blue-50"
                              )}
                              onClick={() => handleQuizAnswer(question.id, optionIndex)}
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                              <span className="flex-1">{option}</span>
                              {isSelected && <CheckCircle className="w-4 h-4 ml-2 text-white" />}
                            </Button>
                          );
                        })}
                      </div>
                      
                      {showQuizResults && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className={cn(
                              "w-4 h-4",
                              quizAnswers[question.id] === question.correctAnswer 
                                ? "text-green-600" 
                                : "text-red-600"
                            )} />
                            <span className={cn(
                              "text-sm font-medium",
                              quizAnswers[question.id] === question.correctAnswer 
                                ? "text-green-600" 
                                : "text-red-600"
                            )}>
                              {quizAnswers[question.id] === question.correctAnswer ? "Correct" : "Incorrect"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{question.explanation}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {!showQuizResults && (
                  <Button 
                    onClick={handleQuizSubmit} 
                    className="w-full btn-touch"
                    disabled={Object.keys(quizAnswers).length < currentModuleData.questions.length}
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close Course
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Course Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Course Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors",
                    index === currentModule ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50",
                    completedModules.has(module.id) && "bg-green-50 border border-green-200"
                  )}
                  onClick={() => setCurrentModule(index)}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                    index === currentModule ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600",
                    completedModules.has(module.id) && "bg-green-600 text-white"
                  )}>
                    {completedModules.has(module.id) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{module.title}</div>
                    <div className="text-xs text-gray-500">{module.duration} min</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{currentModuleData.title}</CardTitle>
                <CardDescription>
                  Module {currentModule + 1} of {modules.length}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                {currentModuleData.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {renderModuleContent()}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-6">
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
  );
}