import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-primary to-background py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl">
          Master Any Subject with QuizWiz
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-primary-foreground/80">
          Create, take, and analyze quizzes on any topic. Boost your learning
          with AI-powered questions and personalized feedback.
        </p>
        <Link href="/">
          <Button size="lg" className="px-8 py-6 text-lg">
            Get Started for Free
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
