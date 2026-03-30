'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { 
  Send, Printer, RefreshCw, Plus, Receipt, CheckCircle, Clock, 
  Truck, Shield, Package, DollarSign, Percent, Calendar, User,
  CreditCard, Banknote, Wallet, Search, Filter, Download
} from 'lucide-react'

export default function POSSystem() {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [clientDetails, setClientDetails] = useState(null)
  const [servicePackages, setServicePackages] = useState([])
  const [clientCharges, setClientCharges] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showNewCharge, setShowNewCharge] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [customValues, setCustomValues] = useState({
    vehicle_value: 0,
    customs_rate: 5,
    excise_rate: 0
  })

  useEffect(() => {
    fetchClients()
    fetchServicePackages()
  }, [])

  useEffect(() => {
    if (selectedClient) {
      fetchClientDetails()
      fetchClientCharges()
      fetchClientTransactions()
    }
  }, [selectedClient])

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('id, full_name, client_number, email, phone, client_type')
      .order('full_name')
    if (data) setClients(data)
    setLoading(false)
  }

  const fetchClientDetails = async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('id', selectedClient)
      .single()
    if (data) setClientDetails(data)
  }

  const fetchServicePackages = async () => {
    const { data } = await supabase
      .from('service_packages')
      .select('*')
      .eq('is_active', true)
      .order('service_type')
    if (data) setServicePackages(data)
  }

  const fetchClientCharges = async () => {
    const { data } = await supabase
      .from('service_charges')
      .select('*')
      .eq('client_id', selectedClient)
      .order('created_at', { ascending: false })
    if (data) setClientCharges(data)
  }

  const fetchClientTransactions = async () => {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('client_id', selectedClient)
      .order('created_at', { ascending: false })
      .limit(20)
    if (data) setTransactions(data)
  }

  const calculateTotal = (pkg, vehicleValue = 0) => {
    let base = pkg.base_price
    let customs = 0
    let excise = 0
    let delivery = pkg.includes_delivery ? 500 : 0
    let insurance = pkg.includes_insurance ? 300 : 0

    if (pkg.service_type === 'Vehicle Import/Export' && vehicleValue > 0) {
      customs = vehicleValue * (customValues.customs_rate / 100)
      excise = vehicleValue * (customValues.excise_rate / 100)
    }

    const subtotal = base + customs + excise + delivery + insurance
    const vat = subtotal * 0.05
    const total = subtotal + vat

    return { base, customs, excise, delivery, insurance, vat, total }
  }

  const handleAddCharge = async () => {
    if (!selectedPackage) {
      setMessage(' Please select a package')
      return
    }

    setSubmitting(true)
    
    let vehicleValue = 0
    if (selectedPackage.service_type === 'Vehicle Import/Export') {
      vehicleValue = parseFloat(customValues.vehicle_value) || 0
      if (vehicleValue <= 0) {
        setMessage(' Please enter vehicle value for customs calculation')
        setSubmitting(false)
        return
      }
    }

    const totals = calculateTotal(selectedPackage, vehicleValue)

    const chargeData = {
      client_id: selectedClient,
      service_type: selectedPackage.service_type,
      package_name: selectedPackage.package_name,
      description: selectedPackage.description,
      base_amount: totals.base,
      customs_duty: totals.customs,
      excise_tax: totals.excise,
      delivery_fee: totals.delivery,
      insurance_fee: totals.insurance,
      vat_amount: totals.vat,
      total_amount: totals.total,
      status: 'pending',
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    const { error } = await supabase.from('service_charges').insert([chargeData])

    if (error) {
      setMessage(' Error: ' + error.message)
    } else {
      setMessage(' Service charge added successfully!')
      setShowNewCharge(false)
      setSelectedPackage(null)
      setSelectedServiceType('')
      setCustomValues({ vehicle_value: 0, customs_rate: 5, excise_rate: 0 })
      fetchClientCharges()
    }
    setSubmitting(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleRecordPayment = async (charge) => {
    setSubmitting(true)

    const { error } = await supabase
      .from('transactions')
      .insert([{
        client_id: selectedClient,
        service_enrollment_id: charge.id,
        amount: charge.total_amount,
        vat_amount: charge.vat_amount,
        vat_rate: 5,
        payment_method: 'Cash',
        description: `Payment for ${charge.package_name}`,
        transaction_type: 'Payment',
        status: 'completed'
      }])

    if (error) {
      setMessage(' Error: ' + error.message)
    } else {
      await supabase
        .from('service_charges')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', charge.id)

      setMessage(' Payment recorded successfully!')
      fetchClientCharges()
      fetchClientTransactions()
    }
    setSubmitting(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Paid</span>
    }
    return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
  }

  const packagesByType = servicePackages.reduce((acc, pkg) => {
    if (!acc[pkg.service_type]) acc[pkg.service_type] = []
    acc[pkg.service_type].push(pkg)
    return acc
  }, {})

  const totalPending = clientCharges.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.total_amount, 0)
  const totalPaid = clientCharges.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.total_amount, 0)

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {message}
        </div>
      )}

      {/* Client Selection */}
      <div className="bg-slate-800 rounded-xl p-6">
        <label className="block text-slate-300 mb-2 text-sm font-medium">Select Client</label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        >
          <option value="">-- Select a client --</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.full_name} ({client.client_number}) - {client.email}
            </option>
          ))}
        </select>
      </div>

      {selectedClient && clientDetails && (
        <>
          {/* Client Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-xl p-4">
              <User className="w-5 h-5 text-amber-500 mb-2" />
              <p className="text-slate-400 text-xs">Client ID</p>
              <p className="text-white font-bold">{clientDetails.client_number}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <DollarSign className="w-5 h-5 text-yellow-500 mb-2" />
              <p className="text-slate-400 text-xs">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">AED {totalPending.toFixed(2)}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
              <p className="text-slate-400 text-xs">Paid</p>
              <p className="text-2xl font-bold text-green-400">AED {totalPaid.toFixed(2)}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <Calendar className="w-5 h-5 text-amber-500 mb-2" />
              <p className="text-slate-400 text-xs">Client Since</p>
              <p className="text-white font-bold">{new Date(clientDetails.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Service Charges Section */}
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white"> Service Charges</h3>
              <button
                onClick={() => setShowNewCharge(!showNewCharge)}
                className="flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-900 rounded-lg text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Charge
              </button>
            </div>

            {/* Add New Charge Form */}
            {showNewCharge && (
              <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">Service Type</label>
                    <select
                      value={selectedServiceType}
                      onChange={(e) => setSelectedServiceType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white"
                    >
                      <option value="">Select service</option>
                      {Object.keys(packagesByType).map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">Package</label>
                    <select
                      value={selectedPackage?.package_name || ''}
                      onChange={(e) => {
                        const pkg = servicePackages.find(p => p.package_name === e.target.value)
                        setSelectedPackage(pkg)
                      }}
                      disabled={!selectedServiceType}
                      className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white"
                    >
                      <option value="">Select package</option>
                      {selectedServiceType && packagesByType[selectedServiceType]?.map(pkg => (
                        <option key={pkg.package_name} value={pkg.package_name}>
                          {pkg.package_name} - AED {pkg.base_price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Import Specific Fields */}
                {selectedPackage?.service_type === 'Vehicle Import/Export' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-slate-800 rounded-lg">
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm flex items-center gap-1"><Truck className="w-4 h-4" /> Vehicle Value (AED)</label>
                      <input
                        type="number"
                        step="1000"
                        value={customValues.vehicle_value}
                        onChange={(e) => setCustomValues({...customValues, vehicle_value: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white"
                        placeholder="Enter vehicle value"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm flex items-center gap-1"><Percent className="w-4 h-4" /> Customs Duty (%)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={customValues.customs_rate}
                        onChange={(e) => setCustomValues({...customValues, customs_rate: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm flex items-center gap-1"><Percent className="w-4 h-4" /> Excise Tax (%)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={customValues.excise_rate}
                        onChange={(e) => setCustomValues({...customValues, excise_rate: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Cost Breakdown */}
                {selectedPackage && (
                  <div className="mb-4 p-4 bg-slate-800 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Cost Breakdown</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Base Price:</span>
                        <span className="text-white">AED {selectedPackage.base_price.toLocaleString()}</span>
                      </div>
                      {selectedPackage.service_type === 'Vehicle Import/Export' && customValues.vehicle_value > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Customs Duty ({customValues.customs_rate}%):</span>
                            <span className="text-white">AED {(customValues.vehicle_value * customValues.customs_rate / 100).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Excise Tax ({customValues.excise_rate}%):</span>
                            <span className="text-white">AED {(customValues.vehicle_value * customValues.excise_rate / 100).toLocaleString()}</span>
                          </div>
                        </>
                      )}
                      {selectedPackage.includes_delivery && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Delivery Fee:</span>
                          <span className="text-white">AED 500</span>
                        </div>
                      )}
                      {selectedPackage.includes_insurance && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Insurance:</span>
                          <span className="text-white">AED 300</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-slate-700">
                        <span className="text-slate-400">VAT (5%):</span>
                        <span className="text-white">AED {calculateTotal(selectedPackage, customValues.vehicle_value).vat.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-slate-700">
                        <span className="text-amber-400">Total Amount:</span>
                        <span className="text-amber-400">AED {calculateTotal(selectedPackage, customValues.vehicle_value).total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowNewCharge(false)} className="px-4 py-2 bg-slate-600 rounded-lg">Cancel</button>
                  <button onClick={handleAddCharge} disabled={submitting} className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium">Add Charge</button>
                </div>
              </div>
            )}

            {/* Charges List */}
            {clientCharges.length === 0 ? (
              <div className="text-center py-8 text-slate-400">No service charges yet. Click "Add Charge" above.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Service</th>
                      <th className="text-left py-3 text-slate-400">Package</th>
                      <th className="text-right py-3 text-slate-400">Amount</th>
                      <th className="text-right py-3 text-slate-400">VAT</th>
                      <th className="text-right py-3 text-slate-400">Total</th>
                      <th className="text-center py-3 text-slate-400">Status</th>
                      <th className="text-center py-3 text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientCharges.map(charge => (
                      <tr key={charge.id} className="border-b border-slate-700">
                        <td className="py-3 text-slate-300">{charge.service_type}</td>
                        <td className="py-3 text-white">{charge.package_name}</td>
                        <td className="py-3 text-slate-300 text-right">AED {charge.base_amount?.toLocaleString()}</td>
                        <td className="py-3 text-slate-300 text-right">AED {charge.vat_amount?.toLocaleString()}</td>
                        <td className="py-3 text-white font-medium text-right">AED {charge.total_amount?.toLocaleString()}</td>
                        <td className="py-3 text-center">{getStatusBadge(charge.status)}</td>
                        <td className="py-3 text-center">
                          {charge.status === 'pending' && (
                            <button
                              onClick={() => handleRecordPayment(charge)}
                              disabled={submitting}
                              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30"
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

          {/* Transaction History */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4"> Payment History</h3>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-slate-400">No payment history</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Date</th>
                      <th className="text-left py-3 text-slate-400">Description</th>
                      <th className="text-right py-3 text-slate-400">Amount</th>
                      <th className="text-right py-3 text-slate-400">VAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id} className="border-b border-slate-700">
                        <td className="py-2 text-slate-300">{new Date(tx.created_at).toLocaleDateString()}</td>
                        <td className="py-2 text-slate-300">{tx.description || 'Payment'}</td>
                        <td className="py-2 text-green-400 text-right font-medium">AED {tx.amount?.toLocaleString()}</td>
                        <td className="py-2 text-slate-400 text-right">AED {tx.vat_amount?.toLocaleString()}</td>
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
  )
}