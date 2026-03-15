import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Shield, Globe, Ship } from 'lucide-react'

export default function VehicleImportExport() {
  const vehicleGallery = [
    { name: "Premium Transport 01", src: "/vehicles/import_export/1.jpg" },
    { name: "Global Logistics 02", src: "/vehicles/import_export/2.jpg" },
    { name: "Fleet Management 03", src: "/vehicles/import_export/3.jpg" },
    { name: "Mercedes Executive Line", src: "/vehicles/import_export/Mercedes2.jpg" },
    { name: "Luxury SUV Series", src: "/vehicles/import_export/Suv2.jpg" },
    { name: "Executive SUV Series", src: "/vehicles/import_export/Suv3.jpg" },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <Link href="/services" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Link>
            <Image src="/massaba-logo.png" alt="Massaba" width={45} height={45} className="object-contain" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Vehicle Import <br/>
                <span className="text-primary italic font-serif lowercase px-2">and</span> Export
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-sans max-w-xl">
                Massaba Global Consultancy provides seamless automotive logistics, handling everything from customs documentation to international freight for individual and commercial fleets.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="h-4 w-4"/>, label: "Full Compliance" },
                  { icon: <Globe className="h-4 w-4"/>, label: "Global Network" },
                  { icon: <Ship className="h-4 w-4"/>, label: "Maritime Freight" },
                  { icon: <CheckCircle2 className="h-4 w-4"/>, label: "Quality Inspected" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border border-border bg-muted/5 rounded-xl font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-primary">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-slate-900">
              <Image 
                src="/vehicles/import_export/Mercedes2.jpg" 
                alt="Featured Vehicle" 
                fill 
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Featured Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-2">Inventory</h2>
              <h3 className="text-4xl font-black uppercase tracking-tight">Recent Transfers</h3>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm font-sans">
              A selection of vehicles managed and delivered through our global logistics pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleGallery.map((img, idx) => (
              <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted/20">
                <Image 
                  src={img.src} 
                  alt={img.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em] border border-white/30 px-4 py-2 backdrop-blur-sm">
                    {img.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
