import AboutStylistSection from "@/components/home/about-stylist-section";
import FaqSection from "@/components/home/faq-section";
import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";
import TestimonialSection from "@/components/home/testimonial-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutStylistSection />
      <ServicesSection />
      <TestimonialSection />
      <FaqSection />
    </div>
  );
}
