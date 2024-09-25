import { CheckCircle, XCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Answer {
  id: string;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  options: string[];
}

interface QuestionReviewProps {
  answers: Answer[];
}

export const QuestionReview: React.FC<QuestionReviewProps> = ({ answers }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Question Review</h3>
      {answers.map((answer, index) => (
        <div key={answer.id} className="mb-4">
          <div className="mb-4 flex items-start justify-between">
            <h4 className="font-medium">Question {index + 1}</h4>
            {answer.isCorrect ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
          </div>
          <p className="mb-4">{answer.questionText}</p>
          <RadioGroup value={answer.selectedOption}>
            {answer.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`flex items-center space-x-2 rounded-md p-2 ${
                  option === answer.correctOption
                    ? "bg-green-100 dark:bg-green-900"
                    : option === answer.selectedOption && !answer.isCorrect
                      ? "bg-red-100 dark:bg-red-900"
                      : ""
                }`}
              >
                <RadioGroupItem
                  value={option}
                  id={`${answer.id}-${optionIndex}`}
                  disabled
                />
                <Label
                  htmlFor={`${answer.id}-${optionIndex}`}
                  className="flex-grow cursor-default"
                >
                  {option}
                </Label>
                {option === answer.correctOption && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {option === answer.selectedOption && !answer.isCorrect && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};
