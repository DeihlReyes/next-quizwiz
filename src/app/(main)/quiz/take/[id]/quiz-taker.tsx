"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Quiz, QuizSubmission, quizSubmissionSchema } from "@/lib/validation";

import { Timer } from "./timer";

export default function QuizTaker({ quizId, questions }: Quiz) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  const form = useForm<QuizSubmission>({
    resolver: zodResolver(quizSubmissionSchema),
    defaultValues: {
      quizId,
      answers: {},
      timeTaken: 0,
    },
  });

  const { control, handleSubmit, watch, setValue, formState } = form;
  const answers = watch("answers");

  useEffect(() => {
    if (!questions || questions.length === 0) {
      toast({
        title: "Error",
        description: "No questions available for this quiz.",
        variant: "destructive",
      });
      router.push("/"); // Redirect to home or error page
    }
  }, [questions, router]);

  if (!questions || questions.length === 0) {
    return null; // Or return an error component
  }

  const handleAnswer = (questionId: string, value: string) => {
    setValue(`answers.${questionId}`, value, { shouldValidate: true });
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent form submission
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent form submission
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: QuizSubmission) => {
    setIsFinished(true);
    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const { resultId } = await response.json();
        router.push(`/quiz/result/${resultId}`);
      } else {
        throw new Error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (Object.keys(answers).length / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <Timer
            isFinished={isFinished}
            onTimeUpdate={(time) => setValue("timeTaken", time)}
          />
        </CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">
              {currentQuestion.text}
            </h2>
            <FormField
              control={control}
              name={`answers.${currentQuestion.id}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        handleAnswer(currentQuestion.id, value)
                      }
                      value={field.value}
                    >
                      {currentQuestion.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="mb-2 flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${currentQuestion.id}-${optionIndex}`}
                          />
                          <FormLabel
                            htmlFor={`${currentQuestion.id}-${optionIndex}`}
                            className="flex-grow cursor-pointer rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {option}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex w-full justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                type="button"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {isLastQuestion ? (
                <Button
                  type="submit"
                  disabled={formState.isSubmitting || !allQuestionsAnswered}
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quiz"
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext} type="button">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            {allQuestionsAnswered && (
              <Alert>
                <AlertTitle>Ready to submit?</AlertTitle>
                <AlertDescription>
                  You&apos;ve answered all questions. Review your answers or
                  submit the quiz.
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
