import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import options from "@/config/auth";
import { getResults } from "@/lib/quiz";

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
  createdAt: Date;
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
  const session = await getServerSession(options);

  if (!session) {
    redirect("/sign-in");
  }

  const data = await getResults(params.id);

  if (!data) {
    return null;
  }

  const result = data as QuizResult;

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
            createdAt={result.createdAt.toISOString()}
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
