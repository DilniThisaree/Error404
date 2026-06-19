'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/sidebar'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    accountType: 'Savings'
  })

  const fetchAccounts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/accounts?userId=1')
      const data = await res.json()
      if (data.ok) setAccounts(data.accounts)
    } catch (error) {
      console.error("Failed to fetch accounts", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, ...formData })
      })
      const data = await res.json()
      if (data.ok) {
        setIsModalOpen(false)
        setFormData({ accountName: '', accountNumber: '', accountType: 'Savings' })
        fetchAccounts()
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async (accountId: number) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return
    try {
      const res = await fetch(`/api/accounts?accountId=${accountId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.ok) setAccounts(accounts.filter(acc => acc.id !== accountId))
    } catch (error) {
      console.error(error)
    }
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance || 0), 0)

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Accounts</h1>
            <p className="text-slate-500 mt-1">Manage your balances and open new accounts.</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200 cursor-pointer">
            <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </header>

        {/* Total Balance Card */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 shadow-xl text-white mb-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest">Total Portfolio</p>
            <h2 className="text-4xl font-black mt-1">Rs. {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>

        {/* Accounts Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <div key={account.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group relative flex flex-col">
                <button onClick={() => handleDeleteAccount(account.id)} className="absolute top-4 right-4 p-2 bg-rose-50 text-rose-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <div className="mb-6 mt-2">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">{account.type || 'Savings'}</p>
                  <h3 className="text-xl font-bold text-slate-900">{account.account_name}</h3>
                  <p className="text-slate-500 font-mono tracking-widest text-sm mt-1">{account.account_number}</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-slate-500">Available Balance</p>
                  <h4 className="text-2xl font-black text-slate-900">Rs. {Number(account.balance).toLocaleString()}</h4>
                </div>
                <Link href={`/accounts/${account.id}`} className="mt-auto block text-center w-full bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 font-semibold py-3 rounded-xl transition-colors">
                  View Details
                </Link>
              </div>
            ))}

            <button onClick={() => setIsModalOpen(true)} className="bg-transparent rounded-3xl p-6 border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all flex flex-col items-center justify-center min-h-[280px]">
              <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm mb-4 text-slate-400"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></div>
              <h3 className="text-lg font-bold text-slate-700">Open New Account</h3>
            </button>
          </div>
        )}
      </main>

      {/* Add Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">New Account</h2>
            <form onSubmit={handleAddAccount} className="flex flex-col gap-4">
              <input required type="text" placeholder="Account Name" value={formData.accountName} onChange={(e) => setFormData({...formData, accountName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 bg-slate-50" />
              <input required type="text" placeholder="Account Number" value={formData.accountNumber} onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 bg-slate-50 font-mono" />
              <select value={formData.accountType} onChange={(e) => setFormData({...formData, accountType: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 bg-slate-50">
                <option value="Savings">Savings Account</option>
                <option value="Checking">Checking Account</option>
              </select>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-slate-700">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold">{isSubmitting ? 'Creating...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}