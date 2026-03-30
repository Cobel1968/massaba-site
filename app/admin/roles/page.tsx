'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { Shield, UserCog, Mail, Users, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function RoleAssignmentPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    checkSuperAdmin()
  }, [])

  async function checkSuperAdmin() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }
    
    const isSuperAdminUser = session.user.user_metadata?.is_super_admin === true || 
                            session.user.user_metadata?.role === 'super_admin'
    
    if (!isSuperAdminUser) {
      window.location.href = '/admin'
      return
    }
    
    setIsSuperAdmin(true)
    await fetchUsers()
  }

  async function fetchUsers() {
    setLoading(true)
    
    // Fetch users from auth (requires admin privileges)
    const { data, error } = await supabase.auth.admin.listUsers()
    
    if (error) {
      setMessage('Error fetching users: ' + error.message)
    } else {
      setUsers(data.users || [])
    }
    setLoading(false)
  }

  async function assignRole(userId: string, newRole: string) {
    setLoading(true)
    
    // Get current metadata
    const user = users.find(u => u.id === userId)
    const currentMetadata = user?.user_metadata || {}
    
    // Update user metadata with new role
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...currentMetadata,
        role: newRole,
        is_super_admin: newRole === 'super_admin'
      }
    })
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(` Role assigned to ${user?.email}: ${newRole.toUpperCase()}`)
      await fetchUsers()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  async function updateClientType(userId: string, clientType: string) {
    setLoading(true)
    
    const { error } = await supabase
      .from('clients')
      .update({ client_type: clientType })
      .eq('id', userId)
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(` Client type updated`)
      await fetchUsers()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const getRoleBadge = (role: string) => {
    if (role === 'super_admin') return <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">Super Admin</span>
    if (role === 'admin') return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">Admin</span>
    if (role === 'staff') return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Staff</span>
    return <span className="px-2 py-1 bg-slate-600 text-slate-300 rounded-full text-xs font-medium">User</span>
  }

  if (!isSuperAdmin) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Checking permissions...</div></div>
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Role & Permission Management</h1>
            <p className="text-slate-400">Assign system roles and client types to users</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchUsers} className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg">
              <RefreshCw size={18} /> Refresh
            </button>
            <Link href="/admin" className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg">
              Back to Admin
            </Link>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Users Table */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users size={20} /> All Users ({users.length})
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-slate-400">Email</th>
                  <th className="text-left py-3 text-slate-400">Name</th>
                  <th className="text-left py-3 text-slate-400">Current Role</th>
                  <th className="text-left py-3 text-slate-400">Assign Role</th>
                  <th className="text-left py-3 text-slate-400">Client Type</th>
                  <th className="text-left py-3 text-slate-400">Actions</th>
                </td>
              </thead>
              <tbody>
                {users.map((user) => {
                  const role = user.user_metadata?.role || 'user'
                  const isCurrentUser = user.email === 'admin@massaba.com'
                  
                  return (
                    <tr key={user.id} className="border-b border-slate-700">
                      <td className="py-3 text-slate-300">
                        {user.email}
                        {isCurrentUser && <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">You</span>}
                       </td>
                      <td className="py-3 text-white">{user.user_metadata?.full_name || '-'} </td>
                      <td className="py-3">{getRoleBadge(role)}</td>
                      <td className="py-3">
                        <select
                          onChange={(e) => assignRole(user.id, e.target.value)}
                          defaultValue={role}
                          disabled={isCurrentUser}
                          className="px-2 py-1 bg-slate-700 rounded-lg text-sm text-white disabled:opacity-50"
                        >
                          <option value="user">User</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                          <option value="super_admin" disabled={!isCurrentUser}>Super Admin</option>
                        </select>
                        {isCurrentUser && <span className="ml-2 text-xs text-slate-500">(Cannot change own role)</span>}
                      </td>
                      <td className="py-3">
                        <select
                          onChange={(e) => updateClientType(user.id, e.target.value)}
                          defaultValue={user.user_metadata?.client_type || 'Individual'}
                          className="px-2 py-1 bg-slate-700 rounded-lg text-sm text-white"
                        >
                          <option value="Individual">Individual</option>
                          <option value="Corporate">Corporate</option>
                          <option value="premium">Premium</option>
                          <option value="vip">VIP</option>
                          <option value="standard">Standard</option>
                        </select>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (confirm(`Reset password for ${user.email}? They will receive an email.`)) {
                                supabase.auth.admin.resetPasswordByEmail(user.email)
                                setMessage(` Password reset email sent to ${user.email}`)
                                setTimeout(() => setMessage(''), 3000)
                              }
                            }}
                            className="text-amber-400 hover:text-amber-300 text-sm"
                          >
                            Reset Password
                          </button>
                        </div>
                      </td>
                     </tr>
                  )
                })}
              </tbody>
             </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Role Hierarchy</h3>
          <div className="text-sm text-slate-400 space-y-1">
            <p><span className="text-amber-400">Super Admin</span> - Full system access, can assign all roles</p>
            <p><span className="text-purple-400">Admin</span> - Can access admin dashboard, manage clients</p>
            <p><span className="text-green-400">Staff</span> - Limited access, can view but not modify</p>
            <p><span className="text-blue-400">User</span> - Regular client portal access only</p>
          </div>
        </div>
      </div>
    </div>
  )
}