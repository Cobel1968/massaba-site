'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Calendar, Globe, Award, Users, CheckCircle } from 'lucide-react'
import ServiceInquiry from '../../../../components/ServiceInquiry'

export default function RVUPage() {
  const programs = [
    {
      name: "Bachelor en Administration des Affaires",
      level: "Bachelor",
      duration: "3 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Frais abordables"
    },
    {
      name: "Bachelor en Informatique",
      level: "Bachelor",
      duration: "3 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Frais abordables"
    },
    {
      name: "Bachelor en Génie Logiciel",
      level: "Bachelor",
      duration: "3 ans",
      language: "Anglais",
      format: "Présentiel",
      fees: "Frais abordables"
    },
    {
      name: "Master en Gestion de Projet",
      level: "Master",
      duration: "2 ans",
      language: "Anglais",
      format: "Hybride",
      fees: "Double diplôme possible"
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/50 z-10" />
          <img 
            src="/images/partners/rvu-campus.jpg" 
            alt="RVU Campus"
            className="w-full h-96 object-cover"
            onError={(e) => { e.target.src = '/images/placeholders/campus-placeholder.jpg' }}
          />
          <div className="relative z-20 p-8 md:p-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/90 px-3 py-1 rounded-full text-sm font-bold text-slate-900 mb-4">
              <Award className="w-4 h-4" /> Nouveau Partenaire Massaba
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Renaissance University (RVU)
            </h1>
            <p className="text-slate-200 text-lg mb-6">
              Bienvenue à la Renaissance University via Massaba
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-5 h-5" />  Arménie
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-5 h-5" /> Université internationale
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-5 h-5" /> Double diplôme possible
              </div>
            </div>
          </div>
        </div>

        {/* Why RVU Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi RVU ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Université Moderne</h3>
                    <p className="text-slate-400 text-sm">Fondée en 2023, équipements modernes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Programmes Innovants</h3>
                    <p className="text-slate-400 text-sm">Formations adaptées au marché actuel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Coût Abordable</h3>
                    <p className="text-slate-400 text-sm">Frais de scolarité compétitifs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Double Diplôme</h3>
                    <p className="text-slate-400 text-sm">Opportunités de doubles diplômes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-slate-300 text-sm">
                  <strong className="text-amber-500">Accompagnement Massaba :</strong> Processus de candidature simplifié, 
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
                  <span className="text-white">Abordables, bourses disponibles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Durée des programmes</span>
                  <span className="text-white">3 ans (Bachelor) / 2 ans (Master)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Langue d'enseignement</span>
                  <span className="text-white">Anglais</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Visa étudiant</span>
                  <span className="text-white">Assistance Massaba incluse</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Équivalence en CI</span>
                  <span className="text-white">Accompagnement disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Programmes Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
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
                    <span className="text-slate-400">Format</span>
                    <span className="text-white">{program.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frais</span>
                    <span className="text-amber-400">{program.fees}</span>
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
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-8 text-center border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Prêt à commencer votre parcours ?</h2>
          <p className="text-slate-300 mb-6">
            Contactez-nous pour postuler ou obtenir plus d'informations sur les programmes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-3 rounded-lg transition"
            >
              Je postule maintenant
            </Link>
            <ServiceInquiry serviceName="RVU - Renaissance University" />
          </div>
        </div>
      </div>
    </div>
  )
}