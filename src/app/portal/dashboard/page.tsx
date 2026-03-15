'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  LayoutDashboard, FileText, MessageSquare, Settings, LogOut, 
  Clock, CheckCircle2, AlertCircle, Calendar, User, ExternalLink,
  Send, X, Paperclip, ShieldCheck
} from 'lucide-react'

export default function DashboardPage() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const activeServices = [
    { id: "MGB-442", name: "Vehicle Export (KSA)", status: "In Progress", progress: 65, icon: <Clock className="text-amber-500" />, nextMilestone: "Customs Clearance", date: "Mar 18, 2026" },
    { id: "MGB-901", name: "Visa Processing (UK)", status: "Completed", progress: 100, icon: <CheckCircle2 className="text-green-500" />, nextMilestone: "Document Delivery", date: "Mar 12, 2026" },
    { id: "MGB-112", name: "Corporate Audit", status: "Review Required", progress: 20, icon: <AlertCircle className="text-red-500" />, nextMilestone: "Upload Ledger 2025", date: "Action Needed" },
  ]

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-muted/20 flex flex-col p-6 hidden lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <Image src="/massaba-logo.png" alt="Logo" width={32} height={32} />
          <span className="font-black uppercase tracking-tighter text-sm">Massaba Portal</span>
        </div>
        <nav className="flex-1 space-y-1">
          {[{ label: 'Overview', icon: <LayoutDashboard size={18} />, active: true }, { label: 'Documents', icon: <FileText size={18} />, active: false }, { label: 'Messages', icon: <MessageSquare size={18} />, active: false }].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all ${item.active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <Link href="/portal" className="flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><LogOut size={18} /> Logout</Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-1">Portfolio Summary</h2>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Client Dashboard</h1>
          </div>
          <button 
            onClick={() => setIsMessageOpen(true)}
            className="flex items-center gap-4 bg-primary text-primary-foreground px-6 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
          >
            <MessageSquare size={20} />
            <div className="text-left">
              <p className="text-[10px] font-mono uppercase opacity-70">Consultant HQ</p>
              <p className="text-xs font-bold uppercase tracking-widest">Start Briefing</p>
            </div>
          </button>
        </header>

        {/* Active Case Files */}
        <div className="grid grid-cols-1 gap-6">
          {activeServices.map((service) => (
            <div key={service.id} className="group p-[1px] bg-gradient-to-r from-border to-transparent rounded-[2rem] hover:from-primary/50 transition-all duration-500">
              <div className="bg-background/90 backdrop-blur-xl p-8 rounded-[1.9rem] flex flex-col md:flex-row md:items-center gap-8 border border-white/5">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-muted/50 border border-border flex items-center justify-center scale-110">{service.icon}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">{service.id}</span>
                    <h4 className="text-xl font-black uppercase tracking-tight">{service.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground"><div className="flex items-center gap-1.5"><Calendar size={14} /> Next: {service.nextMilestone}</div><div className="flex items-center gap-1.5 text-primary font-bold"><Clock size={14} /> {service.date}</div></div>
                </div>
                <div className="w-full md:w-48 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-1"><span>Progress</span><span>{service.progress}%</span></div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary transition-all duration-1000" style={{ width: `${service.progress}%` }} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MESSAGE SLIDE-OUT PANEL --- */}
        {isMessageOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-md bg-background border-l border-border h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={20} />
                  <span className="font-black uppercase tracking-tighter">Massaba Briefing</span>
                </div>
                <button onClick={() => setIsMessageOpen(false)} className="p-2 hover:bg-muted rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans">
                <div className="bg-muted/50 p-4 rounded-2xl border border-border max-w-[85%]">
                  <p className="text-xs leading-relaxed">Welcome to your secure communication line. Your assigned consultant will respond to any technical or logistical inquiries here.</p>
                  <span className="text-[9px] uppercase font-mono mt-2 block opacity-50">Massaba HQ • 10:42 AM</span>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-background">
                <div className="relative">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Brief your consultant..."
                    className="w-full bg-muted/30 border border-border rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-primary h-32 resize-none"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><Paperclip size={18} /></button>
                    <button className="bg-primary text-primary-foreground p-2 rounded-xl hover:bg-primary-dark transition-colors"><Send size={18} /></button>
                  </div>
                </div>
                <p className="text-[9px] text-center mt-4 text-muted-foreground uppercase tracking-widest font-mono">End-to-End Encrypted Communication</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
