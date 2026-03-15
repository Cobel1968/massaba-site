import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail, Shield } from 'lucide-react'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Branding & Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative h-24 w-24 bg-muted border border-border rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground">
            Request <span className="text-primary italic font-serif lowercase">Received</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto font-sans">
            Your registration has been logged within the Massaba Global network. 
            A dedicated consultant will review your details shortly.
          </p>
        </div>

        {/* Next Steps Card */}
        <div className="bg-muted/30 border border-border rounded-[2rem] p-8 grid md:grid-cols-2 gap-6 text-left">
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-tight">Email Verification</h3>
              <p className="text-xs text-muted-foreground mt-1">Check your inbox for a confirmation receipt and reference number.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-tight">Security Protocol</h3>
              <p className="text-xs text-muted-foreground mt-1">Your data is encrypted and currently undergoing primary compliance audit.</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
            Return Home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/portal" className="w-full sm:w-auto px-8 py-4 border border-border text-foreground font-bold uppercase tracking-widest rounded-xl hover:bg-muted transition-all">
            Portal Login
          </Link>
        </div>

        <div className="pt-8">
          <Image src="/massaba-logo.png" alt="Massaba Logo" width={50} height={50} className="mx-auto grayscale opacity-30" />
        </div>
      </div>
    </main>
  )
}
