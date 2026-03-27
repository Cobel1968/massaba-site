import Link from 'next/link';
import Image from 'next/image';

const services = [
  { slug: 'b2b-consultancy', title: 'B2B Consultancy', desc: 'Strategic advisory for corporate growth and high-value partnerships.', image: '/images/b2b-consultancy/B2Bmeetings.jpg' },
  { slug: 'education', title: 'Education Consultancy', desc: 'Expert guidance for university admissions and international studies.', image: '/images/education/AccueilAssure.jpg' },
  { slug: 'government-liaison', title: 'Government Liaison', desc: 'Seamless PRO services and official approvals.', image: '/images/government-liaison/Governmenttenders.jpg' },
  { slug: 'omra-travel', title: 'Omra Travel', desc: 'Premium spiritual journey packages.', image: '/images/omra-travel/Umrah.jpg' },
  { slug: 'visa-services', title: 'Visa & Mobility Services', desc: 'Visitor, business, and golden visa assistance.', image: '/images/visa-services/Abudhabigrandmosque.jpg' },
  { slug: 'vehicle-import-export', title: 'Vehicle Import/Export', desc: 'Secure global sourcing and logistics for vehicles.', image: '/images/vehicle-import-export/Mercedes4maticfront.jpg' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Nos Services</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Des solutions complètes et professionnelles pour vos besoins internationaux</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.slug} 
              href={`/services/${service.slug}`}
              className="group block bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-64 bg-slate-800">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-400 flex-1 leading-relaxed">{service.desc}</p>
                <div className="mt-6 text-amber-400 font-medium group-hover:text-amber-300 inline-flex items-center">
                  Découvrir le service 
                  <span className="ml-2"></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
