'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  // Notification popup එක පෙන්වීමට අවශ්‍ය state එක
  const [showNotification, setShowNotification] = useState(false)

  const navItems = [
    {
      title: 'Accounts',
      description: 'View balances and recent activity',
      href: '/accounts',
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      title: 'Bank Transfer',
      description: 'Send money quickly and securely',
      href: '/bank-transfer',
      color: 'from-emerald-500 to-emerald-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: 'Pay Bills',
      description: 'Manage and pay utilities effortlessly',
      href: '/pay-bills',
      color: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'E-Statement',
      description: 'Download your monthly reports',
      href: '/e-statement',
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      )
    },
    {
      title: 'Smart Spend',
      description: 'Analyze your financial habits',
      href: '/smart-spend',
      color: 'from-rose-500 to-rose-600',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-12">
      
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-widest text-white uppercase">
              Nexus Trust <span className="font-light text-indigo-400">Bank</span>
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            
            {/* 5. Notification Bell with Popup */}
            <div className="relative">
              <button 
                onClick={() => setShowNotification(!showNotification)}
                onBlur={() => setTimeout(() => setShowNotification(false), 200)}
                className="relative text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute 0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900"></span>
              </button>

              {/* Popup Window */}
              {showNotification && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-4 px-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </div>
                    <p className="text-sm text-slate-800 font-semibold">No new notifications</p>
                    <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
                  </div>
                </div>
              )}
            </div>

            {/* 1. Profile Section Links to Login Page */}
            <Link href="/login" className="flex items-center gap-3 border-l border-slate-700 pl-6 group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">Dilara W.</p>
                <p className="text-xs text-slate-400">Last login: Today, 09:41 AM</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 overflow-hidden group-hover:border-indigo-400 transition-colors">
                <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </Link>

          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to your digital dashboard.</h2>
              <p className="text-indigo-200 text-lg max-w-xl">
                Manage your accounts, transfer funds securely, and track your daily spending all in one place.
              </p>
            </div>
            {/* 2. View Quick Summary Connects to Dashboard */}
            <Link href="/dashboard" className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-xl hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 flex-shrink-0">
              View Quick Summary
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          {/* Main Quick Access Grid */}
          <div className="xl:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Quick Access Tools
            </h3>
            
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className="group relative bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-slate-500 text-sm font-medium mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex items-center text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-colors justify-end">
                    Access Tool
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Side Panel (Security & Promos) */}
          <div className="space-y-6">
            
            {/* Security Notice */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Security Check
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Your connection is encrypted. Remember, Nexus Trust Bank will never ask for your PIN or password over the phone.
              </p>
              {/* 3. Security Settings Connects to Settings Page */}
              <Link href="/settings" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center">
                Security Settings <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Promo Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-md text-white relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold mb-2 relative z-10">Platinum Rewards</h3>
              <p className="text-slate-300 text-sm mb-6 relative z-10">
                Apply for the new Platinum Credit Card and earn 5% cashback on all utility payments.
              </p>
              {/* 4. Apply Now Connects to Dashboard */}
              <Link href="/dashboard" className="block text-center w-full bg-white text-slate-900 font-bold py-2.5 rounded-xl group-hover:bg-slate-100 transition-colors relative z-10">
                Apply Now
              </Link>
            </div>

            {/* Contact Support */}
            <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors">
              <div>
                <h3 className="text-indigo-900 font-bold">Need Help?</h3>
                <p className="text-indigo-700 text-sm">Contact 24/7 Support</p>
              </div>
              <div className="w-10 h-10 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}