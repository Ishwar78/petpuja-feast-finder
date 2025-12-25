import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FoodCard } from '@/components/FoodCard';
import { menuItems } from '@/data/menuData';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Favorites = () => {
  const { favorites } = useFavorites();
  
  const favoriteItems = menuItems.filter(item => favorites.includes(item.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-foreground to-brown-light py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-accent fill-accent" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">
                Your <span className="text-primary">Favorites</span>
              </h1>
            </div>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              All your saved dishes in one place
            </p>
          </div>
        </section>

        {/* Favorites Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {favoriteItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <FoodCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-foreground font-semibold mb-2">No favorites yet</p>
                <p className="text-muted-foreground mb-6">
                  Start adding dishes to your favorites by tapping the heart icon
                </p>
                <Link to="/menu">
                  <Button variant="default" size="lg">
                    Browse Menu
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
