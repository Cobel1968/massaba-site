import Link from "next/link";
import { Home, Briefcase, Mail, Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0a0f16] border-b border-white/5 p-4 sticky top-0 z-50">
        <Link href="/" className="text-xl font-light text-white tracking-widest uppercase">
          Massaba <span className="text-amber-500 font-bold">Global</span>
        </Link>
        <Menu className="text-white w-6 h-6" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-72 bg-[#0a0f16] border-r border-white/5 hidden md:flex flex-col h-screen sticky top-0 z-50">
        <div className="p-10">
          <Link href="/" className="text-2xl font-light text-white tracking-widest uppercase block leading-tight">
            Massaba <br/><span className="text-amber-500 font-bold">Global</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-6 space-y-4 mt-8">
          <Link href="/" className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-amber-500 transition-colors p-4 rounded-lg hover:bg-white/5">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/services" className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-amber-500 bg-amber-500/10 transition-colors p-4 rounded-lg">
            <Briefcase className="w-5 h-5" /> Services
          </Link>
          <Link href="/contact" className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-amber-500 transition-colors p-4 rounded-lg hover:bg-white/5">
            <Mail className="w-5 h-5" /> Contact
          </Link>
        </nav>

        <div className="p-8 border-t border-white/5">
          <Link href="/contact" className="block w-full text-center bg-amber-500 text-[#0a0f16] hover:bg-amber-400 px-4 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300">
            Book Consultation
          </Link>
        </div>
      </aside>
    </>
  );
}
