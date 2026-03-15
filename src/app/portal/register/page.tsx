'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, User, Mail, Lock, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <ShieldCheck size={28} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black tracking-tighter text-white uppercase">
          Create <span className="text-primary italic font-serif lowercase">Client</span> Account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400 font-mono uppercase tracking-widest">
          Massaba Global Secure Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900/50 py-8 px-4 shadow-2xl border border-white/5 sm:rounded-3xl sm:px-10 backdrop-blur-xl">
          <form className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600">
                  <User size={16} />
                </div>
                <input type="text" required className="block w-full pl-10 bg-zinc-950 border border-white/10 rounded-xl py-3 text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Official Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600">
                  <Mail size={16} />
                </div>
                <input type="email" required className="block w-full pl-10 bg-zinc-950 border border-white/10 rounded-xl py-3 text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary transition-all" placeholder="name@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Secure Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600">
                  <Lock size={16} />
                </div>
                <input type="password" required className="block w-full pl-10 bg-zinc-950 border border-white/10 rounded-xl py-3 text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary transition-all" placeholder="" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center items-center py-4 px-4 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
                Register Account
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500">
              Already have an account?{' '}
              <Link href="/portal" className="text-primary hover:underline font-bold">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
