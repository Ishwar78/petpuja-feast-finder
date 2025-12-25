import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tag, Clock, Percent, Gift, ArrowRight } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: 'First Order Special',
    code: 'PETPUJA20',
    discount: '20% OFF',
    description: 'Get 20% off on your first order. New users only!',
    validTill: '31 Dec 2024',
    minOrder: 299,
    maxDiscount: 150,
    color: 'from-primary to-accent'
  },
  {
    id: 2,
    title: 'Weekend Feast',
    code: 'WEEKEND50',
    discount: '₹50 OFF',
    description: 'Flat ₹50 off on orders above ₹399 every weekend',
    validTill: 'Every Sat & Sun',
    minOrder: 399,
    maxDiscount: 50,
    color: 'from-green-fresh to-primary'
  },
  {
    id: 3,
    title: 'Combo Saver',
    code: 'COMBO30',
    discount: '30% OFF',
    description: 'Save 30% on all combo meals. Perfect for sharing!',
    validTill: '15 Jan 2025',
    minOrder: 499,
    maxDiscount: 200,
    color: 'from-accent to-primary'
  },
  {
    id: 4,
    title: 'Free Delivery',
    code: 'FREEDELIVERY',
    discount: 'FREE DELIVERY',
    description: 'No delivery charges on orders above ₹500',
    validTill: 'Ongoing',
    minOrder: 500,
    maxDiscount: 40,
    color: 'from-gold to-primary'
  }
];

const Offers = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-foreground to-brown-light py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 mb-6">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Special Offers
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Deals & <span className="text-primary">Offers</span>
            </h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Save big on your favorite dishes with our exclusive offers and discounts
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  className="relative bg-card rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-shadow animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${offer.color} p-6 text-primary-foreground`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm opacity-90 mb-1">{offer.title}</p>
                        <p className="text-3xl font-bold">{offer.discount}</p>
                      </div>
                      <div className="bg-primary-foreground/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <p className="text-xs opacity-90">Use Code</p>
                        <p className="font-bold text-lg">{offer.code}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-foreground mb-4">{offer.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>Min. Order ₹{offer.minOrder}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        <span>Max Discount ₹{offer.maxDiscount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Valid till {offer.validTill}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => copyCode(offer.code)}
                        className="flex-1"
                      >
                        Copy Code
                      </Button>
                      <Link to="/menu" className="flex-1">
                        <Button variant="warm" className="w-full">
                          Order Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-background rounded-full" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-background rounded-full" />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <div className="bg-secondary rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Want More Offers?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and get exclusive deals directly in your inbox!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-12 px-4 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                  <Button variant="warm">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Offers;
