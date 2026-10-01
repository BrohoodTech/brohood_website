'use client';

import { ShieldCheck, Truck, Tag, PackageCheck, MessageCircle } from 'lucide-react';

export function AnnouncementBar() {
  const highlights = [
    { icon: Truck, text: 'COD Available All India — ₹0 Advance' },
    { icon: PackageCheck, text: 'Free Express Shipping Above ₹1,499' },
    { icon: ShieldCheck, text: '1:1 Master Quality with Brand Box & Papers' },
    { icon: MessageCircle, text: '24/7 WhatsApp Order Tracking & Support' },
    { icon: Tag, text: 'Use Code FIRST10 for 10% Off' },
  ];

  return (
    <div className="w-full max-w-full bg-[#0a0a0c] border-b border-white/10 text-white text-xs py-2 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap gap-12 items-center text-zinc-300">
        {[...highlights, ...highlights].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="inline-flex items-center gap-2">
              <Icon size={13} className="text-amber-400 flex-shrink-0" />
              <span className="tracking-wide font-medium">{item.text}</span>
              <span className="text-zinc-600 ml-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
