import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<{
    percentage: number;
    answers: number[];
    totalScore: number;
  } | null>(null);

  const assessmentMutation = useMutation({
    mutationFn: async (assessmentData: {
      type: string;
      answers: number[];
      score: number;
      results: any;
    }) => {
      const response = await apiRequest("POST", "/api/assessments", assessmentData);
      return response.json();
    }
  });

  const selectAnswer = (answerValue: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerValue;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAssessment = async () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const percentage = (totalScore / 20) * 100;
    
    const assessmentResults = {
      percentage,
      answers,
      totalScore
    };

    setResults(assessmentResults);

    // Submit to backend
    try {
      await assessmentMutation.mutateAsync({
        type: "maturity",
        answers,
        score: totalScore,
        results: assessmentResults
      });
    } catch (error) {
      console.error("Failed to save assessment:", error);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResults(null);
  };

  const progress = ((currentQuestion + 1) / 5) * 100;

  return {
    currentQuestion,
    progress,
    answers,
    results,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    submitAssessment,
    resetAssessment
  };
}
