"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const banners = [
  {
    title: "RITA – Real In-Transit Advertising",
    image: "/ads/rita-banner.jpg",
    link: "#",
  },
  {
    title: "Enterprise POS Systems",
    image: "/ads/pos-banner.jpg",
    link: "#",
  },
  {
    title: "Digital Workforce Recording Platform",
    image: "/ads/recording-banner.jpg",
    link: "#",
  },
];

export default function InnovationCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const banner = banners[index];

  return (
    <section className="border-t border-slate-800 bg-slate-900 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">

        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold uppercase tracking-[0.2em]">
            Innovation Partners
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Technology platforms collaborating with our network
          </p>
        </div>

        <a
          href={banner.link}
          className="group relative block overflow-hidden rounded-xl border border-slate-800"
        >
          <div className="relative h-[260px] w-full">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <div className="absolute bottom-0 w-full bg-black/60 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">{banner.title}</h3>
          </div>
        </a>
      </div>
    </section>
  );
}