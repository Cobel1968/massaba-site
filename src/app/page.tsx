import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Briefcase, GraduationCap, Building2, Plane, Globe2, Truck } from 'lucide-react'

const services = [
  { 
    slug: 'b2b-consultancy', 
    title: 'B2B Consultancy', 
    desc: 'Strategic advisory for corporate growth and high-value partnerships across Africa and global markets.',
    image: '/images/b2b-consultancy/B2Bmeetings.jpg',
    icon: Briefcase
  },
  { 
    slug: 'education', 
    title: 'Education Consultancy', 
    desc: 'Expert guidance for international students seeking admission to top-tier universities in Europe and the UK.',
    image: '/images/education/AccueilAssure.jpg',
    icon: GraduationCap
  },
  { 
    slug: 'government-liaison', 
    title: 'Government Liaison', 
    desc: 'Seamless PRO services, document clearing, and official approvals for corporate compliance.',
    image: '/images/government-liaison/Governmenttenders.jpg',
    icon: Building2
  },
  { 
    slug: 'omra-travel', 
    title: 'Omra Travel', 
    desc: 'Premium spiritual journey packages including VIP accommodation and professional guides.',
    image: '/images/omra-travel/Umrah.jpg',
    icon: Plane
  },
  { 
    slug: 'visa-services', 
    title: 'Visa & Mobility Services', 
    desc: 'Visitor, business, and golden visa assistance for Gulf countries and selected destinations.',
    image: '/images/visa-services/Abudhabigrandmosque.jpg',
    icon: Globe2
  },
  { 
    slug: 'vehicle-import-export', 
    title: 'Vehicle Import/Export', 
    desc: 'Source new and used vehicles globally with expert logistics and shipping.',
    image: '/images/vehicle-import-export/Mercedes4maticfront.jpg',
    icon: Truck
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="relative container-custom text-center z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Welcome to Massaba Global</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Connecting People & 
            <span className="gradient-text"> Opportunities</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Expert consultancy services in B2B, education, government liaison, and global mobility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn-primary inline-flex items-center gap-2">
              Explore Services <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-amber-500" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-amber-500" />
              <span>Global Network</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-amber-500" />
              <span>100% Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-900/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your international needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Link 
                  key={service.slug} 
                  href={`/services/${service.slug}`}
                  className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
                >
                  <div className="relative h-56 bg-slate-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-60 z-10" />
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <div className="p-2 bg-slate-900/80 rounded-lg backdrop-blur-sm border border-slate-700">
                        <IconComponent className="h-5 w-5 text-amber-500" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 flex-1 leading-relaxed text-sm">{service.desc}</p>
                    <div className="mt-4 text-amber-400 font-medium group-hover:text-amber-300 inline-flex items-center gap-1 text-sm">
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}