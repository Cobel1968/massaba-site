'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, LogOut, Shield, UserPlus, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])
  const [systemUsers, setSystemUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    client_type: 'Individual',
    password: ''
  })

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      window.location.href = '/login'
      return
    }
    
    setUser(session.user)
    
    const isSuper = session.user.user_metadata?.is_super_admin === true || 
                   session.user.user_metadata?.role === 'super_admin'
    
    setIsSuperAdmin(isSuper)
    
    await loadClients()
    
    if (isSuper) {
      await loadSystemUsers()
    }
    
    setLoading(false)
  }

  async function loadClients() {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (data) setClients(data)
  }

  async function loadSystemUsers() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      
      if (!token) return
      
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSystemUsers(data.users || [])
      } else {
        console.error('Failed to load users:', await response.text())
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  async function handleCreateUser(e) {
    e.preventDefault()
    setLoading(true)
    
    const tempPassword = formData.password || Math.random().toString(36).slice(-8) + '!Aa'
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: formData.email,
          password: tempPassword,
          full_name: formData.full_name,
          phone: formData.phone,
          client_type: formData.client_type
        })
      })
      
      if (response.ok) {
        setMessage(` User created! Temporary password: ${tempPassword}`)
        setShowAddModal(false)
        setFormData({ full_name: '', email: '', phone: '', client_type: 'Individual', password: '' })
        await loadClients()
        await loadSystemUsers()
      } else {
        const error = await response.json()
        setMessage('Error: ' + (error.error || 'Unknown error'))
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 5000)
  }

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">
              Welcome, {user?.user_metadata?.full_name || user?.email}
              {isSuperAdmin && <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">Super Admin</span>}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { loadClients(); loadSystemUsers(); }} className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg">
              <RefreshCw size={18} /> Refresh
            </button>
            <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Super Admin Tools */}
        {isSuperAdmin && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield size={20} /> Super Admin Tools
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold"
              >
                <UserPlus size={18} /> Create New User
              </button>
            </div>
            
            {systemUsers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">System Users ({systemUsers.length})</h3>
                <div className="bg-slate-700/50 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 px-3 text-slate-400">Email</th>
                        <th className="text-left py-2 px-3 text-slate-400">Role</th>
                        <th className="text-left py-2 px-3 text-slate-400">Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemUsers.map((u) => (
                        <tr key={u.id} className="border-b border-slate-600">
                          <td className="py-2 px-3 text-slate-300">{u.email}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              u.user_metadata?.role === 'super_admin' ? 'bg-amber-500/20 text-amber-400' :
                              u.user_metadata?.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-slate-500/20 text-slate-400'
                            }`}>
                              {u.user_metadata?.role || 'user'}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-300">{u.user_metadata?.full_name || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Create New User</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1">Full Name *</label>
                  <input type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required className="w-full p-2 bg-slate-700 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full p-2 bg-slate-700 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-2 bg-slate-700 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Password (leave empty for auto-generated)</label>
                  <input type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-2 bg-slate-700 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Client Type</label>
                  <select value={formData.client_type} onChange={(e) => setFormData({...formData, client_type: e.target.value})} className="w-full p-2 bg-slate-700 rounded-lg text-white">
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-amber-500 text-slate-900 py-2 rounded-lg font-bold">Create User</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-700 text-white py-2 rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Clients Table */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">All Clients ({clients.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-slate-400">Name</th>
                  <th className="text-left py-3 text-slate-400">Email</th>
                  <th className="text-left py-3 text-slate-400">Phone</th>
                  <th className="text-left py-3 text-slate-400">Type</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-700">
                    <td className="py-3 text-white">{client.full_name || '-'} </td>
                    <td className="py-3 text-slate-300">{client.email} </td>
                    <td className="py-3 text-slate-300">{client.phone || '-'} </td>
                    <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">{client.client_type || 'Individual'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}