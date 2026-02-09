import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedListings from "@/components/home/FeaturedListings";
import BreedCategories from "@/components/home/BreedCategories";
import QuizCTA from "@/components/home/QuizCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <HowItWorks />
        <BreedCategories />
        <FeaturedListings />
        <QuizCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
