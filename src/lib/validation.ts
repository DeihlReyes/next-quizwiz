import { z } from "zod";

export const difficultyOptions = ["easy", "medium", "hard"];

export const generateQuizSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  numQuestions: z.coerce
    .number()
    .int()
    .min(1, "Number of questions must be at least 1"),
  difficulty: z.enum([...difficultyOptions] as [string, ...string[]]),
});

export const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.string()),
});

export const quizSchema = z.object({
  quizId: z.string(),
  questions: z.array(questionSchema),
});

export const answerSchema = z.record(z.string(), z.string());

export const quizSubmissionSchema = z.object({
  quizId: z.string(),
  answers: answerSchema,
  timeTaken: z.number(),
});

export type Question = z.infer<typeof questionSchema>;
export type Quiz = z.infer<typeof quizSchema>;
export type QuizSubmission = z.infer<typeof quizSubmissionSchema>;
export type generateQuizType = z.infer<typeof generateQuizSchema>;
