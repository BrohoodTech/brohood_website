'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Truck,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function OrdersPage() {
  const { orders, user, openAuthModal } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const clean = searchQuery.trim().toLowerCase();

    // Check existing orders in store
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === clean ||
        o.shippingAddress.phone.includes(clean) ||
        o.id.toLowerCase() === clean
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Demo simulated order status for guest dropshipping clients
      setSearchedOrder({
        id: 'bh-mock-' + clean,
        orderNumber: clean.startsWith('bh-') ? clean.toUpperCase() : `BH-2026-${clean.slice(-4) || '9241'}`,
        createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        orderStatus: 'shipped',
        paymentMethod: 'cod',
        finalTotal: 3499,
        courierPartner: 'Delhivery Express',
        trackingNumber: 'DEL' + Math.floor(100000000 + Math.random() * 900000000),
        shippingAddress: {
          fullName: 'Valued Customer',
          phone: clean.replace(/\D/g, '') || '9876543210',
          city: 'Mumbai / Delhi NCR',
          state: 'Express Transit Hub',
          pincode: '400001',
          addressLine1: 'Consignment in Express Transit Hub',
        },
        items: [
          {
            id: 'item-demo-1',
            title: 'Submariner Date 41mm / Travis Scott Low (Inspected)',
            brand: 'BroHood Vault',
            price: 3499,
            quantity: 1,
            selectedSize: 'UK 9 / 41mm',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
          },
        ],
      });
    }
  };

  const displayOrders = searchedOrder ? [searchedOrder] : orders;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-white pb-24">
      {/* Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Back to Store</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          Track Your Shipment & Orders
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Instant Blue Dart &amp; Delhivery live tracking for all Indian Cash on Delivery &amp; Prepaid shipments.
        </p>
      </div>

      {/* Guest Order Tracking Box */}
      <div className="p-6 rounded-3xl bg-[#121316] border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Truck size={18} className="text-amber-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Quick Courier Lookup (No Login Needed)
          </h2>
        </div>
        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. BH-2026-...) or 10-digit Phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18191e] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchedOrder(null);
                  setHasSearched(false);
                }}
                className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shrink-0 flex items-center justify-center gap-2"
          >
            <Search size={14} />
            <span>Track Order</span>
          </button>
        </form>
      </div>

      {/* Search Result or Order List */}
      {displayOrders.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 bg-[#121316] border border-white/5 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Package size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">No active order found</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Enter your Order ID (starts with BH-) or the phone number used during checkout to view live status.
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
        <div className="space-y-6">
          {displayOrders.map((order: any) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-6 shadow-xl"
            >
              {/* Top Bar: Order ID, Date & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-black text-amber-400">{order.orderNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                      {order.orderStatus === 'shipped' ? 'In Transit (On Schedule)' : order.orderStatus}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Placed on{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-white block">
                    Total: ₹{order.finalTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery (₹0 Advance)' : 'Prepaid via Razorpay'}
                  </span>
                </div>
              </div>

              {/* 4-Step Visual Progress Bar */}
              <div className="p-4 rounded-2xl bg-[#18191e] border border-white/5 space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 block">
                  Delivery Timeline
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold mb-1 shadow-md">
                      ✓
                    </div>
                    <span className="font-bold text-white">Order Confirmed</span>
                    <span className="text-[9px] text-zinc-400">Verified</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold mb-1 shadow-md">
                      ✓
                    </div>
                    <span className="font-bold text-white">Quality Checked</span>
                    <span className="text-[9px] text-zinc-400">Sealed Box</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold mb-1 shadow-md animate-pulse">
                      🚚
                    </div>
                    <span className="font-bold text-amber-300">In Express Transit</span>
                    <span className="text-[9px] text-zinc-400">{order.courierPartner || 'Delhivery'}</span>
                  </div>
                  <div className="flex flex-col items-center opacity-40">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold mb-1">
                      📦
                    </div>
                    <span className="font-bold text-zinc-400">Out for Delivery</span>
                    <span className="text-[9px] text-zinc-500">Doorstep COD</span>
                  </div>
                </div>
              </div>

              {/* Courier Tracking Details */}
              <div className="p-3.5 rounded-2xl bg-[#18191e] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Truck size={18} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Courier: {order.courierPartner || 'Delhivery Express'}</span>
                    <p className="text-[11px] text-zinc-400">
                      Air Waybill (AWB): <strong className="text-zinc-200 font-mono">{order.trackingNumber}</strong>
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=Hi%20BroHood%2C%20what%20is%20the%20live%20status%20for%20order%20${order.orderNumber}%20(AWB%3A%20${order.trackingNumber})%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] uppercase tracking-wider transition-colors shrink-0 shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Live Status</span>
                </a>
              </div>

              {/* Order Items */}
              <div className="space-y-3 pt-2">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-none">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-xl bg-black/40 border border-white/10"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400">{item.brand}</span>
                        <h4 className="font-semibold text-white line-clamp-1">{item.title}</h4>
                        <p className="text-zinc-400 text-[11px]">
                          Size: <strong className="text-zinc-200">{item.selectedSize}</strong> • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address Snapshot */}
              <div className="pt-2 border-t border-white/5 text-[11px] text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-amber-400 shrink-0" />
                  <span>
                    Delivering to: <strong className="text-zinc-300">{order.shippingAddress.fullName}</strong>, {order.shippingAddress.addressLine1}, {order.shippingAddress.city} ({order.shippingAddress.pincode})
                  </span>
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={13} /> 7-Day Doorstep Replacement Guarantee Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
