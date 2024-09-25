"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { generateQuizSchema } from "@/lib/validation";

export default function QuizGeneratorForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof generateQuizSchema>>({
    resolver: zodResolver(generateQuizSchema),
    defaultValues: {
      topic: "",
      numQuestions: 5,
      difficulty: "easy",
    },
  });

  async function onSubmit(values: z.infer<typeof generateQuizSchema>) {
    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const { quizId } = await response.json();

      if (quizId) {
        router.push(`/quiz/take/${quizId}`);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Programming, History, Calculus..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a topic for the quiz you want to create.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions: {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    id="numQuestions"
                    min={1}
                    max={20}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Enter a topic for the quiz you want to create.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Choose the difficulty level for the quiz.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} type="submit">
            Submit
            {form.formState.isSubmitting && (
              <Loader2 className="ml-2 h-6 w-6 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
