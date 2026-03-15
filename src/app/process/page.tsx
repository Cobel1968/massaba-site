import Image from 'next/image'
import { Search, Lightbulb, BarChart3, Rocket } from 'lucide-react'

export default function ProcessPage() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Audit",
      desc: "We perform a deep-dive analysis of your current infrastructure, market position, and internal bottlenecks.",
      icon: <Search className="h-6 w-6" />
    },
    {
      number: "02",
      title: "Strategic Design",
      desc: "Our advisors architect a bespoke roadmap, aligning your specific goals with actionable financial and technical milestones.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      number: "03",
      title: "Integration & Execution",
      desc: "We work alongside your team to deploy new systems, optimize logistics, and restructure capital as planned.",
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      number: "04",
      title: "Optimization",
      desc: "Continuous monitoring and fine-tuning ensure the new frameworks scale effectively as your business grows.",
      icon: <Rocket className="h-6 w-6" />
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-24 px-6 border-b border-border bg-muted/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 relative bg-white/5 rounded-3xl flex items-center justify-center overflow-hidden border border-border">
              <Image 
                src="/massaba-logo.png" 
                alt="Massaba Logo" 
                width={55} 
                height={55} 
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-primary mb-4">The Massaba Methodology</h2>
          <h1 className="text-5xl font-black tracking-tighter uppercase text-foreground mb-6">How We <span className="text-primary italic font-serif lowercase px-2">Deliver</span> Results</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
            Our systematic approach ensures that every intervention is measurable, 
            repeatable, and aligned with your long-term vision.
          </p>
        </div>
      </section>

      {/* The Timeline/Process Flow */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector Line (visible on desktop) */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[1px] bg-border group-hover:bg-primary/50 transition-colors" />
              )}
              
              <div className="mb-6 h-20 w-20 rounded-2xl bg-muted flex items-center justify-center text-primary border border-border group-hover:border-primary transition-all relative z-10">
                {step.icon}
                <span className="absolute -top-3 -right-3 h-8 w-8 bg-background border border-primary text-primary text-[10px] font-mono flex items-center justify-center rounded-full">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Ready to start the engine?</h2>
          <p className="mb-8 font-medium opacity-90 max-w-md mx-auto">
            Schedule a discovery session to see how our process can be applied to your current challenges.
          </p>
          <a href="/contact" className="inline-block bg-primary-foreground text-primary font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:scale-105 transition-transform">
            Book Discovery Session
          </a>
        </div>
      </section>
    </main>
  )
}
