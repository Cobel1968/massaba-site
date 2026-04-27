'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface TourismVideoProps {
  videoId?: string;
}

export default function TourismVideo({ videoId = "_Fs78U1i3sU" }: TourismVideoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group bg-slate-800 shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
        
        {!imageError ? (
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Côte d'Ivoire Tourism Video"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-slate-900 ml-1" />
              </div>
              <p className="text-white text-xl font-semibold">Côte d'Ivoire</p>
              <p className="text-slate-300">Venez voir</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-xl">
            <Play className="w-8 h-8 text-slate-900 ml-1" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <p className="text-white font-semibold text-lg">Côte d'Ivoire, venez voir</p>
          <p className="text-slate-300 text-sm">Vidéo promotionnelle - Regardez maintenant</p>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
              <div>
                <h2 className="text-xl font-bold text-white">Côte d'Ivoire Touristique</h2>
                <p className="text-slate-400 text-sm">Découvrez les merveilles de la Côte d'Ivoire</p>
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
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Côte d'Ivoire Tourism Video"
              />
            </div>

            <div className="p-4 bg-slate-800/50 border-t border-slate-700">
              <p className="text-slate-400 text-sm text-center">
                Côte d'Ivoire, venez voir - Découvrez un pays accueillant aux multiples facettes
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}