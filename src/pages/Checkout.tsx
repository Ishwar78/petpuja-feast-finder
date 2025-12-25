import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useOrderNotifications } from '@/hooks/useOrderNotifications';
import { CreditCard, Banknote, Smartphone, MapPin, User, Phone, Star, Gift, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import BonusPointsBanner from '@/components/BonusPointsBanner';

type PaymentMethod = 'cod' | 'upi' | 'card';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { totalPoints, activeBonuses, earnPoints, redeemPoints, getPointsValue, getPointsForAmount, getActiveMultiplier } = useLoyalty();
  const { notifyOrderPlaced, notifyOrderPreparing, notifyOrderOutForDelivery } = useOrderNotifications();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [usePoints, setUsePoints] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Noida',
    pincode: ''
  });

  // Get unique categories from cart items
  const cartCategories = [...new Set(state.items.map(item => item.category).filter(Boolean))] as string[];

  const deliveryCharge = state.subtotal > 500 ? 0 : 40;
  const gst = Math.round(state.subtotal * 0.05);
  const subtotalWithCharges = state.subtotal + deliveryCharge + gst;
  
  // Calculate points discount
  const maxRedeemablePoints = Math.min(totalPoints, Math.floor(subtotalWithCharges * 4)); // Max 100% discount
  const pointsDiscount = usePoints ? getPointsValue(maxRedeemablePoints) : 0;
  const grandTotal = Math.max(0, subtotalWithCharges - pointsDiscount);
  
  // Points to earn on this order (with category bonuses)
  const pointsToEarn = getPointsForAmount(grandTotal, cartCategories);
  const activeMultiplier = getActiveMultiplier(cartCategories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Generate order ID
    const orderId = 'PP' + Date.now().toString().slice(-8);
    
    // Redeem points if using them
    if (usePoints && maxRedeemablePoints > 0) {
      redeemPoints(maxRedeemablePoints, `Redeemed on order #${orderId}`);
    }
    
    // Earn points on the order (with category bonuses)
    if (pointsToEarn > 0) {
      earnPoints(grandTotal, `Order #${orderId}`, orderId, cartCategories);
    }
    
    // Store order details for invoice
    localStorage.setItem('petpuja-last-order', JSON.stringify({
      orderId,
      items: state.items,
      subtotal: state.subtotal,
      gst,
      deliveryCharge,
      pointsRedeemed: usePoints ? maxRedeemablePoints : 0,
      pointsDiscount,
      pointsEarned: pointsToEarn,
      grandTotal,
      paymentMethod,
      customer: formData,
      orderDate: new Date().toISOString()
    }));

    // Send order notifications
    notifyOrderPlaced(orderId);
    
    // Simulate order progress notifications
    setTimeout(() => notifyOrderPreparing(orderId), 10000); // 10 seconds later
    setTimeout(() => notifyOrderOutForDelivery(orderId), 30000); // 30 seconds later

    clearCart();
    navigate('/order-confirmation');
  };

  const paymentOptions = [
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
    { id: 'upi', label: 'UPI Payment', icon: Smartphone, description: 'GPay, PhonePe, Paytm' },
    { id: 'card', label: 'Card Payment', icon: CreditCard, description: 'Credit/Debit Card' },
  ];

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Checkout</h1>
          
          {/* Bonus Points Banner */}
          <BonusPointsBanner />

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Delivery Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Details */}
                <div className="bg-card rounded-2xl p-6 shadow-warm-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">Contact Details</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-card rounded-2xl p-6 shadow-warm-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">Delivery Address</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Complete Address *
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full h-24 px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                        placeholder="House/Flat No., Building, Street, Area"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Landmark
                        </label>
                        <input
                          type="text"
                          value={formData.landmark}
                          onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                          placeholder="Near..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                          placeholder="201301"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-2xl p-6 shadow-warm-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
                  </div>

                  <div className="space-y-3">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setPaymentMethod(option.id as PaymentMethod)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                          paymentMethod === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center",
                          paymentMethod === option.id ? "bg-primary" : "bg-secondary"
                        )}>
                          <option.icon className={cn(
                            "w-6 h-6",
                            paymentMethod === option.id ? "text-primary-foreground" : "text-foreground"
                          )} />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <div className={cn(
                          "ml-auto w-5 h-5 rounded-full border-2",
                          paymentMethod === option.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        )}>
                          {paymentMethod === option.id && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl p-6 shadow-warm-md sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                  
                  {/* Items */}
                  <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Item Total</span>
                      <span className="font-medium text-foreground">₹{state.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (5%)</span>
                      <span className="font-medium text-foreground">₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium text-foreground">
                        {deliveryCharge === 0 ? (
                          <span className="text-green-fresh">FREE</span>
                        ) : (
                          `₹${deliveryCharge}`
                        )}
                      </span>
                    </div>

                    {/* Loyalty Points Section */}
                    {totalPoints > 0 && (
                      <div className="border-t border-border pt-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">Use Points</span>
                            <span className="text-xs text-muted-foreground">({totalPoints} pts)</span>
                          </div>
                          <Switch
                            checked={usePoints}
                            onCheckedChange={setUsePoints}
                          />
                        </div>
                        {usePoints && (
                          <div className="flex justify-between text-sm">
                            <span className="text-primary">Points Discount ({maxRedeemablePoints} pts)</span>
                            <span className="font-medium text-primary">-₹{pointsDiscount.toFixed(0)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-foreground">Total</span>
                        <span className="text-lg font-bold text-primary">₹{grandTotal.toFixed(0)}</span>
                      </div>
                      
                      {/* Points to earn */}
                      <div className="flex flex-col items-center gap-1 mt-2 text-xs bg-primary/10 rounded-lg py-2 px-3">
                        <div className="flex items-center gap-1 text-primary">
                          <Star className="w-3 h-3 fill-primary" />
                          <span>You'll earn <strong>{pointsToEarn}</strong> points on this order</span>
                        </div>
                        {activeMultiplier > 1 && (
                          <div className="flex items-center gap-1 text-accent">
                            <Sparkles className="w-3 h-3" />
                            <span className="font-medium">{activeMultiplier}x bonus active!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="warm" size="xl" className="w-full mt-6">
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
