'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Mail, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  actionContext?: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, actionContext = 'access your account' }: AuthModalProps) {
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        email: 'customer@brohood.in',
        fullName: 'BroHood Customer',
        phone: '9876543210',
        provider: 'google',
      });
      if (onSuccess) onSuccess();
      onClose();
    }, 500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      login({
        email,
        fullName: email.split('@')[0],
        phone: '9876543210',
        provider: 'email',
      });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 700);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-[#121316] border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-heading text-white">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Access your orders, delivery status, and profile.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-2" />
            <h3 className="text-base font-bold uppercase tracking-tight">Signed In Successfully</h3>
            <p className="text-xs text-zinc-400">Welcome back! Redirecting you...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Auth */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#121316] px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Or with Email
              </span>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.99] disabled:opacity-40"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-white/5 text-[11px] text-zinc-400">
              New customer?{' '}
              <Link
                href="/register"
                onClick={onClose}
                className="text-amber-400 font-bold hover:underline"
              >
                Create an account
              </Link>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>256-Bit SSL Encrypted • Fast &amp; Secure Checkout</span>
        </div>
      </div>
    </div>
  );
}
