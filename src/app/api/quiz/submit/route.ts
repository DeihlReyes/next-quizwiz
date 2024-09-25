import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";

import options from "@/config/auth";
import { prisma } from "@/lib/prisma";

import { quizSubmissionSchema } from "./../../../../lib/validation";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { quizId, answers, timeTaken } =
      await quizSubmissionSchema.parse(body);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    const quizAnswers = quiz.questions.map((question) => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      return {
        questionId: question.id,
        selectedOption: answers[question.id],
        isCorrect,
      };
    });

    const score = (correctAnswers / totalQuestions) * 100;

    const result = await prisma.quizResult.create({
      data: {
        score,
        correctAnswers,
        totalQuestions,
        timeTaken, // Add the timeTaken field here
        user: { connect: { id: session.user.id } },
        quiz: { connect: { id: quizId } },
        answers: {
          create: quizAnswers,
        },
      },
      include: {
        answers: true,
      },
    });

    return NextResponse.json({ resultId: result.id });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting the quiz" },
      { status: 500 }
    );
  }
}
