"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  quizId: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ quizId }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center space-x-4">
      <Button onClick={() => router.push("/dashboard")}>
        Back to Dashboard
      </Button>
      <Button onClick={() => router.push(`/quiz/take/${quizId}`)}>
        Retake Quiz
      </Button>
    </div>
  );
};
