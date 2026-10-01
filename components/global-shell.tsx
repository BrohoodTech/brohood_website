'use client';

import React from 'react';
import Link from 'next/link';
import { StoreProvider, useStore } from '@/lib/store';
import { Header } from '@/components/header';
import { CartDrawer } from '@/components/cart-drawer';
import { AuthModal } from '@/components/auth-modal';
import { MobileNav } from '@/components/mobile-nav';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ShieldCheck, RotateCcw, Truck, MessageCircle, ArrowRight } from 'lucide-react';

function ShellInner({ children }: { children: React.ReactNode }) {
  const { isAuthModalOpen, closeAuthModal, authModalContext } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#08080a] text-zinc-100 selection:bg-amber-400 selection:text-black pb-16 md:pb-0 w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>

      {/* Global Trust Strip */}
      <section className="border-t border-white/10 bg-[#0c0d10] py-8 text-zinc-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Truck size={24} className="text-amber-400 mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-white">Cash on Delivery</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Pay at your doorstep across India</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={24} className="text-amber-400 mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-white">1:1 Master Quality</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Weight, markings & brand boxes matched</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle size={24} className="text-amber-400 mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-white">Live Courier Tracking</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Blue Dart &amp; Delhivery real-time tracking</p>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw size={24} className="text-amber-400 mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-white">7-Day Replacement</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Hassle-free size & defect exchange</p>
          </div>
        </div>
      </section>

      {/* Modern Dark Footer */}
      <footer className="border-t border-white/10 bg-[#08080a] py-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-3">
            <span className="font-extrabold text-xl tracking-widest uppercase bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              BroHood
            </span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              India’s premier streetwear destination for 1:1 first-copy luxury watches, hype sneakers, designer goggles, and heavyweight essentials.
            </p>
            <div className="pt-2 text-zinc-500 text-[11px]">
              Support: 10:00 AM – 8:00 PM IST (Mon - Sat)
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Categories</h5>
            <ul className="space-y-2">
              <li><Link href="/shop?category=watches" className="hover:text-amber-400 transition-colors">Luxury Watches</Link></li>
              <li><Link href="/shop?category=sneakers" className="hover:text-amber-400 transition-colors">Hype Sneakers</Link></li>
              <li><Link href="/shop?category=goggles" className="hover:text-amber-400 transition-colors">Designer Goggles</Link></li>
              <li><Link href="/shop?category=tshirts" className="hover:text-amber-400 transition-colors">Streetwear T-Shirts</Link></li>
              <li><Link href="/shop" className="hover:text-amber-400 transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Customer Care</h5>
            <ul className="space-y-2">
              <li><Link href="/orders" className="hover:text-amber-400 transition-colors">Track Order</Link></li>
              <li><Link href="/account" className="hover:text-amber-400 transition-colors">My Profile</Link></li>
              <li><Link href="/wishlist" className="hover:text-amber-400 transition-colors">Wishlist</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-amber-400 transition-colors">Shipping & COD Policy</Link></li>
              <li><Link href="/returns-exchange" className="hover:text-amber-400 transition-colors">7-Day Exchange Policy</Link></li>
              <li><Link href="/faq" className="hover:text-amber-400 transition-colors">FAQs & Quality Guide</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact & WhatsApp</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Newsletter</h5>
            <p className="text-[11px] text-zinc-400 mb-2">Get secret discount codes & drop alerts.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Indian Payment Badges */}
            <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold text-zinc-400">
              <span className="text-zinc-500 uppercase tracking-wider text-[9px] mr-1">Accepted Payments:</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">Cash on Delivery</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">Google Pay</span>
              <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-mono">PhonePe</span>
              <span className="px-2 py-0.5 rounded bg-sky-900/40 text-sky-300 font-mono">Paytm UPI</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 font-mono">BHIM UPI</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">RuPay / Cards</span>
            </div>

            {/* Courier Partners */}
            <div className="flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="uppercase tracking-wider text-[9px]">Express Delivery via:</span>
              <span className="text-zinc-300 font-semibold">Delhivery</span>
              <span>•</span>
              <span className="text-zinc-300 font-semibold">Blue Dart</span>
              <span>•</span>
              <span className="text-zinc-300 font-semibold">Xpressbees</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <span>© 2026 BroHood India. All rights reserved. Pan-India Express Service.</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link href="/shipping-policy" className="hover:text-zinc-300 transition-colors">Shipping & COD</Link>
            </div>
          </div>

          <p className="text-[10px] text-zinc-600 text-center sm:text-left leading-relaxed">
            Disclaimer: BroHood provides high-grade 1:1 Master Quality first-copy lifestyle recreations, retros, and accessories. All brand names and logos belong to their respective trademark holders.
          </p>
        </div>
      </footer>

      {/* Global Drawer, Modals & Mobile Nav */}
      <CartDrawer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        actionContext={authModalContext}
      />
      <MobileNav />
      <WhatsAppButton />
    </div>
  );
}

export function GlobalShell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ShellInner>{children}</ShellInner>
    </StoreProvider>
  );
}
