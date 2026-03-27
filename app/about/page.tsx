"use client";

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="bg-slate-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">M</span>
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
              <h2 className="text-2xl font-bold text-white mb-3">Contact Information</h2>
              <div className="space-y-2 text-slate-300">
                <p> {COMPANY_INFO.email}</p>
                <p> {COMPANY_INFO.phone}</p>
                <p> WhatsApp: {COMPANY_INFO.whatsapp}</p>
                <p> {COMPANY_INFO.address}</p>
                <p> {COMPANY_INFO.businessHours}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Follow Us</h2>
              <div className="flex gap-4">
                {SOCIAL_LINKS.instagram && (
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                     Instagram
                  </a>
                )}
                {SOCIAL_LINKS.facebook && (
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                     Facebook
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