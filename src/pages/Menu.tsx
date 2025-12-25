import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FoodCard } from '@/components/FoodCard';
import { menuItems, categories } from '@/data/menuData';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { VoiceSearch } from '@/components/VoiceSearch';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVoiceResult = (transcript: string) => {
    setSearchQuery(transcript);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-foreground to-brown-light py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Explore our wide variety of delicious dishes prepared with love
            </p>

            {/* Search Bar with Voice Input */}
            <div className="mt-8 max-w-md mx-auto relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <VoiceSearch onResult={handleVoiceResult} />
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-16 md:top-20 z-40 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-warm-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Food Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
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
                <p className="text-xl text-muted-foreground">No dishes found</p>
                <p className="text-sm text-muted-foreground mt-2">Try a different search or category</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
