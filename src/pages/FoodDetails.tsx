import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FoodCard } from '@/components/FoodCard';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { ReviewModal, ReviewsList, useReviews } from '@/components/ReviewSystem';
import { Star, Plus, Minus, ArrowLeft, Flame, Clock, Leaf, MessageSquarePlus, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SizeOption = { id: string; label: string; priceMultiplier: number };

const getSizeOptions = (category: string): SizeOption[] => {
  if (category === 'drinks') {
    return [
      { id: 'small', label: 'Small (250ml)', priceMultiplier: 0.8 },
      { id: 'medium', label: 'Medium (500ml)', priceMultiplier: 1 },
      { id: 'large', label: 'Large (750ml)', priceMultiplier: 1.3 },
    ];
  }
  if (category === 'combos') {
    return [
      { id: 'regular', label: 'Regular', priceMultiplier: 1 },
      { id: 'family', label: 'Family Pack', priceMultiplier: 1.8 },
    ];
  }
  return [
    { id: 'small', label: 'Small', priceMultiplier: 0.75 },
    { id: 'medium', label: 'Medium', priceMultiplier: 1 },
    { id: 'large', label: 'Large', priceMultiplier: 1.3 },
  ];
};

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const { addReview, getItemReviews, getItemRating } = useReviews();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [orderQuantity, setOrderQuantity] = useState(1);

  const item = menuItems.find(i => i.id === id);
  const quantity = item ? getItemQuantity(item.id) : 0;

  const sizeOptions = item ? getSizeOptions(item.category) : [];
  const currentSize = sizeOptions.find(s => s.id === selectedSize) || sizeOptions.find(s => s.id === 'medium') || sizeOptions[0];
  const adjustedPrice = item ? Math.round(item.price * (currentSize?.priceMultiplier || 1)) : 0;

  const relatedItems = menuItems
    .filter(i => i.category === item?.category && i.id !== item?.id)
    .slice(0, 4);

  const itemReviews = item ? getItemReviews(item.id) : [];
  const itemRating = item ? getItemRating(item.id) : null;

  const displayRating = itemRating?.average || item?.rating || 0;
  const displayReviewCount = itemRating?.count || item?.reviews || 0;

  const handleOrderNow = () => {
    if (!item) return;
    // Add items to cart with selected quantity
    for (let i = 0; i < orderQuantity; i++) {
      addItem(item);
    }
    toast.success(`${orderQuantity}x ${item.name} (${currentSize?.label}) added!`);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    if (!item) return;
    for (let i = 0; i < orderQuantity; i++) {
      addItem(item);
    }
    toast.success(`${orderQuantity}x ${item.name} (${currentSize?.label}) added to cart!`);
  };

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
            <div className="space-y-5">
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
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors"
                >
                  <Star className="w-5 h-5 fill-gold text-gold" />
                  <span className="font-semibold text-foreground">{displayRating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({displayReviewCount} {displayReviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </button>

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

              {/* Size Selection */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-foreground mb-3">Choose Size</p>
                <div className="flex flex-wrap gap-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={cn(
                        "px-5 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-200",
                        selectedSize === size.id
                          ? "border-primary bg-primary/10 text-primary shadow-warm-sm"
                          : "border-border bg-secondary text-foreground hover:border-primary/50"
                      )}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-border">
                <p className="text-4xl font-bold text-primary">₹{adjustedPrice}</p>
                <p className="text-muted-foreground text-sm mt-1">Inclusive of all taxes</p>
              </div>

              {/* Quantity Selector */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Quantity</p>
                <div className="inline-flex items-center gap-3 bg-secondary rounded-xl p-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                    onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-bold text-foreground min-w-[40px] text-center">
                    {orderQuantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                    onClick={() => setOrderQuantity(Math.min(20, orderQuantity + 1))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Total: <span className="font-semibold text-foreground">₹{adjustedPrice * orderQuantity}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="cart"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="warm"
                  size="xl"
                  className="flex-1"
                  onClick={handleOrderNow}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Order Now
                </Button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 pt-2">
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

          {/* Reviews Section */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Customer Reviews
                {itemReviews.length > 0 && (
                  <span className="text-muted-foreground text-lg font-normal ml-2">
                    ({itemReviews.length})
                  </span>
                )}
              </h2>
              <Button variant="outline" onClick={() => setShowReviewModal(true)}>
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-warm-sm">
              <ReviewsList reviews={itemReviews} maxItems={5} />
            </div>
          </section>

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

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        itemId={item.id}
        itemName={item.name}
        onSubmit={addReview}
      />
    </div>
  );
};

export default FoodDetails;
