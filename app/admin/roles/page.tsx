'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function RoleManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }
    
    const metadataRole = session.user.user_metadata?.role
    const { data: profile } = await supabase
      .from('clients')
      .select('client_type')
      .eq('id', session.user.id)
      .single()
    
    if (metadataRole !== 'admin' && profile?.client_type !== 'admin') {
      window.location.href = '/portal'
      return
    }
    
    setIsAdmin(true)
    fetchUsers()
  }

  async function fetchUsers() {
    const { data, error } = await supabase
      .from('clients')
      .select('id, email, full_name, client_type, client_number')
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
    
    // First update clients table
    const { error: clientError } = await supabase
      .from('clients')
      .update({ client_type: newRole })
      .eq('id', userId)

    if (clientError) {
      setMessage('Error: ' + clientError.message)
      setLoading(false)
      return
    }
    
    // Also try to update auth metadata if possible
    try {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { role: newRole } }
      )
      if (authError) console.log('Note: Could not update auth metadata', authError)
    } catch (e) {
      console.log('Note: Admin API requires service role key')
    }

    setMessage(`✓ User role updated to ${newRole}`)
    await fetchUsers()
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (!isAdmin) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Checking permissions...</div>
  }

  if (loading && users.length === 0) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading users...</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Role Management</h1>
          <p className="text-slate-400">Manage user roles and permissions</p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-4 ${message.includes('✓') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="bg-slate-800 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-slate-400">Name</th>
                  <th className="text-left py-3 text-slate-400">Email</th>
                  <th className="text-left py-3 text-slate-400">Client ID</th>
                  <th className="text-left py-3 text-slate-400">Current Role</th>
                  <th className="text-left py-3 text-slate-400">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700">
                    <td className="py-3 text-white">{user.full_name || '-'}</td>
                    <td className="py-3 text-slate-300">{user.email}</td>
                    <td className="py-3 text-slate-300">{user.client_number || '-'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.client_type === 'admin' ? 'bg-amber-500/20 text-amber-400' : 
                        user.client_type === 'staff' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.client_type || 'Individual'}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        defaultValue={user.client_type || 'Individual'}
                        className="px-2 py-1 bg-slate-700 rounded-lg text-sm text-white"
                      >
                        <option value="Individual">Individual</option>
                        <option value="Corporate">Corporate</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
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