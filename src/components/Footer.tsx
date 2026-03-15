import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, Globe, ShieldCheck, Linkedin, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <Image src="/massaba-logo.png" alt="Massaba" width={40} height={40} className="brightness-200" />
              <span className="text-xl font-black uppercase tracking-tighter">Massaba</span>
            </div>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              Founded by Mr. Brahima Coulibaly. Leveraging diplomatic excellence to navigate global business frontiers with trust and precision.
            </p>
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest">
              <ShieldCheck size={14} /> AI-Secured Consultancy
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Navigation</h4>
            <ul className="space-y-3 text-sm font-sans text-zinc-300">
              <li><Link href="/services" className="hover:text-primary transition-colors">Global Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Founder</Link></li>
              <li><Link href="/portal" className="hover:text-primary transition-colors">Client Portal</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact HQ</Link></li>
            </ul>
          </div>

          {/* Global Headquarters */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Contact HQ</h4>
            <ul className="space-y-4 text-sm font-sans text-zinc-300">
              <li className="flex gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Compass Building, Al Shohada Road, Al Hamra Industrial Zone FZ, RAK, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:massaba555@yahoo.fr" className="hover:text-primary transition-colors">massaba555@yahoo.fr</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <a href="tel:+971525019802" className="hover:text-primary transition-colors">+971 52 501 9802</a>
              </li>
            </ul>
          </div>

          {/* Legal & Status */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Compliance</h4>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="text-zinc-500">System Status</span>
                <span className="text-green-500 flex items-center gap-1">
                  <span className="h-1 w-1 bg-green-500 rounded-full animate-pulse"></span> Optimal
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-sans leading-tight">
                All data processed via Massaba Triage AI is encrypted under UAE Data Protection regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
             2026 Massaba Global Consultancy. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors">
              Back to Top <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
