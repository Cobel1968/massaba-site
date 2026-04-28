'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Building, Users, BookOpen, Calendar, MapPin, Phone, Mail, Globe, CheckCircle } from 'lucide-react'
export default function CBTCPage() {
  const programs = [
    {
      name: "Business Administration",
      duration: "2 years",
      level: "Diploma",
      description: "Comprehensive business management and administration skills"
    },
    {
      name: "Information Technology",
      duration: "2 years",
      level: "Diploma",
      description: "Modern IT skills and software development"
    },
    {
      name: "Accounting",
      duration: "2 years",
      level: "Diploma",
      description: "Professional accounting and financial management"
    },
    {
      name: "Hospitality Management",
      duration: "2 years",
      level: "Diploma",
      description: "Hotel and tourism industry management"
    }
  ]
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Experienced Faculty",
      description: "Learn from industry professionals"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Modern Curriculum",
      description: "Industry-relevant programs"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Modern Facilities",
      description: "State-of-the-art learning environment"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "International Recognition",
      description: "Globally recognized certifications"
    }
  ]
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/education/partners" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition">
          <ArrowLeft size={20} /> Back to Partners
        </Link>
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 z-10" />
          <img
            src="/images/partners/cbtc-campus.jpg"
            alt="CBTC Campus"
            className="w-full h-96 object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { 
              (e.target as HTMLImageElement).src = '/images/placeholders/campus-placeholder.jpg' 
            }}
          />
          <div className="relative z-20 p-8 md:p-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/90 px-3 py-1 rounded-full text-sm font-bold text-slate-900 mb-4">
              <Building className="w-4 h-4" /> Partner Institution
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Canadian Business & Technical College (CBTC)
            </h1>
            <p className="text-slate-200 text-lg">
              Your pathway to Canadian education and global career opportunities
            </p>
          </div>
        </div>
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">About CBTC</h2>
            <p className="text-slate-400 mb-4">
              Canadian Business & Technical College (CBTC) is a premier institution offering 
              high-quality diploma programs designed to prepare students for successful careers 
              in various industries.
            </p>
            <p className="text-slate-400 mb-4">
              With a focus on practical skills and industry relevance, CBTC provides students 
              with the knowledge and expertise needed to excel in today's competitive job market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-amber-500 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-amber-500" />
                <span>+225 XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-amber-500" />
                <span>info@cbtc.ci</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Globe className="w-5 h-5 text-amber-500" />
                <span>www.cbtc.ci</span>
              </div>
            </div>
          </div>
        </div>
        {/* Programs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{program.name}</h3>
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                    {program.level}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{program.description}</p>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Duration: {program.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Why Choose CBTC */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Why Choose CBTC?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Industry Recognition</p>
              <p className="text-slate-400 text-sm">Globally recognized diplomas</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Small Class Sizes</p>
              <p className="text-slate-400 text-sm">Personalized attention</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-semibold">Modern Facilities</p>
              <p className="text-slate-400 text-sm">State-of-the-art labs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
