'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, Plus, Trash2, Edit, UserPlus, DollarSign, FileText, CreditCard, LogOut, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])
  const [transactions, setTransactions] = useState([])
  const [charges, setCharges] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('clients')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [message, setMessage] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    client_type: 'Individual'
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
    
    // Check both sources for admin role
    const metadataRole = session.user.user_metadata?.role
    const { data: profile } = await supabase
      .from('clients')
      .select('client_type')
      .eq('id', session.user.id)
      .single()
    
    const isUserAdmin = metadataRole === 'admin' || profile?.client_type === 'admin'
    
    if (!isUserAdmin) {
      window.location.href = '/portal'
      return
    }
    
    setIsAdmin(true)
    await loadData()
  }

  async function loadData() {
    setLoading(true)
    
    const { data: clientsData } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    if (clientsData) setClients(clientsData)
    
    const { data: transactionsData } = await supabase
      .from('transactions')
      .select('*, clients(full_name, client_number)')
      .order('created_at', { ascending: false })
      .limit(50)
    if (transactionsData) setTransactions(transactionsData)
    
    const { data: chargesData } = await supabase
      .from('service_charges')
      .select('*, clients(full_name, client_number)')
      .order('created_at', { ascending: false })
      .limit(50)
    if (chargesData) setCharges(chargesData)
    
    setLoading(false)
  }

  async function handleCreateClient(e) {
    e.preventDefault()
    setLoading(true)
    
    const tempPassword = Math.random().toString(36).slice(-8) + '!Aa'
    
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: formData.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { 
        full_name: formData.full_name,
        role: formData.client_type === 'admin' ? 'admin' : 'user'
      }
    })
    
    if (authError) {
      setMessage('Error: ' + authError.message)
      setLoading(false)
      return
    }
    
    setMessage(` Client created! Temporary password: ${tempPassword}`)
    setShowAddModal(false)
    setFormData({ full_name: '', email: '', phone: '', client_type: 'Individual' })
    await loadData()
    
    setTimeout(() => setMessage(''), 5000)
    setLoading(false)
  }

  async function handleUpdateClient() {
    setLoading(true)
    
    const { error } = await supabase
      .from('clients')
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        client_type: formData.client_type
      })
      .eq('id', editingClient.id)
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(' Client updated successfully!')
      setEditingClient(null)
      await loadData()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleDeleteClient(clientId) {
    if (!confirm('Are you sure you want to delete this client?')) return
    
    setLoading(true)
    
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId)
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(' Client deleted successfully!')
      await loadData()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  const totalPending = charges.filter(c => c.status === 'pending').reduce((sum, c) => sum + (c.total_amount || 0), 0)
  const totalPaid = charges.filter(c => c.status === 'paid').reduce((sum, c) => sum + (c.total_amount || 0), 0)

  if (!isAdmin) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Checking permissions...</div></div>
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
            <p className="text-slate-400">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
          </div>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4">
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-white">{clients.length}</p>
            <p className="text-slate-400 text-sm">Total Clients</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <DollarSign className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-white">AED {totalRevenue.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Total Revenue</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <CreditCard className="w-6 h-6 text-yellow-500 mb-2" />
            <p className="text-2xl font-bold text-yellow-400">AED {totalPending.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Pending Payments</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <FileText className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-green-400">AED {totalPaid.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Total Paid</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800 mb-6">
          {['clients', 'transactions', 'charges'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize font-medium transition ${
                activeTab === tab ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-400'
              }`}
            >
              {tab === 'clients' ? ' Clients' : tab === 'transactions' ? ' Transactions' : ' Service Charges'}
            </button>
          ))}
        </div>

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">All Clients</h2>
              <button
                onClick={() => { setShowAddModal(true); setEditingClient(null); setFormData({ full_name: '', email: '', phone: '', client_type: 'Individual' }) }}
                className="flex items-center gap-2 bg-amber-500 text-slate-900 px-3 py-1 rounded-lg text-sm font-bold"
              >
                <Plus size={16} /> Add Client
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 text-slate-400">Name</th>
                    <th className="text-left py-3 text-slate-400">Email</th>
                    <th className="text-left py-3 text-slate-400">Phone</th>
                    <th className="text-left py-3 text-slate-400">Type</th>
                    <th className="text-left py-3 text-slate-400">Client ID</th>
                    <th className="text-center py-3 text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id} className="border-b border-slate-700">
                      <td className="py-3 text-white">{client.full_name}</td>
                      <td className="py-3 text-slate-300">{client.email}</td>
                      <td className="py-3 text-slate-300">{client.phone || '-'}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${client.client_type === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {client.client_type || 'Individual'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300">{client.client_number || '-'}</td>
                      <td className="py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => { setEditingClient(client); setFormData({ full_name: client.full_name, email: client.email, phone: client.phone || '', client_type: client.client_type || 'Individual' }) }}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </td>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No transactions yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Client</th>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id} className="border-b border-slate-700">
                        <td className="py-2 text-slate-300">{new Date(tx.created_at).toLocaleDateString()}</td>
                        <td className="py-2 text-white">{tx.clients?.full_name || 'N/A'}</td>
                        <td className="py-2 text-slate-300">{tx.description || '-'}</td>
                        <td className="py-2 text-green-400 text-right font-bold">AED {tx.amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Service Charges Tab */}
        {activeTab === 'charges' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Service Charges</h2>
            {charges.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No service charges yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Client</th>
                      <th className="text-left py-2">Service</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charges.map(charge => (
                      <tr key={charge.id} className="border-b border-slate-700">
                        <td className="py-2 text-slate-300">{new Date(charge.created_at).toLocaleDateString()}</td>
                        <td className="py-2 text-white">{charge.clients?.full_name || 'N/A'}</td>
                        <td className="py-2 text-slate-300">{charge.service_type} - {charge.package_name}</td>
                        <td className="py-2 text-amber-400 text-right font-bold">AED {charge.total_amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {(showAddModal || editingClient) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h2>
              <form onSubmit={editingClient ? handleUpdateClient : handleCreateClient} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    required
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={!!editingClient}
                    className="w-full p-2 bg-slate-700 rounded-lg text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Client Type</label>
                  <select
                    value={formData.client_type}
                    onChange={(e) => setFormData({...formData, client_type: e.target.value})}
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-amber-500 text-slate-900 py-2 rounded-lg font-bold">
                    {editingClient ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingClient(null) }}
                    className="flex-1 bg-slate-700 text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}