"use server";

import { User } from "@prisma/client";
// To get the session
import { getServerSession } from "next-auth";

import { prisma } from "./prisma";

export const fetchUserData = async () => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = (await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      quizzes: true,
      quizResults: {
        include: {
          quiz: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  })) as
    | (User & {
        quizzes: { id: string; title: string; createdAt: Date }[];
        quizResults: {
          id: string;
          score: number;
          timeTaken: number;
          createdAt: Date;
          quiz: { id: string; title: string };
        }[];
      })
    | null;

  if (!user) {
    throw new Error("User not found.");
  }

  const totalQuizzes = user.quizzes.length;
  const totalQuizzesTaken = user.quizResults.length;

  const averageScore =
    totalQuizzesTaken > 0
      ? user.quizResults.reduce((sum, result) => sum + result.score, 0) /
        totalQuizzesTaken
      : 0;

  const highestScore =
    totalQuizzesTaken > 0
      ? Math.max(...user.quizResults.map((result) => result.score))
      : 0; // Default to 0 if there are no quiz results.

  const latestActivity = user.quizResults[0]?.createdAt || null;
  const averageTimeTaken =
    totalQuizzesTaken > 0
      ? user.quizResults.reduce((sum, result) => sum + result.timeTaken, 0) /
        totalQuizzesTaken
      : 0;

  return {
    totalQuizzes,
    totalQuizzesTaken,
    averageScore,
    highestScore,
    latestActivity,
    averageTimeTaken,
  };
};
