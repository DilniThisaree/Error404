'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/sidebar'

export default function AccountDetailsPage() {
  const params = useParams()
  const accountId = params.id // URL එකෙන් ID එක ලබා ගැනීම

  // සැබෑ ලෝකයේදී මෙම ID එක භාවිතයෙන් Backend එකෙන් Data Fetch කල යුතුයි.
  // අපි මෙහි Mock Data භාවිතා කරමු.
  const account = {
    id: accountId,
    name: 'Premium Savings',
    type: 'Savings',
    accountNumber: '100456789',
    balance: 150000.00,
    status: 'Active'
  }

  const recentTransactions = [
    { id: 1, date: 'Oct 16, 2025', desc: 'Salary Deposit', amount: '+ Rs. 150,000', type: 'credit' },
    { id: 2, date: 'Oct 15, 2025', desc: 'Supermarket Bill', amount: '- Rs. 4,500', type: 'debit' },
    { id: 3, date: 'Oct 12, 2025', desc: 'Utility Bill Transfer', amount: '- Rs. 2,000', type: 'debit' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {/* Back Button */}
        <Link href="/accounts" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Accounts
        </Link>

        {/* Account Details Header Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {account.status}
              </span>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">{account.type}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-1">{account.name}</h1>
            <p className="text-lg font-mono text-slate-500 tracking-widest">{account.accountNumber}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 min-w-[250px] text-right">
            <p className="text-sm font-semibold text-slate-500 mb-1">Available Balance</p>
            <h2 className="text-3xl font-black text-indigo-600">
              Rs. {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-10">
          <Link href="/bank-transfer" className="bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
            Transfer Money
          </Link>
          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-3 px-8 rounded-xl transition-all shadow-sm">
            Download Statement
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
          </div>
          
          <div className="divide-y divide-slate-100">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {tx.type === 'credit' ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{tx.desc}</p>
                    <p className="text-sm text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}