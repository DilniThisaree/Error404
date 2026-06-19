'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import { ChevronLeft } from '@/components/Icons'

type Errors = {
  name?: string
  accountNumber?: string
  amount?: string
  bank?: string
}

export default function BankTransfer() {
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    amount: '',
    bank: '',
    remark: ''
  })
  
  const [errors, setErrors] = useState<Errors>({})
  const [step, setStep] = useState<'form' | 'success' | 'failed'>('form')

  const validate = () => {
    const newErrors: Errors = {}
    if (!formData.name) newErrors.name = 'Recipient name is required'
    if (!formData.accountNumber || formData.accountNumber.length < 8) 
      newErrors.accountNumber = 'Enter a valid account number'
    if (!formData.amount || parseFloat(formData.amount) <= 0) 
      newErrors.amount = 'Enter a valid amount'
    if (!formData.bank) newErrors.bank = 'Please select a bank'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTransfer = () => {
    if (!validate()) return

    const amountVal = parseFloat(formData.amount)
    const saved = localStorage.getItem('userBalance') || '180000.00'
    const currentBalance = parseFloat(saved)

    if (amountVal <= currentBalance) {
      localStorage.setItem('userBalance', (currentBalance - amountVal).toString())
      
      const oldTxs = JSON.parse(localStorage.getItem('userTransactions') || '[]')
      const newTx = { 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        account: formData.name, 
        amount: amountVal, 
        status: 'Success' 
      }
      localStorage.setItem('userTransactions', JSON.stringify([newTx, ...oldTxs]))
      
      window.dispatchEvent(new Event('storage'))
      setStep('success')
    } else {
      setStep('failed')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 flex justify-center items-start">
        
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          {step === 'form' && (
            <>
              <h1 className="text-2xl font-bold mb-6">Bank Transfer</h1>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">Recipient Name</label>
                  <input className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1" 
                         value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Account Number */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">Account Number</label>
                  <input className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1" 
                         value={formData.accountNumber} onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} />
                  {errors.accountNumber && <p className="text-rose-500 text-xs mt-1">{errors.accountNumber}</p>}
                </div>

                {/* Bank Select */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">Select Bank</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1"
                          value={formData.bank} onChange={(e) => setFormData({...formData, bank: e.target.value})}>
                    <option value="">Select Bank</option>
                    <option value="BOC">Bank of Ceylon</option>
                    <option value="Sampath">Sampath Bank</option>
                    <option value="Commercial">Commercial Bank</option>
                  </select>
                  {errors.bank && <p className="text-rose-500 text-xs mt-1">{errors.bank}</p>}
                </div>

                {/* Amount */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">Amount (Rs.)</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1" 
                         value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                  {errors.amount && <p className="text-rose-500 text-xs mt-1">{errors.amount}</p>}
                </div>

                {/* Remark */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">Remark</label>
                  <input className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1" 
                         value={formData.remark} onChange={(e) => setFormData({...formData, remark: e.target.value})} />
                </div>

                <button onClick={handleTransfer} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl mt-4 transition-all">
                  Confirm Transfer
                </button>
              </div>
            </>
          )}

          {/* Success/Failed Screens as defined before... */}
          {step === 'success' && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-2">Transfer Successful!</h2>
              <button onClick={() => setStep('form')} className="mt-6 text-indigo-600 font-bold">Back to Home</button>
            </div>
          )}
          {step === 'failed' && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-2 text-rose-500">Transfer Failed!</h2>
              <button onClick={() => setStep('form')} className="mt-6 bg-slate-900 text-white py-3 px-8 rounded-xl font-bold">Try Again</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}