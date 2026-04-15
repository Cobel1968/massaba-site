'use client'

import Link from 'next/link'
import { ArrowLeft, GraduationCap, Globe, BookOpen, Award, CheckCircle, Users, TrendingUp, Video, ExternalLink } from 'lucide-react'
import ServiceInquiry from '../../../../components/ServiceInquiry'
import YoutubeVideoCard from '../../../../components/YoutubeVideoCard'

export default function EUAPage() {
  const programs = [
    {
      name: "Bachelor en Administration des Affaires",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais / Arménien",
      format: "Présentiel",
      fees: "Diplôme internationalement reconnu"
    },
    {
      name: "Bachelor en Informatique",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Normes européennes ESG"
    },
    {
      name: "Master en Gestion Internationale",
      level: "Master",
      duration: "2 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Opportunités de mobilité"
    },
    {
      name: "Master en Relations Internationales",
      level: "Master",
      duration: "2 ans",
      language: "Anglais / Arménien",
      format: "Présentiel",
      fees: "Diplôme européen"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/services/education" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Retour aux services éducatifs
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10" />
          <div className="relative z-20 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/90 px-3 py-1 rounded-full text-sm font-bold text-white mb-4">
              <Award className="w-4 h-4" /> Partenaire Officiel Massaba
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              European University of Armenia
            </h1>
            <p className="text-slate-200 text-lg mb-6 max-w-2xl">
              Empowering students with quality education and innovative learning experiences, 
              alignée sur les normes européennes.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-200">
                <Globe className="w-5 h-5" />  Arménie
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Users className="w-5 h-5" /> Communauté internationale
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <TrendingUp className="w-5 h-5" /> Diplômes reconnus
              </div>
            </div>
          </div>
        </div>

        {/* Official Website Button */}
        <div className="mb-8 flex justify-center">
          <a 
            href="https://eua.am/en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg hover:shadow-blue-500/20"
          >
            <ExternalLink className="w-5 h-5" />
            Visiter le site officiel de l'EUA
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Video Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Découvrez l'EUA en vidéo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <YoutubeVideoCard
              videoId="DDRyCOdnDmY"
              title="European University of Armenia"
              description="Présentation de l'Université Européenne d'Arménie"
            />
            <div className="bg-slate-800 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">Plus de vidéos disponibles sur le site officiel</p>
                <a 
                  href="https://eua.am/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300"
                >
                  Visiter le site EUA 
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Why EUA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi choisir EUA ?</h2>
              <p className="text-slate-300 mb-6">
                L'European University of Armenia offre des programmes académiques entièrement alignés sur 
                les normes et directives européennes pour l'assurance qualité dans l'enseignement supérieur (ESG).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Qualité Européenne</h3>
                    <p className="text-slate-400 text-sm">Programmes alignés sur les normes ESG</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Diplômes Internationaux</h3>
                    <p className="text-slate-400 text-sm">Certificats reconnus mondialement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Mobilité Internationale</h3>
                    <p className="text-slate-400 text-sm">Opportunités d'échanges et stages à l'étranger</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Formation Pratique</h3>
                    <p className="text-slate-400 text-sm">Expérience avec des spécialistes d'organisations leaders</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-slate-300 text-sm">
                  <strong className="text-blue-400">Accompagnement Massaba :</strong> Processus de candidature simplifié, 
                  aide à l'obtention du visa étudiant, suivi personnalisé, et assistance pour la reconnaissance 
                  des diplômes en Côte d'Ivoire.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-slate-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Informations Pratiques</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Frais de scolarité</span>
                  <span className="text-white">Diplôme européen accessible</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Langues</span>
                  <span className="text-white">Anglais / Arménien</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Visa étudiant</span>
                  <span className="text-white">Assistance Massaba incluse</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reconnaissance</span>
                  <span className="text-white">Diplômes internationaux</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <a 
                  href="https://eua.am/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Site officiel EUA
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Programmes Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{program.name}</h3>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs mt-2">
                      {program.level}
                    </span>
                  </div>
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Durée</span>
                    <span className="text-white">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Langue</span>
                    <span className="text-white">{program.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Format</span>
                    <span className="text-white">{program.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frais</span>
                    <span className="text-blue-400">{program.fees}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <span className="inline-block px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                    Via Massaba  Processus simplifié
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 text-center border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Prêt à postuler à l'EUA ?</h2>
          <p className="text-slate-300 mb-6">
            Contactez-nous pour postuler ou obtenir plus d'informations sur les programmes de l'European University of Armenia.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://eua.am/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Visiter le site officiel EUA
            </a>
            <ServiceInquiry serviceName="EUA - European University of Armenia" />
          </div>
        </div>
      </div>
    </div>
  )
}