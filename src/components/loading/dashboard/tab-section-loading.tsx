import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabSectionLoading() {
  return (
    <Tabs defaultValue="results" className="space-y-4">
      <TabsList>
        <TabsTrigger value="results">Recent Quiz Results</TabsTrigger>
        <TabsTrigger value="created">Your Created Quizzes</TabsTrigger>
      </TabsList>
      <TabsContent value="results">
        <Skeleton className="h-32 w-full" />
      </TabsContent>
    </Tabs>
  );
}
