import Link from 'next/link'

const insights = [
  {
    title: 'Study Abroad Opportunities 2026',
    description:
      'Explore university admission opportunities across Europe and the Middle East with our education consultancy services.',
    link: '/services/education-consultancy'
  },
  {
    title: 'Latest Vehicle Import Deals',
    description:
      'Browse our latest sourcing opportunities for SUVs, luxury vehicles, and 4x4 imports.',
    link: '/services/vehicle-import-export'
  },
  {
    title: 'Visa Updates for UAE & Gulf',
    description:
      'Stay updated on visitor visa requirements and travel processes for UAE, Oman, and Bahrain.',
    link: '/services/visa-services'
  }
]

export default function InsightsSection() {
  return (
    <section className="section-large">

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">
          Insights & Opportunities
        </h2>

        <p className="mt-4 text-slate-300">
          Discover new opportunities, insights, and updates from
          Massaba Global Consultancy across education, international
          trade, and global mobility.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-10">

        {insights.map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-400/40 transition"
          >

            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              {item.description}
            </p>

            <Link
              href={item.link}
              className="inline-block mt-6 text-amber-400 font-semibold hover:text-amber-300"
            >
              Learn More ?
            </Link>

          </div>
        ))}

      </div>

    </section>
  )
}
