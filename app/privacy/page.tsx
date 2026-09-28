import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <Lock size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Privacy Policy
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Your privacy and customer information are strictly safeguarded with end-to-end security.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/5 space-y-5 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase text-amber-400">1. Information We Collect</h2>
          <p>
            When you register, place orders, or request video call verification, we collect your name, phone number (WhatsApp), delivery address, and email for dispatch tracking. We never store debit/credit card numbers; all online payments are processed through Razorpay PCI-DSS compliant systems.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase text-amber-400">2. How We Use Your Data</h2>
          <p>
            Your information is strictly used for order fulfillment, courier delivery updates via SMS/WhatsApp, and warranty/exchange communications. We never sell or share customer lists with third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase text-amber-400">3. Data Deletion</h2>
          <p>
            You can request full removal of your profile and saved delivery addresses by emailing <strong>privacy@brohood.in</strong> or contacting our WhatsApp support.
          </p>
        </section>
      </div>
    </div>
  );
}
