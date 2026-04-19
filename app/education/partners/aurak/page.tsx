'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookOpen, Calendar, Globe, Award, Users, CheckCircle, Droplet, Factory, Fuel } from 'lucide-react'
import ServiceInquiry from '../../../../components/ServiceInquiry'

export default function AURAKPage() {
  const petroleumPrograms = [
    {
      name: "Bachelor en Génie Pétrolier",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Bourses disponibles",
      description: "Formation complète en exploration, production et raffinage du pétrole",
      icon: <Droplet className="w-5 h-5 text-amber-500" />
    },
    {
      name: "Bachelor en Génie Gazier",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Bourses disponibles",
      description: "Spécialisation dans l'industrie du gaz naturel",
      icon: <Fuel className="w-5 h-5 text-amber-500" />
    },
    {
      name: "Master en Ingénierie Pétrolière",
      level: "Master",
      duration: "2 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Bourses de recherche disponibles",
      description: "Programme avancé pour leaders de l'industrie pétrolière",
      icon: <Factory className="w-5 h-5 text-amber-500" />
    },
    {
      name: "Certificat en Gestion des Énergies",
      level: "Certificat",
      duration: "6 mois",
      language: "Anglais",
      format: "Hybride",
      fees: "Frais compétitifs",
      description: "Formation continue en gestion énergétique",
      icon: <Award className="w-5 h-5 text-amber-500" />
    }
  ]

  const regularPrograms = [
    {
      name: "Bachelor en Génie Civil",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Bourses disponibles"
    },
    {
      name: "Bachelor en Génie Mécanique",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Bourses disponibles"
    },
    {
      name: "Bachelor en Génie Électrique",
      level: "Bachelor",
      duration: "4 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Bourses disponibles"
    },
    {
      name: "MBA - Master en Administration des Affaires",
      level: "Master",
      duration: "2 ans",
      language: "Anglais",
      format: "Hybride",
      fees: "Bourses disponibles"
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
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/80 z-10" />
          <div className="relative z-20 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/90 px-3 py-1 rounded-full text-sm font-bold text-slate-900 mb-4">
              <Award className="w-4 h-4" /> Partenaire Officiel Massaba
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              American University of Ras Al Khaimah
            </h1>
            <p className="text-slate-200 text-lg mb-6 max-w-2xl">
              Une éducation américaine aux Émirats avec une spécialisation en Génie Pétrolier
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-200">
                <Globe className="w-5 h-5" /> 🇦🇪 Émirats Arabes Unis
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Users className="w-5 h-5" /> 45+ nationalités
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Award className="w-5 h-5" /> Accréditations ABET
              </div>
            </div>
          </div>
        </div>

        {/* Petroleum Engineering Focus Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 mb-12 border border-amber-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl font-bold text-white">Programmes en Génie Pétrolier</h2>
          </div>
          <p className="text-slate-300 mb-6">
            L'AURAK propose des programmes d'excellence en Génie Pétrolier, formant les leaders de demain 
            dans l'industrie énergétique. Accréditations ABET, laboratoires modernes, et partenariats avec 
            les plus grandes compagnies pétrolières.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {petroleumPrograms.map((program, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{program.name}</h3>
                    <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs mt-2">
                      {program.level}
                    </span>
                  </div>
                  {program.icon}
                </div>
                <p className="text-slate-400 text-sm mb-4">{program.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Durée</span>
                    <span className="text-white">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Langue</span>
                    <span className="text-white">{program.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frais</span>
                    <span className="text-amber-400">{program.fees}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Programs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Autres Programmes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPrograms.map((program, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{program.name}</h3>
                    <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs mt-2">
                      {program.level}
                    </span>
                  </div>
                  <BookOpen className="w-5 h-5 text-amber-500" />
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
                    <span className="text-slate-400">Frais</span>
                    <span className="text-amber-400">{program.fees}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-8 text-center border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Prêt à rejoindre AURAK ?</h2>
          <p className="text-slate-300 mb-6">
            Contactez-nous pour postuler aux programmes de Génie Pétrolier ou obtenir plus d'informations.
          </p>
          <ServiceInquiry serviceName="AURAK - American University of Ras Al Khaimah" />
        </div>
      </div>
    </div>
  )
}