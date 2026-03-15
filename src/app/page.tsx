import Link from 'next/link'
import { ArrowRight, ShieldCheck, Globe, Zap, Eye } from 'lucide-react'
import LiveStats from '@/components/LiveStats'
import ProjectGallery from '@/components/ProjectGallery'
import PartnerAds from '@/components/PartnerAds'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Review Banner - Subtle indicator for Mr. Coulibaly */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
           Production Preview v1.0 • Read-Only Mode
        </p>
      </div>

      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9]">
              MASSABA <br />
              <span className="text-primary italic font-serif lowercase tracking-normal">global.</span>
            </h1>
            
            {/* High Contrast Text */}
            <p className="text-xl md:text-2xl text-zinc-100 mb-10 leading-relaxed max-w-2xl font-medium">
              A premium consultancy gateway. Explore the departmental architecture and digital infrastructure designed for your international operations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/portal/register" className="h-16 px-10 rounded-full bg-white text-black font-bold flex items-center hover:bg-primary hover:text-white transition-all">
                Enter Portal <ArrowRight className="ml-2" />
              </Link>
              <Link href="/services" className="h-16 px-10 rounded-full border-2 border-zinc-800 text-white font-bold flex items-center hover:bg-zinc-900">
                Review Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PartnerAds />
      <div className="bg-zinc-950">
        <LiveStats />
        <ProjectGallery />
      </div>
    </div>
  )
}
