'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    cartFinalTotal,
    shippingFee,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-white">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Continue Shopping</span>
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Your Shopping Bag
          </h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-zinc-400 hover:text-red-400 transition-colors"
            >
              Clear Bag
            </button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 bg-[#121316] border border-white/5 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <ShoppingBag size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">Your bag is empty</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            You haven&apos;t added any items yet. Explore our curated collections of 1:1 luxury watches, hype sneakers, goggles, and streetwear tees.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List (Left Column) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Meter */}
            <div className="p-4 rounded-2xl bg-[#121316] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-zinc-300">
                    Add <strong className="text-amber-400">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="text-emerald-400 font-bold">FREE Express Delivery</strong>
                  </span>
                ) : (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    ✓ You unlocked FREE Express Shipping!
                  </span>
                )}
                <span className="text-zinc-500 text-[11px] font-bold">{Math.round(freeShippingPercent)}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-[#121316] border border-white/5 items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-black/40 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        {item.brand}
                      </span>
                      <Link href={`/product/${item.productSlug}`}>
                        <h4 className="text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-zinc-400">
                        Size: <strong className="text-white">{item.selectedSize}</strong> • Color: {item.selectedColor}
                      </p>
                      <div className="text-xs sm:text-sm font-bold text-white pt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2 border border-white/10 rounded-xl px-2.5 py-1 bg-[#18191e]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Aside (Right Column) */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#121316] border border-white/5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Order Summary ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h3>

              {/* Promo Code Box */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Tag size={14} />
                    <span>Coupon &quot;{appliedCoupon.code}&quot; applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-zinc-400 hover:text-white underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. FIRST10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-red-400">{promoError}</p>}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Bag Subtotal</span>
                  <span className="text-white font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Savings</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-400 font-bold uppercase">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-amber-400">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% Secure Checkout • Cash on Delivery & UPI</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
