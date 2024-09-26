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

    const prompt = `Generate a multiple-choice quiz about the topic: "${topic}" with exactly ${numQuestions} questions, each adhering to the difficulty level: "${difficulty}". 
        All questions should be fact-based, with verifiable and accurate information, and should avoid any subjective or ambiguous content. 
        Format the response strictly as a JSON array with no extra text outside the JSON, and ensure the structure for each question adheres to the following format:
        [
          {
            "text": "The question text should be clear, concise, and factually accurate.",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "The correct option (one of the options provided) that is factually accurate and can be verified."
          },
          ...
        ]
        Make sure that each "correctAnswer" is clearly based on common, factual knowledge, and there is no uncertainty in any answer. 
        Return only the JSON response, and nothing else.`;

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
