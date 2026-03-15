import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, Globe } from 'lucide-react'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-2">Global Presence</h2>
          <h1 className="text-6xl font-black uppercase tracking-tighter">Connect with <span className="text-primary italic font-serif lowercase">Massaba</span></h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Physical Headquarters */}
          <div className="space-y-8 bg-muted/20 p-10 rounded-[2.5rem] border border-border">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4">United Arab Emirates HQ</h3>
              <p className="text-muted-foreground leading-relaxed font-sans">
                Compass Building, Al Shohada Road,<br />
                Al Hamra Industrial Zone FZ,<br />
                Ras Al Khaimah (RAK), UAE
              </p>
            </div>
            <div className="pt-4 border-t border-border">
               <div className="flex items-center gap-2 text-xs font-mono uppercase text-primary">
                  <Globe size={14} /> Regional Hub: GCC & MENA
               </div>
            </div>
          </div>

          {/* Digital Communication */}
          <div className="space-y-8 bg-muted/20 p-10 rounded-[2.5rem] border border-border">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MessageSquare size={24} />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Official Email</h3>
                <a href="mailto:massaba555@yahoo.fr" className="text-lg font-bold hover:text-primary transition-colors">massaba555@yahoo.fr</a>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Direct WhatsApp</h3>
                <a href="https://wa.me/971525019802" target="_blank" className="text-lg font-bold hover:text-primary transition-colors">+971 52 501 9802</a>
              </div>
            </div>
          </div>

          {/* AI Intake Notice */}
          <div className="space-y-8 bg-primary p-10 rounded-[2.5rem] text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="relative z-10">
              <ShieldCheck size={40} className="mb-6 opacity-80" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">AI Integrated <br/>Triage System</h3>
              <p className="text-sm leading-relaxed opacity-90 font-sans">
                Our proprietary AI agent monitors all incoming inquiries 24/7. Your message will be instantly analyzed and routed to the specialized department for immediate processing.
              </p>
              <div className="mt-8 pt-6 border-t border-primary-foreground/20">
                 <p className="text-[10px] font-mono uppercase tracking-widest">Average Response: <span className="font-bold">Under 15 Mins</span></p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10">
               <Image src="/massaba-logo.png" alt="" width={200} height={200} />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
