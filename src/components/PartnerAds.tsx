import Image from 'next/image'

export default function PartnerAds() {
  const partners = [
    { src: "/ads/cobelbtc-banner.png", name: "CobelBTC" },
    { src: "/ads/rita-banner.png", name: "Rita" }
  ]

  return (
    <section className="py-12 md:py-20 bg-muted/10 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground text-center mb-8 md:mb-12">
          Strategic Affiliations
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-60">
          {partners.map((partner, index) => (
            <div key={index} className="relative h-12 w-40 md:h-20 md:w-64 group">
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
