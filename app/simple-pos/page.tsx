'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function SimplePOS() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
      if (session?.user) fetchClients()
    })
  }, [])

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('id, full_name, client_number')
    if (data) setClients(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const vatAmount = parseFloat(amount) * 0.05

    const { error } = await supabase.from('transactions').insert([{
      client_id: selectedClient,
      amount: parseFloat(amount),
      vat_amount: vatAmount,
      vat_rate: 5,
      payment_method: paymentMethod,
      transaction_type: 'Payment',
      status: 'completed',
      description: 'POS Payment'
    }])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(' Payment recorded successfully!')
      setAmount('')
    }
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center">
        <h1 className="text-2xl text-white mb-4">Please Login First</h1>
        <a href="/login" className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg">Go to Login</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6">POS System</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">Select Client</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              >
                <option value="">Select a client</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.full_name} ({c.client_number})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Amount (AED)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              />
              <p className="text-slate-500 text-sm mt-1">VAT (5%): {(parseFloat(amount) * 0.05).toFixed(2)} AED</p>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              >
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Cheque</option>
              </select>
            </div>

            {message && (
              <div className={`p-3 rounded-lg ${message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg"
            >
              {loading ? 'Processing...' : 'Record Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}