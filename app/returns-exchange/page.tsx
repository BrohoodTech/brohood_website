import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brohood.in';

export const metadata: Metadata = {
  title: '7-Day Replacement & Easy Exchange Guarantee',
  description:
    'Complete peace of mind with 7-day doorstep replacement for size mismatches or defects. Reverse pickup available across India via WhatsApp.',
  alternates: {
    canonical: `${baseUrl}/returns-exchange`,
  },
  openGraph: {
    title: '7-Day Replacement & Exchange Policy | BroHood India',
    description: 'Hassle-free size replacement and transit damage guarantee on all 1:1 luxury watches and sneakers.',
    url: `${baseUrl}/returns-exchange`,
  },
};

export default function ReturnsExchangePage() {
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
          <RotateCcw size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            7-Day Replacement & Exchange Policy
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Hassle-free size exchanges and replacement guarantee for complete peace of mind.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/5 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            1. Eligibility for Exchange
          </h2>
          <p>
            You are eligible for an exchange or replacement within <strong>7 days of delivery</strong> under the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Size Mismatch:</strong> Shoes or T-shirts do not fit your comfort level.</li>
            <li><strong>Transit Damage or Manufacturing Defect:</strong> Scratches, broken clasp, or movement malfunction upon unboxing.</li>
            <li><strong>Incorrect Item Received:</strong> Difference in model, dial color, or silhouette from what was ordered.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            2. Easy WhatsApp Exchange Process
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-zinc-400">
            <li>Message our customer support on WhatsApp at <strong>+91 98765 43210</strong> with your order number.</li>
            <li>Send a short 10-second video of the unworn product with its original box and tags intact.</li>
            <li>Our courier partner will schedule a doorstep reverse pickup within 24 to 48 hours.</li>
            <li>Once picked up, the replacement size or new unit is dispatched immediately.</li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            3. Non-Eligible Conditions
          </h2>
          <p>
            To prevent abuse, items showing signs of outdoor wear (creased shoe soles, removed watch protective plastic seals, missing tags/box) cannot be accepted for return or exchange.
          </p>
        </section>
      </div>
    </div>
  );
}
