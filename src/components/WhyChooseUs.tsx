import { CheckCircle } from 'lucide-react'

const advantages = [
  {
    title: 'Global Network',
    description:
      'We connect clients with trusted partners across Europe, the Middle East, and Africa for education, trade, and mobility services.'
  },
  {
    title: 'Strategic Consultancy',
    description:
      'Our consultancy approach focuses on long-term opportunities, not just transactions, helping clients grow internationally.'
  },
  {
    title: 'Reliable Processes',
    description:
      'From documentation to logistics, we guide every step with clarity, ensuring smooth and transparent processes.'
  },
  {
    title: 'Multi-Sector Expertise',
    description:
      'Education consulting, vehicle trade, visa facilitation, government liaison, and pilgrimage travel services under one trusted consultancy.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="section-large">

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">
          Why Choose Massaba Global Consultancy
        </h2>

        <p className="mt-4 text-slate-300">
          We combine international networks, strategic insight,
          and practical expertise to help individuals and businesses
          unlock global opportunities.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {advantages.map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-400/40 transition"
          >

            <CheckCircle className="text-amber-400 w-6 h-6"/>

            <h3 className="mt-4 font-semibold text-lg">
              {item.title}
            </h3>

            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {item.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}
