'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function POSSystem() {
  const [transactions, setTransactions] = useState([])
  const [clients, setClients] = useState([])
  const [newTransaction, setNewTransaction] = useState({
    client_id: '',
    amount: '',
    payment_method: 'Cash',
    description: '',
    service_type: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTransactions()
    fetchClients()
  }, [])

  const fetchTransactions = async () => {
    const { data } = await supabase
      .from('transactions')
      .select('*, clients(full_name)')
      .order('created_at', { ascending: false })
      .limit(20)
    if (data) setTransactions(data)
  }

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('id, full_name, client_number')
      .order('full_name')
    if (data) setClients(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const vat_rate = 0.05 // 5% VAT
    const amount = parseFloat(newTransaction.amount)
    const vat_amount = amount * vat_rate

    const { error } = await supabase
      .from('transactions')
      .insert([{
        client_id: newTransaction.client_id,
        amount: amount,
        vat_amount: vat_amount,
        vat_rate: 5,
        payment_method: newTransaction.payment_method,
        description: newTransaction.description,
        transaction_type: 'Payment',
        status: 'completed'
      }])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Payment recorded successfully!')
      setNewTransaction({
        client_id: '',
        amount: '',
        payment_method: 'Cash',
        description: '',
        service_type: ''
      })
      fetchTransactions()
    }
    setLoading(false)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">POS System</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Record Payment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">Client</label>
              <select
                value={newTransaction.client_id}
                onChange={(e) => setNewTransaction({...newTransaction, client_id: e.target.value})}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.full_name} ({client.client_number})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2">Amount (AED)</label>
              <input
                type="number"
                step="0.01"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                required
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2">Payment Method</label>
              <select
                value={newTransaction.payment_method}
                onChange={(e) => setNewTransaction({...newTransaction, payment_method: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
              >
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Cheque</option>
              </select>
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2">Description</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
                placeholder="Service payment"
              />
            </div>
            
            {message && (
              <div className={p-3 rounded-lg }>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 rounded-lg"
            >
              {loading ? 'Processing...' : 'Record Payment'}
            </button>
          </form>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400">Date</th>
                  <th className="text-left py-2 text-slate-400">Client</th>
                  <th className="text-right py-2 text-slate-400">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-slate-700">
                    <td className="py-2 text-slate-300">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 text-slate-300">
                      {tx.clients?.full_name || 'N/A'}
                    </td>
                    <td className="py-2 text-slate-300 text-right">
                      AED {tx.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}