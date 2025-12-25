import { useState } from 'react';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Copy, Check, Gift, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ReferralSection = () => {
  const { referralData, applyReferralCode } = useLoyalty();
  const [inputCode, setInputCode] = useState('');
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralData.myCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  const shareCode = async () => {
    const shareText = `🍽️ Use my PetPuja referral code ${referralData.myCode} to get 150 bonus points on your first order! Order delicious food now!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PetPuja Referral',
          text: shareText,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied!",
        description: "Share message copied to clipboard",
      });
    }
  };

  const handleApplyCode = () => {
    if (!inputCode.trim()) {
      toast({
        title: "Enter a code",
        description: "Please enter a referral code",
        variant: "destructive",
      });
      return;
    }

    const result = applyReferralCode(inputCode);
    
    toast({
      title: result.success ? "Success! 🎉" : "Oops!",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });

    if (result.success) {
      setInputCode('');
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-warm-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Refer & Earn</h2>
          <p className="text-sm text-muted-foreground">Share with friends, earn together!</p>
        </div>
      </div>

      {/* Your referral code */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Your Referral Code</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Gift className="w-3 h-3" />
            <span>You get 200 pts per referral</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-background rounded-lg px-4 py-3 font-mono text-lg font-bold text-primary tracking-wider text-center">
            {referralData.myCode}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={copyCode}
            className="shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={shareCode}
            className="shrink-0"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Friends get 150 bonus points when they use your code!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{referralData.referralCount}</p>
          <p className="text-xs text-muted-foreground">Friends Referred</p>
        </div>
        <div className="bg-secondary rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-primary">{referralData.referralCount * 200}</p>
          <p className="text-xs text-muted-foreground">Points Earned</p>
        </div>
      </div>

      {/* Apply referral code */}
      {!referralData.referredBy && (
        <div className="space-y-3 pt-3 border-t border-border">
          <p className="text-sm font-medium text-foreground">Have a referral code?</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter code (e.g., PPABCD12)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="font-mono uppercase"
              maxLength={8}
            />
            <Button onClick={handleApplyCode}>
              Apply
            </Button>
          </div>
        </div>
      )}

      {referralData.referredBy && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <Check className="w-4 h-4 text-green-500" />
          <span>You were referred with code: <strong>{referralData.referredBy}</strong></span>
        </div>
      )}
    </div>
  );
};

export default ReferralSection;
