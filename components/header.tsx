'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Compass,
  Watch,
  Footprints,
  Glasses,
  Shirt,
  Flame,
  HelpCircle,
  Truck,
  MessageCircle,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { AnnouncementBar } from '@/components/announcement-bar';
import { LiveSearchModal } from '@/components/live-search-modal';

export function Header() {
  const { cartCount, wishlist, user, openAuthModal, openCartDrawer, logout } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const categories = [
    { label: 'Watches', href: '/shop?category=watches', icon: Watch, badge: 'Swiss 1:1' },
    { label: 'Sneakers', href: '/shop?category=sneakers', icon: Footprints, badge: 'Hype Drops' },
    { label: 'Goggles', href: '/shop?category=goggles', icon: Glasses, badge: 'UV400' },
    { label: 'T-Shirts', href: '/shop?category=tshirts', icon: Shirt, badge: '260 GSM' },
    { label: 'All Items', href: '/shop', icon: Compass, badge: 'Catalog' },
  ];

  const popularBrands = [
    { name: 'Rolex', href: '/shop?brand=rolex' },
    { name: 'Air Jordan', href: '/shop?brand=air-jordan' },
    { name: 'Audemars Piguet', href: '/shop?brand=audemars-piguet' },
    { name: 'Nike', href: '/shop?brand=nike' },
    { name: 'Cartier', href: '/shop?brand=cartier' },
    { name: 'Adidas', href: '/shop?brand=adidas' },
    { name: 'Ray-Ban', href: '/shop?brand=ray-ban' },
    { name: 'Gentle Monster', href: '/shop?brand=gentle-monster' },
  ];

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-30 w-full bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-lg sm:text-xl tracking-widest uppercase bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              BroHood
            </span>
            <span className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-semibold uppercase tracking-wider">
              1:1 Master Ed.
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-zinc-300">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="hover:text-amber-400 transition-colors py-1 relative group"
              >
                <span>{cat.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions on the Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs transition-colors border border-white/5"
              aria-label="Search catalog"
            >
              <Search size={16} />
              <span className="hidden sm:inline text-zinc-500">Search products...</span>
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  openAuthModal('access your wishlist');
                }
              }}
              className="p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white relative transition-colors"
              aria-label="View Wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 min-w-[17px] h-[17px] px-1 bg-amber-400 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Button */}
            <button
              onClick={openCartDrawer}
              className="p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white relative transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[17px] h-[17px] px-1 bg-amber-400 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Account menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-bold text-xs flex items-center justify-center uppercase">
                      {user.fullName ? user.fullName[0] : user.email[0]}
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#14151a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-xs">
                      <div className="px-3 py-2 border-b border-white/5">
                        <p className="font-semibold text-white truncate">{user.fullName || 'BroHood Member'}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-3 py-2 hover:bg-white/5 text-zinc-300 hover:text-white"
                      >
                        Profile & Addresses
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-3 py-2 hover:bg-white/5 text-zinc-300 hover:text-white"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-3 py-2 hover:bg-white/5 text-zinc-300 hover:text-white"
                      >
                        Saved Items
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-400 font-semibold"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition-all shadow-md"
                >
                  <User size={14} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Full-Height Mobile Slide-In Drawer (From Left) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
            {/* Dark Backdrop */}
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <div className="relative w-[85%] max-w-sm bg-[#0e0f13] border-r border-white/10 h-full flex flex-col text-white shadow-2xl z-10 overflow-y-auto">
              {/* Drawer Top Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#121316]">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span className="font-extrabold text-lg tracking-widest uppercase bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    BroHood
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Bar in Drawer */}
              <div className="p-4 bg-[#14151a] border-b border-white/5">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-black font-bold text-sm flex items-center justify-center uppercase">
                        {user.fullName ? user.fullName[0] : user.email[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{user.fullName || 'BroHood Member'}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="p-2 text-zinc-500 hover:text-red-400"
                      aria-label="Log out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-300 font-medium">Welcome to BroHood Store</p>
                    <div className="flex gap-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 py-2 text-center rounded-xl bg-amber-400 text-black font-bold text-xs uppercase tracking-wider"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 py-2 text-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/10"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Navigation Links */}
              <div className="p-4 space-y-5 flex-1">
                {/* Search Quick Bar */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-[#18191e] border border-white/5 text-zinc-400 text-xs"
                >
                  <Search size={15} className="text-amber-400" />
                  <span>Search 1:1 watches, sneakers, goggles...</span>
                </button>

                {/* Categories Section */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider px-2">
                    Categories
                  </p>
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={17} className="text-amber-400" />
                          <span className="text-xs font-semibold text-white group-hover:text-amber-300">
                            {cat.label}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 font-medium">
                          {cat.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Popular Brands Section */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider px-2">
                    Featured Brands
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {popularBrands.map((b) => (
                      <Link
                        key={b.name}
                        href={b.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2.5 rounded-xl bg-[#14151a] hover:bg-[#1c1d24] text-xs font-medium text-zinc-300 hover:text-amber-300 border border-white/5 truncate"
                      >
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Customer Care & Policies */}
                <div className="space-y-1 pt-2 border-t border-white/5 text-xs text-zinc-400">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider px-2 mb-1">
                    Help & Information
                  </p>
                  <Link
                    href="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white"
                  >
                    <span>Track My Order</span>
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    href="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white"
                  >
                    <span>FAQs & 1:1 Quality Guide</span>
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    href="/shipping-policy"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white"
                  >
                    <span>Shipping & COD Policy</span>
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    href="/returns-exchange"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white"
                  >
                    <span>7-Day Replacement Policy</span>
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white"
                  >
                    <span>Contact & WhatsApp Support</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Bottom WhatsApp Video Call CTA in Drawer */}
              <div className="p-4 border-t border-white/10 bg-[#0a0a0c]">
                <a
                  href="https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20would%20like%20to%20request%20video%20call%20verification."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Video Call</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <LiveSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
