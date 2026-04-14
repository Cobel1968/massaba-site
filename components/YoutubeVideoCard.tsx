'use client'
import { useState } from 'react'
import { Play, X } from 'lucide-react'

interface YoutubeVideoProps {
  videoId: string
  title: string
  description?: string
}

export default function YoutubeVideoCard({ videoId, title, description }: YoutubeVideoProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
      >
        <div className="relative h-48 bg-slate-700">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              <Play className="w-8 h-8 text-slate-900 ml-1" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold mb-1">{title}</h3>
          {description && <p className="text-slate-400 text-sm">{description}</p>}
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
              <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}