import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ServiceInquiry from '@/components/ServiceInquiry'

export default function B2BConsultancyPage() {
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
                src="/images/b2b-consultancy/B2Bmeetings.jpg"
                alt="B2B Consultancy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/placeholders/placeholder.svg'
                }}
              />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">B2B Consultancy</h1>
            <p className="text-slate-300 text-lg mb-6">
              Strategic advisory for corporate growth and high-value partnerships across Africa and global markets.
            </p>
            
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">What We Offer:</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="text-slate-300">✓ {feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <ServiceInquiry serviceName="B2B Consultancy" />
        </div>
      </div>
    </div>
  )
}