'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'
import {
  Users, Briefcase, CreditCard, FileText,
  TrendingUp, Settings, LogOut, Bell,
  DollarSign
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
    pendingInvoices: 0
  })
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

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'clients', label: '👥 Clients', icon: '👥' },
    { id: 'transactions', label: '💳 Transactions', icon: '💳' },
    { id: 'invoices', label: '📄 Invoices', icon: '📄' },
    { id: 'inquiries', label: '✉️ Inquiries', icon: '✉️' },
    { id: 'pos', label: '💰 POS System', icon: '💰' }
  ]

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
            <p className="text-slate-400">Manage your business from here.</p>
          </div>

          {/* Stats Grid - Only show on overview */}
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

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-900 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="bg-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-300">Select a tab above to manage your business.</p>
              <p className="text-slate-400 text-sm mt-2">Try the POS System tab to record payments.</p>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Clients</h3>
              <p className="text-slate-400">Client management coming soon.</p>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Transactions</h3>
              <p className="text-slate-400">Transaction history coming soon.</p>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Invoices</h3>
              <p className="text-slate-400">Invoice management coming soon.</p>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Inquiries</h3>
              <p className="text-slate-400">Contact inquiries coming soon.</p>
            </div>
          )}

          {activeTab === 'pos' && <POSSystem />}
        </div>
      </div>
    </div>
  )
}