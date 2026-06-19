'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar'
import { Bell, Search, User } from '../../components/Icons'

export default function Dashboard() {
  const [balance, setBalance] = useState(180000.00);
  const [transactions, setTransactions] = useState([
    { date: 'Oct 16, 2025', account: '•••• 3423', amount: 4500.00, status: 'Success' },
    { date: 'Oct 16, 2025', account: '•••• 4876', amount: 10000.00, status: 'Success' }
  ]);

  useEffect(() => {
    const updateData = () => {
      const savedBalance = localStorage.getItem('userBalance');
      const savedTxs = localStorage.getItem('userTransactions');
      
      if (savedBalance) setBalance(parseFloat(savedBalance));
      if (savedTxs) setTransactions(JSON.parse(savedTxs));
    };

    updateData(); // පලමු වරට load වෙද්දී
    window.addEventListener('storage', updateData); // Real-time update වෙන්න
    return () => window.removeEventListener('storage', updateData);
  }, []);

  return (
    <main className="flex h-screen w-full bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <section className="flex-1 flex flex-col px-10 py-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </header>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl w-full max-w-lg mb-8">
          <p className="text-indigo-200 text-sm font-medium uppercase">Current Balance</p>
          <p className="text-4xl font-bold mt-2">Rs. {balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {transactions.map((t, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-bold">{t.account}</p>
                  <p className="text-xs text-slate-500">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900">- Rs. {t.amount.toLocaleString()}</p>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}