"use client";
import Image from 'next/image';
import { useState } from 'react';
interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}
export default function SafeImage({ 
  src, 
  alt, 
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover'
}: SafeImageProps) {
  const [error, setError] = useState(false);
  // If image fails to load, show placeholder
  if (error) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <span className="text-gray-400 text-sm">📷 {alt}</span>
      </div>
    );
  }
  // For fill images (responsive)
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
        style={{ objectFit }}
      />
    );
  }
  // For fixed size images
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 500}
      height={height || 300}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}