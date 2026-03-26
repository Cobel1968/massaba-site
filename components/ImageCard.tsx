'use client';

import Image from 'next/image';

interface ImageCardProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageCard({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
}: ImageCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}>
      <div className="relative pb-[75%]"> {/* 4:3 aspect ratio - adjust to 56.25% for 16:9 */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          priority={false} // set true for hero images only
        />
      </div>
    </div>
  );
}
