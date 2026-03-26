import Image from 'next/image'

export default function PartnerBanner() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/5 flex items-center justify-center border border-slate-700">
            <Image
              src="/images/shared/rita_logo_elephant_hq.png"
              alt="Rita Services - Partner"
              width={64}
              height={64}
              className="object-contain p-2"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold">Official Partner</h3>
            <p className="text-slate-400 text-sm">Rita Services - Trusted Partner Since 2015</p>
          </div>
        </div>
        <div className="text-slate-400 text-sm">
           Strategic Partnership for Excellence
        </div>
      </div>
    </div>
  )
}