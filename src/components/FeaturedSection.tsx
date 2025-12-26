import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FoodCard } from '@/components/FoodCard';
import { productsAPI } from '@/lib/api';
import type { MenuItem } from '@/data/menuData';

export const FeaturedSection = () => {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPopularItems();
  }, []);

  const fetchPopularItems = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getAll();
      const popular = response.data.filter((item: MenuItem) => item.popular).slice(0, 6);
      setPopularItems(popular);
    } catch (err) {
      console.error('Failed to fetch popular items:', err);
      setPopularItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div className="animate-slide-up">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Specials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Popular Dishes
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Explore our most loved dishes, crafted with passion and served with love
            </p>
          </div>
          <Link to="/menu">
            <Button variant="outline" className="group">
              View All Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Food Grid */}
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading popular dishes...</p>
          </div>
        ) : popularItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FoodCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No popular dishes available</p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-accent p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-background rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                Hungry? Order Now!
              </h3>
              <p className="text-primary-foreground/80 mt-2">
                Get 20% off on your first order. Use code: PETPUJA20
              </p>
            </div>
            <Link to="/menu">
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-card text-foreground hover:bg-card/90 shadow-warm-lg"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
