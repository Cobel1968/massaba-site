import Link from 'next/link'
import { MoveRight } from 'lucide-react'

const services = [
{
title:'Education Consultancy',
desc:'University admissions and study abroad guidance.',
link:'/services/education-consultancy'
},
{
title:'Vehicle Import & Export',
desc:'Global vehicle sourcing and logistics.',
link:'/services/vehicle-import-export'
},
{
title:'Visa Services',
desc:'Visitor visas for UAE, Oman, Bahrain and more.',
link:'/services/visa-services'
},
{
title:'Government Liaison',
desc:'Connecting businesses with institutions.',
link:'/services/government-liaison'
},
{
title:'B2B Consultancy',
desc:'Strategic partnerships and international expansion.',
link:'/services/b2b-consultancy'
},
{
title:'Omra Travel',
desc:'Pilgrimage travel arrangements to Saudi Arabia.',
link:'/services/omra-travel'
}
]

export default function ServiceCards(){
return(
<section className="mt-24">
<h2 className="text-3xl font-bold text-white mb-12 text-center">
Our Services
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{services.map((s,i)=>(
<div key={i}
className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl transition hover:border-amber-400">

<h3 className="text-xl font-bold text-white">
{s.title}
</h3>

<p className="mt-4 text-slate-300">
{s.desc}
</p>

<Link
href={s.link}
className="group mt-6 inline-flex items-center gap-2 text-amber-400 font-semibold"
>
Learn More
<MoveRight className="w-4 h-4 transition group-hover:translate-x-1"/>
</Link>

</div>
))}

</div>
</section>
)
}
