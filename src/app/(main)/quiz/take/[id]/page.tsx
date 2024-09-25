import { fetchQuiz } from "@/lib/quiz";

import QuizTaker from "./quiz-taker";

export default async function TakeQuizPage({
  params,
}: {
  params: { id: string };
}) {
  const quiz = await fetchQuiz(params.id);

  if (!quiz) {
    return <div className="container mx-auto p-4">Quiz not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{quiz.title}</h1>
      <QuizTaker quizId={quiz.id} questions={quiz.questions} />
    </div>
  );
}
