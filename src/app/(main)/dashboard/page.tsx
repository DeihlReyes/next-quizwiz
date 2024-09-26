import Link from "next/link";
import { redirect } from "next/navigation";

import { PlusCircle } from "lucide-react";
import { getServerSession } from "next-auth";

import InfoCardSection from "@/components/dashboard/info-card-section";
import TabSection from "@/components/dashboard/tab-section";
import AuthDropDown from "@/components/landing-navbar/auth-dropdown";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import options from "@/config/auth";

export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center justify-between space-y-4 sm:space-y-0 md:flex-row">
            <h1 className="hidden text-center font-bold text-primary sm:text-left md:block md:text-2xl lg:text-3xl">
              Welcome, {session.user?.name || "Guest"}
            </h1>
            <div className="flex w-full flex-row-reverse items-center justify-between sm:gap-5 md:w-fit md:flex-row md:justify-end md:gap-4">
              <Link href="/quiz/create">
                <Button
                  className="flex w-full items-center justify-center space-x-2 sm:w-auto"
                  size="lg"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Create Quiz</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </Link>
              <div className="flex flex-row-reverse items-center gap-4 md:flex-row">
                <ModeToggle />
                <AuthDropDown />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <InfoCardSection />
          <TabSection />
        </div>
      </div>
    </main>
  );
}
