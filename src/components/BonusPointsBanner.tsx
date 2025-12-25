import { useLoyalty } from '@/context/LoyaltyContext';
import { Sparkles } from 'lucide-react';

const BonusPointsBanner = () => {
  const { activeBonuses } = useLoyalty();

  if (activeBonuses.length === 0) return null;

  // Get time-based bonuses to highlight
  const timeBonuses = activeBonuses.filter(b => b.type === 'occasion' || b.type === 'time');
  const categoryBonuses = activeBonuses.filter(b => b.type === 'category');

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <h3 className="font-semibold text-foreground">Active Bonus Points!</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {timeBonuses.map(bonus => (
          <div
            key={bonus.id}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium animate-pulse"
          >
            <span>{bonus.icon}</span>
            <span>{bonus.name}</span>
            <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">
              {bonus.multiplier}x
            </span>
          </div>
        ))}
        
        {categoryBonuses.map(bonus => (
          <div
            key={bonus.id}
            className="flex items-center gap-2 bg-secondary text-foreground px-3 py-1.5 rounded-full text-sm"
          >
            <span>{bonus.icon}</span>
            <span>{bonus.name}</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              {bonus.multiplier}x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusPointsBanner;
