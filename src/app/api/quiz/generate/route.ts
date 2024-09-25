import { NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth/next";

import options from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { generateQuizSchema } from "@/lib/validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { topic, numQuestions, difficulty } = generateQuizSchema.parse(body);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a multiple-choice quiz about ${topic} with ${numQuestions} questions with a difficulty of ${difficulty}.
    Format the response as a JSON array of objects and you will not return anything else just the JSON, where each object represents a question and has the following structure:
    {
      "text": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The correct option"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const questions = JSON.parse(text);

    const quiz = await prisma.quiz.create({
      data: {
        title: topic,
        user: { connect: { id: session?.user.id } },
        questions: {
          create: questions.map(
            (q: {
              text: string;
              options: string[];
              correctAnswer: string;
            }) => ({
              text: q.text,
              options: q.options,
              correctAnswer: q.correctAnswer,
            })
          ),
        },
      },
    });

    return NextResponse.json({ quizId: quiz.id });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
