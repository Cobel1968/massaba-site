import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServiceDetail() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/services" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-amber-500 hover:text-amber-400 mb-12 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>
      
      <div className="relative h-[500px] w-full mb-16 overflow-hidden border border-white/5">
        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop" alt="Visa Services" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <p className="text-amber-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">Global Mobility</p>
          <h1 className="text-5xl md:text-6xl text-white font-light tracking-tight">Visa Services</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8 text-lg text-slate-300 font-light leading-relaxed">
          <p><strong className="text-white font-medium">Traveling or relocating across borders requires precise documentation. Our Visa Services eliminate the stress and confusion of international travel requirements.</strong></p>
          <p>We provide end-to-end assistance for tourist visas, business visas, golden visas, and residency permits. Our experts stay up-to-date with the latest immigration laws to ensure your applications are accurate, complete, and submitted on time for the highest chance of approval.</p>
        </div>
        
        <div className="bg-[#0f1620] border border-white/5 p-8 h-fit">
          <h3 className="text-2xl text-white font-light mb-4">Take the next step</h3>
          <p className="text-sm text-slate-400 mb-8">Schedule a private consultation with our expert advisors today.</p>
          <Link href="/contact" className="block text-center border border-amber-500 bg-amber-500 text-[#0a0f16] hover:bg-transparent hover:text-amber-500 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
