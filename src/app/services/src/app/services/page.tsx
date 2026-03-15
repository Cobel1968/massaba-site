import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

const services = [
  {
    title: "B2B Consultancy",
    description: "Strategic advisory for corporate growth, market expansion, and high-value partnerships across Africa and global markets.",
    inquireHref: "/contact?inquiry=B2B+Consultancy",
    detailsHref: "/services/b2b-consultancy",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Education Consultancy",
    description: "Expert guidance for international students seeking admission to top-tier universities in Europe and the UK.",
    inquireHref: "/contact?inquiry=Education+Consultancy",
    detailsHref: "/services/education-consultancy",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Government Liaison",
    description: "Seamless PRO services, document clearing, and official approvals for corporate compliance in the Middle East and SE Asia.",
    inquireHref: "/contact?inquiry=Government+Liaison",
    detailsHref: "/services/government-liaison",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Omra Travel",
    description: "Premium spiritual journey packages including VIP accommodation and guided tours to the Holy Cities.",
    inquireHref: "/contact?inquiry=Omra+Travel",
    detailsHref: "/services/omra-travel",
    image: "https://images.unsplash.com/photo-1565552643983-c44200f4153b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Visa Services",
    description: "End-to-end processing for tourist, business, golden visas, and residency permits for global mobility.",
    inquireHref: "/contact?inquiry=Visa+Services",
    detailsHref: "/services/visa-services",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Vehicle Import/Export",
    description: "Secure, efficient, and fully compliant international vehicle shipping and global logistics.",
    inquireHref: "/contact?inquiry=Vehicle+Import/Export",
    detailsHref: "/services/vehicle-import-export",
    image: "/vehicles/import_export/1.jpg"
  }
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-12">
      <div className="mb-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-4">Our Expertise</p>
        <h1 className="text-5xl md:text-6xl text-white font-light tracking-tight mb-6">Premium Services</h1>
        <div className="h-px w-24 bg-amber-500 mb-8"></div>
        <p className="max-w-2xl text-lg text-slate-400 font-light leading-relaxed">
          Connecting Africa, South-East Asia, and Europe through world-class consultancy, mobility, and logistics solutions.
        </p>
      </div>
      
      <div className="space-y-12">
        {services.map((s, index) => (
          <div 
            key={s.title} 
            className={`flex flex-col sm:flex-row gap-8 items-center bg-[#0f1620] border border-white/5 p-6 rounded-2xl hover:border-amber-500/30 transition-colors duration-500 ${index % 2 !== 0 ? 'sm:flex-row-reverse' : ''}`}
          >
            {/* Image Section - Resized to be 45% of its previous size */}
            <div className="w-[60%] sm:w-[35%] lg:w-[20%] relative h-40 md:h-48 rounded-xl overflow-hidden bg-slate-900 shrink-0">
              <img 
                src={s.image} 
                alt={s.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Text & CTA Section - Given more breathing room */}
            <div className="w-full sm:flex-1 flex flex-col justify-center px-2 lg:px-8 py-4">
              <h3 className="text-3xl text-white font-light mb-4">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">{s.description}</p>
              
              <div className="flex flex-wrap items-center gap-6">
                <Link 
                  href={s.inquireHref} 
                  className="flex items-center bg-amber-500 text-[#0a0f16] hover:bg-amber-400 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
                >
                  <Mail className="w-4 h-4 mr-3" /> Inquire Now
                </Link>
                <Link 
                  href={s.detailsHref} 
                  className="flex items-center text-xs font-bold tracking-widest uppercase text-amber-500 hover:text-amber-400 transition-colors"
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}