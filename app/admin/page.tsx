'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, Plus, Trash2, Edit, UserPlus, DollarSign, FileText, CreditCard, LogOut, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

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
    
    const userRole = session.user.user_metadata?.role
    const isSuperAdminUser = session.user.user_metadata?.is_super_admin === true || userRole === 'super_admin'
    
    setIsSuperAdmin(isSuperAdminUser)
    
    if (!isSuperAdminUser && userRole !== 'admin') {
      window.location.href = '/portal'
      return
    }
    
    await loadClients()
  }

  async function loadClients() {
    setLoading(true)
    
    // Fetch all clients with complete data
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error loading clients:', error)
      setMessage('Error loading clients: ' + error.message)
    } else {
      setClients(data || [])
    }
    setLoading(false)
  }

  async function syncUserData() {
    setLoading(true)
    setMessage('Syncing user data...')
    
    // Sync auth.users to clients table
    const { error } = await supabase.rpc('sync_auth_users_to_clients')
    
    if (error) {
      setMessage('Sync error: ' + error.message)
    } else {
      setMessage('✓ Sync completed successfully')
      await loadClients()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading && clients.length === 0) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">
              Welcome back, {user?.user_metadata?.full_name || user?.email}
              {isSuperAdmin && <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">Super Admin</span>}
            </p>
          </div>
          <div className="flex gap-3">
            {isSuperAdmin && (
              <Link href="/admin/roles" className="flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition">
                <Shield size={18} /> Role Management
              </Link>
            )}
            <button onClick={syncUserData} className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition">
              <Users size={18} /> Sync Users
            </button>
            <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('✓') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Clients Table */}
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">All Clients ({clients.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-slate-400">Name</th>
                  <th className="text-left py-3 text-slate-400">Email</th>
                  <th className="text-left py-3 text-slate-400">Phone</th>
                  <th className="text-left py-3 text-slate-400">Client Type</th>
                  <th className="text-left py-3 text-slate-400">Client ID</th>
                  <th className="text-left py-3 text-slate-400">Joined</th>
                 </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id} className="border-b border-slate-700">
                    <td className="py-3 text-white font-medium">{client.full_name || '-'} </td>
                    <td className="py-3 text-slate-300">{client.email} </td>
                    <td className="py-3 text-slate-300">{client.phone || '-'} </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.client_type === 'admin' ? 'bg-amber-500/20 text-amber-400' : 
                        client.client_type === 'premium' ? 'bg-purple-500/20 text-purple-400' : 
                        client.client_type === 'vip' ? 'bg-amber-500/20 text-amber-400' :
                        client.client_type === 'Corporate' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {client.client_type || 'Individual'}
                      </span>
                     </td>
                    <td className="py-3 text-slate-300">{client.client_number || '-'} </td>
                    <td className="py-3 text-slate-300">{client.created_at ? new Date(client.created_at).toLocaleDateString() : '-'} </td>
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