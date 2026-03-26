'use client'
import React from 'react'
import Link from 'next/link'


interface AdBannerProps {
  imageSrc: string
  alt: string
  linkUrl: string
}

export default function AdBanner({ imageSrc, alt, linkUrl }: AdBannerProps) {
  return (
    <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className="block my-8 max-w-4xl mx-auto">
      <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/30 transition-all group">
        <div className="relative w-full h-48 md:h-64">
          <img
            src={imageSrc}
            alt={alt}
            
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 md:p-6">
          <p className="text-white text-sm md:text-base font-semibold">
            {alt.includes('Cobel') ? 'Discover Cobel Business Training Center' : 'Discover Our Services'}
          </p>
        </div>
      </div>
    </Link>
  )
}