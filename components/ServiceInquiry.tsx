'use client'
import { useState } from 'react'
import { Send, Phone, Mail } from 'lucide-react'

interface ServiceInquiryProps {
  serviceName: string
}

export default function ServiceInquiry({ serviceName }: ServiceInquiryProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1500)
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 md:p-8 sticky top-24">
      <h2 className="text-2xl font-bold text-white mb-2">Request Information</h2>
      <p className="text-slate-400 mb-6">Get details about {serviceName}</p>
      
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
          <p className="text-slate-400">Thank you! We'll contact you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name *"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email *"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
          />
          
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone *"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
          />
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Your message..."
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
          ></textarea>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      )}
      
      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-slate-400 text-sm text-center mb-3">Or contact us directly:</p>
        <div className="flex gap-3">
          <a 
            href="tel:+971525019802" 
            className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 rounded-lg transition"
          >
            <Phone size={14} /> Call
          </a>
          <a 
            href="mailto:massaba555@yahoo.fr?subject=Inquiry%20about%20services&body=Hello,%20I%20would%20like%20more%20information%20about%20your%20services." 
            className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 rounded-lg transition"
          >
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </div>
  )
}