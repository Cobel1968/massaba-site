'use client'

import { useState } from 'react'

export default function EnrollPage() {
  const [formData, setFormData] = useState({
    tabletId: '',
    vehicleId: '',
    driverName: '',
    phone: '',
    route: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store in localStorage for demo
    localStorage.setItem('rita_tablet', JSON.stringify(formData))
    setSubmitted(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-green-500/20 text-green-400 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-2">✅ Tablette enregistré !</h2>
          <p>Redirection en cours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-amber-500/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-500">RITA Services</h1>
          <p className="text-slate-400">Enregistrement du tablette</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-1">ID du Tablette</label>
            <input
              type="text"
              name="tabletId"
              value={formData.tabletId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              placeholder="Ex: RITA-001"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Immatriculation</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              placeholder="Ex: 123 AB 01"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Nom du chauffeur</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              placeholder="Nom complet"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              placeholder="+225 XX XX XX XX"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Itinéraire</label>
            <select
              name="route"
              value={formData.route}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
            >
              <option value="">Sélectionner</option>
              <option>Yopougon ↔ Plateau</option>
              <option>Abobo ↔ Plateau</option>
              <option>Cocody ↔ Plateau</option>
              <option>Treichville ↔ Plateau</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg transition"
          >
            ✅ Enregistrer le tablette
          </button>
        </form>

        <div className="mt-6 text-center text-slate-500 text-xs">
          🔒 Enregistrement sécurisé<br />
          📧 support@rita.services | 📞 +225 55 00 78 84
        </div>
      </div>
    </div>
  )
}
