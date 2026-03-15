'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, CheckCircle, ShieldCheck, Info, Loader2 } from 'lucide-react'

export default function TailoredRegistration() {
  const params = useParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const serviceSlug = typeof params.service === 'string' ? params.service : ''

  const getServiceData = (slug: string) => {
    switch(slug) {
      case 'vehicle-import-export':
        return {
          label: "Automotive Logistics",
          fields: [{ label: 'Vessel Preference', type: 'text', placeholder: 'e.g. RORO or Container' }, { label: 'Vehicle VIN', type: 'text', placeholder: 'Chassis Number' }]
        }
      case 'omra-travel':
        return {
          label: "Omra & Pilgrimage",
          fields: [{ label: 'Passport Number', type: 'text', placeholder: 'Travel Document ID' }, { label: 'Group Size', type: 'number', placeholder: 'Total Pilgrims' }]
        }
      case 'visa-services':
        return {
          label: "Visa & Mobility",
          fields: [{ label: 'Target Country', type: 'text', placeholder: 'e.g. Canada, UK, KSA' }, { label: 'Current Residence', type: 'text', placeholder: 'Country of Stay' }]
        }
      case 'education-consultancy':
        return {
          label: "Education & Academy",
          fields: [{ label: 'Academic Level', type: 'text', placeholder: 'e.g. Masters, PhD' }, { label: 'Field of Interest', type: 'text', placeholder: 'e.g. Engineering' }]
        }
      case 'government-liaison':
        return {
          label: "Government Liaison",
          fields: [{ label: 'Department/Agency', type: 'text', placeholder: 'Entity Name' }, { label: 'Liaison Scope', type: 'text', placeholder: 'e.g. Regulatory Approval' }]
        }
      default:
        return {
          label: "B2B Consultancy",
          fields: [{ label: 'Organization Name', type: 'text', placeholder: 'Full Legal Entity' }, { label: 'Industry Sector', type: 'text', placeholder: 'Market Focus' }]
        }
    }
  }

  const { label, fields } = getServiceData(serviceSlug)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API delay for a professional feel
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to success page
    router.push('/portal/success')
  }

  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/portal" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-10 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors">
          <ArrowLeft className="h-4 w-4" /> Return to Portal Gateway
        </Link>

        <div className="bg-muted/20 border border-border rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12">
            <Image src="/massaba-logo.png" alt="" width={300} height={300} priority />
          </div>

          <header className="mb-10 relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <ShieldCheck className="text-primary h-5 w-5" />
               <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em]">Official Enrollment</span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-2">
              {label}
            </h1>
            <p className="text-muted-foreground text-sm font-sans">Provide the following details to initiate your specialized consultancy track.</p>
          </header>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Legal Full Name</label>
              <input type="text" required className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Professional Email</label>
              <input type="email" required className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>

            {fields.map((f, i) => (
              <div key={i} className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-primary flex items-center gap-2">
                  <Info className="h-3 w-3" /> {f.label}
                </label>
                <input 
                  type={f.type} 
                  placeholder={f.placeholder} 
                  required
                  className="w-full bg-background/50 border border-primary/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                />
              </div>
            ))}

            <div className="col-span-2 pt-4">
              <button 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing <Loader2 className="h-5 w-5 animate-spin" /></>
                ) : (
                  <>Submit Access Request <CheckCircle className="h-5 w-5" /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
