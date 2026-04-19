'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [registration, setRegistration] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('rita_tablet')
    if (data) {
      setRegistration(JSON.parse(data))
    }
  }, [])

  if (!registration) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Aucun tablette enregistré</p>
          <a href="/enroll" className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-bold">
            Enregistrer un tablette
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-8 border border-amber-500/20">
          <h1 className="text-3xl font-bold text-amber-500 mb-6">📱 Dashboard</h1>
          
          <div className="bg-green-500/20 text-green-400 p-4 rounded-xl mb-6">
            ✅ Tablette enregistré avec succès !
          </div>
          
          <div className="space-y-3 bg-slate-700/30 p-6 rounded-xl">
            <p><span className="text-slate-400">ID Tablette:</span> <span className="text-white font-medium">{registration.tabletId}</span></p>
            <p><span className="text-slate-400">Véhicule:</span> <span className="text-white font-medium">{registration.vehicleId}</span></p>
            <p><span className="text-slate-400">Chauffeur:</span> <span className="text-white font-medium">{registration.driverName}</span></p>
            <p><span className="text-slate-400">Téléphone:</span> <span className="text-white font-medium">{registration.phone}</span></p>
            <p><span className="text-slate-400">Itinéraire:</span> <span className="text-white font-medium">{registration.route || 'Non spécifié'}</span></p>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-amber-500 text-sm">📱 Le tablette est prêt à diffuser les publicités</p>
            <a href="/enroll" className="inline-block mt-4 text-slate-400 hover:text-amber-500 text-sm">
              🔄 Nouvel enregistrement
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
