'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Search, ShoppingBag, Package, User } from 'lucide-react';
import { useStore } from '@/lib/store';

export function MobileNav() {
  const pathname = usePathname();
  const { cartCount, openCartDrawer, openSearchModal, user } = useStore();

  // Hide mobile bottom nav during checkout, order confirmation, and on product detail page
  // On PDP, the dedicated sticky Add to Bag & Buy Now dock takes full focus!
  if (pathname === '/checkout' || pathname === '/order-confirmation' || pathname.startsWith('/product/')) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d10]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 safe-area-pb shadow-[0_-8px_30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-around">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
            pathname === '/' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Home size={20} className={pathname === '/' ? 'stroke-[2.2px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-tight mt-1">Home</span>
          {pathname === '/' && <span className="w-1 h-1 bg-amber-400 rounded-full mt-0.5" />}
        </Link>

        {/* 2. Shop / Drops */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
            pathname.startsWith('/shop') ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Compass size={20} className={pathname.startsWith('/shop') ? 'stroke-[2.2px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-tight mt-1">Catalog</span>
          {pathname.startsWith('/shop') && <span className="w-1 h-1 bg-amber-400 rounded-full mt-0.5" />}
        </Link>

        {/* 3. Search Trigger Button */}
        <button
          onClick={() => openSearchModal()}
          aria-label="Search items"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-zinc-400 hover:text-amber-400 transition-all active:scale-95"
        >
          <Search size={20} className="stroke-[1.8px]" />
          <span className="text-[10px] tracking-tight mt-1">Search</span>
        </button>

        {/* 4. Bag Drawer Trigger */}
        <button
          onClick={() => openCartDrawer()}
          aria-label="Open cart drawer"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-zinc-400 hover:text-amber-400 transition-all relative active:scale-95"
        >
          <div className="relative">
            <ShoppingBag size={20} className="stroke-[1.8px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-amber-400 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-scale-up">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Bag</span>
        </button>

        {/* 5. Track Orders / Account */}
        <Link
          href="/orders"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
            pathname.startsWith('/orders') || pathname === '/account'
              ? 'text-amber-400 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Package size={20} className={pathname.startsWith('/orders') ? 'stroke-[2.2px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-tight mt-1">Track</span>
          {pathname.startsWith('/orders') && <span className="w-1 h-1 bg-amber-400 rounded-full mt-0.5" />}
        </Link>
      </div>
    </nav>
  );
}
