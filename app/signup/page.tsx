'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { User, Mail, Lock, UserPlus, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
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
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="bg-slate-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-slate-400 mt-2">Join Massaba Consulting client portal</p>
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
          
          <form onSubmit={handleSignup} className="space-y-4">
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
                  placeholder="Your full name"
                />
              </div>
            </div>
            
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-500 hover:text-amber-400">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}