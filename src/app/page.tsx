import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5]">
      {/* Subtle Top Navigation Line */}
      <nav className="border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="font-medium tracking-[0.3em] uppercase text-sm">Massaba Global</span>
          <Link href="/portal" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Client Access</Link>
        </div>
      </nav>

      <section className="pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl mb-12 text-white leading-[1.1]">
              Strategic consultancy for <br />
              <span className="text-zinc-500 italic">international operations.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-xl leading-relaxed">
              Bespoke logistics and diplomatic solutions bridging the UAE with global markets. Excellence defined by precision.
            </p>
            
            <div className="flex gap-8 items-center">
              <Link href="/portal/register" className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-widest">
                Initiate Consultation
                <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Understated Section Divider */}
      <div className="border-t border-white/5 mx-6"></div>
    </div>
  )
}