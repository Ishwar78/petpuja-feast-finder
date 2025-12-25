import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSection } from '@/components/FeaturedSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { useOrderNotifications } from '@/hooks/useOrderNotifications';

const Index = () => {
  // Initialize notifications on home page
  useOrderNotifications();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
