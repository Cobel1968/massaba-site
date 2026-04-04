'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Calendar, Globe, Award, Users, CheckCircle, Briefcase, Target, TrendingUp } from 'lucide-react'
import ServiceInquiry from '../../../../components/ServiceInquiry'

export default function CBTCPage() {
  const programs = [
    {
      name: "Certificat en Gestion d'Entreprise",
      level: "Certificat",
      duration: "3 mois",
      language: "Français",
      format: "Présentiel / En ligne",
      fees: "Frais compétitifs",
      description: "Formation complète en gestion d'entreprise"
    },
    {
      name: "Diplôme en Marketing Digital",
      level: "Diplôme",
      duration: "6 mois",
      language: "Français",
      format: "Hybride",
      fees: "Bourses disponibles",
      description: "Maîtrisez les outils du marketing digital"
    },
    {
      name: "Certificat en Leadership et Management",
      level: "Certificat",
      duration: "2 mois",
      language: "Français",
      format: "Présentiel",
      fees: "Frais abordables",
      description: "Développez vos compétences en leadership"
    },
    {
      name: "Formation en Commerce International",
      level: "Diplôme",
      duration: "4 mois",
      language: "Français",
      format: "Hybride",
      fees: "Paiement échelonné possible",
      description: "Export/Import, douanes, logistique"
    },
    {
      name: "Certificat en Ressources Humaines",
      level: "Certificat",
      duration: "3 mois",
      language: "Français",
      format: "Présentiel",
      fees: "Frais compétitifs",
      description: "Gestion du personnel et recrutement"
    },
    {
      name: "Formation en Entrepreneuriat",
      level: "Atelier",
      duration: "2 mois",
      language: "Français",
      format: "Présentiel / En ligne",
      fees: "Subventions possibles",
      description: "Créez et gérez votre entreprise"
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
            src="/images/partners/cbtc-campus.jpg" 
            alt="CBTC Campus"
            className="w-full h-96 object-cover"
            onError={(e) => { e.target.src = '/images/placeholders/campus-placeholder.jpg' }}
          />
          <div className="relative z-20 p-8 md:p-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/90 px-3 py-1 rounded-full text-sm font-bold text-slate-900 mb-4">
              <Award className="w-4 h-4" /> Centre de Formation Partenaire
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cobel Business Training Center
            </h1>
            <p className="text-slate-200 text-lg mb-6">
              Excellence en formation professionnelle et développement des compétences
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-5 h-5" />  Côte d'Ivoire
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Briefcase className="w-5 h-5" /> Formation professionnelle
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Target className="w-5 h-5" /> Certification reconnue
              </div>
            </div>
          </div>
        </div>

        {/* Why CBTC Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi CBTC ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Formations Pratiques</h3>
                    <p className="text-slate-400 text-sm">Programmes adaptés aux besoins du marché</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Formateurs Expérimentés</h3>
                    <p className="text-slate-400 text-sm">Professionnels du secteur</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Certification Attestée</h3>
                    <p className="text-slate-400 text-sm">Diplômes et certificats reconnus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Accompagnement Personnalisé</h3>
                    <p className="text-slate-400 text-sm">Suivi individualisé des apprenants</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-slate-300 text-sm">
                  <strong className="text-amber-500">Accompagnement Massaba :</strong> Inscription simplifiée, 
                  conseils personnalisés, suivi de progression, et assistance pour le financement de la formation.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-slate-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Informations Pratiques</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Frais de formation</span>
                  <span className="text-white">Frais compétitifs, bourses disponibles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Durée des programmes</span>
                  <span className="text-white">2 à 6 mois</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Langue d'enseignement</span>
                  <span className="text-white">Français</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Format</span>
                  <span className="text-white">Présentiel / En ligne / Hybride</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Financement</span>
                  <span className="text-white">Paiement échelonné possible</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Programmes de Formation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{program.name}</h3>
                    <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs mt-2">
                      {program.level}
                    </span>
                  </div>
                  <BookOpen className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-slate-400 text-sm mt-2">{program.description}</p>
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
                    Via Massaba  Inscription simplifiée
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Insertion Professionnelle</h3>
            <p className="text-slate-400 text-sm">Taux d'insertion élevé après formation</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Networking</h3>
            <p className="text-slate-400 text-sm">Accès à un réseau professionnel</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Certification</h3>
            <p className="text-slate-400 text-sm">Attestation de formation professionnelle</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-8 text-center border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Prêt à développer vos compétences ?</h2>
          <p className="text-slate-300 mb-6">
            Contactez-nous pour vous inscrire ou obtenir plus d'informations sur nos programmes de formation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-3 rounded-lg transition"
            >
              Je m'inscris maintenant
            </Link>
            <ServiceInquiry serviceName="CBTC - Cobel Business Training Center" />
          </div>
        </div>
      </div>
    </div>
  )
}