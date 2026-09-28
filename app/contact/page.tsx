'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Mail, Phone, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
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
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 text-white space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft size={13} />
          <span>Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <MessageCircle size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Contact & Support
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          We are here to assist with sizing questions, video verification, and order tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Channels */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#121316] border border-white/5 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Direct Contact Details
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#18191e] hover:bg-[#20222a] border border-white/5 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="font-bold text-white group-hover:text-[#25D366]">WhatsApp Support (Fastest)</p>
                  <p className="text-zinc-400 text-xs">+91 98765 43210 • 10 AM to 8 PM</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#18191e] border border-white/5">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold text-white">Email Enquiries</p>
                  <p className="text-zinc-400 text-xs">support@brohood.in</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#18191e] border border-white/5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-bold text-white">Operational Hours</p>
                  <p className="text-zinc-400 text-xs">Mon – Sat: 10:00 AM – 8:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Send Inquiry Form */}
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
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#18191e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Inquiry / Question</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ask about size, COD delivery, video verification..."
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
      </div>
    </div>
  );
}
