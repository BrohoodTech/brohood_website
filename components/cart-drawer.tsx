'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '@/lib/store';

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    cartFinalTotal,
    shippingFee,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingGoal = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingGoal - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingGoal) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyCoupon(promoCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setPromoCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#0e0f12] border-l border-white/10 h-full flex flex-col text-white shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-amber-400" />
            <h3 className="font-bold text-sm tracking-wide">Your Shopping Bag ({cartCount})</h3>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#14151a] p-3 border-b border-white/5">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            {remainingForFreeShipping > 0 ? (
              <span className="text-zinc-300">
                Add <strong className="text-amber-400">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="text-emerald-400">FREE Express Shipping</strong>
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                ✓ You unlocked FREE Express Shipping!
              </span>
            )}
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-1.5 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-500">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-base">Your bag is empty</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Discover our first-copy luxury watches, hype sneakers, goggles and heavyweight tees.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCartDrawer}
                className="px-6 py-2.5 bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all"
              >
                Start Exploring
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-[#14151a] border border-white/5 relative group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg bg-black/40 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        {item.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <h4 className="text-xs font-medium text-white truncate">{item.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Size: <strong className="text-zinc-200">{item.selectedSize}</strong> • Color: {item.selectedColor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2 py-0.5 bg-[#1b1c22]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-semibold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Order Summary Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#121316] space-y-3">
            {/* Promo Code Input */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <Tag size={13} />
                  <span>Promo &quot;{appliedCoupon.code}&quot; applied (-₹{discountAmount.toLocaleString('en-IN')})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-zinc-400 hover:text-white text-[11px] underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. FIRST10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#1a1b20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-white/5">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-400 font-bold">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="text-amber-400">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCartDrawer}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Safe Checkout • COD & Razorpay UPI Supported</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
