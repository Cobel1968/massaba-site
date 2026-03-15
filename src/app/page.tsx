import LiveStats from '@/components/LiveStats'
import ProjectGallery from '@/components/ProjectGallery'
import PartnerAds from '@/components/PartnerAds'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Replace with your high-end background image */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10" />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-[0.3em] mb-8 animate-fade-in">
            <Zap size={12} /> AI-Powered Strategic Advisory
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            Global Vision.<br />
            <span className="text-primary italic font-serif lowercase">Diplomatic</span> Precision.
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
            Founded by Mr. Brahima Coulibaly, we bridge the gap between international markets and local success with unmatched credibility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/portal" 
              className="group relative px-10 py-5 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/about" 
              className="px-10 py-5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
           <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><ShieldCheck size={16}/> Trusted Negotiator</div>
           <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><Globe size={16}/> GCC & MENA Experts</div>
           <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><Zap size={16}/> AI Integrated</div>
        </div>
      </section>
    <PartnerAds />
<ProjectGallery />
<LiveStats />
</main>
  )
}



