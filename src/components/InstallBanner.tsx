import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed the banner before
    const dismissed = localStorage.getItem('installBannerDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Show again after 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show banner for all users (including iOS and preview)
    // The banner provides value by directing users to install instructions
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('installBannerDismissed', Date.now().toString());
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg animate-slide-up">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/20 rounded-full">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Install TastyBites App</h3>
            <p className="text-xs sm:text-sm text-primary-foreground/80">
              Get faster access, offline support & exclusive offers!
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {deferredPrompt ? (
            <Button
              onClick={handleInstall}
              variant="secondary"
              size="sm"
              className="gap-2 whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Install Now</span>
              <span className="sm:hidden">Install</span>
            </Button>
          ) : (
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="gap-2 whitespace-nowrap"
            >
              <Link to="/install">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">How to Install</span>
                <span className="sm:hidden">Install</span>
              </Link>
            </Button>
          )}
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
