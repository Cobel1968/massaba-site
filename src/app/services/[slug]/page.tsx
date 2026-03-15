// src/app/services/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";

// 1. Expanded Service interface to include detailed content and a professional image
interface Service {
  slug: string;
  title: string;
  description: string; // Short description for listings
  longDescription: React.ReactNode; // Detailed content, using ReactNode for rich text and formatting
  image: string; // Professional image from a source like Unsplash
}

// Data for all your services - update this array with your full detailed content
const services: Service[] = [
  {
    slug: "education-consultancy",
    title: "Global Education Consultancy",
    description: "University admissions guidance and study abroad support.",
    longDescription: (
      <div className="prose prose-slate prose-invert max-w-none text-slate-300">
        <p>
          Embark on your international academic journey with confidence. Our expert advisors provide personalized guidance, helping you select the right university and manage the complex admissions process for top institutions worldwide.
        </p>
        <ul className="list-disc pl-5">
          <li>Personalized academic profile assessment</li>
          <li>Comprehensive application and essay support</li>
          <li>Guidance on standardized test preparation</li>
          <li>Visa and student mobility services</li>
        </ul>
      </div>
    ),
    // professional teamwork image placeholder
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", 
  },
  {
    slug: "vehicle-import-export",
    title: "Vehicle Import & Export",
    description:
      "New and used vehicle sourcing with international shipping coordination.",
    longDescription: (
      <div className="prose prose-slate prose-invert max-w-none text-slate-300">
        <p>
          Your trusted partner for global vehicle trade, handling everything from
          logistics to documentation with compliance and efficiency.
        </p>
        <ul className="list-disc pl-5">
          <li>Global sourcing of passenger and commercial vehicles</li>
          <li>Customs and duties management</li>
          <li>Secure international logistics and shipping</li>
          <li>Title and registration assistance</li>
        </ul>
      </div>
    ),
    // professional car logistics image placeholder
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },
  // Add detailed data for Visas, Government, and Omra following the same pattern.
];

// 2. generateStaticParams and generateMetadata functions for SEO and performance
interface ServicePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
  };
}

// 3. Main component to render the service details
export default function ServicePage({ params }: ServicePageProps) {
  // Find the specific service from the array matching the URL's [slug]
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound(); // Triggers the default 404 page
  }

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 text-slate-100">
      <nav className="mb-4 text-sm text-slate-400">
        {/* Breadcrumbs for easy navigation */}
        <Link href="/services" className="underline hover:text-slate-200">
          Services
        </Link>{" "}
        / {service.title}
      </nav>

      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl text-slate-50">
            {service.title}
          </h1>
          <p className="mt-6 text-xl text-amber-300 font-medium">
            {service.description}
          </p>

          {/* Render the detailed, rich text longDescription */}
          <div className="mt-12 prose prose-slate prose-invert max-w-none">
            {service.longDescription}
          </div>
          
          <div className="mt-12">
            {/* Call to Action Button */}
            <Link
              href="/contact"
              className="inline-block rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/40 hover:brightness-110 transition"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Dynamic Image from professional sources */}
        <div className="relative aspect-video rounded-3xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
          <img
            src={service.image} // defined in the services array
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}