import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, FileText, Users, Briefcase } from 'lucide-react'

export default function ProcessPage() {
  const steps = [
    {
      icon: FileText,
      title: 'Initial Consultation',
      description: 'We discuss your needs and objectives to understand how we can best assist you.',
      step: 1
    },
    {
      icon: Users,
      title: 'Assessment & Planning',
      description: 'Our experts analyze your situation and create a customized strategy.',
      step: 2
    },
    {
      icon: Briefcase,
      title: 'Implementation',
      description: 'We execute the plan, handling all documentation and coordination.',
      step: 3
    },
    {
      icon: Clock,
      title: 'Follow-up & Support',
      description: 'Continuous support to ensure successful outcomes.',
      step: 4
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Process</h1>
          <p className="text-xl text-slate-400">How we work with you to achieve your goals</p>
        </div>

        <div className="space-y-6">
          {steps.map((step) => {
            const IconComponent = step.icon
            return (
              <div key={step.step} className="bg-slate-800 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-slate-900 font-bold text-lg">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-amber-500" />
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                {step.step < 4 && (
                  <div className="hidden md:block flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/contact" 
            className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 rounded-full transition"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  )
}