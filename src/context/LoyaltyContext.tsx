import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PointsTransaction {
  id: string;
  points: number;
  type: 'earned' | 'redeemed';
  description: string;
  orderId?: string;
  createdAt: string;
}

interface BonusMultiplier {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  type: 'occasion' | 'category' | 'time';
  category?: string;
  icon: string;
  active: boolean;
}

interface ReferralData {
  myCode: string;
  referredBy: string | null;
  referralCount: number;
  usedCodes: string[];
}

interface LoyaltyContextType {
  totalPoints: number;
  lifetimePoints: number;
  transactions: PointsTransaction[];
  activeBonuses: BonusMultiplier[];
  referralData: ReferralData;
  earnPoints: (amount: number, description: string, orderId?: string, categories?: string[]) => void;
  redeemPoints: (amount: number, description: string) => boolean;
  getPointsValue: (points: number) => number;
  getPointsForAmount: (amount: number, categories?: string[]) => number;
  getActiveMultiplier: (categories?: string[]) => number;
  getBonusBreakdown: (categories?: string[]) => { base: number; bonus: number; multiplier: number };
  applyReferralCode: (code: string) => { success: boolean; message: string };
  addBonusPoints: (points: number, description: string) => void;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const POINTS_PER_RUPEE = 1;
const RUPEES_PER_POINT = 0.25;
const REFERRAL_BONUS_REFERRER = 200; // Points for the person who refers
const REFERRAL_BONUS_REFEREE = 150; // Points for the new user

// Generate a unique referral code
const generateReferralCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'PP';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
const getBonusMultipliers = (): BonusMultiplier[] => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  return [
    {
      id: 'weekend',
      name: 'Weekend Bonus',
      description: '2x points on weekends!',
      multiplier: 2,
      type: 'occasion',
      icon: '🎉',
      active: day === 0 || day === 6, // Sunday or Saturday
    },
    {
      id: 'happy-hour',
      name: 'Happy Hour',
      description: '1.5x points between 3-6 PM',
      multiplier: 1.5,
      type: 'time',
      icon: '⏰',
      active: hour >= 15 && hour < 18,
    },
    {
      id: 'lunch-rush',
      name: 'Lunch Rush',
      description: '1.5x points between 12-2 PM',
      multiplier: 1.5,
      type: 'time',
      icon: '🍽️',
      active: hour >= 12 && hour < 14,
    },
    {
      id: 'combo-bonus',
      name: 'Combo Deal',
      description: '3x points on combos',
      multiplier: 3,
      type: 'category',
      category: 'combos',
      icon: '🍱',
      active: true,
    },
    {
      id: 'drinks-bonus',
      name: 'Refresh Reward',
      description: '2x points on drinks',
      multiplier: 2,
      type: 'category',
      category: 'drinks',
      icon: '🥤',
      active: true,
    },
    {
      id: 'veg-bonus',
      name: 'Green Choice',
      description: '1.5x points on veg items',
      multiplier: 1.5,
      type: 'category',
      category: 'veg',
      icon: '🥗',
      active: true,
    },
  ];
};

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [lifetimePoints, setLifetimePoints] = useState(0);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [activeBonuses, setActiveBonuses] = useState<BonusMultiplier[]>([]);
  const [referralData, setReferralData] = useState<ReferralData>({
    myCode: '',
    referredBy: null,
    referralCount: 0,
    usedCodes: [],
  });

  // Update bonuses every minute
  useEffect(() => {
    const updateBonuses = () => {
      const bonuses = getBonusMultipliers().filter(b => b.active);
      setActiveBonuses(bonuses);
    };
    
    updateBonuses();
    const interval = setInterval(updateBonuses, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('loyaltyData');
    if (stored) {
      const data = JSON.parse(stored);
      setTotalPoints(data.totalPoints || 0);
      setLifetimePoints(data.lifetimePoints || 0);
      setTransactions(data.transactions || []);
      setReferralData(data.referralData || {
        myCode: generateReferralCode(),
        referredBy: null,
        referralCount: 0,
        usedCodes: [],
      });
    } else {
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
      setReferralData({
        myCode: generateReferralCode(),
        referredBy: null,
        referralCount: 0,
        usedCodes: [],
      });
    }
  }, []);

  useEffect(() => {
    if (totalPoints > 0 || transactions.length > 0 || referralData.myCode) {
      localStorage.setItem('loyaltyData', JSON.stringify({
        totalPoints,
        lifetimePoints,
        transactions,
        referralData,
      }));
    }
  }, [totalPoints, lifetimePoints, transactions, referralData]);

  const addBonusPoints = (points: number, description: string) => {
    if (points <= 0) return;

    const transaction: PointsTransaction = {
      id: crypto.randomUUID(),
      points,
      type: 'earned',
      description,
      createdAt: new Date().toISOString(),
    };

    setTotalPoints(prev => prev + points);
    setLifetimePoints(prev => prev + points);
    setTransactions(prev => [transaction, ...prev].slice(0, 50));
  };

  const applyReferralCode = (code: string): { success: boolean; message: string } => {
    const normalizedCode = code.toUpperCase().trim();
    
    // Can't use own code
    if (normalizedCode === referralData.myCode) {
      return { success: false, message: "You can't use your own referral code!" };
    }
    
    // Already used this code
    if (referralData.usedCodes.includes(normalizedCode)) {
      return { success: false, message: "You've already used this referral code!" };
    }
    
    // Already been referred
    if (referralData.referredBy) {
      return { success: false, message: "You've already used a referral code!" };
    }
    
    // Validate code format (starts with PP and has 8 chars total)
    if (!normalizedCode.startsWith('PP') || normalizedCode.length !== 8) {
      return { success: false, message: "Invalid referral code format!" };
    }
    
    // Apply referral bonus
    addBonusPoints(REFERRAL_BONUS_REFEREE, `Referral bonus (code: ${normalizedCode})`);
    
    setReferralData(prev => ({
      ...prev,
      referredBy: normalizedCode,
      usedCodes: [...prev.usedCodes, normalizedCode],
    }));
    
    return { success: true, message: `You earned ${REFERRAL_BONUS_REFEREE} bonus points!` };
  };

  const getActiveMultiplier = (categories?: string[]): number => {
    const bonuses = getBonusMultipliers().filter(b => b.active);
    let maxMultiplier = 1;

    // Check time/occasion bonuses
    const timeBonuses = bonuses.filter(b => b.type === 'occasion' || b.type === 'time');
    timeBonuses.forEach(b => {
      if (b.multiplier > maxMultiplier) maxMultiplier = b.multiplier;
    });

    // Check category bonuses
    if (categories && categories.length > 0) {
      const categoryBonuses = bonuses.filter(b => b.type === 'category' && categories.includes(b.category || ''));
      categoryBonuses.forEach(b => {
        if (b.multiplier > maxMultiplier) maxMultiplier = b.multiplier;
      });
    }

    return maxMultiplier;
  };

  const getBonusBreakdown = (categories?: string[]): { base: number; bonus: number; multiplier: number } => {
    const multiplier = getActiveMultiplier(categories);
    return { base: 1, bonus: multiplier - 1, multiplier };
  };

  const earnPoints = (amount: number, description: string, orderId?: string, categories?: string[]) => {
    const multiplier = getActiveMultiplier(categories);
    const pointsEarned = Math.floor(amount * POINTS_PER_RUPEE * multiplier);
    if (pointsEarned <= 0) return;

    const bonusText = multiplier > 1 ? ` (${multiplier}x bonus!)` : '';
    const transaction: PointsTransaction = {
      id: crypto.randomUUID(),
      points: pointsEarned,
      type: 'earned',
      description: description + bonusText,
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

  const getPointsForAmount = (amount: number, categories?: string[]): number => {
    const multiplier = getActiveMultiplier(categories);
    return Math.floor(amount * POINTS_PER_RUPEE * multiplier);
  };

  return (
    <LoyaltyContext.Provider value={{
      totalPoints,
      lifetimePoints,
      transactions,
      activeBonuses,
      referralData,
      earnPoints,
      redeemPoints,
      getPointsValue,
      getPointsForAmount,
      getActiveMultiplier,
      getBonusBreakdown,
      applyReferralCode,
      addBonusPoints,
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
