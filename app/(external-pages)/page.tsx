import FaqSection from "@/components/home/faq-section";
import ServicesSection from "@/components/home/services-section";
import TestimonialSection from "@/components/home/testimonial-section";

export default function Home() {
  return (
    <div>
      <ServicesSection />
      <TestimonialSection />
      <FaqSection />
    </div>
  );
}
