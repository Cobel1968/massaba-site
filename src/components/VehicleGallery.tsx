import Image from 'next/image'

const vehicles = [
'/vehicles/import_export/1.jpg',
'/vehicles/import_export/2.jpg',
'/vehicles/import_export/3.jpg',
'/vehicles/import_export/Mercedes2.jpg',
'/vehicles/import_export/Suv2.jpg',
'/vehicles/import_export/Suv3.jpg'
]

export default function VehicleGallery() {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-white mb-10">
        Vehicle Import Showcase
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {vehicles.map((src,i)=>(
          <div key={i} className="overflow-hidden rounded-xl border border-slate-800">
            <Image
              src={src}
              alt="Vehicle Import"
              width={600}
              height={400}
              className="object-cover w-full h-full hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
