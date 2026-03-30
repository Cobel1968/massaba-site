'use client'
import POSSystem from '../../components/POSSystem'

export default function TestPOSPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">POS System Test</h1>
        <POSSystem />
      </div>
    </div>
  )
}