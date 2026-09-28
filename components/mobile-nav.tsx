'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '@/lib/store';

export function MobileNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, user, openAuthModal } = useStore();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop', icon: Compass },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      badge: wishlist.length,
      authRequired: true,
    },
    {
      label: 'Bag',
      href: '/cart',
      icon: ShoppingBag,
      badge: cartCount,
      authRequired: false,
    },
    {
      label: user ? 'Account' : 'Login',
      href: '/account',
      icon: User,
      authRequired: true,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0f13]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 safe-area-pb shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          const handleClick = (e: React.MouseEvent) => {
            if (item.authRequired && !user) {
              e.preventDefault();
              openAuthModal(`access your ${item.label.toLowerCase()}`);
            }
          };

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleClick}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.2px]' : 'stroke-[1.8px]'} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-amber-400 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-scale-up">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
