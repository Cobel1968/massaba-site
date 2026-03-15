import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Gavel, Landmark, ShieldCheck } from 'lucide-react'

export default function GovernmentLiaison() {
  const gallery = [
    { title: "Diplomatic Relations", src: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800" },
    { title: "Regulatory Compliance", src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" }
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

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.85]">Government <br/><span className="text-primary italic font-serif lowercase px-2">Liaison</span></h1>
          <p className="text-xl text-muted-foreground font-serif italic max-w-2xl mx-auto">
            "Bridging the gap between private enterprise and state regulation with absolute discretion and legal precision."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {gallery.map((img, i) => (
            <div key={i} className="group relative aspect-video rounded-3xl overflow-hidden border border-border">
              <Image src={img.src} alt={img.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">{img.title}</h3>
                <p className="text-xs text-primary font-mono uppercase tracking-widest">Liaison Service {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
