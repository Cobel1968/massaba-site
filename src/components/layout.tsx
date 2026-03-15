import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0f16] flex flex-col font-sans text-slate-300 selection:bg-amber-500/30">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 bg-[#0a0f16] py-16 text-center text-slate-500 text-sm mt-auto">
        <img src="/massaba-logo.png" alt="Massaba Global" className="h-12 w-auto mx-auto mb-6 opacity-50 hover:opacity-100 transition-opacity duration-300" />
        <p>© {new Date().getFullYear()} Massaba Global Consultancy. All rights reserved.</p>
      </footer>
    </div>
  );
}