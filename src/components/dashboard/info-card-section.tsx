"use client";

import {
  BarChart2,
  BookOpen,
  Calendar,
  Clock,
  Target,
  Trophy,
} from "lucide-react";

import useFetchQuiz from "@/hooks/use-fetch-quiz";
// Adjust the import path as necessary
import { formatTime } from "@/lib/utils";

import InfoSectionLoading from "../loading/dashboard/info-section-loading";
import InfoCard from "./info-card";

export default function InfoCardSection() {
  const { userData, loading, error } = useFetchQuiz();

  if (loading) return <InfoSectionLoading />;
  if (error) return <p>{error}</p>;

  const {
    totalQuizzes,
    totalQuizzesTaken,
    averageScore,
    highestScore,
    latestActivity,
    averageTimeTaken,
  } = userData;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <InfoCard
        title="Total Quizzes Created"
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        value={totalQuizzes}
        description={totalQuizzes === 1 ? "Quiz created" : "Quizzes created"}
      />
      <InfoCard
        title="Quizzes Taken"
        icon={<Target className="h-4 w-4 text-muted-foreground" />}
        value={totalQuizzesTaken}
        description="Total quizzes completed"
      />
      <InfoCard
        title="Highest Score"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        value={`${highestScore.toFixed(0)}%`}
        description="Your best performance"
      />
      <InfoCard
        title="Average Score"
        icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />}
        value={`${averageScore.toFixed(0)}%`}
        description="Across all quizzes taken"
      />
      <InfoCard
        title="Average Time"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        value={formatTime(averageTimeTaken)}
        description="Per quiz"
      />
      <InfoCard
        title="Latest Activity"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        value={
          latestActivity ? new Date(latestActivity).toLocaleDateString() : "N/A"
        }
        description="Last quiz taken"
      />
    </div>
  );
}
