import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, CheckCircle, Share, Plus } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const features = [
    { icon: '🚀', title: 'Fast & Reliable', description: 'Works offline and loads instantly' },
    { icon: '🔔', title: 'Push Notifications', description: 'Get order updates in real-time' },
    { icon: '📱', title: 'Native Feel', description: 'App-like experience on your device' },
    { icon: '💾', title: 'Save Space', description: 'No app store download required' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-primary rounded-2xl flex items-center justify-center text-5xl shadow-lg">
              🍽️
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Install PetPuja App
            </h1>
            <p className="text-muted-foreground text-lg">
              Get the full app experience right on your home screen
            </p>
          </div>

          {/* Install Card */}
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                {isInstalled ? 'App Installed!' : 'Install Now'}
              </CardTitle>
              <CardDescription>
                {isInstalled 
                  ? 'PetPuja is already installed on your device'
                  : 'Add PetPuja to your home screen for quick access'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isInstalled ? (
                <div className="flex items-center justify-center gap-2 text-green-500 py-4">
                  <CheckCircle className="h-8 w-8" />
                  <span className="text-lg font-medium">Already Installed</span>
                </div>
              ) : isIOS ? (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-center">To install on iOS:</p>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                      <span>Tap the <Share className="inline h-4 w-4" /> Share button in Safari</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                      <span>Scroll down and tap <Plus className="inline h-4 w-4" /> "Add to Home Screen"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                      <span>Tap "Add" to install the app</span>
                    </li>
                  </ol>
                </div>
              ) : deferredPrompt ? (
                <Button onClick={handleInstall} size="lg" className="w-full gap-2">
                  <Download className="h-5 w-5" />
                  Install App
                </Button>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Open this page in your mobile browser to install</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Install;
