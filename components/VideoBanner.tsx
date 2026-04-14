'use client'
import { useState } from 'react'
import { Play, Award, TrendingUp, GraduationCap, Video, X } from 'lucide-react'

export default function VideoBanner() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 my-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-full mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">UNIRANKS 2026</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Top Universities in United Arab Emirates
            </h2>
            <p className="text-slate-400 mb-4">
              Découvrez le classement national des leaders académiques 2026. 
              Les meilleures universités des Émirats Arabes Unis pour votre parcours international.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-2 rounded-lg transition"
              >
                <Play className="w-4 h-4" /> Regarder la vidéo
              </button>
            </div>
          </div>

          {/* Right stats */}
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-xl font-bold text-white">#1</div>
              <div className="text-slate-500 text-xs">UAE Ranking</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-xl font-bold text-white">45+</div>
              <div className="text-slate-500 text-xs">Nationalités</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Video className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-xl font-bold text-white">ABET</div>
              <div className="text-slate-500 text-xs">Accrédité</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
              <div>
                <h2 className="text-xl font-bold text-white">UNIRANKS 2026</h2>
                <p className="text-slate-400 text-sm">Top Universities in United Arab Emirates</p>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center p-8">
                <Play className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <p className="text-slate-400">La vidéo UNIRANKS 2026 sera disponible prochainement.</p>
                <p className="text-slate-500 text-sm mt-2">Veuillez vérifier le lien vidéo.</p>
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 border-t border-slate-700 text-center">
              <p className="text-slate-400 text-sm">UNIRANKS 2026 | National Academic Leaders</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}