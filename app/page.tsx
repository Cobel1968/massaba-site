'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import VideoBanner from '@/components/VideoBanner'

const servicesData = [
  {
    id: 1,
    path: 'b2b-consultancy',
    title: 'B2B Consultancy',
    description: 'Strategic advisory for corporate growth and high-value partnerships across Africa and global markets.',
    imageUrl: '/images/b2b-consultancy/B2Bmeetings.jpg'
  },
  {
    id: 2,
    path: 'education',
    title: 'Education Consultancy',
    description: 'Expert guidance for international students seeking admission to top-tier universities in Europe and the UK.',
    imageUrl: '/images/education/AccueilAssure.jpg'
  },
  {
    id: 3,
    path: 'government-liaison',
    title: 'Government Liaison',
    description: 'Seamless PRO services, document clearing, and official approvals for corporate compliance.',
    imageUrl: '/images/government-liaison/Governmenttenders.jpg'
  },
  {
    id: 4,
    path: 'omra-travel',
    title: 'Omra Travel',
    description: 'Premium spiritual journey packages including VIP accommodation and professional guides.',
    imageUrl: '/images/omra-travel/Umrah.jpg'
  },
  {
    id: 5,
    path: 'visa-services',
    title: 'Visa & Mobility Services',
    description: 'Visitor, business, and golden visa assistance for Gulf countries and selected destinations.',
    imageUrl: '/images/visa-services/Abudhabigrandmosque.jpg'
  },
  {
    id: 6,
    path: 'vehicle-import-export',
    title: 'Vehicle Import/Export',
    description: 'Source new and used vehicles globally with expert logistics and shipping.',
    imageUrl: '/images/vehicle-import-export/MercedesF4matic.jpeg'
  }
]

export default function Home() {
  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Connecting People &{' '}
            <span className="text-amber-500">Opportunities</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Expert consultancy services in B2B, education, government liaison, and global mobility
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/services" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full transition">
              Explore Services
            </Link>
            <Link href="/contact" className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* UNIRANKS 2026 Video Banner */}
      <VideoBanner />

      {/* Services Section */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-base md:text-xl text-slate-400">Comprehensive solutions tailored to your needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesData.map((service) => {
              const linkUrl = '/services/' + service.path
              return (
                <Link key={service.id} href={linkUrl}>
                  <div className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer group">
                    <div className="relative w-full h-48 md:h-56 overflow-hidden bg-slate-700">
                      <img 
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4 text-amber-500 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}