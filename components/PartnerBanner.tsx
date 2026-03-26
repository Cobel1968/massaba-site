export default function PartnerBanner() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-6 border border-amber-500/20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/5 flex items-center justify-center border border-slate-700">
            <img src="/images/shared/rita_logo_elephant_hq.png" alt="Rita Services" className="w-full h-full object-contain p-2" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Official Partner</h3>
            <p className="text-amber-500 text-sm font-medium">Rita Services</p>
            <p className="text-slate-400 text-xs">Strategic Partnership Since 2015</p>
          </div>
        </div>
        <div className="bg-amber-500/10 px-4 py-2 rounded-full">
          <p className="text-amber-400 text-sm"> Trusted Partner</p>
        </div>
      </div>
    </div>
  )
}