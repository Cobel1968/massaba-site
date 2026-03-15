import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Vehicle Import & Export | Massaba Global Consultancy",
  description:
    "Expert vehicle trade consultancy for import and export, logistics, and documentation.",
};

export default function VehicleImportExportPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      {/* Back Button */}
      <Link href="/services" className="inline-flex items-center text-amber-500 hover:text-amber-400 text-sm font-bold tracking-widest uppercase mb-12 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>

      {/* Your Header */}
      <header className="mb-12 border-l-4 border-amber-500 pl-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tighter text-slate-100 sm:text-5xl lg:text-6xl">
          Vehicle Import & Export
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300">
          Your trusted partner for global vehicle trade, handling everything from
          logistics to documentation with compliance and efficiency.
        </p>
      </header>

      {/* Hero Image */}
      <img 
        src="/vehicles/import_export/1.jpg" 
        alt="Vehicle Import/Export" 
        className="w-full h-64 md:h-96 object-cover rounded-2xl mb-12"
      />

      {/* Your Content */}
      <section className="prose prose-slate prose-invert max-w-4xl space-y-6 text-slate-300 mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">
          Our Expert Automotive Logistics
        </h2>
        <p>
          We manage the complete end-to-end process of importing and exporting vehicles across international borders. Our service includes sourcing, customs clearance, freight, insurance, and ensuring all regulatory requirements are met.
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>Global sourcing of passenger cars and commercial vehicles</li>
          <li>Comprehensive customs and duties management</li>
          <li>Secure international logistics and shipping</li>
          <li>Title and registration assistance for target markets</li>
        </ul>
      </section>

      {/* CTA Button */}
      <Link 
        href="/contact?inquiry=Vehicle+Import/Export" 
        className="inline-flex items-center bg-amber-500 text-[#0a0f16] hover:bg-amber-400 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
      >
        <Mail className="w-4 h-4 mr-3" /> Inquire About Vehicle Shipping
      </Link>
    </div>
  );
}