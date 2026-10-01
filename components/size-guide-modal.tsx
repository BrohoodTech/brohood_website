'use client';

import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { CategorySlug } from '@/types/ecommerce';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategorySlug;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const isShoes = category === 'sneakers';
  const isTshirt = category === 'tshirts';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#121316] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
              <Ruler size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                {isShoes ? 'Sneaker Sizing Guide' : isTshirt ? 'Oversized Tee Sizing Chart' : 'Size & Fit Details'}
              </h3>
              <p className="text-xs text-zinc-400">
                {isShoes ? 'Standard Indian (UK) sneaker sizing' : 'Boxy drop-shoulder relaxed fit'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close size guide"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sneaker Table */}
        {isShoes && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-300 leading-relaxed">
              We recommend picking your standard Indian / UK sneaker size. All our sneakers are built on 1:1 original lasts and fit true to size (TTS).
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#18191e]">
              <table className="w-full text-xs text-left">
                <thead className="bg-white/5 uppercase text-amber-400 font-bold text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-2.5 px-3">UK / India</th>
                    <th className="py-2.5 px-3">US Men</th>
                    <th className="py-2.5 px-3">EU</th>
                    <th className="py-2.5 px-3">Foot (CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-zinc-300">
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">UK 6</td>
                    <td className="py-2 px-3">US 6.5 / 7</td>
                    <td className="py-2 px-3">EU 40</td>
                    <td className="py-2 px-3">25.0 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">UK 7</td>
                    <td className="py-2 px-3">US 7.5 / 8</td>
                    <td className="py-2 px-3">EU 41</td>
                    <td className="py-2 px-3">26.0 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5 bg-amber-400/5">
                    <td className="py-2 px-3 font-bold text-amber-400">UK 8 (Most Common)</td>
                    <td className="py-2 px-3">US 8.5 / 9</td>
                    <td className="py-2 px-3">EU 42.5</td>
                    <td className="py-2 px-3">26.5 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5 bg-amber-400/5">
                    <td className="py-2 px-3 font-bold text-amber-400">UK 9 (Most Common)</td>
                    <td className="py-2 px-3">US 9.5 / 10</td>
                    <td className="py-2 px-3">EU 44</td>
                    <td className="py-2 px-3">27.5 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">UK 10</td>
                    <td className="py-2 px-3">US 10.5 / 11</td>
                    <td className="py-2 px-3">EU 45</td>
                    <td className="py-2 px-3">28.5 cm</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">UK 11</td>
                    <td className="py-2 px-3">US 11.5 / 12</td>
                    <td className="py-2 px-3">EU 46</td>
                    <td className="py-2 px-3">29.5 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200/90 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 size={14} /> Free Size Swap Guarantee
              </span>
              <p className="text-[11px] text-zinc-300">
                If the pair doesn’t fit, simply WhatsApp us within 7 days of delivery for a free doorstep size exchange.
              </p>
            </div>
          </div>
        )}

        {/* T-Shirt Table */}
        {isTshirt && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-300 leading-relaxed">
              Designed with a streetwear drop-shoulder boxy silhouette. If you prefer a regular tailored fit, consider sizing down one size.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#18191e]">
              <table className="w-full text-xs text-left">
                <thead className="bg-white/5 uppercase text-amber-400 font-bold text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest (Inches)</th>
                    <th className="py-2.5 px-3">Length (Inches)</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-zinc-300">
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">S</td>
                    <td className="py-2 px-3">42&quot;</td>
                    <td className="py-2 px-3">28&quot;</td>
                    <td className="py-2 px-3">Drop-Shoulder</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">M</td>
                    <td className="py-2 px-3">44&quot;</td>
                    <td className="py-2 px-3">29&quot;</td>
                    <td className="py-2 px-3">Drop-Shoulder</td>
                  </tr>
                  <tr className="hover:bg-white/5 bg-amber-400/5">
                    <td className="py-2 px-3 font-bold text-amber-400">L (Most Popular)</td>
                    <td className="py-2 px-3">46&quot;</td>
                    <td className="py-2 px-3">30&quot;</td>
                    <td className="py-2 px-3">Drop-Shoulder</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">XL</td>
                    <td className="py-2 px-3">48&quot;</td>
                    <td className="py-2 px-3">31&quot;</td>
                    <td className="py-2 px-3">Drop-Shoulder</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">XXL</td>
                    <td className="py-2 px-3">50&quot;</td>
                    <td className="py-2 px-3">32&quot;</td>
                    <td className="py-2 px-3">Drop-Shoulder</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-zinc-400 space-y-1">
              <span className="font-semibold text-white">Fabric Specifications:</span>
              <p>260 GSM 100% Pre-Shrunk Bio-Washed Combed Cotton. Neck ribbing reinforced with Lycra to prevent sagging after washes.</p>
            </div>
          </div>
        )}

        {/* Watches / Goggles fallback */}
        {!isShoes && !isTshirt && (
          <div className="space-y-3 text-xs text-zinc-300">
            <p>Our luxury watches are crafted to 1:1 original case proportions (39mm to 42mm). Stainless steel bracelets feature removable screw pins and micro-adjustment clasps to fit any wrist circumference.</p>
            <p>Free link adjustment tool instructions are included in the hardcase box.</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-colors"
        >
          Got It, Thanks
        </button>
      </div>
    </div>
  );
}
