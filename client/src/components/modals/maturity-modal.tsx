import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAssessment } from "@/hooks/use-assessment";

interface MaturityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowSignup: () => void;
}

export default function MaturityModal({ open, onOpenChange, onShowSignup }: MaturityModalProps) {
  const { currentQuestion, progress, answers, selectAnswer, nextQuestion, previousQuestion, submitAssessment, results, resetAssessment } = useAssessment();

  const questions = [
    {
      question: "How often does your organization conduct security awareness training?",
      options: [
        "Never or very rarely",
        "Once a year",
        "Quarterly",
        "Monthly or more frequent"
      ]
    },
    {
      question: "Does your organization have a formal incident response plan?",
      options: [
        "No formal plan",
        "Basic plan exists but not tested",
        "Plan exists and tested annually",
        "Plan exists and tested regularly"
      ]
    },
    {
      question: "How frequently do you update your security policies?",
      options: [
        "Never or very rarely",
        "When required by compliance",
        "Annually",
        "Regularly based on threat landscape"
      ]
    },
    {
      question: "What percentage of your employees have completed cybersecurity training?",
      options: [
        "Less than 25%",
        "25-50%",
        "51-75%",
        "More than 75%"
      ]
    },
    {
      question: "How would you rate your organization's overall security posture?",
      options: [
        "Poor - many vulnerabilities",
        "Fair - some gaps exist",
        "Good - most areas covered",
        "Excellent - comprehensive security"
      ]
    }
  ];

  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[currentQuestion] !== undefined;

  const handleNext = () => {
    if (isLastQuestion) {
      submitAssessment();
    } else {
      nextQuestion();
    }
  };

  const handleReset = () => {
    resetAssessment();
  };

  const getMaturityLevel = (percentage: number) => {
    if (percentage < 40) return { level: "Developing", color: "text-red-600", description: "Your organization needs immediate attention to cybersecurity fundamentals. Consider starting with basic training and policy development." };
    if (percentage < 60) return { level: "Improving", color: "text-yellow-600", description: "You have basic security measures in place but need to strengthen your program. Focus on regular training and policy updates." };
    if (percentage < 80) return { level: "Strong", color: "text-blue-600", description: "Your security program is well-established. Continue with regular improvements and stay updated on emerging threats." };
    return { level: "Excellent", color: "text-green-600", description: "Your organization demonstrates security best practices. Focus on maintaining standards and advanced threat protection." };
  };

  if (results) {
    const maturity = getMaturityLevel(results.percentage);
    
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Security Maturity Assessment Results</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            <div className={`text-6xl font-bold ${maturity.color}`}>
              {results.percentage.toFixed(0)}%
            </div>
            <div className="text-2xl font-semibold">
              Security Maturity Level: {maturity.level}
            </div>
            <div className="text-gray-600">
              {maturity.description}
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Detailed Breakdown:</h4>
              <div className="space-y-3">
                {questions.map((q, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">
                      {index === 0 ? "Training Frequency" :
                       index === 1 ? "Incident Response" :
                       index === 2 ? "Policy Updates" :
                       index === 3 ? "Training Coverage" :
                       "Overall Posture"}
                    </span>
                    <span className="font-medium">{results.answers[index]}/4</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Button onClick={onShowSignup} className="w-full" size="lg">
                Improve Your Security Posture
              </Button>
              <Button variant="outline" onClick={handleReset} className="w-full">
                Take Assessment Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Security Maturity Assessment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-500">Progress: {progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentQuestion + 1}. {currentQuestionData.question}
            </h3>
            <div className="space-y-2">
              {currentQuestionData.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => selectAnswer(index + 1)}
                  className={`quiz-option ${answers[currentQuestion] === index + 1 ? 'selected' : ''}`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
            >
              {isLastQuestion ? "View Results" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
