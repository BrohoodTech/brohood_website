'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Lock,
  Smartphone,
  Check,
  Tag,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { ShippingAddress } from '@/types/ecommerce';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi NCR', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Chandigarh', 'Puducherry'
];

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
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(addresses.length === 0);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeSuccess, setPincodeSuccess] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

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

  // Dynamically load Razorpay SDK script on component mount
  useEffect(() => {
    if (!document.getElementById('razorpay-sdk')) {
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Indian Pincode Auto-detection (Postal API)
  const handlePincodeChange = async (val: string) => {
    const cleanPincode = val.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: cleanPincode }));

    if (cleanPincode.length === 6) {
      setPincodeLoading(true);
      setPincodeSuccess('');
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPincode}`);
        const data = await res.json();
        if (data && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
          const office = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: office.District || office.Block || prev.city,
            state: office.State || prev.state,
          }));
          setPincodeSuccess(`✓ ${office.District}, ${office.State} (Delhivery Express Serviceable)`);
        }
      } catch (err) {
        console.warn('Pincode lookup error:', err);
      } finally {
        setPincodeLoading(false);
      }
    } else {
      setPincodeSuccess('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 text-white space-y-4">
        <h2 className="text-xl font-bold">Your bag is empty</h2>
        <p className="text-xs text-zinc-400">Add pieces to your bag to proceed to checkout.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all"
        >
          Explore Drops
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    let targetAddress = selectedAddress;

    if (showNewAddressForm || !targetAddress) {
      const cleanPhone = (formData.phone || '').replace(/\D/g, '');
      if (!formData.fullName || cleanPhone.length !== 10 || !formData.addressLine1 || !formData.city || formData.pincode.length !== 6 || !formData.state) {
        alert('Please enter a valid 10-digit Indian WhatsApp mobile number and 6-digit Pincode with complete address.');
        return;
      }
      targetAddress = { ...formData, phone: cleanPhone };
      addAddress(targetAddress);
    }

    setIsProcessing(true);

    // Flow 1: Online Payment via Razorpay (UPI / Cards / NetBanking)
    if (paymentMethod === 'razorpay') {
      try {
        const res = await fetch('/api/checkout/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart,
            shippingAddress: targetAddress,
            paymentMethod: 'razorpay',
            cartTotal: cartFinalTotal,
          }),
        });
        const orderData = await res.json();

        // Check if Razorpay SDK is available on window
        if (typeof window !== 'undefined' && window.Razorpay && orderData.keyId) {
          const options = {
            key: orderData.keyId,
            amount: Math.round(orderData.amount * 100),
            currency: 'INR',
            name: 'BroHood Store',
            description: `Order ${orderData.orderNumber} - 1:1 Master Quality`,
            image: '/brand/brohood-v2.png',
            order_id: orderData.razorpayOrderId.startsWith('order_mock') ? undefined : orderData.razorpayOrderId,
            prefill: {
              name: targetAddress.fullName,
              contact: targetAddress.phone,
              email: user?.email || 'customer@brohood.in',
            },
            theme: {
              color: '#f59e0b',
            },
            handler: async function (response: any) {
              // Verify signature
              await fetch('/api/checkout/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id || orderData.razorpayOrderId,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature || 'mock_signature',
                  orderNumber: orderData.orderNumber,
                }),
              });

              createOrder('razorpay', targetAddress!);
              setIsProcessing(false);
              router.push(`/order-confirmation?orderNumber=${orderData.orderNumber}&method=razorpay`);
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false);
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
          return;
        }
      } catch (err) {
        console.error('Razorpay checkout error:', err);
      }
    }

    // Flow 2: Cash on Delivery (COD)
    setTimeout(() => {
      const order = createOrder(paymentMethod, targetAddress!);
      setIsProcessing(false);
      router.push(`/order-confirmation?orderNumber=${order.orderNumber}&method=${paymentMethod}`);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-12 space-y-8 text-white">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Back to Shopping Bag</span>
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-heading">
            Checkout &amp; Express Shipping
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck size={15} /> 256-Bit SSL Encrypted
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Shipping Address & Payment Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  1. Delivery Address (India)
                </h3>
              </div>
              {addresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  {showNewAddressForm ? 'Choose Saved Address' : '+ Add New Address'}
                </button>
              )}
            </div>

            {/* Saved Addresses Picker */}
            {!showNewAddressForm && addresses.length > 0 && (
              <div className="space-y-3">
                {addresses.map((addr, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedAddress(addr)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddress === addr
                        ? 'bg-amber-400/10 border-amber-400 text-white shadow-md'
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
                    <div className="text-xs space-y-1 flex-1">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{addr.fullName}</span>
                        <span className="text-amber-400 font-bold">{addr.phone}</span>
                      </div>
                      <p className="text-zinc-300">
                        {addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                      </p>
                      <p className="text-zinc-400">
                        {addr.city}, {addr.state} - <strong className="text-white font-mono">{addr.pincode}</strong>
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* New Address Form with Smart Pincode Auto-Fill */}
            {(showNewAddressForm || addresses.length === 0) && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sahil Khan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1 font-medium">WhatsApp Mobile Number *</label>
                    <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-amber-400 transition-colors">
                      <span className="bg-[#20222a] px-3 py-2.5 text-xs text-zinc-300 font-bold flex items-center border-r border-white/10 select-none">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className="flex-1 bg-[#18191e] px-3 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium">Flat / House No., Apartment & Street *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 302, Sunrise Towers, 14th Main Rd"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1 font-medium">6-Digit Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 560001"
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                    {pincodeLoading && <span className="text-[10px] text-amber-400 block mt-0.5">Locating city...</span>}
                    {pincodeSuccess && <span className="text-[10px] text-emerald-400 block mt-0.5">{pincodeSuccess}</span>}
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1 font-medium">City / District *</label>
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
                    <label className="text-xs text-zinc-400 block mb-1 font-medium">State *</label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Payment Method Selection */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                2. Select Payment Method
              </h3>
            </div>

            <div className="space-y-3">
              {/* Option A: Cash on Delivery (COD) */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-md'
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
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm flex-wrap">
                      <Banknote size={16} className="text-amber-400" />
                      <span>Cash on Delivery (COD)</span>
                      <span className="text-[11px] font-bold text-emerald-400">
                        • ₹0 Advance Required
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Pay via Cash or scan delivery executive’s UPI QR at your doorstep.
                    </p>
                  </div>
                </div>
              </label>

              {/* Option B: Razorpay Online Payment (UPI, GPay, PhonePe, Cards) */}
              <label
                onClick={() => setPaymentMethod('razorpay')}
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-md'
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
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm flex-wrap">
                      <CreditCard size={16} className="text-amber-400" />
                      <span>Online Payment via Razorpay</span>
                      <span className="text-[11px] font-bold text-amber-400">
                        • Instant UPI &amp; Cards
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Google Pay, PhonePe, Paytm, BHIM UPI, Cards (Visa/Mastercard/RuPay), NetBanking.
                    </p>
                    {/* Visual Indian UPI Badges */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5 text-[10px] font-bold text-zinc-400">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">GPay</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300">PhonePe</span>
                      <span className="px-1.5 py-0.5 rounded bg-sky-900/40 text-sky-300">Paytm</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300">UPI QR</span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">RuPay</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Item Thumbnails Snapshot */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-xl bg-black/40 flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-white truncate max-w-[140px]">{item.title}</p>
                      <p className="text-[10px] text-zinc-400">
                        Size: <strong className="text-white">{item.selectedSize}</strong> • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-white">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Tag size={13} className="text-amber-400" />
                  <span>Promo Code</span>
                </span>
                {appliedCoupon && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">
                    {appliedCoupon.code} Applied
                  </span>
                )}
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div>
                    <span className="font-mono font-bold text-emerald-400">{appliedCoupon.code}</span>
                    <p className="text-[10px] text-zinc-400">{appliedCoupon.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeCoupon();
                      setCouponMsg(null);
                    }}
                    className="text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/5 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FIRST10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#18191e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!couponInput) return;
                        const res = applyCoupon(couponInput);
                        setCouponMsg({ success: res.success, text: res.message });
                        if (res.success) setCouponInput('');
                      }}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-[11px] font-medium ${couponMsg.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        const res = applyCoupon('FIRST10');
                        setCouponMsg({ success: res.success, text: res.message });
                      }}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-amber-400 hover:bg-white/10"
                    >
                      FIRST10 (10% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const res = applyCoupon('BROHOOD500');
                        setCouponMsg({ success: res.success, text: res.message });
                      }}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-amber-400 hover:bg-white/10"
                    >
                      BROHOOD500 (₹500 OFF)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Express Shipping</span>
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

            {/* Place Order CTA Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Securing Order...</span>
              ) : paymentMethod === 'cod' ? (
                <span>Confirm Cash on Delivery Order</span>
              ) : (
                <span>Pay ₹{cartFinalTotal.toLocaleString('en-IN')} via UPI / Cards</span>
              )}
            </button>

            {/* Security Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5">
                <Lock size={13} className="text-amber-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5">
                <ShieldCheck size={13} className="text-amber-400 shrink-0" />
                <span>Discreet Sealed Box</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5">
                <Check size={13} className="text-amber-400 shrink-0" />
                <span>7-Day Doorstep Exchange</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5">
                <Smartphone size={13} className="text-amber-400 shrink-0" />
                <span>WhatsApp Order Updates</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1 text-center text-[10px] text-zinc-400">
              <p className="flex items-center justify-center gap-1 text-emerald-400 font-semibold">
                <Check size={12} /> Delhivery Express Dispatch within 24 Hours
              </p>
              <p>All prices inclusive of GST. Pay at your doorstep with Cash or UPI QR.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
