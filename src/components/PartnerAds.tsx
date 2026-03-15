import Image from 'next/image'

export default function PartnerAds() {
  const partners = [
    { src: "/ads/cobelbtc-banner.png", name: "CobelBTC" },
    { src: "/ads/rita-banner.png", name: "Rita" }
  ]

  return (
    <section className="py-20 bg-muted/10 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground text-center mb-12">
          Strategic Affiliations & Global Partners
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 hover:opacity-100 transition-opacity duration-500">
          {partners.map((partner, index) => (
            <div key={index} className="relative h-20 w-64 group">
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-w-768px) 100vw, 256px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
