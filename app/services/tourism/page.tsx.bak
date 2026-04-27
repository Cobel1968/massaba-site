'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Globe, CheckCircle, Plane, Hotel, Umbrella, Coffee, MapPin, Phone, Mail, Clock, Users, Camera, Sun, Waves, Mountain, Building, Landmark, Heart } from 'lucide-react'
import ServiceInquiry from '../../../components/ServiceInquiry'
import TourismVideo from '../../../components/TourismVideo'
import DestinationVideo from '../../../components/DestinationVideo'

export default function TourismPage() {
  const destinations = [
    {
      name: "Grand-Bassam",
      region: "Sud-Est",
      image: "/images/tourism/grand-bassam.svg",
      description: "Ancienne capitale coloniale, patrimoine mondial de l'UNESCO",
      attractions: ["Maison du Gouverneur", "Plage de Grand-Bassam", "Musée des Civilisations"],
      videoId: "JTZxB76Grig",
      videoTitle: "Vue aérienne de Grand-Bassam"
    },
    {
      name: "Man & Les Montagnes",
      region: "Ouest",
      image: "/images/tourism/man-mountains.svg",
      description: "Paysage montagneux exceptionnel, cascades et forêts tropicales",
      attractions: ["Mont Tonkoui", "Cascade de la Semien", "La Dent de Man"],
      videoId: "nJI467D6xq8",
      videoTitle: "Découvrez les 18 montagnes de Man"
    },
    {
      name: "Yamoussoukro",
      region: "Centre",
      image: "/images/tourism/yamoussoukro.svg",
      description: "Capitale politique avec la plus grande basilique du monde",
      attractions: ["Basilique Notre-Dame de la Paix", "Fondation Félix Houphouët-Boigny", "Lac aux Caïmans"],
      videoId: "jLZbZwJmSTo",
      videoTitle: "City Tour - Yamoussoukro"
    },
    {
      name: "San Pedro & La Côte",
      region: "Sud-Ouest",
      image: "/images/tourism/san-pedro.svg",
      description: "Plages paradisiaques et forêt classée de Taï",
      attractions: ["Plage de San Pedro", "Parc National de Taï", "Rocher de San Pedro"],
      videoId: "PtbHHSnNVBM",
      videoTitle: "San Pedro & La Côte"
    },
    {
      name: "Korhogo & Le Nord",
      region: "Nord",
      image: "/images/tourism/korhogo.svg",
      description: "Capitale du Sénoufo, artisanat et culture authentique",
      attractions: ["Marché d'artisanat", "Mont Korhogo", "Village de Niofoin"],
      videoId: "WfH010lbNC4",
      videoTitle: "Korhogo & Le Nord"
    },
    {
      name: "Abidjan",
      region: "Sud",
      image: "/images/tourism/abidjan.svg",
      description: "Métropole moderne, vie nocturne vibrante et lagunes",
      attractions: ["Plateau", "Banco National Park", "Stade Félix Houphouët-Boigny"],
      videoId: "FKixnj7Gij8",
      videoTitle: "Abidjan"
    }
  ]

  const visaTypes = [
    {
      name: "Visa Touristique",
      duration: "Séjour de 3 mois",
      price: "À partir de 150$",
      features: ["Tourisme", "Visite familiale", "Découverte culturelle"]
    },
    {
      name: "Visa d'Affaires",
      duration: "Séjour de 3 mois",
      price: "À partir de 200$",
      features: ["Conférences", "Réunions", "Prospection commerciale"]
    },
    {
      name: "Visa de Long Séjour",
      duration: "6 mois à 1 an",
      price: "À partir de 350$",
      features: ["Étudiants", "Bénévoles", "Volontaires"]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/services" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Services
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/80 z-10" />
          <div className="relative z-20 p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/90 px-3 py-1 rounded-full text-sm font-bold text-slate-900 mb-4">
              <Heart className="w-4 h-4" /> Découvrez la Côte d'Ivoire
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tourisme & Visa en Côte d'Ivoire
            </h1>
            <p className="text-slate-200 text-lg mb-6 max-w-2xl mx-auto">
              Massaba Consulting vous accompagne dans vos démarches de visa pour découvrir 
              les merveilles touristiques de la Côte d'Ivoire.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 text-slate-200">
                <Plane className="w-5 h-5" /> Visa simplifié
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Hotel className="w-5 h-5" /> Séjours sur mesure
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Users className="w-5 h-5" /> Accompagnement personnalisé
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Video Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4">
              <span className="text-amber-500 text-sm font-medium">🎬 Vidéo de Promotion</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Découvrez la Côte d'Ivoire en Vidéo
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Un aperçu visuel des merveilles touristiques de la Côte d'Ivoire
            </p>
          </div>
          <TourismVideo videoId="_VrWeJov7jM" />
          <p className="text-center text-slate-500 text-sm mt-4">
            🌍 La Côte d'Ivoire vous attend - Découvrez ses paysages, sa culture et son hospitalité légendaire
          </p>
        </div>

        {/* Visa Services Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4">
              <span className="text-amber-500 text-sm font-medium">🎫 Services de Visa</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Obtenez votre visa facilement avec Massaba
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Nous vous accompagnons dans toutes les étapes de votre demande de visa pour la Côte d'Ivoire.
              Processus simplifié, délais réduits, accompagnement personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visaTypes.map((visa, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{visa.name}</h3>
                  <p className="text-amber-400 text-sm mb-3">{visa.duration}</p>
                  <p className="text-2xl font-bold text-white mb-4">{visa.price}</p>
                  <ul className="space-y-2 text-left">
                    {visa.features.map((feature, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Documents requis pour le visa</h3>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>✓ Passeport valide 6 mois</li>
                  <li>✓ Formulaire de demande rempli</li>
                  <li>✓ Photo d'identité récente</li>
                  <li>✓ Réservation d'hébergement</li>
                  <li>✓ Billet d'avion aller-retour</li>
                </ul>
              </div>
              <div className="text-right">
                <p className="text-amber-400 text-sm">Délai de traitement</p>
                <p className="text-white font-bold text-xl">3 à 5 jours ouvrés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4">
              <span className="text-amber-500 text-sm font-medium">🏝️ Destinations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explorez la Côte d'Ivoire
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Des plages paradisiaques aux montagnes majestueuses, découvrez la diversité de la Côte d'Ivoire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-500/20 transition group">
                <div className="relative h-48 bg-slate-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="text-white text-sm font-medium">{dest.region}</span>
                  </div>
                  <img 
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/images/placeholders/tourism-placeholder.svg' }}
                  />
                  <DestinationVideo 
                    videoId={dest.videoId} 
                    title={dest.videoTitle} 
                    destinationName={dest.name} 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">{dest.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dest.attractions.slice(0, 2).map((attraction, i) => (
                      <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                        {attraction}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Massaba Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 mb-12 border border-amber-500/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Pourquoi choisir Massaba pour votre visa ?</h2>
            <p className="text-slate-400">Un service complet pour un voyage sans stress</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Rapide</p>
              <p className="text-slate-400 text-sm">Traitement en 3-5 jours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Accompagnement</p>
              <p className="text-slate-400 text-sm">Suivi personnalisé</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Garantie</p>
              <p className="text-slate-400 text-sm">Taux de succès élevé</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Expertise</p>
              <p className="text-slate-400 text-sm">Connaissance du terrain</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ServiceInquiry serviceName="Tourisme & Visa - Côte d'Ivoire" />
      </div>
    </div>
  )
}