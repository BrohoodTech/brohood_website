import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service, purchasing conditions, order verification, and Cash on Delivery rules for BroHood India.',
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 text-white space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <Shield size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Terms of Service
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Last updated: September 2026. Please read our terms carefully before placing orders.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/5 space-y-5 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase text-amber-400">1. Product Representation</h2>
          <p>
            BroHood curates 1:1 Master Quality first-copy footwear, luxury-inspired timepieces, sunglasses, and heavyweight streetwear essentials for fashion and lifestyle enthusiasts in India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase text-amber-400">2. Orders & Cash on Delivery Verification</h2>
          <p>
            We reserve the right to verify high-value Cash on Delivery orders via telephone or WhatsApp before handing parcels to logistics partners. False orders with fraudulent details are subject to blacklisting.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase text-amber-400">3. Pricing & Discounts</h2>
          <p>
            All listed prices are inclusive of applicable taxes in Indian Rupees (INR). Promo codes cannot be stacked with other ongoing seasonal promotional clearances.
          </p>
        </section>
      </div>
    </div>
  );
}
