import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";

import options from "@/config/auth";
import { prisma } from "@/lib/prisma";

export async function GET({ params }: { params: { id: string } }) {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.quizResult.findUnique({
      where: { id: params.id },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
        answers: {
          include: {
            question: {
              select: {
                id: true,
                text: true,
                options: true,
                correctAnswer: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    if (result.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Restructure the data to match the expected format in the frontend
    const restructuredResult = {
      ...result,
      answers: result.answers.map((answer) => ({
        id: answer.id,
        questionText: answer.question.text,
        options: answer.question.options,
        selectedOption: answer.selectedOption,
        correctOption: answer.question.correctAnswer,
        isCorrect: answer.isCorrect,
      })),
    };

    return NextResponse.json(restructuredResult);
  } catch (error) {
    console.error("Error fetching quiz result:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the quiz result" },
      { status: 500 }
    );
  }
}
