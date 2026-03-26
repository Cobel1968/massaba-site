import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 1,
    slug: 'b2b-consultancy',
    title: 'B2B Consultancy',
    description: 'Strategic advisory for corporate growth and high-value partnerships across Africa and global markets.',
    image: '/images/b2b-consultancy/B2Bmeetings.jpg'
  },
  {
    id: 2,
    slug: 'education',
    title: 'Education Consultancy',
    description: 'Expert guidance for international students seeking admission to top-tier universities in Europe and the UK.',
    image: '/images/education/AccueilAssure.jpg'
  },
  {
    id: 3,
    slug: 'government-liaison',
    title: 'Government Liaison',
    description: 'Seamless PRO services, document clearing, and official approvals for corporate compliance.',
    image: '/images/government-liaison/Governmenttenders.jpg'
  },
  {
    id: 4,
    slug: 'omra-travel',
    title: 'Omra Travel',
    description: 'Premium spiritual journey packages including VIP accommodation and professional guides.',
    image: '/images/omra-travel/Umrah.jpg'
  },
  {
    id: 5,
    slug: 'visa-services',
    title: 'Visa & Mobility Services',
    description: 'Visitor, business, and golden visa assistance for Gulf countries and selected destinations.',
    image: '/images/visa-services/Abudhabigrandmosque.jpg'
  },
  {
    id: 6,
    slug: 'vehicle-import-export',
    title: 'Vehicle Import/Export',
    description: 'Source new and used vehicles globally with expert logistics and shipping.',
    image: '/images/vehicle-import-export/MercedesF4matic.jpeg'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your international needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const hrefPath = '/services/' + service.slug
            return (
              <Link key={service.id} href={hrefPath}>
                <div className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer group">
                  <div className="h-56 overflow-hidden bg-slate-700">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 text-amber-500 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
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
  )
}