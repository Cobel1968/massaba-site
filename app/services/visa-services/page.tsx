'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ServiceInquiry from '../../../components/ServiceInquiry'

export default function Page() {
  const serviceFeatures = [
    'Market entry strategies',
    'Partnership development',
    'Corporate growth planning',
    'Cross-border business advisory',
    'Investment opportunities',
    'Trade facilitation'
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/services" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative h-80 rounded-xl overflow-hidden mb-6 bg-slate-800">
              <img 
                src="/images/visa-services/Abudhabigrandmosque.jpg" 
                alt="Visa & Mobility Services"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">Visa & Mobility Services</h1>
            <p className="text-slate-300 text-lg mb-6">
              Visitor, business, and golden visa assistance for Gulf countries and selected destinations.
            </p>
            
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">What We Offer:</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="text-slate-300"> {feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <ServiceInquiry serviceName="Visa & Mobility Services" />
        </div>
      </div>
    </div>
  )
}