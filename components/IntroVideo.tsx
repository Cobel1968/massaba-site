'use client'
import { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward } from 'lucide-react'

interface IntroVideoProps {
  videoSrc: string
  onComplete: () => void
}

export default function IntroVideo({ videoSrc, onComplete }: IntroVideoProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleVideoEnd = () => {
    setIsPlaying(false)
    onComplete()
  }

  const toggleMute = () => {
    const video = document.getElementById('intro-video') as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skipVideo = () => {
    setIsPlaying(false)
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="relative w-full h-full">
        <video
          id="intro-video"
          src={videoSrc}
          autoPlay
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-contain"
          controls={false}
        />
        
        {/* Controls overlay */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
          <button
            onClick={toggleMute}
            className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={skipVideo}
            className="bg-black/50 hover:bg-black/70 text-white px-6 py-2 rounded-full text-sm font-medium transition"
          >
            Skip <SkipForward className="w-4 h-4 inline ml-1" />
          </button>
        </div>
        
        {/* Click anywhere to skip hint */}
        <div className="absolute bottom-24 left-0 right-0 text-center">
          <p className="text-white/40 text-xs">Click anywhere or press Skip to continue</p>
        </div>
      </div>
      
      {/* Click anywhere to skip */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={skipVideo}
      />
    </div>
  )
}