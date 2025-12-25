import { useState, useEffect } from 'react';
import { Star, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  itemId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemName: string;
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const ReviewModal = ({ isOpen, onClose, itemId, itemName, onSubmit }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive"
      });
      return;
    }

    if (!userName.trim()) {
      toast({
        title: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      itemId,
      userName: userName.trim(),
      rating,
      comment: comment.trim()
    });

    // Reset form
    setRating(0);
    setComment('');
    setUserName('');
    onClose();

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback."
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-warm-lg w-full max-w-md animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Rate & Review</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">
            How was <span className="font-semibold text-foreground">{itemName}</span>?
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Your Rating
              </label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 transition-colors",
                        (hoverRating || rating) >= star
                          ? "fill-gold text-gold"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent!"}
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                placeholder="Enter your name"
                maxLength={50}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Review (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-24 px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                placeholder="Tell us about your experience..."
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right mt-1">
                {comment.length}/500
              </p>
            </div>

            {/* Submit */}
            <Button type="submit" variant="warm" size="lg" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reviews List Component
interface ReviewsListProps {
  reviews: Review[];
  maxItems?: number;
}

export const ReviewsList = ({ reviews, maxItems }: ReviewsListProps) => {
  const displayReviews = maxItems ? reviews.slice(0, maxItems) : reviews;

  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {displayReviews.map((review) => (
        <div key={review.id} className="bg-secondary/50 rounded-xl p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {review.userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{review.userName}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-3 h-3",
                        review.rating >= star
                          ? "fill-gold text-gold"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(review.date).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          {review.comment && (
            <p className="text-foreground/80 text-sm mt-2">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

// Hook for managing reviews
export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('petpuja-reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load reviews');
      }
    }
  }, []);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    setReviews(prev => {
      const updated = [newReview, ...prev];
      localStorage.setItem('petpuja-reviews', JSON.stringify(updated));
      return updated;
    });
  };

  const getItemReviews = (itemId: string) => {
    return reviews.filter(r => r.itemId === itemId);
  };

  const getItemRating = (itemId: string) => {
    const itemReviews = getItemReviews(itemId);
    if (itemReviews.length === 0) return null;
    const avg = itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length;
    return {
      average: Math.round(avg * 10) / 10,
      count: itemReviews.length
    };
  };

  return { reviews, addReview, getItemReviews, getItemRating };
};
