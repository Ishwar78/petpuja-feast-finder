import { useEffect, useRef } from 'react';
import { useNotifications } from '@/context/NotificationContext';

const SPECIAL_OFFERS = [
  { title: '🔥 Flash Sale!', message: 'Get 20% off on all biryanis for the next 2 hours!' },
  { title: '🎉 Weekend Special', message: 'Free dessert with orders above ₹500!' },
  { title: '🍕 Happy Hours', message: 'Buy 1 Get 1 Free on pizzas from 3-6 PM!' },
  { title: '🎁 New User Offer', message: 'Use code WELCOME50 for 50% off your first order!' },
  { title: '⚡ Limited Time', message: 'Free delivery on all orders today!' },
];

export const useOrderNotifications = () => {
  const { addNotification } = useNotifications();
  const hasShownWelcome = useRef(false);

  // Show a welcome offer on first load
  useEffect(() => {
    if (hasShownWelcome.current) return;
    
    const hasSeenWelcome = localStorage.getItem('has-seen-welcome-offer');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        addNotification({
          title: '👋 Welcome to PetPuja!',
          message: 'Enable notifications to get exclusive offers and order updates!',
          type: 'offer'
        });
        localStorage.setItem('has-seen-welcome-offer', 'true');
      }, 3000);
      
      hasShownWelcome.current = true;
      return () => clearTimeout(timer);
    }
    hasShownWelcome.current = true;
  }, [addNotification]);

  // Simulate occasional special offers
  useEffect(() => {
    const showRandomOffer = () => {
      const lastOfferTime = localStorage.getItem('last-offer-time');
      const now = Date.now();
      
      // Only show offer if more than 5 minutes have passed
      if (lastOfferTime && now - parseInt(lastOfferTime) < 5 * 60 * 1000) {
        return;
      }

      const offer = SPECIAL_OFFERS[Math.floor(Math.random() * SPECIAL_OFFERS.length)];
      addNotification({
        title: offer.title,
        message: offer.message,
        type: 'offer'
      });
      localStorage.setItem('last-offer-time', now.toString());
    };

    // Show an offer after 30 seconds of browsing
    const timer = setTimeout(showRandomOffer, 30000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  const notifyOrderPlaced = (orderId: string) => {
    addNotification({
      title: '✅ Order Placed!',
      message: `Your order #${orderId} has been confirmed. We're preparing it now!`,
      type: 'order'
    });
  };

  const notifyOrderPreparing = (orderId: string) => {
    addNotification({
      title: '👨‍🍳 Preparing Your Order',
      message: `Your order #${orderId} is being prepared with love!`,
      type: 'order'
    });
  };

  const notifyOrderOutForDelivery = (orderId: string) => {
    addNotification({
      title: '🛵 Out for Delivery!',
      message: `Your order #${orderId} is on its way. Arriving in ~20 minutes!`,
      type: 'order'
    });
  };

  const notifyOrderDelivered = (orderId: string) => {
    addNotification({
      title: '🎉 Order Delivered!',
      message: `Your order #${orderId} has been delivered. Enjoy your meal!`,
      type: 'order'
    });
  };

  return {
    notifyOrderPlaced,
    notifyOrderPreparing,
    notifyOrderOutForDelivery,
    notifyOrderDelivered
  };
};
