import Link from "next/link";

import { BookOpen, Target } from "lucide-react";

import { fetchUser } from "@/lib/quiz";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Quizzes from "./quizzes";
import Results from "./results";

const TabSection: React.FC = async () => {
  const user = await fetchUser();

  return (
    <Tabs defaultValue="results" className="space-y-4">
      <TabsList>
        <TabsTrigger value="results">Recent Quiz Results</TabsTrigger>
        <TabsTrigger value="created">Your Created Quizzes</TabsTrigger>
      </TabsList>
      <TabsContent value="results">
        {user.quizzes.length > 0 ? (
          <Results quizResults={user.quizResults} />
        ) : (
          <Card className="bg-muted">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Target className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">
                No Quiz Results Yet
              </h3>
              <p className="mb-4 text-muted-foreground">
                You haven&apos;t taken any quizzes. Start by taking a quiz!
              </p>
              <Link href="/dashboard">
                <Button>Take a Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="created">
        {user.quizzes.length > 0 ? (
          <Quizzes quizzes={user.quizzes} />
        ) : (
          <Card className="bg-muted">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">
                No Quizzes Created Yet
              </h3>
              <p className="mb-4 text-muted-foreground">
                You haven&apos;t created any quizzes. Start by creating your
                first quiz!
              </p>
              <Link href="/dashboard">
                <Button>Create Your First Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TabSection;
