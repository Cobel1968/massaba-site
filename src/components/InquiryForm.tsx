'use client'

import { useState } from 'react'

export default function InquiryForm() {

  const [status, setStatus] = useState('')

  async function handleSubmit(e:any) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const res = await fetch('/api/inquiry', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
      })
    })

    if(res.ok){
      setStatus('Request sent successfully.')
      e.target.reset()
    } else {
      setStatus('Something went wrong.')
    }
  }

  return (
    <section className="section-large">

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Request a Consultation
        </h2>

        <p className="mt-4 text-slate-300">
          Tell us about your needs and our consultancy team
          will respond with guidance and opportunities.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-16 max-w-2xl mx-auto space-y-6"
      >

        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
        />

        <select
          name="service"
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
        >
          <option>Education Consultancy</option>
          <option>Vehicle Import / Export</option>
          <option>Visa Services</option>
          <option>Government Liaison</option>
          <option>Omra Travel</option>
        </select>

        <textarea
          name="message"
          placeholder="Describe your request"
          rows={5}
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
        />

        <button
          type="submit"
          className="w-full p-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold"
        >
          Send Request
        </button>

        {status && (
          <p className="text-center text-amber-400">
            {status}
          </p>
        )}

      </form>

    </section>
  )
}
