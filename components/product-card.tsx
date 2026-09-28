'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useStore } from '@/lib/store';

export function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'Standard');
  const [isAdded, setIsAdded] = useState(false);
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(product, selectedSize, product.availableColors[0], 1);
    if (success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1800);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group relative flex flex-col bg-[#121316] border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.primaryImage}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isHot && (
            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-black text-[9px] uppercase tracking-wider shadow-md">
              HOT DROP
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black font-black text-[9px] uppercase tracking-wider shadow-md">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isSaved
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
          }`}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Size Selector Pills on Hover (Visible on mobile/desktop) */}
        {product.availableSizes.length > 1 && (
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 justify-center bg-black/60 backdrop-blur-md p-1.5 rounded-xl opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            {product.availableSizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  selectedSize === size
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Meta & Price */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-0.5">
            <span>{product.brand}</span>
            <span className="flex items-center gap-0.5 text-zinc-400 text-[10px] font-normal">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span>{product.rating}</span>
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-end justify-between pt-1 border-t border-white/5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-zinc-500 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Free Delivery</span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to bag"
            className={`p-2.5 rounded-xl transition-all ${
              isAdded
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white/10 hover:bg-amber-400 hover:text-black text-white'
            }`}
          >
            {isAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}
