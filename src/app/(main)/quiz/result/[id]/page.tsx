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

export default async function QuizResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const fetchResult = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/quiz/result/${params.id}`
      );

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch quiz result");
      }

      const data = await response.json();
      return data as QuizResult;
    } catch (error) {
      console.error("Error fetching quiz result:");
    }
  };

  const result = await fetchResult();

  if (!result) {
    return (
      <div className="container mx-auto p-4">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Quiz Result Not Found
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
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
