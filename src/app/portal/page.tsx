import Image from 'next/image'
import Link from 'next/link'
import { Lock, UserPlus, ArrowRight } from 'lucide-react'

export default function ClientPortal() {
  const portalPaths = [
    { name: "B2B & Corporate", slug: "b2b-consultancy" },
    { name: "Education & Academy", slug: "education-consultancy" },
    { name: "Government & Diplomatic", slug: "government-liaison" },
    { name: "Omra & Pilgrimage", slug: "omra-travel" },
    { name: "Automotive Logistics", slug: "vehicle-import-export" },
    { name: "Visa & Mobility", slug: "visa-services" },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image src="/massaba-logo.png" alt="Massaba" width={80} height={80} className="mx-auto mb-6" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Client Portal</h1>
          <p className="text-muted-foreground mt-2 font-sans">Secure access to Massaba Global services</p>
        </div>

        <div className="bg-muted/30 border border-border rounded-3xl p-8 shadow-2xl">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Client ID / Email</label>
              <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Access Key</label>
              <input type="password" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
            <button className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-primary-dark transition-all">
              Secure Login
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground font-mono">New Client?</span></div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] text-center font-mono uppercase text-muted-foreground mb-4">Select Service to Register</p>
            <div className="grid grid-cols-1 gap-2">
              {portalPaths.map((path) => (
                <Link 
                  key={path.slug}
                  href={`/portal/register/${path.slug}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-primary/10 hover:border-primary/50 transition-all group"
                >
                  <span className="text-xs font-bold uppercase tracking-tight">{path.name}</span>
                  <UserPlus className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
