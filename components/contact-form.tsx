'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl">
      <h2 className="text-sm font-bold uppercase tracking-wider text-white">
        Send an Enquiry
      </h2>

      {sent ? (
        <div className="text-center py-10 space-y-2">
          <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Message Received!</h3>
          <p className="text-xs text-zinc-400">Our customer team will connect on WhatsApp within 15 minutes.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Kunal Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">WhatsApp Phone Number</label>
            <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-amber-400 transition-colors">
              <span className="bg-[#20222a] px-3 py-2.5 text-xs text-zinc-300 font-bold flex items-center border-r border-white/10 select-none">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 bg-[#18191e] px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Inquiry / Question</label>
            <textarea
              required
              rows={4}
              placeholder="Ask about size, COD delivery, order tracking..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Send size={14} />
            <span>Submit Enquiry</span>
          </button>
        </form>
      )}
    </div>
  );
}
