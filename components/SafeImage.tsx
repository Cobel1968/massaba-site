'use client'
import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
}

export default function SafeImage({ src, alt, className, width, height, fill }: SafeImageProps) {
  const [error, setError] = useState(false)

  const style = fill 
    ? { width: '100%', height: '100%', objectFit: 'cover' as const }
    : { width: width || 'auto', height: height || 'auto' }

  return (
    <img
      src={error ? '/images/placeholders/placeholder.svg' : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  )
}