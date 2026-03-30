'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, Plus, Trash2, Edit, UserPlus } from 'lucide-react'

export default function AdminPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newClient, setNewClient] = useState({ full_name: '', email: '', phone: '', client_type: 'Individual' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchClients()
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) window.location.href = '/login'
    
    // Check if user is admin
    const { data: profile } = await supabase
      .from('clients')
      .select('client_type')
      .eq('id', session.user.id)
      .single()
    
    if (profile?.client_type !== 'admin') window.location.href = '/portal'
  }

  async function fetchClients() {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setClients(data)
    setLoading(false)
  }

  async function addClient(e) {
    e.preventDefault()
    setLoading(true)
    
    // Create auth user first
    const tempPassword = Math.random().toString(36).slice(-8) + '!Aa'
    
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: newClient.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { full_name: newClient.full_name }
    })
    
    if (authError) {
      setMessage('Error creating user: ' + authError.message)
      setLoading(false)
      return
    }
    
    // Add to clients table
    const { error } = await supabase.from('clients').insert([{
      id: authUser.user.id,
      full_name: newClient.full_name,
      email: newClient.email,
      phone: newClient.phone,
      client_type: newClient.client_type
    }])
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(` Client added! Temporary password: ${tempPassword}`)
      setShowAddForm(false)
      setNewClient({ full_name: '', email: '', phone: '', client_type: 'Individual' })
      fetchClients()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 5000)
  }

  if (loading && clients.length === 0) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold"
          >
            <UserPlus size={18} /> Add Client
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Add Client Form */}
        {showAddForm && (
          <div className="bg-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Client</h2>
            <form onSubmit={addClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newClient.full_name}
                    onChange={(e) => setNewClient({...newClient, full_name: e.target.value})}
                    required
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    required
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Client Type</label>
                  <select
                    value={newClient.client_type}
                    onChange={(e) => setNewClient({...newClient, client_type: e.target.value})}
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-bold">Create Client</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="bg-slate-700 text-white px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Clients List */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">All Clients ({clients.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Phone</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Client ID</th>
                 </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id} className="border-b border-slate-700">
                    <td className="py-2 text-white">{client.full_name}</td>
                    <td className="py-2 text-slate-300">{client.email}</td>
                    <td className="py-2 text-slate-300">{client.phone || '-'}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${client.client_type === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {client.client_type || 'Individual'}
                      </span>
                     </td>
                    <td className="py-2 text-slate-300">{client.client_number || '-'} </td>
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