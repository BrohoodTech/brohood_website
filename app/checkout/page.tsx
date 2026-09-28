'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Banknote, CheckCircle2, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ShippingAddress } from '@/types/ecommerce';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartFinalTotal,
    discountAmount,
    shippingFee,
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    createOrder,
    user,
    openAuthModal,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(addresses.length === 0);

  // New Address Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 text-white space-y-4">
        <h2 className="text-xl font-bold">Your bag is empty</h2>
        <p className="text-xs text-zinc-400">Add some pieces to checkout.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    let targetAddress = selectedAddress;

    if (showNewAddressForm || !targetAddress) {
      if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.pincode) {
        alert('Please fill in all required shipping address fields.');
        return;
      }
      targetAddress = formData;
      addAddress(formData);
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder(paymentMethod, targetAddress!);
      setIsProcessing(false);
      router.push(`/order-confirmation?orderNumber=${order.orderNumber}&method=${paymentMethod}`);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-white">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Back to Bag</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          Checkout & Shipping
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="p-6 rounded-2xl bg-[#121316] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  1. Shipping Address
                </h3>
              </div>
              {addresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  {showNewAddressForm ? 'Select Saved Address' : '+ Add New Address'}
                </button>
              )}
            </div>

            {/* Existing Saved Addresses */}
            {!showNewAddressForm && addresses.length > 0 && (
              <div className="space-y-3">
                {addresses.map((addr, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedAddress(addr)}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAddress === addr
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-[#18191e] border-white/5 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingAddress"
                      checked={selectedAddress === addr}
                      onChange={() => setSelectedAddress(addr)}
                      className="mt-1 accent-amber-400"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{addr.fullName}</span>
                        <span className="text-zinc-400 font-normal">({addr.phone})</span>
                      </div>
                      <p className="text-zinc-300">
                        {addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                      </p>
                      <p className="text-zinc-400">
                        {addr.city}, {addr.state} - <strong className="text-white">{addr.pincode}</strong>
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* New Address Form */}
            {(showNewAddressForm || addresses.length === 0) && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">House / Flat / Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Flat 201, Building Name, Street"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-digit Pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Payment Method Selection */}
          <div className="p-6 rounded-2xl bg-[#121316] border border-white/5 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                2. Select Payment Method
              </h3>
            </div>

            <div className="space-y-3">
              {/* Option A: Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-400/10 border-amber-400 text-white'
                    : 'bg-[#18191e] border-white/5 text-zinc-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-amber-400"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <Banknote size={16} className="text-amber-400" />
                      <span>Cash on Delivery (COD)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                        Zero Advance
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Pay via Cash or UPI at your doorstep when the courier arrives.
                    </p>
                  </div>
                </div>
              </label>

              {/* Option B: Razorpay Online Payment */}
              <label
                onClick={() => setPaymentMethod('razorpay')}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'bg-amber-400/10 border-amber-400 text-white'
                    : 'bg-[#18191e] border-white/5 text-zinc-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="mt-1 accent-amber-400"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <CreditCard size={16} className="text-amber-400" />
                      <span>Online Payment via Razorpay</span>
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                        Instant UPI & Cards
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, NetBanking.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order Button */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#121316] border border-white/5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Order Review
            </h3>

            {/* Miniature Item Thumbnails */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded-lg bg-black/40"
                    />
                    <div>
                      <p className="font-semibold text-white truncate max-w-[140px]">{item.title}</p>
                      <p className="text-[10px] text-zinc-400">Qty: {item.quantity} • Size: {item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
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
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? <strong className="text-emerald-400 font-bold uppercase">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                <span>Total Payable</span>
                <span className="text-amber-400">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing ? 'Processing Order...' : paymentMethod === 'cod' ? 'Confirm Cash on Delivery Order' : 'Pay via Razorpay UPI / Cards'}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
              <Lock size={13} className="text-amber-400" />
              <span>256-Bit SSL Encrypted & Protected Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
