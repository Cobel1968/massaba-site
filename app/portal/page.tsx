'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Mail, Lock, LogIn, UserPlus, LogOut, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PortalPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Account created! Please check your email for verification.')
      setEmail('')
      setPassword('')
      setName('')
      setTimeout(() => setSuccess(''), 5000)
    }
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Logged in successfully!')
      setTimeout(() => setSuccess(''), 3000)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (user) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          
          <div className="bg-slate-800 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
                <p className="text-slate-400">{user.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-3">My Inquiries</h2>
                <p className="text-slate-400 text-sm mb-4">Track your service inquiries and requests.</p>
                <button className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg transition">
                  View Inquiries
                </button>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Service Status</h2>
                <p className="text-slate-400 text-sm mb-4">Check the status of your active services.</p>
                <button className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg transition">
                  Check Status
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-md mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="bg-slate-800 rounded-xl p-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={lex-1 py-2 rounded-lg transition }
            >
              <LogIn className="inline w-4 h-4 mr-2" />
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={lex-1 py-2 rounded-lg transition }
            >
              <UserPlus className="inline w-4 h-4 mr-2" />
              Sign Up
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={isLogin ? handleLogin : handleSignUp} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-slate-300 mb-2 text-sm">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-slate-300 mb-2 text-sm">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder=""
                />
              </div>
              {isLogin && (
                <p className="text-right mt-1">
                  <button type="button" className="text-xs text-amber-500 hover:text-amber-400">
                    Forgot password?
                  </button>
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-slate-500 text-xs text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}