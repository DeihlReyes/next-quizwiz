import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import QuizGeneratorForm from "./quiz-generator-form";

export const metadata: Metadata = {
  title: "Create a Programming Quiz",
  description: "Generate a custom programming quiz on various topics",
};

export default function CreateQuizPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-10">
      <h1 className="mb-6 text-3xl font-bold">Create a Programming Quiz</h1>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="font-bold">Create a Quiz</CardTitle>
          <CardDescription>
            Create a quiz by entering a topic and number of questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuizGeneratorForm />
        </CardContent>
      </Card>
    </div>
  );
}
