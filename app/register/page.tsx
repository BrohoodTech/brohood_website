'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Lock, Phone, Sparkles, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/lib/store';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { login } = useStore();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignup = () => {
    setLoading(true);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const redirect = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectUrl)}`;
        window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirect)}`;
        return;
      } catch (err) {
        console.error('Supabase OAuth error:', err);
      }
    }

    setTimeout(() => {
      login({
        email: 'newmember@brohood.in',
        fullName: 'New BroHood Member',
        phone: '9876543210',
        provider: 'google',
      });
      setLoading(false);
      router.push(redirectUrl);
    }, 700);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }
    if (!fullName || !email || !password || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      login({
        email,
        fullName,
        phone,
        provider: 'email',
      });
      setLoading(false);
      router.push(redirectUrl);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 text-white space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 text-amber-400 mb-2 shadow-lg">
          <Sparkles size={24} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          Create Account
        </h1>
        <p className="text-xs text-zinc-400 max-w-xs mx-auto">
          Join 10,000+ members. Get free express delivery, early drop access, and instant order tracking.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/10 space-y-5 shadow-2xl">
        {/* Fast Google Signup */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
          <span>Sign up with Google</span>
        </button>

        <div className="relative flex items-center justify-center py-1">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#121316] px-3 text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
            Or fill your details
          </span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="text-xs text-zinc-400 block mb-1 font-medium">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
              <input
                type="text"
                required
                placeholder="e.g. Aryan Singh"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#18191e] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1 font-medium">WhatsApp Mobile Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#18191e] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1 font-medium">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#18191e] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#18191e] border border-white/10 rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-[11px] text-zinc-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 accent-amber-400"
            />
            <span>
              I agree to BroHood&apos;s{' '}
              <Link href="/terms" className="text-amber-400 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-amber-400 hover:underline">
                Privacy Policy
              </Link>.
            </span>
          </label>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5 text-xs text-zinc-400">
          Already have an account?{' '}
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
            className="text-amber-400 font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400 text-xs">Loading Register...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
