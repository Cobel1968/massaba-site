'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Building, Globe, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [showAiCard, setShowAiCard] = useState(true) // Always show

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    }, 1500)
  }

  const handleAiAssist = () => {
    console.log('AI Assist button clicked!') // Debug log
    console.log('Form data:', formData) // Debug log
    
    if (!formData.message && !formData.service) {
      setAiResponse(' Please tell me about your inquiry or select a service first!')
      return
    }
    
    setIsAiThinking(true)
    setAiResponse('')
    
    // Get response based on input
    setTimeout(() => {
      let response = ''
      const message = formData.message.toLowerCase()
      const selectedService = formData.service.toLowerCase()
      
      if (message.includes('b2b') || selectedService.includes('b2b')) {
        response = " B2B Consultancy: We specialize in strategic partnerships across Africa and global markets. Our services include market entry, partnership development, and corporate growth planning. Would you like to schedule a consultation?"
      } 
      else if (message.includes('education') || selectedService.includes('education')) {
        response = " Education Consultancy: We help students gain admission to top universities in Europe and the UK. Our services include university selection, application assistance, and visa guidance. What country are you interested in?"
      } 
      else if (message.includes('visa') || selectedService.includes('visa')) {
        response = " Visa Services: We provide comprehensive visa assistance for Gulf countries including UAE, Saudi Arabia, Qatar, and more. We handle business, tourist, and residency visas. Which country are you applying for?"
      } 
      else if (message.includes('omra') || selectedService.includes('omra')) {
        response = " Omra Travel: Our premium packages include VIP accommodations, professional guides, and complete travel arrangements. Packages start from ,500. Would you like detailed pricing?"
      } 
      else if (message.includes('vehicle') || selectedService.includes('vehicle')) {
        response = " Vehicle Import/Export: We source new and used vehicles globally. Services include sourcing, logistics, shipping, and customs clearance. What make and model are you looking for?"
      } 
      else if (message.includes('government') || selectedService.includes('government')) {
        response = " Government Liaison: We handle PRO services, document clearing, and official approvals. We ensure 100% compliance and fast processing times. How can we assist you?"
      }
      else {
        response = " Thank you for reaching out to Massaba Consulting! One of our specialists will contact you within 24 hours. In the meantime, you can call us at +971 525 019 802. How else can I help you today?"
      }
      
      setAiResponse(response)
      setIsAiThinking(false)
    }, 1000)
  }

  const services = [
    'Select a service',
    'B2B Consultancy',
    'Education Consultancy',
    'Government Liaison',
    'Omra Travel',
    'Visa Services',
    'Vehicle Import/Export'
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get in touch with us. We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Office Address</p>
                    <p className="text-white text-sm leading-relaxed">
                      Massaba Consulting<br />
                      Compass Building, Al Shohada Road<br />
                      Al Hamra Industrial Zone, FZ<br />
                      RAK, UAE
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Phone & WhatsApp</p>
                    <a href="tel:+971525019802" className="text-white hover:text-amber-500 transition block mb-1">
                      +971 525 019 802
                    </a>
                    <a href="https://wa.me/971525019802" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition text-sm inline-flex items-center gap-1">
                      WhatsApp <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Email</p>
                    <a href="mailto:massaba555@yahoo.fr" className="text-white hover:text-amber-500 transition break-all">
                      massaba555@yahoo.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Globe className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Business Hours</p>
                    <p className="text-white text-sm">
                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                      Friday - Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-900" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Need quick help? Fill in the form above and click "AI Assist" for instant answers.
              </p>
              
              {isAiThinking && (
                <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-300 text-sm">AI is analyzing your request...</p>
                  </div>
                </div>
              )}
              
              {aiResponse && !isAiThinking && (
                <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-200 text-sm leading-relaxed">{aiResponse}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thank you for contacting Massaba Consulting. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm font-medium">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm font-medium">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 text-sm font-medium">Service Interested In</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                      >
                        {services.map((service, index) => (
                          <option key={index} value={service === 'Select a service' ? '' : service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition resize-none"
                      placeholder="Tell us how we can help you... (Example: I need help with a business visa for Dubai)"
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-4 flex-wrap">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleAiAssist}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      AI Assist
                    </button>
                  </div>
                  
                  <p className="text-slate-500 text-xs text-center">
                     Tip: Try the AI Assist button after selecting a service or typing your question!
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}