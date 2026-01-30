import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPickles } from "@/components/home/FeaturedPickles";
import { StorySection } from "@/components/home/StorySection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedPickles />
      <StorySection />
      <CTASection />
    </main>
  );
};

export default Index;
