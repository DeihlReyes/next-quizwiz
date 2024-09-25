"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ActionButtons } from "./action-buttons";
import { ConfettiEffect } from "./confetti-effect";
import { QuestionReview } from "./question-review";
import { ResultHeader } from "./result-header";
import { ScoreSummary } from "./score-summary";

interface QuizResult {
  id: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  createdAt: string;
  quiz: { id: string; title: string };
  answers: {
    id: string;
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
    options: string[];
  }[];
}

export default function QuizResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/quiz/results/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz result");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred while fetching the quiz result.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!result) {
    return <div className="text-center">No result found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ConfettiEffect trigger={result.score >= 50} />
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ResultHeader
            quizTitle={result.quiz.title}
            createdAt={result.createdAt}
          />
          <ScoreSummary
            score={result.score}
            correctAnswers={result.correctAnswers}
            totalQuestions={result.totalQuestions}
          />
          <Separator />
          <QuestionReview answers={result.answers} />
          <ActionButtons quizId={result.quiz.id} />
        </CardContent>
      </Card>
    </div>
  );
}
