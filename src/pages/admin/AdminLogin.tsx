import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!formData.email || !formData.password) {
      setLocalError('Please enter both email and password');
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setLocalError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-background">
              Pet<span className="text-primary">Puja</span>
            </span>
          </Link>
          <p className="text-background/60 mt-2">Admin Panel</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-warm-lg">
          <h1 className="text-2xl font-bold text-foreground mb-6">Welcome Back</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="admin@petpuja.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 pl-12 pr-12 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot Password?
              </button>
            </div>

            <Button type="submit" variant="warm" size="xl" className="w-full">
              Login to Dashboard
            </Button>
          </form>
        </div>

        <p className="text-center text-background/50 text-sm mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to Website</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
