'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface UniversityCardProps {
  name: string
  country: string
  flag: string
  logo: string
  tagline: string
  slug: string
  badge: string
  highlights: string[]
}

export default function UniversityCard({ name, country, flag, logo, tagline, slug, badge, highlights }: UniversityCardProps) {
  return (
    <Link href={`/education/partners/${slug}`} className="block group">
      <div className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 bg-amber-500/90 text-slate-900 rounded-full text-xs font-bold">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <span className="text-3xl">{flag}</span>
            <span className="text-white font-medium text-sm bg-slate-900/50 px-2 py-0.5 rounded-full">{country}</span>
          </div>
          <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{logo}</span>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition">
            {name}
          </h3>
          <p className="text-amber-400 text-sm mb-3 italic">{tagline}</p>
          <ul className="space-y-1 mb-4 flex-1">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                <span className="text-amber-500 text-xs"></span> {highlight}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-2">
            <span className="text-amber-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Découvrir les programmes <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}