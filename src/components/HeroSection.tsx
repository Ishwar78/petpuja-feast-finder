import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-brown-light to-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Free Delivery on First Order
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight">
              <span className="text-primary">PetPuja</span>
              <br />
              <span className="text-primary-foreground/90">Har Bite Mein</span>
              <br />
              <span className="text-gradient">Swad</span>
            </h1>

            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
              Experience the authentic taste of India with fresh ingredients, 
              traditional recipes, and lightning-fast delivery to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/menu">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  View Menu
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">30 Min</p>
                  <p className="text-primary-foreground/60 text-xs">Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">4.8+</p>
                  <p className="text-primary-foreground/60 text-xs">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">50K+</p>
                  <p className="text-primary-foreground/60 text-xs">Orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20" />
              
              {/* Main Food Image */}
              <div className="absolute inset-12 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop"
                  alt="Delicious Food"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating food items */}
              <div className="absolute top-4 right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-warm-lg animate-bounce border-2 border-card">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
                  alt="Burger"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-8 left-0 w-20 h-20 rounded-2xl overflow-hidden shadow-warm-lg animate-bounce border-2 border-card" style={{ animationDelay: '0.5s' }}>
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop"
                  alt="Pizza"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};
