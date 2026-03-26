import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import ServiceInquiry from '@/components/ServiceInquiry'

export default function Page() {
  const serviceFeatures = [
    'Document clearing',
    'Official approvals',
    'PRO services',
    'Corporate compliance',
    'License processing',
    'Government tenders'
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/services" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Info */}
          <div>
            <div className="relative h-80 rounded-xl overflow-hidden mb-6">
              <Image 
                src="/images/government-liaison/Governmenttenders.jpg"
                alt="Government Liaison"
                fill
                className="object-cover"
              />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">Government Liaison</h1>
            <p className="text-slate-300 text-lg mb-6">
              Seamless PRO services, document clearing, and official approvals for corporate compliance.
            </p>
            
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">What We Offer:</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="text-slate-300"> {feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-400 text-sm font-medium mb-2"> Ready to get started?</p>
              <p className="text-slate-300 text-sm">Fill out the inquiry form and our specialist will contact you within 24 hours.</p>
            </div>
          </div>

          {/* Right Column - Inquiry Form */}
          <ServiceInquiry serviceName="Government Liaison" />
        </div>
      </div>
    </div>
  )
}