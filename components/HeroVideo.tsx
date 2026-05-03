"use client";
import { useEffect, useRef, useState } from 'react';
interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}
export default function HeroVideo({
  videoSrc = "/videos/ivory-coast-hero.mp4",
  posterSrc = "",
  title = "Discover Côte d'Ivoire",
  subtitle = "Experience the beauty, culture, and opportunities of West Africa's hidden gem",
  buttonText = "Explore Services",
  buttonLink = "/services"
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current && !videoError) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    }
  }, [videoError]);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handleVideoError = () => {
    setVideoError(true);
  };
  // Fallback if video fails to load
  if (videoError) {
    return (
      <div className="relative w-full h-[80vh] min-h-[500px] bg-gradient-to-br from-blue-900 via-teal-800 to-amber-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="text-8xl mb-6 animate-pulse">🇨🇮</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl text-white/90">
            {subtitle}
          </p>
          <a
            href={buttonLink}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            {buttonText}
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        poster={posterSrc}
        onError={handleVideoError}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
      </video>
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Play/Pause Controls */}
      <button
        onClick={isPlaying ? handlePause : handlePlay}
        className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition-colors flex items-center justify-center"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="animate-fadeInUp">
          <div className="text-6xl md:text-7xl mb-6 animate-bounce-subtle">🇨🇮</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl text-white/90">
            {subtitle}
          </p>
          <a
            href={buttonLink}
            className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </div>
  );
}