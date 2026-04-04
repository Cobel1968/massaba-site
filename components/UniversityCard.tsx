'use client'
import Link from 'next/link'
import Image from 'next/image'

interface UniversityCardProps {
  name: string
  country: string
  flag: string
  logo: string
  tagline: string
  slug: string
  badge?: string
}

export default function UniversityCard({ name, country, flag, logo, tagline, slug, badge }: UniversityCardProps) {
  return (
    <Link href={`/education/partners/${slug}`} className="block group">
      <div className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300">
        <div className="relative h-48 bg-slate-700">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 bg-amber-500/90 text-slate-900 rounded-full text-xs font-bold">
              {badge || 'Partenaire Officiel'}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <span className="text-2xl">{flag}</span>
            <span className="text-white font-medium">{country}</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center p-2">
              <img src={logo} alt={name} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition">
              {name}
            </h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">{tagline}</p>
          <div className="flex items-center justify-between">
            <span className="text-amber-500 text-sm font-medium">Découvrir les programmes </span>
          </div>
        </div>
      </div>
    </Link>
  )
}