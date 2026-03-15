import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Briefcase, BarChart, Users } from 'lucide-react'

export default function B2BConsultancy() {
  const gallery = [
    { title: "Strategic Planning", src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" },
    { title: "Corporate Workshops", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
    { title: "Market Entry", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" }
  ]

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <Link href="/services" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4" /> Portfolio
          </Link>
          <Image src="/massaba-logo.png" alt="Massaba" width={40} height={40} className="object-contain" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h1 className="text-5xl font-black uppercase tracking-tighter">B2B <span className="text-primary italic font-serif lowercase">Strategic</span> Advisory</h1>
            <p className="text-muted-foreground text-lg leading-relaxed font-sans">
              We align corporate objectives with market reality. From restructuring to high-level networking, we provide the bridge for businesses to scale globally.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {['Partnership Development', 'Operational Efficiency', 'Scalability Audits'].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 border border-border bg-muted/5 rounded-xl">
                  <Briefcase className="text-primary h-5 w-5" />
                  <span className="font-bold uppercase text-xs tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((img, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden border border-border ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                <Image src={img.src} alt={img.title} fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
