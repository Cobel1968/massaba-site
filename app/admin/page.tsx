'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, LogOut, Shield, UserPlus, RefreshCw, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])
  const [systemUsers, setSystemUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    client_type: 'Individual',
    password: ''
  })
  const [roleFormData, setRoleFormData] = useState({
    role: 'user'
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
      
      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSystemUsers(data.users || [])
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
        setMessage('Error: ' + error.error)
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 5000)
  }

  async function updateRole(userId, newRole) {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      
      const response = await fetch('/api/admin/users/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          role: newRole
        })
      })
      
      if (response.ok) {
        setMessage(` Role updated to ${newRole.toUpperCase()}`)
        await loadSystemUsers()
      } else {
        const error = await response.json()
        setMessage('Error: ' + error.error)
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
    setShowRoleModal(false)
  }

  function getRoleBadge(role) {
    const roleName = role || 'user'
    if (roleName === 'super_admin') return <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">Super Admin</span>
    if (roleName === 'admin') return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">Admin</span>
    if (roleName === 'staff') return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Staff</span>
    return <span className="px-2 py-1 bg-slate-600 text-slate-300 rounded-full text-xs font-medium">User</span>
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
          <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg">
            <LogOut size={18} /> Logout
          </button>
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
            
            {/* System Users Table with Role Management */}
            {systemUsers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">System Users & Roles ({systemUsers.length})</h3>
                <div className="bg-slate-700/50 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 px-3 text-slate-400">Email</th>
                        <th className="text-left py-2 px-3 text-slate-400">Name</th>
                        <th className="text-left py-2 px-3 text-slate-400">Current Role</th>
                        <th className="text-left py-2 px-3 text-slate-400">Action</th>
                       </tr>
                    </thead>
                    <tbody>
                      {systemUsers.map((u) => {
                        const role = u.user_metadata?.role || 'user'
                        const isCurrentUser = u.email === user?.email
                        
                        return (
                          <tr key={u.id} className="border-b border-slate-600">
                            <td className="py-2 px-3 text-slate-300">
                              {u.email}
                              {isCurrentUser && <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">You</span>}
                            </td>
                            <td className="py-2 px-3 text-white">{u.user_metadata?.full_name || '-'}</td>
                            <td className="py-2 px-3">{getRoleBadge(role)}</td>
                            <td className="py-2 px-3">
                              {!isCurrentUser && (
                                <button
                                  onClick={() => {
                                    setSelectedUser(u)
                                    setRoleFormData({ role: role })
                                    setShowRoleModal(true)
                                  }}
                                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30"
                                >
                                  Change Role
                                </button>
                              )}
                              {isCurrentUser && <span className="text-slate-500 text-xs">(Cannot change own role)</span>}
                            </td>
                          </tr>
                        )
                      })}
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

        {/* Role Assignment Modal */}
        {showRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Assign Role</h2>
              <p className="text-slate-400 mb-4">User: <span className="text-white">{selectedUser.email}</span></p>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1">Select Role</label>
                  <select
                    value={roleFormData.role}
                    onChange={(e) => setRoleFormData({ role: e.target.value })}
                    className="w-full p-2 bg-slate-700 rounded-lg text-white"
                  >
                    <option value="user">User (Regular client access)</option>
                    <option value="staff">Staff (Limited admin access)</option>
                    <option value="admin">Admin (Full admin access)</option>
                    <option value="super_admin">Super Admin (All permissions)</option>
                  </select>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <p className="text-xs text-slate-400">Role Permissions:</p>
                  <ul className="text-xs text-slate-300 mt-1 space-y-1">
                    <li> <span className="text-amber-400">Super Admin</span>: Full system access, can assign roles</li>
                    <li> <span className="text-purple-400">Admin</span>: Can access admin dashboard, manage clients</li>
                    <li> <span className="text-green-400">Staff</span>: Limited access, can view but not modify</li>
                    <li> <span className="text-blue-400">User</span>: Regular client portal access only</li>
                  </ul>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => updateRole(selectedUser.id, roleFormData.role)}
                    className="flex-1 bg-amber-500 text-slate-900 py-2 rounded-lg font-bold"
                  >
                    Assign Role
                  </button>
                  <button
                    onClick={() => setShowRoleModal(false)}
                    className="flex-1 bg-slate-700 text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
                  <th className="text-left py-3 text-slate-400">Client ID</th>
                 </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-700">
                    <td className="py-3 text-white">{client.full_name || '-'}</td>
                    <td className="py-3 text-slate-300">{client.email}</td>
                    <td className="py-3 text-slate-300">{client.phone || '-'}</td>
                    <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">{client.client_type || 'Individual'}</span></td>
                    <td className="py-3 text-slate-300">{client.client_number || '-'}</td>
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