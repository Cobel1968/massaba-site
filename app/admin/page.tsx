'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { LogOut, Settings, Users, Briefcase, DollarSign, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import POSSystem from '../../components/POSSystem'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setUser(session.user)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-amber-500" />
              <h1 className="text-xl font-bold text-white">Massaba Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-300 text-sm">{user?.email}</span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
              >
                <LogOut className="w-4 h-4 inline mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Big Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`p-6 rounded-xl text-center transition ${
                activeSection === 'dashboard' 
                  ? 'bg-amber-500 text-slate-900 shadow-lg' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              <Users className="w-8 h-8 mx-auto mb-2" />
              <span className="font-semibold">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection('clients')}
              className={`p-6 rounded-xl text-center transition ${
                activeSection === 'clients' 
                  ? 'bg-amber-500 text-slate-900 shadow-lg' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              <Users className="w-8 h-8 mx-auto mb-2" />
              <span className="font-semibold">Clients</span>
            </button>
            <button
              onClick={() => setActiveSection('pos')}
              className={`p-6 rounded-xl text-center transition ${
                activeSection === 'pos' 
                  ? 'bg-amber-500 text-slate-900 shadow-lg' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-3xl mx-auto mb-2 block"></span>
              <span className="font-semibold">POS System</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-slate-800 rounded-xl p-6 min-h-[500px]">
            {activeSection === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Welcome to Admin Dashboard</h2>
                <p className="text-slate-300 mb-6">Select an option above to manage your business.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-slate-400 text-sm">Total Clients</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                    <Briefcase className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-slate-400 text-sm">Active Services</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                    <DollarSign className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">AED 0</div>
                    <p className="text-slate-400 text-sm">Total Revenue</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'clients' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Client Management</h2>
                <p className="text-slate-300">Client list and management coming soon.</p>
              </div>
            )}

            {activeSection === 'pos' && <POSSystem />}
          </div>
        </div>
      </div>
    </div>
  )
}