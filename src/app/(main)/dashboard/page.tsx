import Link from "next/link";
import { redirect } from "next/navigation";

import { PlusCircle } from "lucide-react";
import { getServerSession } from "next-auth";

import InfoCardSection from "@/components/dashboard/info-card-section";
import TabSection from "@/components/dashboard/tab-section";
import { Button } from "@/components/ui/button";
import options from "@/config/auth";

export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="container mx-auto space-y-8 p-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, {session.user!.name}</h1>
        <Link href="/">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>Create Quiz</span>
          </Button>
        </Link>
      </div>

      <InfoCardSection />
      <TabSection />
    </main>
  );
}
