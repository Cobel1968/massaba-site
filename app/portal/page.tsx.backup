'use client'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import { User, FileText, CreditCard, LogOut, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function PortalPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [transactions, setTransactions] = useState([])
  const [invoices, setInvoices] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      setUser(session?.user ?? null)
      await loadUserData(session.user.id)
    }
    setLoading(false)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) loadUserData(session.user.id)
    })

    return () => subscription.unsubscribe()
  }

  const loadUserData = async (userId) => {
    // Load profile
    const { data: profileData } = await supabase
      .from('clients')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(profileData)

    // Load service enrollments
    const { data: enrollmentsData } = await supabase
      .from('service_enrollments')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false })
    setEnrollments(enrollmentsData || [])

    // Load transactions
    const { data: transactionsData } = await supabase
      .from('transactions')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false })
      .limit(10)
    setTransactions(transactionsData || [])

    // Load invoices
    const { data: invoicesData } = await supabase
      .from('invoices')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false })
      .limit(10)
    setInvoices(invoicesData || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-20">
        <div className="max-w-md mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="bg-slate-800 rounded-xl p-8">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Client Portal</h1>
              <p className="text-slate-400">Please sign in to access your dashboard</p>
            </div>
            
            <div className="space-y-4">
              <a href="/login" className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-center py-3 rounded-lg transition">
                Sign In
              </a>
              <a href="/signup" className="block w-full bg-slate-700 hover:bg-slate-600 text-white text-center py-3 rounded-lg transition">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {profile?.full_name || user.email?.split('@')[0]}
                </h1>
                <p className="text-slate-400 text-sm">
                  Client ID: {profile?.client_number || 'Loading...'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold text-white">{enrollments.length}</span>
            </div>
            <p className="text-slate-400 text-sm">Active Services</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-white">
                AED {transactions.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}
              </span>
            </div>
            <p className="text-slate-400 text-sm">Total Paid</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-white">
                {invoices.filter(i => i.status === 'pending').length}
              </span>
            </div>
            <p className="text-slate-400 text-sm">Pending Invoices</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">
                {enrollments.filter(e => e.status === 'active').length}
              </span>
            </div>
            <p className="text-slate-400 text-sm">Active Enrollments</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800 mb-6">
          {['dashboard', 'services', 'transactions', 'invoices'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 capitalize transition"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Recent Services */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Services</h3>
              {enrollments.length === 0 ? (
                <p className="text-slate-400">No active services. Contact us to get started!</p>
              ) : (
                <div className="space-y-3">
                  {enrollments.slice(0, 3).map((enrollment) => (
                    <div key={enrollment.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{enrollment.service_type}</p>
                        <p className="text-slate-400 text-sm">
                          Enrolled: {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs">
                        {enrollment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
              {transactions.length === 0 ? (
                <p className="text-slate-400">No transactions yet.</p>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{tx.description || 'Payment'}</p>
                        <p className="text-slate-400 text-sm">
                          {new Date(tx.created_at).toLocaleDateString()} Ã¢â‚¬Â¢ {tx.payment_method}
                        </p>
                      </div>
                      <p className="text-green-400 font-bold">AED {tx.amount?.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Services</h3>
            {enrollments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">You haven't enrolled in any services yet.</p>
                <a href="/services" className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-2 rounded-lg transition">
                  Browse Services
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-white">{enrollment.service_type}</h4>
                      <span className="px-2 py-1 rounded-full text-xs">
                        {enrollment.status}
                      </span>
                    </div>
                    {enrollment.package_selected && (
                      <p className="text-slate-400 text-sm mb-2">Package: {enrollment.package_selected}</p>
                    )}
                    {enrollment.remaining_balance > 0 && (
                      <p className="text-amber-500 text-sm">Remaining: AED {enrollment.remaining_balance?.toFixed(2)}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
            {transactions.length === 0 ? (
              <p className="text-slate-400">No transactions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-slate-400">Date</th>
                      <th className="text-left py-2 text-slate-400">Description</th>
                      <th className="text-left py-2 text-slate-400">Method</th>
                      <th className="text-right py-2 text-slate-400">Amount</th>
                      <th className="text-right py-2 text-slate-400">VAT</th>
                     </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-700">
                        <td className="py-2 text-slate-300">{new Date(tx.created_at).toLocaleDateString()}</td>
                        <td className="py-2 text-slate-300">{tx.description || 'Payment'}</td>
                        <td className="py-2 text-slate-300">{tx.payment_method}</td>
                        <td className="py-2 text-slate-300 text-right">AED {tx.amount?.toFixed(2)}</td>
                        <td className="py-2 text-slate-300 text-right">AED {tx.vat_amount?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Invoices</h3>
            {invoices.length === 0 ? (
              <p className="text-slate-400">No invoices yet.</p>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-medium">{invoice.invoice_number}</p>
                        <p className="text-slate-400 text-sm">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">AED {invoice.total_amount?.toFixed(2)}</p>
                        <span className={	ext-xs }>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                    {invoice.status !== 'paid' && (
                      <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-1 rounded-lg text-sm transition">
                        Pay Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}