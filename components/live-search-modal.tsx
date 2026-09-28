'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/db';
import { Product } from '@/types/ecommerce';

interface LiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveSearchModal({ isOpen, onClose }: LiveSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const hits = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    setResults(hits);
  }, [query]);

  if (!isOpen) return null;

  const popularTags = ['Rolex Submariner', 'Air Jordan 1', 'Dunk Low Panda', 'Samba OG', 'Wayfarer', 'Heavyweight Tee'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#121316] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-white">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 p-4">
          <Search size={20} className="text-amber-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search watches, sneakers, goggles, t-shirts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white rounded-full mr-2"
            >
              <X size={16} />
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-zinc-400 hover:text-white bg-white/5 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
          {/* Live Results */}
          {results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 px-1">
                Matching Products ({results.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#18191e] hover:bg-[#202228] border border-white/5 transition-all group"
                  >
                    <img
                      src={product.primaryImage}
                      alt={product.title}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0 bg-black/40"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <h4 className="text-xs font-medium text-white truncate group-hover:text-amber-300">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-white">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-zinc-500 line-through">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim() ? (
            <div className="text-center py-8 text-zinc-400 text-sm">
              No products found matching &quot;{query}&quot;. Try another brand or item.
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-3">
                <TrendingUp size={14} className="text-amber-400" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-[#18191e] hover:bg-[#22242c] text-xs text-zinc-300 hover:text-white border border-white/5 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0c0d10] border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <span>Search 1:1 first copy catalog</span>
          <Link
            href={`/shop?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
          >
            <span>View all results</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
