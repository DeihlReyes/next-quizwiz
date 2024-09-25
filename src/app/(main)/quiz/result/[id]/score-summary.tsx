import { Progress } from "@/components/ui/progress";

interface ScoreSummaryProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  score,
  correctAnswers,
  totalQuestions,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">Score:</span>
        <span className="text-2xl font-bold">{score.toFixed(2)}%</span>
      </div>
      <Progress value={score} className="h-2 w-full" />
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">{correctAnswers}</div>
          <div className="text-sm text-gray-500">Correct Answers</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalQuestions}</div>
          <div className="text-sm text-gray-500">Total Questions</div>
        </div>
      </div>
    </div>
  );
};
