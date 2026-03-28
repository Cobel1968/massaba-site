'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import POSSystem from '../../components/POSSystem'

export default function MinimalAdmin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPOS, setShowPOS] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <h1 className="text-2xl">Please login first</h1>
        <a href="/login" className="text-amber-500">Go to Login</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg"
          >
            Logout
          </button>
        </div>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowPOS(false)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              !showPOS ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setShowPOS(true)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              showPOS ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-white'
            }`}
          >
             POS System
          </button>
        </div>
        
        {showPOS ? (
          <POSSystem />
        ) : (
          <div className="bg-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user?.email}</h2>
            <p className="text-slate-300">Click the POS System button to record payments.</p>
          </div>
        )}
      </div>
    </div>
  )
}