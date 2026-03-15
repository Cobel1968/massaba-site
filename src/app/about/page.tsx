import Image from 'next/image'
import { ShieldCheck, Globe, Handshake, Award, Quote } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">The Massaba Legacy</h2>
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                From Statecraft to <span className="text-primary italic font-serif lowercase">Global Advisory</span>
              </h1>
              <p className="text-xl text-muted-foreground font-sans leading-relaxed">
                Founded by <span className="text-foreground font-bold">Mr. Brahima Coulibaly</span>, Massaba Global Consultancy was born at the intersection of international diplomacy and cross-border commerce. We don't just bridge markets; we unite visions.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-muted/50 rounded-[3rem] overflow-hidden border border-border relative">
                {/* Placeholder for Mr. Coulibaly's Professional Portrait */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest p-12 text-center">
                  [Executive Portrait: Mr. Brahima Coulibaly]
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-primary p-8 rounded-3xl shadow-2xl text-primary-foreground max-w-xs">
                <Quote className="mb-4 opacity-50" size={32} />
                <p className="font-serif italic text-lg leading-tight">
                  "True negotiation is not about winning a deal; it is about building a bridge where none existed."
                </p>
                <p className="mt-4 text-[10px] font-mono uppercase tracking-widest opacity-80"> Brahima Coulibaly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diplomatic Foundations */}
      <section className="py-24 px-6 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">The Diplomatic Edge</h3>
          <p className="text-muted-foreground font-sans text-lg">
            Mr. Coulibalys career as a diplomat honed a rare set of skills: the ability to navigate complex regulatory landscapes, the intuition to decode cultural nuances, and the integrity to remain a trusted intermediary in high-pressure environments.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Strategic Trust",
              desc: "Built on years of diplomatic service, our reputation as a credible and trustworthy negotiator is our most valued asset.",
              icon: <ShieldCheck className="text-primary" size={28} />
            },
            {
              title: "Borderless Vision",
              desc: "A passion for uniting people across all borders, facilitating seamless integration between GCC, Africa, and European markets.",
              icon: <Globe className="text-primary" size={28} />
            },
            {
              title: "Expert Mediation",
              desc: "Utilizing state-level negotiation tactics to solve private sector challenges and unlock international opportunities.",
              icon: <Handshake className="text-primary" size={28} />
            }
          ].map((feature, i) => (
            <div key={i} className="bg-background border border-border p-10 rounded-[2rem] hover:border-primary/50 transition-colors group">
              <div className="mb-6">{feature.icon}</div>
              <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{feature.title}</h4>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Vision */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-zinc-950 text-white rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">The Future of Massaba</h3>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                Merging Tradition <br/> with AI Innovation
              </h2>
              <p className="opacity-70 font-sans text-lg leading-relaxed mb-8">
                Today, we take Mr. Coulibalys timeless principles of trust and credibility and amplify them with cutting-edge AI technology. This ensures that while our heart remains diplomatic, our operations are executed with modern, data-driven precision.
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                   <Award className="text-primary" />
                   <span className="text-xs font-mono uppercase tracking-widest">Credibility First</span>
                </div>
                <div className="flex items-center gap-2">
                   <Award className="text-primary" />
                   <span className="text-xs font-mono uppercase tracking-widest">Global Reach</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-64 w-64 border border-white/10 rounded-full flex items-center justify-center relative">
                 <div className="absolute inset-0 border border-primary/30 rounded-full animate-pulse"></div>
                 <Image src="/massaba-logo.png" alt="Seal" width={120} height={120} className="brightness-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
