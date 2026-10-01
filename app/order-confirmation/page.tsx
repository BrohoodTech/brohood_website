'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Truck, Package, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'BH-2026-948102';
  const method = searchParams.get('method') || 'cod';

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20 text-center text-white space-y-6">
      {/* Success Badge */}
      <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-2xl mb-2 animate-bounce">
        <CheckCircle2 size={44} />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-black text-amber-400">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Your order has been received and is being prepared for express dispatch.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="p-6 rounded-3xl bg-[#121316] border border-white/10 text-left space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Order Number</span>
            <span className="text-base font-black text-amber-400">{orderNumber}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Payment Method</span>
            <span className="text-xs font-bold text-white uppercase">
              {method === 'cod' ? 'Cash on Delivery (Pay at Doorstep)' : 'Paid Online via Razorpay'}
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-1 text-xs">
          <div className="flex items-center gap-3">
            <Truck size={18} className="text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">Estimated Delivery: 3 to 4 Business Days</p>
              <p className="text-zinc-400 text-[11px]">Shipped via Delhivery Surface Express</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Package size={18} className="text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">Packaging & Quality Assurance</p>
              <p className="text-zinc-400 text-[11px]">Double-boxed with original brand tags and bubble wrap</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Real-Time Tracking Updates CTA */}
        <div className="p-4 rounded-2xl bg-[#18191e] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <MessageCircle size={20} className="text-[#25D366] flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">Get Real-Time Tracking on WhatsApp</p>
              <p className="text-zinc-400 text-[11px]">Receive direct Blue Dart &amp; Delhivery AWB dispatch alerts.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20placed%20order%20${orderNumber}.%20Please%20send%20tracking%20updates.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex-shrink-0"
          >
            WhatsApp Updates
          </a>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/orders"
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg"
        >
          Track My Order
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#18191e] hover:bg-[#22242c] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400 text-xs">Loading Order Confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
