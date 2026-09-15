import { useState, type FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function AdminLogin() {
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    if (signInError) {
      setError(signInError);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-navy px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, #d4a042 1.5px, transparent 1.5px), radial-gradient(circle at 80% 70%, #d4a042 1.5px, transparent 1.5px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-navy-900 px-8 py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-4 ring-2 ring-gold-400/50">
              <GraduationCap className="w-8 h-8 text-gold-400" strokeWidth={1.6} />
            </div>
            <h1 className="font-serif text-xl font-bold text-white">Admin Login</h1>
            <p className="text-cream-400 text-sm mt-1">Government Arts &amp; Science College</p>
            <p className="text-gold-300 text-xs mt-0.5">Melvenkatapuram</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            {error && (
              <div className="flex items-start gap-2 p-3 bg-maroon-50 border border-maroon-200 rounded-lg animate-fade-in">
                <AlertCircle className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-maroon-700 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400" size={18} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                  placeholder="admin@gascmvp.in"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-navy-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400" size={18} />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.01] disabled:hover:scale-100"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>

            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 text-sm text-navy-500 hover:text-navy-700 transition-colors pt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
