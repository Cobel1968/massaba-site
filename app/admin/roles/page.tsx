'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function RoleManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  async function updateRole(userId, newRole) {
    setLoading(true)
    
    // Update user metadata
    const { error } = await supabase.auth.admin.updateUserById(
      userId,
      { user_metadata: { role: newRole } }
    )

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(`✓ User role updated to ${newRole}`)
      await fetchUsers()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading && users.length === 0) {
    return <div className="text-white">Loading users...</div>
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">User Role Management</h2>
      
      {message && (
        <div className={`p-3 rounded-lg mb-4 ${message.includes('✓') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400">Email</th>
              <th className="text-left py-3 text-slate-400">Name</th>
              <th className="text-left py-3 text-slate-400">Current Role</th>
              <th className="text-left py-3 text-slate-400">Change Role</th>
             </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-700">
                <td className="py-3 text-slate-300">{user.email}</td>
                <td className="py-3 text-white">{user.full_name || '-'}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 
                    user.client_type === 'admin' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.role || user.client_type || 'user'}
                  </span>
                </td>
                <td className="py-3">
                  <select
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    defaultValue={user.role || user.client_type || 'user'}
                    className="px-2 py-1 bg-slate-700 rounded-lg text-sm text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}