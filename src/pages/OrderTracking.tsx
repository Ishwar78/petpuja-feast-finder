import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  ChefHat, 
  Bike, 
  Package, 
  MapPin, 
  Phone,
  RefreshCw,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderStatus {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  time?: string;
}

const statuses: OrderStatus[] = [
  { id: 'placed', label: 'Order Placed', description: 'We received your order', icon: Package },
  { id: 'confirmed', label: 'Confirmed', description: 'Restaurant confirmed your order', icon: CheckCircle },
  { id: 'preparing', label: 'Preparing', description: 'Chef is cooking your food', icon: ChefHat },
  { id: 'out-for-delivery', label: 'Out for Delivery', description: 'Rider is on the way', icon: Bike },
  { id: 'delivered', label: 'Delivered', description: 'Enjoy your meal!', icon: MapPin },
];

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || 'PP' + Date.now().toString().slice(-8);
  
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [statusTimes, setStatusTimes] = useState<string[]>([]);

  // Simulate real-time status updates
  useEffect(() => {
    const now = new Date();
    setStatusTimes([now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })]);

    const interval = setInterval(() => {
      setCurrentStatusIndex(prev => {
        if (prev < statuses.length - 1) {
          const newTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
          setStatusTimes(times => [...times, newTime]);
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 8000); // Update status every 8 seconds for demo

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (currentStatusIndex >= statuses.length - 1) return;

    const timer = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute in real scenario

    // For demo, update faster
    const demoTimer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(demoTimer);
    };
  }, [currentStatusIndex]);

  const isDelivered = currentStatusIndex >= statuses.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <RefreshCw className={cn(
                "w-4 h-4 text-primary",
                !isDelivered && "animate-spin"
              )} />
              <span className="text-primary text-sm font-medium">
                {isDelivered ? 'Order Delivered' : 'Live Tracking'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Track Your Order
            </h1>
            <p className="text-muted-foreground">Order ID: {orderId}</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            {/* Estimated Time Card */}
            <div className={cn(
              "rounded-2xl p-6 text-center transition-all duration-500",
              isDelivered 
                ? "bg-green-fresh text-primary-foreground" 
                : "bg-gradient-to-r from-primary to-accent text-primary-foreground"
            )}>
              {isDelivered ? (
                <div className="animate-scale-in">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Order Delivered!</h2>
                  <p className="opacity-90">Thank you for ordering from PetPuja</p>
                </div>
              ) : (
                <>
                  <Clock className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <p className="text-sm opacity-80 mb-1">Estimated Delivery Time</p>
                  <p className="text-4xl md:text-5xl font-bold mb-2">
                    {estimatedTime} <span className="text-2xl">mins</span>
                  </p>
                  <p className="text-sm opacity-80">
                    {currentStatusIndex === 3 
                      ? '🏍️ Rider is almost there!' 
                      : 'We\'re preparing your delicious food'}
                  </p>
                </>
              )}
            </div>

            {/* Status Timeline */}
            <div className="bg-card rounded-2xl p-6 shadow-warm-md">
              <h2 className="text-lg font-semibold text-foreground mb-6">Order Status</h2>
              
              <div className="space-y-0">
                {statuses.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const Icon = status.icon;

                  return (
                    <div key={status.id} className="relative">
                      <div className="flex gap-4">
                        {/* Icon & Line */}
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                            isCompleted 
                              ? "bg-green-fresh text-primary-foreground" 
                              : "bg-secondary text-muted-foreground",
                            isCurrent && "ring-4 ring-green-fresh/30 animate-pulse"
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {index < statuses.length - 1 && (
                            <div className={cn(
                              "w-0.5 h-16 transition-all duration-500",
                              isCompleted ? "bg-green-fresh" : "bg-border"
                            )} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className={cn(
                                "font-semibold transition-colors",
                                isCompleted ? "text-foreground" : "text-muted-foreground"
                              )}>
                                {status.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {status.description}
                              </p>
                            </div>
                            {statusTimes[index] && (
                              <span className="text-sm text-muted-foreground">
                                {statusTimes[index]}
                              </span>
                            )}
                          </div>
                          
                          {isCurrent && !isDelivered && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-primary animate-fade-in">
                              <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                              </span>
                              In Progress...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Partner Info (shown when out for delivery) */}
            {currentStatusIndex >= 3 && !isDelivered && (
              <div className="bg-card rounded-2xl p-6 shadow-warm-md animate-slide-up">
                <h2 className="text-lg font-semibold text-foreground mb-4">Delivery Partner</h2>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="Delivery Partner"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Ravi Kumar</p>
                    <p className="text-sm text-muted-foreground">Delivery Executive</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-gold">★</span>
                      <span className="text-sm text-foreground">4.8</span>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Phone className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="warm" className="w-full sm:w-auto">
                  Order More Food
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
