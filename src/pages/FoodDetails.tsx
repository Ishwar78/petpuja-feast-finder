import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FoodCard } from '@/components/FoodCard';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { Star, Plus, Minus, ArrowLeft, Flame, Clock, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const FoodDetails = () => {
  const { id } = useParams();
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  
  const item = menuItems.find(i => i.id === id);
  const quantity = item ? getItemQuantity(item.id) : 0;
  
  const relatedItems = menuItems
    .filter(i => i.category === item?.category && i.id !== item?.id)
    .slice(0, 4);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground mb-4">Item not found</p>
            <Link to="/menu">
              <Button variant="default">Back to Menu</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/menu" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-warm-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {/* Veg/Non-Veg Badge */}
              <div className={cn(
                "absolute top-4 left-4 px-3 py-1.5 rounded-full flex items-center gap-2",
                item.isVeg ? "bg-green-fresh" : "bg-accent"
              )}>
                <Leaf className="w-4 h-4 text-primary-foreground" />
                <span className="text-primary-foreground text-sm font-medium">
                  {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {item.name}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  {item.description}
                </p>
              </div>

              {/* Rating & Info */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-full">
                  <Star className="w-5 h-5 fill-gold text-gold" />
                  <span className="font-semibold text-foreground">{item.rating}</span>
                  <span className="text-muted-foreground text-sm">({item.reviews} reviews)</span>
                </div>
                
                {item.spicy && (
                  <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full">
                    <Flame className="w-4 h-4 text-accent" />
                    <span className="text-foreground text-sm capitalize">{item.spicy}</span>
                  </div>
                )}

                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground text-sm">20-30 min</span>
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-border">
                <p className="text-4xl font-bold text-primary">₹{item.price}</p>
                <p className="text-muted-foreground text-sm mt-1">Inclusive of all taxes</p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {quantity === 0 ? (
                  <Button
                    variant="cart"
                    size="xl"
                    className="flex-1"
                    onClick={() => addItem(item)}
                  >
                    <Plus className="w-5 h-5" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 bg-secondary rounded-xl p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      <span className="text-xl font-bold text-foreground min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                    <Link to="/cart" className="flex-1">
                      <Button variant="warm" size="xl" className="w-full">
                        View Cart
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-secondary rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold text-foreground capitalize">{item.category.replace('-', ' ')}</p>
                </div>
                <div className="bg-secondary rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">Serves</p>
                  <p className="font-semibold text-foreground">1-2 People</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedItems.map((relatedItem) => (
                  <FoodCard key={relatedItem.id} item={relatedItem} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodDetails;
