import Link from 'next/link'

export default function PartnerBanner() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-6 border border-amber-500/20">
      <div className="text-center mb-4">
        <h3 className="text-white font-bold text-lg">Our Trusted Partners</h3>
        <p className="text-slate-400 text-sm">Strategic partnerships delivering excellence</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {/* REALIN-TRANSITAD Partner */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-slate-700">
            <div className="text-center">
              <span className="text-xl font-bold text-amber-500">RTA</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-2">REALIN-TRANSITAD</p>
        </div>

        {/* CBTC Partner */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-slate-700">
            <div className="text-center">
              <span className="text-xl font-bold text-amber-500">CBTG</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-2">CBTC</p>
        </div>
      </div>
    </div>
  )
}