import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Home, Printer } from 'lucide-react';

interface OrderData {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
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
}

const OrderConfirmation = () => {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('petpuja-last-order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI Payment';
      case 'card': return 'Card Payment';
      default: return method;
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <p className="text-xl text-foreground mb-4">No order found</p>
            <Link to="/menu">
              <Button variant="warm">Browse Menu</Button>
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
        <div className="container mx-auto px-4 py-8">
          {/* Success Message */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="w-20 h-20 bg-green-fresh rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground">
              Thank you for ordering from PetPuja
            </p>
          </div>

          {/* Invoice */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-warm-lg overflow-hidden" id="invoice">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">P</span>
                  </div>
                  <span className="text-2xl font-bold text-primary-foreground">
                    Pet<span className="text-primary-foreground/80">Puja</span>
                  </span>
                </div>
                <p className="text-primary-foreground/80 text-sm">Har Bite Mein Swad</p>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-bold text-foreground text-lg">{order.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium text-foreground">{formatDate(order.orderDate)}</p>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-2">Delivery To</p>
                  <p className="font-semibold text-foreground">{order.customer.name}</p>
                  <p className="text-foreground/80 text-sm">{order.customer.phone}</p>
                  <p className="text-foreground/80 text-sm">{order.customer.address}, {order.customer.city}</p>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Order Items</p>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="text-foreground">{item.name}</span>
                          <span className="text-muted-foreground"> x{item.quantity}</span>
                        </div>
                        <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-secondary rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="text-foreground">₹{order.gst}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">
                      {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="text-foreground">{getPaymentLabel(order.paymentMethod)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-bold text-foreground">Grand Total</span>
                    <span className="font-bold text-primary text-xl">₹{order.grandTotal}</span>
                  </div>
                </div>

                {/* Thank You */}
                <div className="text-center mt-6 pt-6 border-t border-border">
                  <p className="text-primary font-semibold">Thank You for Ordering from PetPuja!</p>
                  <p className="text-muted-foreground text-sm mt-1">Your order will be delivered in 30-45 minutes</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print Invoice
              </Button>
              <Link to="/">
                <Button variant="warm">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
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

export default OrderConfirmation;
