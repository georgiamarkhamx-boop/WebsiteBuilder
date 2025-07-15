import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowTryIt: () => void;
}

export default function DemoModal({ open, onOpenChange, onShowTryIt }: DemoModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);

  const quizMutation = useMutation({
    mutationFn: async (answer: string) => {
      const response = await apiRequest("POST", "/api/quiz/submit", {
        answer,
        scenario: "email-security"
      });
      return response.json();
    },
    onSuccess: (data) => {
      setFeedback({ message: data.feedback, correct: data.correct });
    }
  });

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setFeedback(null);
    quizMutation.mutate(answer);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const answers = [
    { id: "buy", text: "Buy the gift cards immediately", subtitle: "The CEO needs them urgently" },
    { id: "forward", text: "Forward to your manager", subtitle: "Let someone else handle it" },
    { id: "verify", text: "Call the CEO directly to verify", subtitle: "Verify through a different channel" },
    { id: "report", text: "Report to IT security", subtitle: "Flag as potential phishing" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Demo Module: Email Security</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Scenario: CEO Email Request</h3>
            <p className="text-gray-600 mb-4">You receive this email from your CEO:</p>
            <div className="bg-white p-4 rounded border-l-4 border-red-500">
              <div className="text-sm text-gray-500 mb-2">From: ceo@company.com</div>
              <div className="text-sm text-gray-500 mb-2">Subject: Urgent - Need gift cards</div>
              <p className="text-gray-800">Hi, I need you to purchase 5 x $100 Amazon gift cards for a client meeting. Please send me the codes ASAP. Thanks!</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {answers.map((answer) => (
              <div
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
                className={`quiz-option ${selectedAnswer === answer.id ? 'selected' : ''} ${
                  feedback && selectedAnswer === answer.id 
                    ? (feedback.correct ? 'correct' : 'incorrect')
                    : ''
                }`}
              >
                <div className="font-medium">{answer.text}</div>
                <div className="text-sm text-gray-600">{answer.subtitle}</div>
              </div>
            ))}
          </div>
          
          {feedback && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm">{feedback.message}</div>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetQuiz}>
              Try Again
            </Button>
            <Button onClick={onShowTryIt}>
              Try Full Module
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
