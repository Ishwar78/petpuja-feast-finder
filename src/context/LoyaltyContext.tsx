import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PointsTransaction {
  id: string;
  points: number;
  type: 'earned' | 'redeemed';
  description: string;
  orderId?: string;
  createdAt: string;
}

interface LoyaltyContextType {
  totalPoints: number;
  lifetimePoints: number;
  transactions: PointsTransaction[];
  earnPoints: (amount: number, description: string, orderId?: string) => void;
  redeemPoints: (amount: number, description: string) => boolean;
  getPointsValue: (points: number) => number;
  getPointsForAmount: (amount: number) => number;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const POINTS_PER_RUPEE = 1; // Earn 1 point per ₹1 spent
const RUPEES_PER_POINT = 0.25; // Each point = ₹0.25 discount

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [lifetimePoints, setLifetimePoints] = useState(0);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('loyaltyData');
    if (stored) {
      const data = JSON.parse(stored);
      setTotalPoints(data.totalPoints || 0);
      setLifetimePoints(data.lifetimePoints || 0);
      setTransactions(data.transactions || []);
    } else {
      // Give welcome bonus to new users
      const welcomeBonus = 100;
      const welcomeTransaction: PointsTransaction = {
        id: crypto.randomUUID(),
        points: welcomeBonus,
        type: 'earned',
        description: 'Welcome bonus',
        createdAt: new Date().toISOString(),
      };
      setTotalPoints(welcomeBonus);
      setLifetimePoints(welcomeBonus);
      setTransactions([welcomeTransaction]);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (totalPoints > 0 || transactions.length > 0) {
      localStorage.setItem('loyaltyData', JSON.stringify({
        totalPoints,
        lifetimePoints,
        transactions,
      }));
    }
  }, [totalPoints, lifetimePoints, transactions]);

  const earnPoints = (amount: number, description: string, orderId?: string) => {
    const pointsEarned = Math.floor(amount * POINTS_PER_RUPEE);
    if (pointsEarned <= 0) return;

    const transaction: PointsTransaction = {
      id: crypto.randomUUID(),
      points: pointsEarned,
      type: 'earned',
      description,
      orderId,
      createdAt: new Date().toISOString(),
    };

    setTotalPoints(prev => prev + pointsEarned);
    setLifetimePoints(prev => prev + pointsEarned);
    setTransactions(prev => [transaction, ...prev].slice(0, 50));
  };

  const redeemPoints = (amount: number, description: string): boolean => {
    if (amount > totalPoints || amount <= 0) return false;

    const transaction: PointsTransaction = {
      id: crypto.randomUUID(),
      points: amount,
      type: 'redeemed',
      description,
      createdAt: new Date().toISOString(),
    };

    setTotalPoints(prev => prev - amount);
    setTransactions(prev => [transaction, ...prev].slice(0, 50));
    return true;
  };

  const getPointsValue = (points: number): number => {
    return points * RUPEES_PER_POINT;
  };

  const getPointsForAmount = (amount: number): number => {
    return Math.floor(amount * POINTS_PER_RUPEE);
  };

  return (
    <LoyaltyContext.Provider value={{
      totalPoints,
      lifetimePoints,
      transactions,
      earnPoints,
      redeemPoints,
      getPointsValue,
      getPointsForAmount,
    }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};
