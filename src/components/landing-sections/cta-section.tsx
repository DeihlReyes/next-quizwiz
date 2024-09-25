import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "../ui/button";

export default function CallToActionSection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-8 text-3xl font-bold">
          Ready to Supercharge Your Learning?
        </h2>
        <p className="mb-8 text-xl">
          Join thousands of learners who are already improving their knowledge
          with QuizWiz.
        </p>
        <Link href="/sign-in">
          <Button
            size="lg"
            className="bg-primary-foreground px-8 py-6 text-lg text-primary hover:bg-primary-foreground/90"
          >
            Start Your Learning Journey
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
