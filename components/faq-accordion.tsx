'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <div className="divide-y divide-white/5 bg-[#121316] border border-white/5 rounded-3xl p-4 sm:p-6 shadow-xl">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-amber-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="text-xs text-zinc-300 leading-relaxed mt-2.5 pr-6 animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#18191f] to-[#121316] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-sm font-bold text-white uppercase">Still have questions?</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Talk to our product specialists directly on WhatsApp.</p>
        </div>
        <a
          href="https://wa.me/919876543210?text=Hi%20BroHood%2C%20I%20have%20a%20question%20before%20placing%20my%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
        >
          <MessageCircle size={15} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
