import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import LiveStats from '@/components/LiveStats'
import ProjectGallery from '@/components/ProjectGallery'
import PartnerAds from '@/components/PartnerAds'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-yellow-500/30">
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              MASSABA <br />
              <span className="text-[#c4a47c] italic font-serif lowercase">global.</span>
            </h1>
            
            {/* Ultra-Visible Text for Mr. Coulibaly */}
            <p className="text-xl md:text-2xl text-zinc-100 mb-10 leading-relaxed max-w-2xl font-medium">
              A premium consultancy gateway. Bridging the gap between the UAE and Global markets with diplomatic precision and strategic logistics.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/portal/register" className="h-16 px-10 rounded-full bg-white text-black font-bold flex items-center hover:bg-[#c4a47c] hover:text-white transition-all text-lg">
                Enter Portal <ArrowRight className="ml-2" />
              </Link>
              <Link href="/services" className="h-16 px-10 rounded-full border-2 border-zinc-700 text-white font-bold flex items-center hover:bg-zinc-900 text-lg">
                Review Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PartnerAds />
      <div className="bg-black">
        <LiveStats />
        <ProjectGallery />
      </div>
    </div>
  )
}