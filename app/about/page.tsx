import Image from 'next/image'
import Link from 'next/link'
import PartnerBanner from '@/components/PartnerBanner'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6 overflow-hidden rounded-xl bg-white/5 flex items-center justify-center border border-slate-700">
            <Image
              src="/massaba-logo.png"
              alt="Massaba Consulting"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">About Massaba Consulting</h1>
          <p className="text-xl text-slate-400">Connecting People & Opportunities Since 2010</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed">
                To provide exceptional consultancy services that connect people and businesses with 
                opportunities across the globe, fostering growth, success, and meaningful partnerships.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed">
                To become the leading consultancy firm bridging Africa, the Middle East, and global markets, 
                known for integrity, excellence, and transformative results.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-amber-500 font-semibold mb-2">Excellence</h3>
                  <p className="text-slate-300 text-sm">Delivering the highest quality service</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-amber-500 font-semibold mb-2">Integrity</h3>
                  <p className="text-slate-300 text-sm">Honest and transparent business practices</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-amber-500 font-semibold mb-2">Innovation</h3>
                  <p className="text-slate-300 text-sm">Creative solutions for complex challenges</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-amber-500 font-semibold mb-2">Partnership</h3>
                  <p className="text-slate-300 text-sm">Building lasting relationships with clients</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partner Banner */}
          <PartnerBanner />
          
          <div className="text-center pt-4">
            <Link 
              href="/contact" 
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 rounded-full transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}