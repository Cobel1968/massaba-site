import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, BookOpen, Award } from 'lucide-react'

export default function EducationConsultancy() {
  const gallery = [
    { title: "Academic Hubs", src: "https://images.unsplash.com/photo-1523050353096-c89138011e44?auto=format&fit=crop&q=80&w=800" },
    { title: "Student Success", src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" },
    { title: "Institutional Growth", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" }
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-border">
            <Image src={gallery[0].src} alt="Education" fill className="object-cover" />
          </div>
          <div className="space-y-8">
            <h1 className="text-5xl font-serif italic text-foreground">Education <br/><span className="text-primary not-italic font-sans font-black uppercase tracking-tighter">Pathways</span></h1>
            <p className="text-muted-foreground text-lg font-sans leading-relaxed">
              Empowering institutions and individuals through expert academic guidance and curriculum development strategies.
            </p>
            <div className="space-y-4">
              {gallery.slice(1).map((img, i) => (
                <div key={i} className="flex items-center gap-6 p-6 border border-border bg-muted/10 rounded-2xl group hover:bg-muted/20 transition-all">
                  <div className="h-16 w-24 relative rounded-lg overflow-hidden border border-border">
                    <Image src={img.src} alt={img.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest text-primary">{img.title}</h4>
                    <p className="text-xs text-muted-foreground">Expert advisory for global academic standards.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
