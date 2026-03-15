import Image from 'next/image'
import Link from 'next/link'
import { Building2, GraduationCap, Gavel, Plane, Car, Globe2, ArrowRight } from 'lucide-react'

const services = [
  {
    title: "B2B Consultancy",
    path: "/services/b2b-consultancy",
    description: "Strategic advisory for corporate scaling, partnerships, and market entry.",
    icon: <Building2 className="h-8 w-8" />
  },
  {
    title: "Education Consultancy",
    path: "/services/education-consultancy",
    description: "Expert guidance for institutional development and international academic pathways.",
    icon: <GraduationCap className="h-8 w-8" />
  },
  {
    title: "Government Liaison",
    path: "/services/government-liaison",
    description: "Navigating regulatory frameworks and facilitating high-level diplomatic relations.",
    icon: <Gavel className="h-8 w-8" />
  },
  {
    title: "Omra Travel",
    path: "/services/omra-travel",
    description: "Bespoke pilgrimage management and spiritual travel logistics.",
    icon: <Plane className="h-8 w-8" />
  },
  {
    title: "Vehicle Import & Export",
    description: "International automotive trade, logistics, and compliance management.",
    path: "/services/vehicle-import-export",
    icon: <Car className="h-8 w-8" />
  },
  {
    title: "Visa Services",
    path: "/services/visa-services",
    description: "Comprehensive immigration support and global mobility solutions.",
    icon: <Globe2 className="h-8 w-8" />
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Massaba Logo */}
        <header className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 relative bg-white/5 rounded-xl flex items-center justify-center overflow-hidden border border-border">
              <Image 
                src="/massaba-logo.png" 
                alt="Massaba Logo" 
                width={35} 
                height={35} 
                className="object-contain"
              />
            </div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary">Service Portfolio</h2>
          </div>
          <h1 className="text-5xl font-serif italic mb-6 text-foreground">Specialized expertise <br/>for a <span className="text-primary not-italic font-sans font-black uppercase tracking-tighter">Global Market.</span></h1>
        </header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              href={service.path} 
              key={service.title} 
              className="group p-8 border border-border bg-muted/10 hover:bg-muted/30 transition-all rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="text-primary mb-6 p-4 bg-primary/10 w-fit rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-sans mb-6">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                Explore Service <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
