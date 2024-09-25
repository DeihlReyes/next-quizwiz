import Navbar from "@/components/landing-navbar";
import CallToActionSection from "@/components/landing-sections/cta-section";
import FaqSection from "@/components/landing-sections/faq-section";
import HeroSection from "@/components/landing-sections/hero-section";
import Testimonials from "@/components/landing-sections/testimonials";
import WhyQuizWizSection from "@/components/landing-sections/why-quizwiz-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <WhyQuizWizSection />
        <Testimonials />
        <FaqSection />
        <CallToActionSection />
      </main>
    </>
  );
}
