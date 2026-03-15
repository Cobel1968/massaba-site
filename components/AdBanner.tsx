'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AdBannerProps {
  imageSrc: string;
  alt: string;
  linkUrl: string;
  className?: string;
}

export default function AdBanner({
  imageSrc,
  alt,
  linkUrl,
  className = '',
}: AdBannerProps) {
  return (
    <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className={`block ${className}`}>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-500/30 transition-shadow duration-300 group">
        <Image
          src={imageSrc}
          alt={alt}
          width={1200}
          height={300}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-white font-semibold text-lg">
            Découvrir → {alt.includes('Cobel') ? 'CobelBTC' : 'Rita Services'}
          </p>
        </div>
      </div>
    </Link>
  );
}
