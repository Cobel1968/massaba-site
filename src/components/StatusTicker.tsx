'use client'
import { Cpu, Zap, MapPin, MessageSquare } from 'lucide-react'

export default function StatusTicker() {
  return (
    <div className="w-full bg-zinc-950 text-white py-2 px-6 border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* AI Agent Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
              <Cpu size={12} className="text-primary" /> AI Triage Active
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-6">
             <Zap size={12} className="text-amber-400" />
             <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Response: <span className="text-primary">~4 Mins</span></span>
          </div>
        </div>

        {/* Global Access Shortcuts */}
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <MapPin size={12} /> RAK, UAE
          </div>
          <a href="https://wa.me/971525019802" target="_blank" className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
            <MessageSquare size={12} /> WhatsApp Direct
          </a>
        </div>
        
      </div>
    </div>
  )
}
