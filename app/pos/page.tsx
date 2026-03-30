"use client";

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import POSSystem from '@/components/POSSystem'

export default function POSPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/admin" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8">
          <ArrowLeft size={20} /> Back to Admin Dashboard
        </Link>
        
        <POSSystem />
      </div>
    </div>
  )
}