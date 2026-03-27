import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-8">À propos de Massaba Global Consultancy</h1>
        
        <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="relative w-80 h-80 mx-auto rounded-2xl overflow-hidden border-4 border-amber-500 shadow-2xl">
              <Image 
                src="/brahimacoulibaly.png.jpeg" 
                alt="Mr Brahima Coulibaly" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-semibold text-white mb-4">Mr Brahima Coulibaly</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Fondateur et Directeur de Massaba Global Consultancy. Avec plus de 15 ans d'expérience dans le conseil international, 
              l'éducation et les relations gouvernementales, il accompagne les entreprises et les jeunes talents vers le succès global.
            </p>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-20">
          <h3 className="text-xl text-slate-400 mb-8">Nos Partenaires</h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-75">
            <img src="/images/shared/CBTC logo.png" alt="Cobel Business Training Center" className="h-12" />
            <img src="/images/shared/rita_logo_elephant_hq.png" alt="Rita Services" className="h-12" />
            <img src="/massaba-logo.png" alt="Massaba Global" className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
