import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { NotificationCenter } from '@/components/NotificationCenter';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Offers', path: '/offers' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-warm-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shadow-warm-md group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-primary-foreground font-bold text-lg md:text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-foreground">
                Pet<span className="text-primary">Puja</span>
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground -mt-1 hidden sm:block">
                Har Bite Mein Swad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-primary relative py-2",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/favorites" className="hidden md:block relative">
              <Button variant="ghost" size="icon" title="Favorites">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/order-history" className="hidden md:block">
              <Button variant="ghost" size="icon" title="Order History">
                <Clock className="h-5 w-5" />
              </Button>
            </Link>

            <div className="hidden md:block">
              <NotificationCenter />
            </div>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/admin" className="hidden md:block">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/menu" className="hidden sm:block">
              <Button variant="warm" size="default">
                Order Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-secondary flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Favorites {favorites.length > 0 && `(${favorites.length})`}
              </Link>
              <Link
                to="/order-history"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                Order History
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                Admin Panel
              </Link>
              <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="mt-2">
                <Button variant="warm" className="w-full">
                  Order Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
