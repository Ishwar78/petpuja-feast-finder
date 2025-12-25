import { Star, Gift, History, Sparkles, Users } from 'lucide-react';
import { useLoyalty } from '@/context/LoyaltyContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const LoyaltyBadge = () => {
  const { totalPoints, lifetimePoints, transactions, activeBonuses, referralData, getPointsValue } = useLoyalty();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasActiveTimeBonuses = activeBonuses.some(b => b.type === 'occasion' || b.type === 'time');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative gap-2 text-primary hover:text-primary/80">
          <Star className="h-4 w-4 fill-primary" />
          <span className="font-semibold">{totalPoints}</span>
          <span className="hidden sm:inline text-xs text-muted-foreground">pts</span>
          {hasActiveTimeBonuses && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Loyalty Points</h4>
                <p className="text-xs text-muted-foreground">Earn & redeem rewards</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-primary/5 text-center">
              <p className="text-2xl font-bold text-primary">{totalPoints}</p>
              <p className="text-xs text-muted-foreground">Available Points</p>
              <p className="text-xs font-medium text-primary">≈ ₹{getPointsValue(totalPoints).toFixed(0)}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted text-center">
              <p className="text-2xl font-bold">{lifetimePoints}</p>
              <p className="text-xs text-muted-foreground">Lifetime Earned</p>
            </div>
          </div>

          {/* Active Bonuses */}
          {activeBonuses.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Active Bonuses</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeBonuses.map(bonus => (
                  <Badge key={bonus.id} variant="secondary" className="gap-1 text-xs">
                    <span>{bonus.icon}</span>
                    <span>{bonus.multiplier}x</span>
                  </Badge>
                ))}
              </div>
            </>
          )}

          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded space-y-1">
            <p>• Earn 1 point per ₹1 spent</p>
            <p>• Redeem 4 points = ₹1 discount</p>
            <p>• Refer friends for 200 bonus points!</p>
          </div>

          {/* Referral quick link */}
          <Link to="/offers" className="block">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Your code: {referralData.myCode}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {referralData.referralCount} referrals
              </Badge>
            </div>
          </Link>

          <Separator />

          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Recent Activity</span>
          </div>

          <ScrollArea className="h-40">
            {transactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No transactions yet
              </p>
            ) : (
              <div className="space-y-2">
                {transactions.slice(0, 10).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(tx.createdAt)}</p>
                    </div>
                    <Badge variant={tx.type === 'earned' ? 'default' : 'secondary'}>
                      {tx.type === 'earned' ? '+' : '-'}{tx.points}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LoyaltyBadge;
