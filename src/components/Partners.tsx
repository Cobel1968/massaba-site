import Image from 'next/image'

const partners = [
  { name: 'Rita', src: '/logos/rita.png' },
  { name: 'Cobelbtc', src: '/logos/cobelbtc.png' },
]

export default function Partners() {
  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-10">
          Trusted Partners & Collaborators
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner.name} className="relative h-12 w-32 md:h-16 md:w-40">
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
