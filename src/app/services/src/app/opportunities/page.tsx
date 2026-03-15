// src/app/opportunities/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

// reuse the service data structure/logic from your services page template
interface Opportunity {
  id: number;
  title: string;
  serviceSlug: string; // link to the corresponding service page
  description: string;
  image: string; // professional image placeholder
}

// Data for current opportunities - tailored to your services
const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Explore Global University Programs",
    serviceSlug: "education-consultancy",
    description: "Unlock access to prestigious institutions worldwide with tailored admissions guidance.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", // university campus image
  },
  {
    id: 2,
    title: "Streamline Your Fleet Acquisition",
    serviceSlug: "vehicle-import-export",
    description: "Source commercial vehicles globally with expert logistics and compliance support.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop", // vehicle logistics image
  },
  {
    id: 3,
    title: "Navigate Complex Visa Regulations",
    serviceSlug: "visa-services",
    description: "Secure mobility for your team with comprehensive visitor and business visa assistance.",
    image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?q=80&w=800&auto=format&fit=crop", // passport control image
  },
  // ... add other opportunities linked to services as needed ...
];

export const metadata: Metadata = {
  title: "Global Opportunities | Massaba Global Consultancy",
  description: "Discover international programs, trade pathways, and mobility opportunities supported by our expert consultancy.",
};

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 text-slate-100">
      <header className="mb-20 text-center lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
          Unlock Your Potential
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto lg:mx-0">
          Discover Global Opportunities
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-300 mx-auto lg:mx-0">
          Leverage our multi-service expertise to access verified opportunities in education, international trade, mobility, and government liaison. Explore pathways tailored to your ambitions.
        </p>
      </header>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="group relative rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl overflow-hidden flex flex-col transition hover:border-amber-500/50"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={opportunity.image}
                alt={opportunity.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm group-hover:bg-slate-950/70 transition"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold tracking-tight text-slate-100 mb-4">
                {opportunity.title}
              </h3>
              <p className="mt-4 text-slate-300 leading-relaxed flex-grow">
                {opportunity.description}
              </p>

              <Link
                href={`/services/${opportunity.serviceSlug}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
              >
                Learn More About This Pathway
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}