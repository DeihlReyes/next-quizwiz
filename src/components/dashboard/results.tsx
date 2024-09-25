// Results.tsx
// Adjust the imports as necessary
// Assuming you have a utility for formatting time
import Link from "next/link";

import { formatTime } from "@/lib/utils";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface QuizResult {
  id: string;
  score: number;
  timeTaken: number;
  createdAt: Date;
  quiz: { title: string };
}

interface ResultsProps {
  quizResults: QuizResult[];
}

const Results: React.FC<ResultsProps> = ({ quizResults }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time Taken</TableHead>
              <TableHead>Date Taken</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.quiz.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{result.score.toFixed(2)}%</span>
                    <Progress value={result.score} className="w-[100px]" />
                  </div>
                </TableCell>
                <TableCell>{formatTime(result.timeTaken)}</TableCell>
                <TableCell>
                  {new Date(result.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link href={"/dashboard"}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Results;
