'use client'
import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
}

export default function SafeImage({ src, alt, className }: SafeImageProps) {
  const [error, setError] = useState(false)

  return (
    <img
      src={error ? '/images/placeholders/placeholder.svg' : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}