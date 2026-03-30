'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function POSPage() {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [servicePackages, setServicePackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [clientCharges, setClientCharges] = useState([])
  const [vehicleValue, setVehicleValue] = useState(0)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddCharge, setShowAddCharge] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedClient) {
      loadClientCharges()
    }
  }, [selectedClient])

  async function loadData() {
    setLoading(true)
    const { data: clientsData } = await supabase.from('clients').select('id, full_name, client_number')
    if (clientsData) setClients(clientsData)
    
    const { data: packagesData } = await supabase.from('service_packages').select('*').eq('is_active', true)
    if (packagesData) setServicePackages(packagesData)
    
    setLoading(false)
  }

  async function loadClientCharges() {
    const { data } = await supabase
      .from('service_charges')
      .select('*')
      .eq('client_id', selectedClient)
      .order('created_at', { ascending: false })
    if (data) setClientCharges(data)
  }

  async function addCharge() {
    if (!selectedPackage) {
      setMessage('Please select a package')
      return
    }

    setLoading(true)
    
    let customs = 0
    if (selectedPackage.service_type === 'Vehicle Import/Export' && vehicleValue > 0) {
      customs = vehicleValue * 0.05
    }
    
    const baseAmount = selectedPackage.base_price
    const deliveryFee = selectedPackage.includes_delivery ? 500 : 0
    const insuranceFee = selectedPackage.includes_insurance ? 300 : 0
    const subtotal = baseAmount + customs + deliveryFee + insuranceFee
    const vat = subtotal * 0.05
    const total = subtotal + vat

    const { error } = await supabase.from('service_charges').insert([{
      client_id: selectedClient,
      service_type: selectedPackage.service_type,
      package_name: selectedPackage.package_name,
      description: selectedPackage.description,
      base_amount: baseAmount,
      customs_duty: customs,
      delivery_fee: deliveryFee,
      insurance_fee: insuranceFee,
      vat_amount: vat,
      total_amount: total,
      status: 'pending',
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('✓ Charge added successfully!')
      setShowAddCharge(false)
      setSelectedPackage(null)
      setVehicleValue(0)
      loadClientCharges()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  async function recordPayment(charge) {
    setLoading(true)
    
    const { error } = await supabase.from('transactions').insert([{
      client_id: selectedClient,
      amount: charge.total_amount,
      vat_amount: charge.vat_amount,
      vat_rate: 5,
      payment_method: 'Cash',
      description: `Payment for ${charge.package_name}`,
      transaction_type: 'Payment',
      status: 'completed'
    }])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      await supabase
        .from('service_charges')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', charge.id)
      
      setMessage('✓ Payment recorded!')
      loadClientCharges()
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const totalPending = clientCharges.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.total_amount, 0)
  const totalPaid = clientCharges.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.total_amount, 0)

  if (loading && clients.length === 0) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">💰 POS System</h1>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('✓') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Client Selection */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <label className="block text-slate-300 mb-2">Select Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full p-3 bg-slate-700 rounded-lg text-white"
          >
            <option value="">-- Select Client --</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.full_name} ({c.client_number})</option>
            ))}
          </select>
        </div>

        {selectedClient && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">AED {totalPending.toLocaleString()}</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-sm">Paid</p>
                <p className="text-2xl font-bold text-green-400">AED {totalPaid.toLocaleString()}</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-white">AED {(totalPending + totalPaid).toLocaleString()}</p>
              </div>
            </div>

            {/* Add Charge Button */}
            {!showAddCharge && (
              <button
                onClick={() => setShowAddCharge(true)}
                className="w-full bg-amber-500 text-slate-900 p-3 rounded-lg font-bold mb-6"
              >
                + Add New Charge
              </button>
            )}

            {/* Add Charge Form */}
            {showAddCharge && (
              <div className="bg-slate-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Add Service Charge</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Service Package</label>
                    <select
                      value={selectedPackage?.id || ''}
                      onChange={(e) => {
                        const pkg = servicePackages.find(p => p.id === e.target.value)
                        setSelectedPackage(pkg)
                      }}
                      className="w-full p-3 bg-slate-700 rounded-lg text-white"
                    >
                      <option value="">Select package</option>
                      {servicePackages.map(p => (
                        <option key={p.id} value={p.id}>{p.service_type} - {p.package_name} (AED {p.base_price})</option>
                      ))}
                    </select>
                  </div>

                  {selectedPackage?.service_type === 'Vehicle Import/Export' && (
                    <div>
                      <label className="block text-slate-300 mb-1">Vehicle Value (AED)</label>
                      <input
                        type="number"
                        value={vehicleValue}
                        onChange={(e) => setVehicleValue(parseFloat(e.target.value) || 0)}
                        className="w-full p-3 bg-slate-700 rounded-lg text-white"
                        placeholder="Enter vehicle value for customs calculation"
                      />
                      {vehicleValue > 0 && (
                        <p className="text-slate-400 text-sm mt-1">
                          Customs Duty (5%): AED {(vehicleValue * 0.05).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedPackage && (
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <h3 className="text-white font-bold mb-2">Cost Breakdown</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span>Base Price:</span><span>AED {selectedPackage.base_price}</span></div>
                        {selectedPackage.includes_delivery && <div className="flex justify-between"><span>Delivery:</span><span>AED 500</span></div>}
                        {selectedPackage.includes_insurance && <div className="flex justify-between"><span>Insurance:</span><span>AED 300</span></div>}
                        {selectedPackage.service_type === 'Vehicle Import/Export' && vehicleValue > 0 && (
                          <div className="flex justify-between"><span>Customs Duty (5%):</span><span>AED {(vehicleValue * 0.05).toLocaleString()}</span></div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-slate-600"><span>VAT (5%):</span><span>AED {((selectedPackage.base_price + (selectedPackage.includes_delivery ? 500 : 0) + (selectedPackage.includes_insurance ? 300 : 0) + (vehicleValue * 0.05)) * 0.05).toLocaleString()}</span></div>
                        <div className="flex justify-between font-bold pt-2 border-t border-slate-600"><span>TOTAL:</span><span>AED {((selectedPackage.base_price + (selectedPackage.includes_delivery ? 500 : 0) + (selectedPackage.includes_insurance ? 300 : 0) + (vehicleValue * 0.05)) * 1.05).toLocaleString()}</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={addCharge} disabled={loading} className="flex-1 bg-amber-500 text-slate-900 p-2 rounded-lg font-bold">Add Charge</button>
                    <button onClick={() => { setShowAddCharge(false); setSelectedPackage(null); setVehicleValue(0) }} className="flex-1 bg-slate-700 text-white p-2 rounded-lg">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Charges List */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Service Charges</h2>
              {clientCharges.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No charges yet. Click "Add New Charge" to create one.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2">Service</th>
                        <th className="text-left py-2">Package</th>
                        <th className="text-right py-2">Amount</th>
                        <th className="text-right py-2">Total</th>
                        <th className="text-center py-2">Status</th>
                        <th className="text-center py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientCharges.map(charge => (
                        <tr key={charge.id} className="border-b border-slate-700">
                          <td className="py-2 text-slate-300">{charge.service_type}</td>
                          <td className="py-2 text-white">{charge.package_name}</td>
                          <td className="py-2 text-slate-300 text-right">AED {charge.base_amount?.toLocaleString()}</td>
                          <td className="py-2 text-white font-bold text-right">AED {charge.total_amount?.toLocaleString()}</td>
                          <td className="py-2 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${charge.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {charge.status}
                            </span>
                          </td>
                          <td className="py-2 text-center">
                            {charge.status === 'pending' && (
                              <button
                                onClick={() => recordPayment(charge)}
                                className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm"
                              >
                                Record Payment
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}