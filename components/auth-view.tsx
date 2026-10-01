'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  PackageCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '@/lib/store';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
}

export function AuthView({ initialMode = 'login' }: AuthViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const { login } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1-Tap Google Sign In
  const handleGoogleAuth = () => {
    setLoading(true);
    setError('');

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const redirect = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectUrl)}`;
        window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(
          redirect
        )}`;
        return;
      } catch (err) {
        console.error('Supabase OAuth error:', err);
      }
    }

    setTimeout(() => {
      login({
        email: 'customer@brohood.in',
        fullName: 'BroHood Customer',
        phone: '9876543210',
        provider: 'google',
      });
      setLoading(false);
      router.push(redirectUrl);
    }, 600);
  };

  // Standard Email & Password Submit
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (mode === 'register' && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      login({
        email,
        fullName: fullName.trim() || email.split('@')[0],
        phone: '9876543210',
        provider: 'email',
      });
      setLoading(false);
      router.push(redirectUrl);
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full max-w-full overflow-x-hidden flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden bg-[#0e0f12] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Storefront Highlights (Desktop & Tablet) */}
        <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-8 sm:p-10 bg-black overflow-hidden border-r border-white/10">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=90"
              alt="BroHood Luxury Watches and Sneakers"
              className="w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-[#0e0f12]/60 to-transparent" />
          </div>

          {/* Top Brand Mark */}
          <div className="relative z-10 space-y-1">
            <p className="text-xs font-black uppercase tracking-widest text-amber-400">
              BroHood India
            </p>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white font-heading">
              First Copy Luxury Watches &amp; Sneakers
            </h2>
            <p className="text-xs text-zinc-400">
              Automatic sweeping movements, 904L stainless steel, and OG colorways.
            </p>
          </div>

          {/* Features List */}
          <div className="relative z-10 space-y-4 my-8">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
                <Truck size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Cash on Delivery Across India
                </h3>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Pay at your doorstep with ₹0 advance required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-400/10 text-emerald-400 shrink-0 mt-0.5">
                <PackageCheck size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Courier Tracking
                </h3>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Direct Blue Dart &amp; Delhivery tracking updates on WhatsApp &amp; SMS.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
                <RotateCcw size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  7-Day Easy Replacement
                </h3>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Doorstep pickup for any size exchange or defect.
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee Footer */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
            <div>
              <span className="font-bold text-white block">27,000+ Pincodes</span>
              <span className="text-[10px] text-emerald-400">Pan-India Express Delivery</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-white block">100% Insured</span>
              <span className="text-[10px] text-amber-400">Tamper-Proof Box</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean E-Commerce Login / Register */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Header & Back Link */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Store</span>
            </Link>

            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold">
              Account Access
            </span>
          </div>

          {/* Main Form Box */}
          <div className="space-y-6 max-w-md mx-auto w-full">
            {/* Mode Switcher: Sign In vs Create Account */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-amber-400 text-black shadow-lg scale-[1.02]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  mode === 'register'
                    ? 'bg-amber-400 text-black shadow-lg scale-[1.02]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Title & Context */}
            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-heading">
                {mode === 'login' ? 'Sign In to Your Account' : 'Create an Account'}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                {mode === 'login'
                  ? 'Access your orders, saved addresses, and express checkout.'
                  : 'Register for faster checkout, order tracking, and delivery updates.'}
              </p>
            </div>

            {/* 1-Tap Google Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all active:scale-[0.99] shadow-md disabled:opacity-50"
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

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0e0f12] px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Or with Email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Malhotra"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#15161c] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              )}

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
                    className="w-full bg-[#15161c] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#15161c] border border-white/10 rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.99] disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-white/5 text-[11px] text-zinc-400">
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setError('');
                    }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Create one now
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                    }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Sign in to your account
                  </button>
                </>
              )}
            </div>
          </div>

          {/* SSL & Privacy Footer */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
            <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
            <span>256-Bit SSL Encrypted • We never share your data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
