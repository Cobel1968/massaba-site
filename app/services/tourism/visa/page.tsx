"use client";
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, FileText, Globe, Shield, Phone, Mail, CreditCard } from 'lucide-react';
export default function IvoryCoastVisaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/services/tourism" 
          className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Tourism
        </Link>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🇨🇮</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Côte d'Ivoire Visa Information
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about obtaining a visa for Ivory Coast
          </p>
        </div>
        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-1">Processing Time</h3>
            <p className="text-gray-300">3-5 business days</p>
            <p className="text-sm text-gray-400">Express: 24-48 hours</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <FileText className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-1">Visa Validity</h3>
            <p className="text-gray-300">30-90 days</p>
            <p className="text-sm text-gray-400">Single/Multiple entry</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <Globe className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-1">Eligible Countries</h3>
            <p className="text-gray-300">135+ countries</p>
            <p className="text-sm text-gray-400">Visa on arrival available</p>
          </div>
        </div>
        {/* Visa Types Section - Clean Cards */}
        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-amber-500" /> Visa Types & Fees
          </h2>
          <div className="space-y-4">
            {/* Tourist Visa */}
            <div className="bg-gradient-to-r from-blue-900/30 to-transparent rounded-lg p-4 border border-blue-500/20">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Tourist Visa</h3>
                  <p className="text-gray-300 text-sm">For leisure travel, sightseeing, and visiting family/friends</p>
                  <p className="text-gray-400 text-xs mt-1">✓ 30 days validity ✓ Single/Multiple entry ✓ Extendable</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-2xl font-bold text-amber-400">$250 - $300</p>
                  <p className="text-gray-400 text-xs">USD per person</p>
                </div>
              </div>
            </div>
            {/* Business Visa */}
            <div className="bg-gradient-to-r from-purple-900/30 to-transparent rounded-lg p-4 border border-purple-500/20">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Business Visa</h3>
                  <p className="text-gray-300 text-sm">For business meetings, conferences, and commercial activities</p>
                  <p className="text-gray-400 text-xs mt-1">✓ 80-90 days validity ✓ Multiple entry ✓ Express available</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-2xl font-bold text-amber-400">$750 - $1,000</p>
                  <p className="text-gray-400 text-xs">USD per person</p>
                </div>
              </div>
            </div>
            {/* Transit Visa */}
            <div className="bg-gradient-to-r from-green-900/30 to-transparent rounded-lg p-4 border border-green-500/20">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Transit Visa</h3>
                  <p className="text-gray-300 text-sm">For passing through Ivory Coast to another destination</p>
                  <p className="text-gray-400 text-xs mt-1">✓ 72 hours validity ✓ Single entry ✓ Quick processing</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-2xl font-bold text-amber-400">$150</p>
                  <p className="text-gray-400 text-xs">USD per person</p>
                </div>
              </div>
            </div>
            {/* Visa on Arrival */}
            <div className="bg-gradient-to-r from-orange-900/30 to-transparent rounded-lg p-4 border border-orange-500/20">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Visa on Arrival</h3>
                  <p className="text-gray-300 text-sm">Available for citizens of ECOWAS countries and select nationalities</p>
                  <p className="text-gray-400 text-xs mt-1">✓ 30-90 days validity ✓ Must have return ticket ✓ Airport processing</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-2xl font-bold text-amber-400">$250 - $300</p>
                  <p className="text-gray-400 text-xs">USD per person</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-500/10 rounded-lg">
            <p className="text-gray-300 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              Fees vary based on nationality, processing speed, and embassy requirements. Contact us for an exact quote.
            </p>
          </div>
        </div>
        {/* Required Documents */}
        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Valid passport (6+ months validity)",
              "Completed visa application form",
              "2 recent passport photos (white background)",
              "Flight itinerary (round trip)",
              "Hotel reservation or accommodation proof",
              "Bank statements (last 3 months)",
              "Yellow fever vaccination certificate",
              "Travel insurance (recommended)",
              "Invitation letter (if visiting family/business)",
              "Return ticket confirmation"
            ].map((doc, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Application Process */}
        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Application Process</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "Consultation", desc: "Contact us to determine the right visa type for your needs" },
              { step: 2, title: "Document Preparation", desc: "Our team guides you through document collection and verification" },
              { step: 3, title: "Application Submission", desc: "We submit your application to the embassy on your behalf" },
              { step: 4, title: "Processing", desc: "Standard processing takes 3-5 business days" },
              { step: 5, title: "Visa Collection", desc: "Receive your visa via email or courier service" }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Important Notes */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">Important Notes</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Visa requirements may change without notice</li>
                <li>• Processing times may vary during peak seasons</li>
                <li>• Visa fees are non-refundable if application is denied</li>
                <li>• Yellow fever vaccination is MANDATORY for entry</li>
                <li>• Passport must have at least 2 blank pages</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Assistance with Your Visa?
          </h2>
          <p className="text-gray-300 mb-6">
            Our visa experts are ready to help you with the application process
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              <Mail size={18} /> Contact Us
            </Link>
            <a 
              href="tel:+2250707070707" 
              className="inline-flex items-center gap-2 border border-amber-500 text-amber-500 hover:bg-amber-500/10 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              <Phone size={18} /> Call for Urgent Visa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}