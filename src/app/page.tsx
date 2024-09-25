import CallToActionSection from "@/components/landing/cta-section";
import FaqSection from "@/components/landing/faq-section";
import HeroSection from "@/components/landing/hero-section";
import Testimonials from "@/components/landing/testimonials";
import WhyQuizWizSection from "@/components/landing/why-quizwiz-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhyQuizWizSection />
      <Testimonials />
      <FaqSection />
      <CallToActionSection />
    </main>
  );
}
