'use client'
import Image from 'next/image'
import { ExternalLink, Camera } from 'lucide-react'

export default function ProjectGallery() {
  const projects = [
    { 
      title: "Luxury Vehicle Export", 
      category: "Logistics", 
      src: "/projects/vehicle-1.jpg", 
      location: "Dubai to KSA" 
    },
    { 
      title: "Corporate Liaison", 
      category: "B2B", 
      src: "/projects/office-1.jpg", 
      location: "RAK, UAE" 
    },
    { 
      title: "Visa Success Track", 
      category: "Mobility", 
      src: "/projects/visa-1.jpg", 
      location: "London, UK" 
    }
  ]

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-2 flex items-center gap-2">
              <Camera size={14} /> Field Operations
            </h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter">Project <span className="text-primary italic font-serif lowercase">Archive</span></h3>
          </div>
          <p className="hidden md:block text-muted-foreground max-w-xs text-xs font-sans uppercase tracking-widest leading-loose">
            A visual record of our most recent successful international deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border bg-muted/20">
              <Image 
                src={project.src} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">{project.category}</span>
                <h4 className="text-xl font-bold uppercase tracking-tight">{project.title}</h4>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[10px] font-mono opacity-70 uppercase">{project.location}</span>
                  <ExternalLink size={18} className="text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
