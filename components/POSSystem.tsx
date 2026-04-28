'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { 
  Send, Printer, RefreshCw, Plus, Receipt, CheckCircle, Clock, 
  Truck, Shield, Package, DollarSign, Percent, Calendar, User,
  CreditCard, Banknote, Wallet, Search, Filter, Download, ShoppingCart, Trash2
} from 'lucide-react'

export default function POSSystem() {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [clientDetails, setClientDetails] = useState(null)
  const [servicePackages, setServicePackages] = useState([])
  const [clientCharges, setClientCharges] = useState([])
  const [transactions, setTransactions] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showNewCharge, setShowNewCharge] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [customValues, setCustomValues] = useState({
    vehicle_value: 0,
    customs_rate: 5,
    excise_rate: 0,
    quantity: 1
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

  const addToCart = () => {
    if (!selectedPackage) {
      setMessage(' Please select a package')
      return
    }

    let vehicleValue = 0
    if (selectedPackage.service_type === 'Vehicle Import/Export') {
      vehicleValue = (typeof customValues.vehicle_value === "string" ? (typeof customValues.vehicle_value === "string" ? parseFloat(customValues.vehicle_value) : customValues.vehicle_value) : customValues.vehicle_value) || 0
      if (vehicleValue <= 0) {
        setMessage(' Please enter vehicle value for customs calculation')
        return
      }
    }

    const quantity = customValues.quantity || 1
    let base = selectedPackage.base_price * quantity
    let customs = 0
    let excise = 0
    let delivery = selectedPackage.includes_delivery ? 500 * quantity : 0
    let insurance = selectedPackage.includes_insurance ? 300 * quantity : 0

    if (selectedPackage.service_type === 'Vehicle Import/Export' && vehicleValue > 0) {
      customs = vehicleValue * (customValues.customs_rate / 100) * quantity
      excise = vehicleValue * (customValues.excise_rate / 100) * quantity
    }

    const subtotal = base + customs + excise + delivery + insurance
    const vat = subtotal * 0.05
    const total = subtotal + vat

    const cartItem = {
      id: Date.now(),
      package_id: selectedPackage.id,
      service_type: selectedPackage.service_type,
      package_name: selectedPackage.package_name,
      description: selectedPackage.description,
      quantity: quantity,
      unit_price: selectedPackage.base_price,
      base_amount: base,
      customs_duty: customs,
      excise_tax: excise,
      delivery_fee: delivery,
      insurance_fee: insurance,
      vat_amount: vat,
      total_amount: total,
      vehicle_value: vehicleValue
    }

    setCart([...cart, cartItem])
    setSelectedPackage(null)
    setSelectedServiceType('')
    setCustomValues({ vehicle_value: 0, customs_rate: 5, excise_rate: 0, quantity: 1 })
    setMessage(' Item added to cart')
    setTimeout(() => setMessage(''), 2000)
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const processOrder = async () => {
    if (cart.length === 0) {
      setMessage(' Cart is empty')
      return
    }

    setSubmitting(true)

    let allSuccess = true
    for (const item of cart) {
      const chargeData = {
        client_id: selectedClient,
        service_type: item.service_type,
        package_name: item.package_name,
        description: item.description,
        base_amount: item.base_amount,
        customs_duty: item.customs_duty,
        excise_tax: item.excise_tax,
        delivery_fee: item.delivery_fee,
        insurance_fee: item.insurance_fee,
        vat_amount: item.vat_amount,
        total_amount: item.total_amount,
        status: 'pending',
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }

      const { error } = await supabase.from('service_charges').insert([chargeData])

      if (error) {
        allSuccess = false
        setMessage(' Error: ' + error.message)
        break
      }
    }

    if (allSuccess) {
      setMessage(' Order processed successfully!')
      setCart([])
      fetchClientCharges()
    }

    setSubmitting(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const recordPayment = async (charge) => {
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

  const cartTotal = cart.reduce((sum, item) => sum + item.total_amount, 0)
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
              <ShoppingCart className="w-5 h-5 text-amber-500 mb-2" />
              <p className="text-slate-400 text-xs">Cart Total</p>
              <p className="text-2xl font-bold text-amber-400">AED {cartTotal.toFixed(2)}</p>
            </div>
          </div>

          {/* Order Form / Cart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Items to Cart */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white"> Add to Order</h3>
                <button
                  onClick={() => setShowNewCharge(!showNewCharge)}
                  className="flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-900 rounded-lg text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={customValues.quantity}
                        onChange={(e) => setCustomValues({...customValues, quantity: parseInt(e.target.value) || 1})}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

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

                  {selectedPackage && (
                    <div className="mb-4 p-4 bg-slate-800 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Cost Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Unit Price:</span>
                          <span className="text-white">AED {selectedPackage.base_price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Quantity:</span>
                          <span className="text-white">x{customValues.quantity}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-700">
                          <span className="text-slate-400">Subtotal:</span>
                          <span className="text-white">AED {(selectedPackage.base_price * customValues.quantity).toLocaleString()}</span>
                        </div>
                        {selectedPackage.service_type === 'Vehicle Import/Export' && customValues.vehicle_value > 0 && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Customs Duty ({customValues.customs_rate}%):</span>
                              <span className="text-white">AED {(customValues.vehicle_value * customValues.customs_rate / 100 * customValues.quantity).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Excise Tax ({customValues.excise_rate}%):</span>
                              <span className="text-white">AED {(customValues.vehicle_value * customValues.excise_rate / 100 * customValues.quantity).toLocaleString()}</span>
                            </div>
                          </>
                        )}
                        {selectedPackage.includes_delivery && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Delivery Fee:</span>
                            <span className="text-white">AED {(500 * customValues.quantity).toLocaleString()}</span>
                          </div>
                        )}
                        {selectedPackage.includes_insurance && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Insurance:</span>
                            <span className="text-white">AED {(300 * customValues.quantity).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-slate-400">VAT (5%):</span>
                          <span className="text-white">AED {((selectedPackage.base_price * customValues.quantity + (customValues.vehicle_value * customValues.customs_rate / 100 * customValues.quantity) + (selectedPackage.includes_delivery ? 500 * customValues.quantity : 0) + (selectedPackage.includes_insurance ? 300 * customValues.quantity : 0)) * 0.05).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t border-slate-700">
                          <span className="text-amber-400">Total:</span>
                          <span className="text-amber-400">AED {((selectedPackage.base_price * customValues.quantity + (customValues.vehicle_value * customValues.customs_rate / 100 * customValues.quantity) + (selectedPackage.includes_delivery ? 500 * customValues.quantity : 0) + (selectedPackage.includes_insurance ? 300 * customValues.quantity : 0)) * 1.05).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={addToCart} className="flex-1 bg-amber-500 text-slate-900 py-2 rounded-lg font-bold">Add to Cart</button>
                    <button onClick={() => { setShowNewCharge(false); setSelectedPackage(null); setSelectedServiceType(''); setCustomValues({ vehicle_value: 0, customs_rate: 5, excise_rate: 0, quantity: 1 }) }} className="flex-1 bg-slate-700 text-white py-2 rounded-lg">Cancel</button>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              {cart.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Cart Items ({cart.length})</h4>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg mb-2">
                      <div>
                        <p className="text-white font-medium">{item.package_name}</p>
                        <p className="text-slate-400 text-sm">Qty: {item.quantity} | AED {item.total_amount.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={processOrder}
                    disabled={submitting}
                    className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
                  >
                    {submitting ? 'Processing...' : `Process Order (AED ${cartTotal.toLocaleString()})`}
                  </button>
                </div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4"> Payment History</h3>
              {transactions.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No payment history</p>
              ) : (
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-slate-800">
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-slate-400">Date</th>
                        <th className="text-left py-3 text-slate-400">Description</th>
                        <th className="text-right py-3 text-slate-400">Amount</th>
                       </tr>
                    </thead>
                    <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id} className="border-b border-slate-700">
                          <td className="py-2 text-slate-300">{new Date(tx.created_at).toLocaleDateString()}</td>
                          <td className="py-2 text-slate-300">{tx.description || 'Payment'}</td>
                          <td className="py-2 text-green-400 text-right font-bold">AED {tx.amount?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Existing Charges Section */}
          <div className="bg-slate-800 rounded-xl p-6 mt-6">
            <h3 className="text-xl font-bold text-white mb-4"> Existing Service Charges</h3>
            {clientCharges.length === 0 ? (
              <p className="text-slate-400 text-center py-4">No existing charges</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Service</th>
                      <th className="text-left py-3 text-slate-400">Package</th>
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
                        <td className="py-3 text-amber-400 text-right font-bold">AED {charge.total_amount?.toLocaleString()}</td>
                        <td className="py-3 text-center">{getStatusBadge(charge.status)}</td>
                        <td className="py-3 text-center">
                          {charge.status === 'pending' && (
                            <button
                              onClick={() => recordPayment(charge)}
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
        </>
      )}
    </div>
  )
}