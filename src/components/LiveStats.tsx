import { Globe2, Ship, GraduationCap, Users } from 'lucide-react'

export default function LiveStats() {
  const stats = [
    { label: "Nations Reached", value: "24+", icon: <Globe2 size={24} /> },
    { label: "Vehicles Delivered", value: "1.2k", icon: <Ship size={24} /> },
    { label: "Visas Approved", value: "850+", icon: <Users size={24} /> },
    { label: "Academic Placements", value: "320", icon: <GraduationCap size={24} /> }
  ]

  return (
    <section className="py-20 bg-zinc-950 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-4 group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                {stat.icon}
              </div>
              <div>
                <div className="text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
