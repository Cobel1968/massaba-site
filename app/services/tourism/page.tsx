"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building, Trees, Coffee, Utensils, ShoppingBag, Globe, Sun, Compass, Play, X } from 'lucide-react';
const attractions = [
  {
    name: "Grand-Bassam",
    description: "UNESCO World Heritage site with colonial architecture and beautiful beaches",
    icon: Building
  },
  {
    name: "Abidjan",
    description: "Modern metropolis known as the 'Pearl of the Lagoons'",
    icon: Building
  },
  {
    name: "Tai National Park",
    description: "UNESCO World Heritage rainforest reserve",
    icon: Trees
  }
];
const activities = [
  { name: "Beach Days", icon: "🏖️", description: "Relax on pristine beaches" },
  { name: "Cultural Tours", icon: "🎭", description: "Experience local traditions" },
  { name: "Wildlife", icon: "🦒", description: "See exotic animals" },
  { name: "Nightlife", icon: "🌙", description: "Vibrant evening scene" }
];
// Video data from your YouTube links
const videos = [
  {
    id: "hero",
    videoId: "_Fs78U1i3sU",
    title: "Côte d'Ivoire est ZO",
    artist: "Elow'n ft. Mosty & Fior 2 bior",
    description: "Official music video celebrating Ivorian culture and tourism",
    isHero: true
  },
  {
    id: "abidjan",
    videoId: "reHcIPinzSw",
    title: "Inside Abidjan",
    artist: "Travel Documentary",
    description: "Explore the most visited city in Africa - Abidjan, Ivory Coast",
    isHero: false
  },
  {
    id: "afcon",
    videoId: "1q4wEAaotZ8",
    title: "AFCON Vibes",
    artist: "Coup du marteau",
    description: "Celebrating Ivory Coast's AFCON victory spirit",
    isHero: false,
    isShort: true
  }
];
export default function TourismPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>("hero");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getEmbedUrl = (videoId: string, isHero: boolean = false) => {
    if (isHero) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0`;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };
  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };
  const heroVideo = videos.find(v => v.isHero);
  const otherVideos = videos.filter(v => !v.isHero);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section with Main Video Background */}
      <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
            src={getEmbedUrl(heroVideo.videoId, true)}
            title={heroVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="animate-fadeInUp">
            <div className="text-7xl md:text-8xl mb-6 animate-bounce-subtle">🇨🇮</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl">
              Discover Côte d'Ivoire
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl text-white/90">
              Experience the beauty, culture, and opportunities of West Africa's hidden gem
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Explore Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/services/tourism/visa"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white/50 hover:bg-white/10 text-white rounded-lg font-semibold transition-all"
              >
                Visa Information
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Back Button */}
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Services
        </Link>
        {/* Key Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition transform hover:scale-105">
            <div className="text-3xl mb-2">🏖️</div>
            <div className="text-white font-semibold">550 km</div>
            <div className="text-gray-400 text-sm">Coastline</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition transform hover:scale-105">
            <div className="text-3xl mb-2">🌴</div>
            <div className="text-white font-semibold">20+</div>
            <div className="text-gray-400 text-sm">National Parks</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition transform hover:scale-105">
            <div className="text-3xl mb-2">🏙️</div>
            <div className="text-white font-semibold">2</div>
            <div className="text-gray-400 text-sm">Major Cities</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition transform hover:scale-105">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-white font-semibold">60+</div>
            <div className="text-gray-400 text-sm">Festivals Yearly</div>
          </div>
        </div>
        {/* Video Gallery Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Explore Ivory Coast Through Video</h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Watch these videos to experience the vibrant culture, beautiful landscapes, and energetic spirit of Côte d'Ivoire
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {otherVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => openVideoModal(video.videoId)}
                className="group relative overflow-hidden rounded-xl aspect-video bg-black/50 hover:scale-105 transition-all duration-300"
              >
                {/* Thumbnail placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-orange-600/30 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/80 group-hover:bg-amber-500 flex items-center justify-center transition-all mb-4">
                    <Play className="text-white ml-1" size={32} />
                  </div>
                  <h3 className="text-white text-xl font-semibold px-4 text-center">{video.title}</h3>
                  <p className="text-white/70 text-sm mt-2 px-4 text-center">{video.artist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Popular Destinations */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">Popular Destinations</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Explore the most beautiful and culturally rich locations in Côte d'Ivoire
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {attractions.map((attraction) => {
            const Icon = attraction.icon;
            return (
              <div key={attraction.name} className="bg-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/40 transition">
                  <Icon className="text-amber-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{attraction.name}</h3>
                <p className="text-gray-300 text-sm">{attraction.description}</p>
              </div>
            );
          })}
        </div>
        {/* Activities Section */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">Things to Do</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          From relaxing on beaches to exploring wildlife, there's something for everyone
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {activities.map((activity) => (
            <div key={activity.name} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition transform hover:scale-105">
              <div className="text-3xl mb-2">{activity.icon}</div>
              <div className="text-white font-semibold text-sm">{activity.name}</div>
              <div className="text-gray-400 text-xs">{activity.description}</div>
            </div>
          ))}
        </div>
        {/* Travel Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Sun className="text-amber-500" size={20} />
              </div>
              <h2 className="text-2xl font-semibold text-white">Best Time to Visit</h2>
            </div>
            <p className="text-gray-300 mb-4">
              The best time to visit Côte d'Ivoire is during the dry season from November to March, 
              when the weather is pleasant with lower humidity and minimal rainfall.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm">Nov - Mar</span>
              <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm">25-30°C</span>
              <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm">Dry Season</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Compass className="text-amber-500" size={20} />
              </div>
              <h2 className="text-2xl font-semibold text-white">Travel Tips</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Visa required for most nationalities (assistance available)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>French is the official language, English widely spoken in tourist areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Currency: West African CFA franc (XOF)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Vaccination: Yellow fever certificate required</span>
              </li>
            </ul>
          </div>
        </div>
        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Explore Ivory Coast?
          </h2>
          <p className="text-gray-300 mb-6">
            Let us help you plan your perfect trip with our comprehensive travel services
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Contact Us Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}