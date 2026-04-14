'use client'
import { useRef, useEffect } from 'react'

export default function TestVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        controls
        autoPlay
        muted
        className="max-w-full max-h-full"
      />
    </div>
  )
}