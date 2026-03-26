'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Users, Briefcase, CreditCard, FileText, 
  TrendingUp, Settings, LogOut, Bell, 
  Calendar, DollarSign, CheckCircle, Clock,
  Download, Search, Filter, Plus, Eye
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalClients: 0,
    activeServices: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    monthlyRevenue: 0,
    pendingInquiries: 0
  })
  const [recentTransactions, setRecentTransactions] = useState([])
  const [recentClients, setRecentClients] = useState([])
  const [pendingInquiries, setPendingInquiries] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
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

    // Check if user is admin (you can set this in user metadata or a separate admin table)
    const isAdmin = session.user.email === 'admin@massaba.com' || 
                    session.user.user_metadata?.role === 'admin'
    
    if (!isAdmin) {
      router.push('/portal')
      return
    }

    setUser(session.user)
    await loadDashboardData()
    setLoading(false)
  }

  const loadDashboardData = async () => {
    // Get total clients
    const { count: clientCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
    setStats(prev => ({ ...prev, totalClients: clientCount || 0 }))

    // Get active services
    const { count: serviceCount } = await supabase
      .from('service_enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    setStats(prev => ({ ...prev, activeServices: serviceCount || 0 }))

    // Get total revenue
    const { data: revenueData } = await supabase
      .from('transactions')
      .select('amount')
      .eq('status', 'completed')
    const totalRevenue = revenueData?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0
    setStats(prev => ({ ...prev, totalRevenue }))

    // Get pending invoices
    const { count: invoiceCount } = await supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
    setStats(prev => ({ ...prev, pendingInvoices: invoiceCount || 0 }))

    // Get monthly revenue (current month)
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const { data: monthlyData } = await supabase
      .from('transactions')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString())
    const monthlyRevenue = monthlyData?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0
    setStats(prev => ({ ...prev, monthlyRevenue }))

    // Get pending inquiries
    const { count: inquiryCount } = await supabase
      .from('contact_inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new')
    setStats(prev => ({ ...prev, pendingInquiries: inquiryCount || 0 }))

    // Get recent transactions
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*, clients(full_name, client_number)')
      .order('created_at', { ascending: false })
      .limit(10)
    setRecentTransactions(transactions || [])

    // Get recent clients
    const { data: clients } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    setRecentClients(clients || [])

    // Get pending inquiries
    const { data: inquiries } = await supabase
      .from('contact_inquiries')
      .select('*')
      .eq('status', 'new')
      .order('created_at', { ascending: false })
      .limit(5)
    setPendingInquiries(inquiries || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Admin Header */}
      <nav className="fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-white font-bold">Admin Dashboard</span>
              <span className="text-slate-500 text-sm">| Massaba Consulting</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{user?.email}</p>
                  <p className="text-slate-500 text-xs">Super Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-slate-800 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-6 mb-8 border border-amber-500/20">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Admin</h1>
            <p className="text-slate-400">Here's what's happening with your business today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">{stats.totalClients}</span>
              </div>
              <p className="text-slate-400 text-sm">Total Clients</p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-white">{stats.activeServices}</span>
              </div>
              <p className="text-slate-400 text-sm">Active Services</p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-amber-500" />
                <span className="text-2xl font-bold text-white">AED {stats.totalRevenue.toLocaleString()}</span>
              </div>
              <p className="text-slate-400 text-sm">Total Revenue</p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-red-500" />
                <span className="text-2xl font-bold text-white">{stats.pendingInvoices}</span>
              </div>
              <p className="text-slate-400 text-sm">Pending Invoices</p>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Monthly Revenue</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-white">AED {stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-slate-500 text-sm mt-2">This month</p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Pending Inquiries</h3>
                <MessageSquare className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.pendingInquiries}</p>
              <p className="text-slate-500 text-sm mt-2">Awaiting response</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-slate-800 mb-6">
            {['overview', 'clients', 'transactions', 'invoices', 'inquiries'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={px-4 py-2 capitalize transition }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Recent Transactions</h3>
                  <button className="text-amber-500 text-sm hover:text-amber-400">View All</button>
                </div>
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white text-sm font-medium">{tx.clients?.full_name || 'N/A'}</p>
                        <p className="text-slate-400 text-xs">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                      <p className="text-green-400 font-bold">AED {tx.amount?.toFixed(2)}</p>
                    </div>
                  ))}
                  {recentTransactions.length === 0 && (
                    <p className="text-slate-400 text-center py-4">No transactions yet</p>
                  )}
                </div>
              </div>

              {/* Recent Clients */}
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">New Clients</h3>
                  <button className="text-amber-500 text-sm hover:text-amber-400">View All</button>
                </div>
                <div className="space-y-3">
                  {recentClients.map((client) => (
                    <div key={client.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white text-sm font-medium">{client.full_name}</p>
                        <p className="text-slate-400 text-xs">{client.client_number}</p>
                      </div>
                      <p className="text-slate-400 text-xs">{new Date(client.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                  {recentClients.length === 0 && (
                    <p className="text-slate-400 text-center py-4">No clients yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-semibold">All Clients</h3>
                <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">
                  <Plus size={16} /> Add Client
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Client ID</th>
                      <th className="text-left py-3 text-slate-400">Name</th>
                      <th className="text-left py-3 text-slate-400">Email</th>
                      <th className="text-left py-3 text-slate-400">Phone</th>
                      <th className="text-left py-3 text-slate-400">Joined</th>
                      <th className="text-right py-3 text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentClients.map((client) => (
                      <tr key={client.id} className="border-b border-slate-700">
                        <td className="py-3 text-slate-300">{client.client_number}</td>
                        <td className="py-3 text-white">{client.full_name}</td>
                        <td className="py-3 text-slate-300">{client.email}</td>
                        <td className="py-3 text-slate-300">{client.phone || '-'}</td>
                        <td className="py-3 text-slate-300">{new Date(client.created_at).toLocaleDateString()}</td>
                        <td className="py-3 text-right">
                          <button className="text-amber-500 hover:text-amber-400">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Date</th>
                      <th className="text-left py-3 text-slate-400">Transaction ID</th>
                      <th className="text-left py-3 text-slate-400">Client</th>
                      <th className="text-left py-3 text-slate-400">Method</th>
                      <th className="text-right py-3 text-slate-400">Amount</th>
                      <th className="text-right py-3 text-slate-400">VAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-700">
                        <td className="py-3 text-slate-300">{new Date(tx.created_at).toLocaleDateString()}</td>
                        <td className="py-3 text-slate-300 text-sm">{tx.transaction_number?.slice(-8)}</td>
                        <td className="py-3 text-white">{tx.clients?.full_name || 'N/A'}</td>
                        <td className="py-3 text-slate-300">{tx.payment_method}</td>
                        <td className="py-3 text-green-400 text-right">AED {tx.amount?.toFixed(2)}</td>
                        <td className="py-3 text-slate-300 text-right">AED {tx.vat_amount?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Pending Inquiries</h3>
              <div className="space-y-4">
                {pendingInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-medium">{inquiry.name}</p>
                        <p className="text-slate-400 text-sm">{inquiry.email} • {inquiry.phone || 'No phone'}</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                        New
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">{inquiry.message}</p>
                    <div className="flex gap-2">
                      <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-lg text-sm transition">
                        Mark as Read
                      </button>
                      <button className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-3 py-1 rounded-lg text-sm transition">
                        Respond
                      </button>
                    </div>
                  </div>
                ))}
                {pendingInquiries.length === 0 && (
                  <p className="text-slate-400 text-center py-8">No pending inquiries</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}