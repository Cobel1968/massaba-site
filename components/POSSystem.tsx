'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Send, Phone, Mail, CreditCard, Banknote, Wallet, Receipt, Printer, RefreshCw } from 'lucide-react'

export default function POSSystem() {
  const [transactions, setTransactions] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [newTransaction, setNewTransaction] = useState({
    client_id: '',
    amount: '',
    payment_method: 'Cash',
    description: '',
    service_type: ''
  })

  useEffect(() => {
    fetchTransactions()
    fetchClients()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('transactions')
      .select('*, clients(full_name, client_number)')
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (data) setTransactions(data)
    if (error) console.error('Error fetching transactions:', error)
    setLoading(false)
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
    setSubmitting(true)
    setMessage('')

    const amount = parseFloat(newTransaction.amount)
    const vatAmount = amount * 0.05
    const totalAmount = amount + vatAmount

    const { error } = await supabase
      .from('transactions')
      .insert([{
        client_id: newTransaction.client_id,
        amount: amount,
        vat_amount: vatAmount,
        vat_rate: 5,
        payment_method: newTransaction.payment_method,
        description: newTransaction.description,
        transaction_type: 'Payment',
        status: 'completed'
      }])

    if (error) {
      setMessage(' Error: ' + error.message)
    } else {
      setMessage(' Payment recorded successfully!')
      setNewTransaction({
        client_id: '',
        amount: '',
        payment_method: 'Cash',
        description: '',
        service_type: ''
      })
      fetchTransactions()
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    }
    setSubmitting(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const serviceTypes = [
    'B2B Consultancy',
    'Education Consultancy',
    'Government Liaison',
    'Omra Travel',
    'Visa Services',
    'Vehicle Import/Export'
  ]

  const paymentMethods = [
    'Cash',
    'Bank Transfer',
    'Credit Card',
    'Debit Card',
    'Cheque',
    'Crypto'
  ]

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white"> Record Payment</h3>
            <button 
              onClick={fetchTransactions}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">Client *</label>
              <select
                value={newTransaction.client_id}
                onChange={(e) => setNewTransaction({...newTransaction, client_id: e.target.value})}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
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
              <label className="block text-slate-300 mb-2 text-sm font-medium">Amount (AED) *</label>
              <input
                type="number"
                step="0.01"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                required
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
              {newTransaction.amount && (
                <div className="mt-2 p-2 bg-slate-700/50 rounded-lg text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span>AED {parseFloat(newTransaction.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>VAT (5%):</span>
                    <span>AED {(parseFloat(newTransaction.amount) * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold mt-1 pt-1 border-t border-slate-600">
                    <span>Total:</span>
                    <span>AED {(parseFloat(newTransaction.amount) * 1.05).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setNewTransaction({...newTransaction, payment_method: method})}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      newTransaction.payment_method === method
                        ? 'bg-amber-500 text-slate-900'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {method === 'Cash' && <Banknote className="w-4 h-4 inline mr-1" />}
                    {method === 'Bank Transfer' && <CreditCard className="w-4 h-4 inline mr-1" />}
                    {method === 'Credit Card' && <CreditCard className="w-4 h-4 inline mr-1" />}
                    {method === 'Debit Card' && <Wallet className="w-4 h-4 inline mr-1" />}
                    {method}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">Service Type</label>
              <select
                value={newTransaction.service_type}
                onChange={(e) => setNewTransaction({...newTransaction, service_type: e.target.value, description: `Payment for ${e.target.value}`})}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">Select Service (Optional)</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">Description</label>
              <textarea
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                rows={2}
                placeholder="Payment description..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Processing...' : 'Record Payment'}
            </button>
          </form>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white"> Recent Transactions</h3>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-slate-400">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">No transactions yet</div>
          ) : (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-800">
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 text-slate-400">Date</th>
                    <th className="text-left py-3 text-slate-400">Client</th>
                    <th className="text-right py-3 text-slate-400">Amount</th>
                    <th className="text-right py-3 text-slate-400">VAT</th>
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
                        <span className="text-slate-500 text-xs block">{tx.clients?.client_number}</span>
                      </td>
                      <td className="py-2 text-green-400 text-right font-medium">
                        AED {tx.amount?.toFixed(2)}
                      </td>
                      <td className="py-2 text-slate-400 text-right">
                        AED {tx.vat_amount?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Transactions:</span>
              <span className="text-white font-bold">{transactions.length}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-slate-400">Total Revenue:</span>
              <span className="text-green-400 font-bold">
                AED {transactions.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}