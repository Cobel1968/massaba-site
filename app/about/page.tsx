"use client";

import Link from 'next/link'
import { ArrowLeft, Briefcase, Globe, Award, Users } from 'lucide-react'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        {/* Founder Hero Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 mb-12 border border-amber-500/20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
              <span className="text-5xl font-bold text-slate-900">CB</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Mr. Coulibaly Brahima</h1>
              <p className="text-amber-500 text-lg mb-4">Founder & Principal Consultant</p>
              <p className="text-slate-300 leading-relaxed max-w-2xl">
                A distinguished diplomat and seasoned business professional with over 15 years of experience 
                bridging international relations and commerce across Africa, the Middle East, and global markets.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <Globe className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">15+</div>
            <div className="text-slate-400 text-sm">Years Experience</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <Briefcase className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">20+</div>
            <div className="text-slate-400 text-sm">Countries Served</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <Users className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-slate-400 text-sm">Clients Served</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-slate-400 text-sm">Success Rate</div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-amber-500 rounded-full flex items-center justify-center">
              <img 
                src="/massaba-logo.png" 
                alt="Massaba Consulting" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span className="text-4xl font-bold text-slate-900">M</span>';
                }}
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">About Massaba Consulting</h1>
            <p className="text-xl text-slate-400">Connecting People & Opportunities Since 2010</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed">
                To provide exceptional consultancy services that connect people and businesses with 
                opportunities across the globe, fostering growth, success, and meaningful partnerships.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed">
                To become the leading consultancy firm bridging Africa, the Middle East, and global markets, 
                known for integrity, excellence, and transformative results.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">The Founder's Journey</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Mr. Coulibaly Brahima brings a unique blend of diplomatic expertise and business acumen to Massaba Consulting. 
                His distinguished career spans international diplomacy, cross-cultural negotiation, and strategic business development.
              </p>
              <p className="text-slate-300 leading-relaxed">
                As a former diplomat, he has cultivated deep relationships across government and private sectors, 
                enabling Massaba Consulting to offer unparalleled access and insights to clients seeking to navigate 
                complex international markets. His vision of "Connecting People & Opportunities" drives every aspect of the firm's operations.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Contact Information</h2>
              <div className="space-y-2 text-slate-300">
                <p>📧 {COMPANY_INFO.email}</p>
                <p>📞 {COMPANY_INFO.phone}</p>
                <p>💬 WhatsApp: {COMPANY_INFO.whatsapp}</p>
                <p>📍 {COMPANY_INFO.address}</p>
                <p>⏰ {COMPANY_INFO.businessHours}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Follow Us</h2>
              <div className="flex gap-4">
                {SOCIAL_LINKS.instagram && (
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                    📷 Instagram
                  </a>
                )}
                {SOCIAL_LINKS.facebook && (
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                    📘 Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}