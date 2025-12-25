import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChefHat, Users, Award, Truck } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: ChefHat,
      title: 'Expert Chefs',
      description: 'Our experienced chefs bring years of culinary expertise to create authentic flavors'
    },
    {
      icon: Users,
      title: '50K+ Happy Customers',
      description: 'Trusted by thousands of food lovers across the city'
    },
    {
      icon: Award,
      title: 'Quality Ingredients',
      description: 'We source only the freshest and finest ingredients for our dishes'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Hot and fresh food delivered to your doorstep in 30 minutes'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-foreground to-brown-light py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              About <span className="text-primary">PetPuja</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
              Bringing the authentic taste of India to your doorstep with love, passion, and 
              a commitment to quality since 2020.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  From Kitchen to Your Heart
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  PetPuja started with a simple dream - to share the warmth and flavors of 
                  traditional Indian cooking with everyone. What began as a small cloud kitchen 
                  has grown into a beloved food destination for thousands of food lovers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our name "PetPuja" translates to "worship of the stomach" - because we believe 
                  that good food is not just about taste, it's about nourishing the soul. Every 
                  dish we prepare carries the love and dedication of our entire team.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we continue to honor traditional recipes while embracing modern 
                  convenience, ensuring that every bite you take is a celebration of authentic 
                  Indian flavors.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-warm-lg">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"
                    alt="Our Kitchen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-warm-lg">
                  <p className="text-4xl font-bold">4+</p>
                  <p className="text-sm opacity-90">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                What Makes Us Special
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 text-center shadow-warm-sm hover:shadow-warm-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                "Har Bite Mein Swad"
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At PetPuja, our mission is simple - to deliver happiness through food. We 
                believe that every meal should be a memorable experience, filled with authentic 
                flavors, fresh ingredients, and the warmth of home-cooked goodness. Whether 
                it's a quick lunch or a family feast, we're here to make every moment special.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
