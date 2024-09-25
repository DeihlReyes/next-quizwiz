import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is QuizWiz free to use?",
    answer:
      "Yes, QuizWiz is completely free to use. You can generate quizzes, track your progress, and more without any cost.",
  },
  {
    question: "How does the AI generate quizzes?",
    answer:
      "QuizWiz is powered by Gemini AI which is developed by Google. We use prompts to generate quizzes based on your specified topics.",
  },
  {
    question: "Can I create my own quizzes?",
    answer:
      "QuizWiz allows you to create custom quizzes or use our AI to generate quizzes based on your specified topics.",
  },
  {
    question: "Is QuizWiz suitable for all age groups?",
    answer:
      "Yes, QuizWiz is designed for learners of all ages. Our adaptive difficulty ensures that quizzes are appropriate for various skill levels.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
