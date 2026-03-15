import Image from "next/image";

const banners = [
  {
    title: "RITA – Real In-Transit Advertising",
    description:
      "A digital transit advertising platform integrating transport networks and smart display technology.",
    image: "/ads/rita-banner.jpg",
    link: "https://rita.services",
  },
  {
    title: "Retail POS Systems",
    description:
      "Modern point-of-sale systems designed for hospitality and retail businesses.",
    image: "/ads/pos-banner.jpg",
    link: "#",
  },
  {
    title: "Enterprise Digital Recording System",
    description:
      "Digital workforce recording and monitoring solutions for large organisations.",
    image: "/ads/digital-system-banner.jpg",
    link: "#",
  },
];

export default function AdvertisingBanner() {
  return (
    <section className="bg-slate-900 border-t border-slate-800 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-semibold uppercase tracking-[0.2em] text-slate-200">
            Innovation Partners
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Featured technology and innovation projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {banners.map((banner, index) => (
            <a
              key={index}
              href={banner.link}
              target="_blank"
              className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition hover:border-emerald-400"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-200">
                  {banner.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {banner.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}