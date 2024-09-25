import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Student",
    quote:
      "QuizWiz has revolutionized my study routine. The AI-generated quizzes are spot-on and have significantly improved my grades.",
  },
  {
    name: "Sarah Lee",
    role: "Teacher",
    quote:
      "As an educator, I find QuizWiz invaluable. It helps me create engaging quizzes for my students and track their progress effortlessly.",
  },
  {
    name: "Michael Chen",
    role: "Lifelong Learner",
    quote:
      "The variety of topics and adaptive difficulty in QuizWiz keep me motivated to learn something new every day.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary-foreground/5">
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">&quot;{testimonial.quote}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
