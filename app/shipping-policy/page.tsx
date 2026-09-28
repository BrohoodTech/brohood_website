import Link from 'next/link';
import { ArrowLeft, Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
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
          <Truck size={24} className="text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Shipping & COD Policy
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Fast, discreet, and reliable express shipping across all pin codes in India.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-white/5 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            1. Express Dispatch & Delivery Timelines
          </h2>
          <p>
            All verified orders placed before 3:00 PM IST are processed and handed over to our express courier partners on the same business day.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li><strong>Tier 1 Metro Cities:</strong> 2 to 3 business days (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Pune).</li>
            <li><strong>Rest of India:</strong> 3 to 5 business days depending on location.</li>
            <li><strong>Northeast & Remote Regions:</strong> 5 to 7 business days.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            2. Cash on Delivery (COD) Terms
          </h2>
          <p>
            Cash on Delivery is available across 19,000+ Indian pin codes serviced by Delhivery, BlueDart, and Xpressbees.
          </p>
          <p>
            You can pay the delivery executive in cash or scan their UPI QR code on the spot. For orders above ₹10,000, our team may make a quick confirmation call before dispatch to verify the delivery address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            3. Free Shipping Threshold
          </h2>
          <p>
            We provide <strong>FREE Express Shipping</strong> on all orders of ₹1,499 and above. For orders below ₹1,499, a nominal flat express shipping fee of ₹99 is applicable at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
            4. Discreet & Tamper-Proof Packaging
          </h2>
          <p>
            Every watch, sneaker pair, and goggle is packed in robust, multi-layer bubble wrap inside heavy corrugated boxes. Outer parcels carry tamper-evident security tape to ensure your pieces arrive in pristine showroom condition.
          </p>
        </section>
      </div>
    </div>
  );
}
