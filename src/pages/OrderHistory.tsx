import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  Receipt,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  orderDate: string;
  status?: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('petpuja-order-history');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to load order history');
      }
    }

    // Also check for the last order and add it if not already in history
    const lastOrder = localStorage.getItem('petpuja-last-order');
    if (lastOrder) {
      try {
        const order = JSON.parse(lastOrder);
        setOrders(prev => {
          const exists = prev.some(o => o.orderId === order.orderId);
          if (!exists) {
            const updated = [order, ...prev];
            localStorage.setItem('petpuja-order-history', JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      } catch (e) {
        console.error('Failed to process last order');
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-fresh/10 text-green-fresh';
      case 'In Transit': return 'bg-primary/10 text-primary';
      case 'Preparing': return 'bg-gold/10 text-gold';
      case 'Cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-green-fresh/10 text-green-fresh';
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      // Add each item to cart
      for (let i = 0; i < item.quantity; i++) {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          description: '',
          image: item.image || '',
          category: 'veg',
          isVeg: true,
          rating: 4.5,
          reviews: 0
        });
      }
    });
    
    toast({
      title: "Items Added to Cart!",
      description: `${order.items.length} items from your previous order have been added.`,
    });
  };

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Your order history will appear here</p>
            <Link to="/menu">
              <Button variant="warm" size="lg">
                Browse Menu
              </Button>
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
        {/* Page Header */}
        <section className="bg-gradient-to-br from-foreground to-brown-light py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Order <span className="text-primary">History</span>
            </h1>
            <p className="text-primary-foreground/70">
              View your past orders and reorder your favorites
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div
                  key={order.orderId}
                  className="bg-card rounded-2xl shadow-warm-sm overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Order Header */}
                  <button
                    onClick={() => toggleOrder(order.orderId)}
                    className="w-full p-4 md:p-6 flex items-center gap-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{order.orderId}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(order.status || 'Delivered')
                        )}>
                          {order.status || 'Delivered'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(order.orderDate)}
                        </span>
                        <span>•</span>
                        <span>{order.items.length} items</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-foreground">₹{order.grandTotal}</p>
                      {expandedOrder === order.orderId ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground ml-auto" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground ml-auto" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {expandedOrder === order.orderId && (
                    <div className="px-4 md:px-6 pb-6 border-t border-border animate-fade-in">
                      {/* Items */}
                      <div className="py-4 space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Order Items</h4>
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ₹{item.price} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium text-foreground">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address */}
                      <div className="py-4 border-t border-border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Delivered To</h4>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">{order.customer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.customer.address}, {order.customer.city}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price Summary */}
                      <div className="py-4 border-t border-border">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-foreground">₹{order.subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">GST</span>
                            <span className="text-foreground">₹{order.gst}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Delivery</span>
                            <span className="text-foreground">
                              {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-border font-semibold">
                            <span className="text-foreground">Total</span>
                            <span className="text-primary">₹{order.grandTotal}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <Button 
                          variant="warm" 
                          className="flex-1"
                          onClick={() => handleReorder(order)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                        <Link to={`/track-order?id=${order.orderId}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Clock className="w-4 h-4 mr-2" />
                            Track
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
