import { Link } from 'react-router-dom';
import { Star, Plus, Minus, Flame, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { useReviews } from '@/components/ReviewSystem';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FoodCardProps {
  item: MenuItem;
  compact?: boolean;
}

export const FoodCard = ({ item, compact = false }: FoodCardProps) => {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const { getItemRating } = useReviews();
  const { isFavorite, toggleFavorite } = useFavorites();
  const quantity = getItemQuantity(item.id);
  const favorite = isFavorite(item.id);
  
  // Use customer reviews if available, otherwise use default
  const itemRating = getItemRating(item.id);
  const displayRating = itemRating?.average || item.rating;
  const displayReviewCount = itemRating?.count || item.reviews;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
    toast.success(favorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className={cn(
      "group bg-card rounded-2xl overflow-hidden shadow-warm-sm food-card-hover border border-border/50",
      compact ? "flex" : "flex flex-col"
    )}>
      {/* Image */}
      <Link 
        to={`/menu/${item.id}`}
        className={cn(
          "relative overflow-hidden",
          compact ? "w-28 h-28 shrink-0" : "aspect-[4/3]"
        )}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Veg/Non-Veg Badge */}
        <div className={cn(
          "absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center",
          item.isVeg 
            ? "border-green-fresh bg-card" 
            : "border-accent bg-card"
        )}>
          <div className={cn(
            "w-2.5 h-2.5 rounded-full",
            item.isVeg ? "bg-green-fresh" : "bg-accent"
          )} />
        </div>
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
            favorite 
              ? "bg-accent text-accent-foreground" 
              : "bg-card/80 text-muted-foreground hover:bg-card hover:text-accent"
          )}
        >
          <Heart className={cn("w-4 h-4", favorite && "fill-current")} />
        </button>
        {/* Popular Badge */}
        {item.popular && !compact && (
          <div className="absolute top-2 left-10 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
        {/* Spicy Indicator */}
        {item.spicy && !compact && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-foreground/80 text-background text-xs px-2 py-1 rounded-full">
            <Flame className="w-3 h-3 text-primary" />
            {item.spicy}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className={cn(
        "flex flex-col",
        compact ? "p-3 flex-1 min-w-0" : "p-4"
      )}>
        <Link to={`/menu/${item.id}`}>
          <h3 className={cn(
            "font-semibold text-foreground hover:text-primary transition-colors truncate",
            compact ? "text-sm" : "text-lg"
          )}>
            {item.name}
          </h3>
        </Link>

        {!compact && (
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-gold text-gold" />
          <span className="text-sm font-medium text-foreground">{displayRating}</span>
          {!compact && (
            <span className="text-xs text-muted-foreground">({displayReviewCount})</span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className={cn(
          "flex items-center justify-between mt-auto",
          compact ? "mt-2" : "mt-4"
        )}>
          <span className={cn(
            "font-bold text-foreground",
            compact ? "text-base" : "text-xl"
          )}>
            ₹{item.price}
          </span>

          {quantity === 0 ? (
            <Button
              variant="cart"
              size={compact ? "sm" : "default"}
              onClick={() => addItem(item)}
              className={compact ? "h-8 px-3" : ""}
            >
              <Plus className="w-4 h-4" />
              <span className={compact ? "sr-only" : ""}>Add</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-green-fresh rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-green-fresh/80 rounded-none"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-primary-foreground font-semibold min-w-[20px] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-green-fresh/80 rounded-none"
                onClick={() => updateQuantity(item.id, quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
