'use client'
import { useState } from 'react'
import { Play, X } from 'lucide-react'

interface DestinationVideoProps {
  videoId: string
  title: string
  destinationName: string
}

export default function DestinationVideo({ videoId, title, destinationName }: DestinationVideoProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Check if it's a YouTube Shorts URL
  const isShort = videoId.length > 11 || title.includes('Shorts')
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 z-20 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg group"
      >
        <Play className="w-5 h-5 text-slate-900 ml-0.5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
              <div>
                <h2 className="text-xl font-bold text-white">{destinationName}</h2>
                <p className="text-slate-400 text-sm">{title}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              {isShort ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              )}
            </div>
            <div className="p-4 bg-slate-800/50 border-t border-slate-700">
              <p className="text-slate-400 text-sm text-center">
                Découvrez {destinationName} en vidéo - {title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}