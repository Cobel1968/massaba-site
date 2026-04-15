'use client'

import Link from 'next/link'
import { ArrowLeft, GraduationCap, Globe, BookOpen, Award } from 'lucide-react'
import VideoBanner from '@/components/VideoBanner'
import ServiceInquiry from '../../../components/ServiceInquiry'
import UniversityCard from '../../../components/UniversityCard'
import YoutubeVideoCard from '@/components/YoutubeVideoCard'

export default function EducationPage() {
  const serviceFeatures = [
    'University selection guidance',
    'Application assistance',
    'Visa guidance',
    'Pre-departure orientation',
    'Scholarship guidance',
    'Accommodation assistance'
  ]

  const partnerUniversities = [
    {
      name: "Royal Victorian University (RVU)",
      country: "Arménie",
      flag: "🇦🇲",
      logo: "🎓",
      tagline: "Formation moderne et innovante en Arménie",
      slug: "rvu",
      badge: "Partenaire Officiel Massaba",
      highlights: [
        "Programmes en anglais et russe",
        "Coûts abordables pour les étudiants africains",
        "Environnement d'études moderne",
        "Accompagnement visa et inscription simplifié via Massaba"
      ]
    },
    {
      name: "American University of Ras Al Khaimah (AURAK)",
      country: "Émirats Arabes Unis",
      flag: "🇦🇪",
      logo: "🇺🇸",
      tagline: "Style américain aux Émirats Arabes Unis",
      slug: "aurak",
      badge: "Partenaire Officiel Massaba",
      highlights: [
        "Programmes en anglais avec accréditations internationales (ABET)",
        "Plus de 45 nationalités sur le campus",
        "Possibilité de transfert vers les universités américaines",
        "Stages obligatoires et focus sur l'employabilité",
        "Bourses et aides financières disponibles"
      ]
    },
    {
      name: "Cobel Business Training Center",
      country: "Côte d'Ivoire",
      flag: "🇨🇮",
      logo: "🏢",
      tagline: "Formation professionnelle de qualité à Abidjan",
      slug: "cbtc",
      badge: "Partenaire Local Massaba",
      highlights: [
        "Formations certifiantes en Gestion, Marketing, Finance, RH",
        "Préparation aux examens internationaux (IELTS, etc.)",
        "Cours flexibles (soir, week-end ou intensifs)",
        "Formateurs expérimentés et certifications reconnues",
        "Prix accessibles et paiement échelonné"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/services" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Services
        </Link>

        {/* Partners Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">Partenariats Exclusifs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos Universités & Centres de Formation Partenaires
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Étudiez avec des institutions reconnues dans le monde entier – partenariats exclusifs Massaba
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerUniversities.map((uni) => (
              <UniversityCard key={uni.slug} {...uni} />
            ))}
          </div>
        </div>

        {/* UNIRANKS 2026 Ranking Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 mb-12 border border-amber-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-full mb-3">
                <span className="text-amber-500 text-xs font-medium">🏆 UNIRANKS 2026</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Top Universities in United Arab Emirates</h3>
              <p className="text-slate-400 text-sm">
                Découvrez le classement officiel des meilleures universités des Émirats Arabes Unis.
                Classement basé sur la qualité académique, la recherche et la valeur éducative.
              </p>
            </div>
            <a 
              href="https://www.uniranks.com/ranking/top-country/united-arab-emirates" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-lg transition whitespace-nowrap"
            >
              Voir le classement complet →
            </a>
          </div>
          
          {/* Top Universities Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-500/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">#1</div>
              <div className="text-white text-sm">United Arab Emirates University</div>
              <div className="text-slate-500 text-xs">Score 83.8</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">#2</div>
              <div className="text-white text-sm">University of Sharjah</div>
              <div className="text-slate-500 text-xs">Score 79.45</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">#3</div>
              <div className="text-white text-sm">American University of Sharjah</div>
              <div className="text-slate-500 text-xs">Score 77.5</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">#12</div>
              <div className="text-white text-sm">American University of Ras Al Khaimah</div>
              <div className="text-slate-500 text-xs">Score 61.17</div>
            </div>
          </div>
        </div>

                {/* European University of Armenia (EUA) Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-12 border border-blue-500/20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full mb-4">
                <span className="text-blue-400 text-xs font-medium"> European University of Armenia</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Welcome to EUA</h3>
              <p className="text-slate-300 mb-4">
                European University of Armenia - Empowering students with quality education and innovative learning experiences.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-amber-500 text-xl mb-1"></div>
                  <h4 className="text-white font-semibold text-sm">Quality Education</h4>
                  <p className="text-slate-400 text-xs">Programmes alignés sur les normes européennes ESG</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-amber-500 text-xl mb-1"></div>
                  <h4 className="text-white font-semibold text-sm">Internationalisation</h4>
                  <p className="text-slate-400 text-xs">Diplôme professionnel européen + mobilité internationale</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-amber-500 text-xl mb-1"></div>
                  <h4 className="text-white font-semibold text-sm">Formation Pratique</h4>
                  <p className="text-slate-400 text-xs">Expérience avec des spécialistes d'organisations leaders</p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3">
              <a 
                href="https://eua.am/en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Visiter le site officiel EUA 
              </a>
            </div>
          </div>
        </div></div>

        {/* Informative Videos Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4">
              <span className="text-amber-500 text-sm font-medium">📺 Vidéos Éducatives</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Découvrez les Universités et Opportunités
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Explorez les meilleures universités et opportunités d'études à travers des vidéos informatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <YoutubeVideoCard
              videoId="9p2bW6dyWUw"
              title="TOP 10 Universities in the UAE"
              description="Découvrez le classement des 10 meilleures universités des Émirats Arabes Unis"
            />
            <YoutubeVideoCard
              videoId="DDRyCOdnDmY"
              title="European University of Armenia (EUA)"
              description="Découvrez l'European University of Armenia - une institution alignée sur les normes européennes"
            />
            <YoutubeVideoCard
              videoId="e_EoMba4zeM"
              title="European Universities Overview"
              description="Aperçu des meilleures universités européennes pour les étudiants internationaux"
            />
          </div>
        </div>

        <VideoBanner />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Info */}
          <div>
            <div className="relative h-80 rounded-xl overflow-hidden mb-6 bg-slate-800">
              <img 
                src="/images/education/AccueilAssure.jpg"
                alt="Education Consultancy"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">Education Consultancy</h1>
            <p className="text-slate-300 text-lg mb-6">
              Expert guidance for international students seeking admission to top-tier universities in Europe and the UK.
            </p>
            
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">What We Offer:</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="text-slate-300">✓ {feature}</li>
                ))}
              </ul>
            </div>

            {/* Support Info */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-500" />
                Accompagnement Complet
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ Accompagnement en français</li>
                <li>✓ Reconnaissance des diplômes en Côte d'Ivoire</li>
                <li>✓ Aide aux démarches consulaires (UAE / Arménie)</li>
                <li>✓ Processus de candidature simplifié via Massaba</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Inquiry Form */}
          <ServiceInquiry serviceName="Education Consultancy" />
        </div>
      </div>
    </div>
  )
}