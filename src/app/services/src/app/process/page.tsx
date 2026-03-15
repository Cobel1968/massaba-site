// src/app/process/page.tsx

import type { Metadata } from "next";
import { MessageSquareText, FileUser, Network, ClipboardCheck, Sparkles } from "lucide-react";

// define the structure for each process step
interface ProcessStep {
  id: number;
  icon: React.ElementType; // icon component type
  title: string;
  description: string;
}

// Data defining the standard consultancy lifecycle
const processSteps: ProcessStep[] = [
  {
    id: 1,
    icon: MessageSquareText,
    title: "Initial Consultation",
    description: "We begin with a detailed discussion to understand your specific goals, constraints, and consultancy needs across any of our service domains.",
  },
  {
    id: 2,
    icon: FileUser,
    title: "Tailored Assessment & Planning",
    description: "Our experts analyze your profile or project, developing a comprehensive, step-by-step strategic plan tailored to achieve your objectives efficiently.",
  },
  {
    id: 3,
    icon: Network,
    title: "Network Engagement & Logistics",
    description: "We activate our global network, engaging relevant institutions, coordinating logistics (trade or travel), and initiating critical government liaisons on your behalf.",
  },
  {
    id: 4,
    icon: ClipboardCheck,
    title: "Documentation & Compliance Management",
    description: "Our team meticulously manages all critical applications, title processing, customs forms, or visa documentation, ensuring complete regulatory compliance.",
  },
  {
    id: 5,
    icon: Sparkles,
    title: "Successful Outcome & Support",
    description: "We celebrate your success—be it university admission, vehicle delivery, or approved mobility—and remain available for post-consultancy support.",
  },
];

export const metadata: Metadata = {
  title: "Our Process | Massaba Global Consultancy",
  description: "Learn about our structured, expert-led consultancy framework designed to guide you from initial inquiry to successful global outcomes.",
};

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 text-slate-100">
      <header className="mb-24 text-center lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
          Your Journey, Structured for Success
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto lg:mx-0">
          Our Consultancy Framework
          
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-300 mx-auto lg:mx-0">
          At Massaba Global, we follow a transparent and expert-led five-step process designed to simplify complex global ventures. We provide clarity and support at every stage, ensuring compliance and maximizing your potential for success.
        </p>
      </header>

      <section className="relative">
        {/* Vertical connector line for visual flow */}
        <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-slate-800 lg:left-1/2 lg:-ml-px"></div>

        <div className="space-y-16">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.id}
                className={`flex items-start gap-8 lg:gap-12 lg:items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Icon Bubble */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-4 border-slate-950 bg-slate-900 shadow-xl lg:w-20 lg:h-20 lg:mx-auto">
                  <IconComponent className="w-8 h-8 text-amber-400 lg:w-10 lg:h-10" />
                </div>

                {/* Content Card */}
                <div className={`flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl transition hover:border-amber-500/30 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Step {step.id}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-100">
                    {step.title}
                  </h3>
                  <p className={`mt-4 text-slate-300 leading-relaxed max-w-2xl ${isEven ? "lg:ml-auto" : "lg:mr-auto"}`}>
                    {step.description}
                    
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}