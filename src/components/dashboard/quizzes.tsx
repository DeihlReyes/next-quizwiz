// Quizzes.tsx
import Link from "next/link";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Adjust the imports as necessary

interface Quiz {
  id: string;
  title: string;
  createdAt: Date;
}

interface QuizzesProps {
  quizzes: Quiz[];
}

const Quizzes: React.FC<QuizzesProps> = ({ quizzes }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">{quiz.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Created on {new Date(quiz.createdAt).toLocaleDateString()}
            </p>
            <Link href={"/dashboard"}>
              <Button className="w-full" asChild>
                <Link href={`/quiz/take/${quiz.id}`}>Take Quiz</Link>
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Quizzes;
