import { Star, Quote } from 'lucide-react';
import { reviews } from '@/data/menuData';

export const ReviewsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-gold text-gold' : 'text-muted'
                    }`}
                  />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary/30 mb-2" />
              
              <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">50K+</p>
            <p className="text-muted-foreground text-sm mt-1">Happy Customers</p>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">100+</p>
            <p className="text-muted-foreground text-sm mt-1">Menu Items</p>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">4.8</p>
            <p className="text-muted-foreground text-sm mt-1">Average Rating</p>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">30 Min</p>
            <p className="text-muted-foreground text-sm mt-1">Avg. Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};
