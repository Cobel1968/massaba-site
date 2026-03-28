'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'
import {
  Users, Briefcase, CreditCard, FileText,
  TrendingUp, Settings, LogOut, Bell,
  Calendar, DollarSign, CheckCircle, Clock,
  Download, Search, Filter, Plus, Eye
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import POSSystem from '../../components/POSSystem'

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
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
    const { count: clientCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
    setStats(prev => ({ ...prev, totalClients: clientCount || 0 }))

    const { count: serviceCount } = await supabase
      .from('service_enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    setStats(prev => ({ ...prev, activeServices: serviceCount || 0 }))

    const { data: revenueData } = await supabase
      .from('transactions')
      .select('amount')
      .eq('status', 'completed')
    const totalRevenue = revenueData?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0
    setStats(prev => ({ ...prev, totalRevenue }))

    const { count: invoiceCount } = await supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
    setStats(prev => ({ ...prev, pendingInvoices: invoiceCount || 0 }))

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

    const { count: inquiryCount } = await supabase
      .from('contact_inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new')
    setStats(prev => ({ ...prev, pendingInquiries: inquiryCount || 0 }))

    const { data: transactions } = await supabase
      .from('transactions')
      .select('*, clients(full_name, client_number)')
      .order('created_at', { ascending: false })
      .limit(10)
    setRecentTransactions(transactions || [])

    const { data: clients } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    setRecentClients(clients || [])

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

  // Define tabs including POS
  const tabs = ['overview', 'clients', 'transactions', 'invoices', 'inquiries', 'pos']

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
                <button onClick={handleLogout} className="p-2 hover:bg-slate-800 rounded-lg transition">
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

          {/* Stats Grid - Only show on overview tab */}
          {activeTab === 'overview' && (
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
          )}

          {/* Tabs - Fixed display */}
          <div className="flex gap-2 md:gap-4 border-b border-slate-800 mb-6 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 md:px-4 py-2 capitalize text-sm md:text-base whitespace-nowrap transition"
                style={{
                  color: activeTab === tab ? '#f59e0b' : '#94a3b8',
                  borderBottom: activeTab === tab ? '2px solid #f59e0b' : 'none'
                }}
              >
                {tab === 'pos' ? '💰 POS System' : tab === 'overview' ? '📊 Overview' : tab === 'clients' ? '👥 Clients' : tab === 'transactions' ? '💳 Transactions' : tab === 'invoices' ? '📄 Invoices' : tab === 'inquiries' ? '✉️ Inquiries' : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg mb-2">
                    <div>
                      <p className="text-white text-sm font-medium">{tx.clients?.full_name || 'N/A'}</p>
                      <p className="text-slate-400 text-xs">{new Date(tx.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-green-400 font-bold">AED {tx.amount?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">New Clients</h3>
                {recentClients.map((client) => (
                  <div key={client.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg mb-2">
                    <div>
                      <p className="text-white text-sm font-medium">{client.full_name}</p>
                      <p className="text-slate-400 text-xs">{client.client_number}</p>
                    </div>
                    <p className="text-slate-400 text-xs">{new Date(client.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">All Clients</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Client ID</th>
                      <th className="text-left py-3 text-slate-400">Name</th>
                      <th className="text-left py-3 text-slate-400">Email</th>
                      <th className="text-left py-3 text-slate-400">Phone</th>
                      <th className="text-left py-3 text-slate-400">Joined</th>
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
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg mb-2">
                  <div>
                    <p className="text-white text-sm font-medium">{tx.clients?.full_name || 'N/A'}</p>
                    <p className="text-slate-400 text-xs">{new Date(tx.created_at).toLocaleDateString()} • {tx.payment_method}</p>
                  </div>
                  <p className="text-green-400 font-bold">AED {tx.amount?.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Invoices</h3>
              <p className="text-slate-400">No invoices yet. Create one using the POS system.</p>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Pending Inquiries</h3>
              {pendingInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border border-slate-700 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-medium">{inquiry.name}</p>
                      <p className="text-slate-400 text-sm">{inquiry.email} • {inquiry.phone || 'No phone'}</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">New</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{inquiry.message}</p>
                  <button className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-3 py-1 rounded-lg text-sm transition">Mark as Read</button>
                </div>
              ))}
              {pendingInquiries.length === 0 && <p className="text-slate-400">No pending inquiries</p>}
            </div>
          )}

          {activeTab === 'pos' && <POSSystem />}
        </div>
      </div>
    </div>
  )
}