'use client';

import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getProductBySlug } from '@/lib/db';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, user, openAuthModal } = useStore();

  const handleMoveToBag = (slug: string) => {
    const product = getProductBySlug(slug);
    if (product) {
      addToCart(product, product.availableSizes[0], product.availableColors[0], 1);
      removeFromWishlist(product.id);
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-white">
      {/* Header */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Explore Shop</span>
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            My Wishlist ({wishlist.length})
          </h1>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 bg-[#121316] border border-white/5 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Heart size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">Your wishlist is empty</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all shadow-lg"
          >
            <span>Explore Drops</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-[#121316] border border-white/5 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-[4/5] bg-black/40">
                <Link href={`/product/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-red-400 backdrop-blur-md transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    {item.brand}
                  </span>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-zinc-500 line-through">
                      ₹{item.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleMoveToBag(item.slug)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
