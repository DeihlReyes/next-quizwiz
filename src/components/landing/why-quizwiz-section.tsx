import { Brain, CheckCircle, Trophy, Users, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Generated Quizzes",
    description:
      "Our advanced AI creates tailored quizzes on any topic, ensuring fresh and challenging content.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get immediate results and explanations to enhance your learning experience.",
  },
  {
    icon: CheckCircle,
    title: "Progress Tracking",
    description:
      "Monitor your improvement over time with detailed performance analytics.",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description:
      "Earn badges and climb leaderboards as you master new subjects.",
  },
  {
    icon: Users,
    title: "Collaborative Study",
    description:
      "Create and share quizzes with friends or classmates for group learning.",
  },
  {
    icon: Brain,
    title: "Adaptive Difficulty",
    description:
      "Questions adjust to your skill level, providing an optimal challenge.",
  },
];

export default function WhyQuizWizSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose QuizWiz?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <feature.icon className="mb-4 h-12 w-12 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
