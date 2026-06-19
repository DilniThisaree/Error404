'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Bell, Search } from '@/components/Icons'
import Sidebar from '@/components/sidebar'

// Types
type Account = {
  id: number
  user_id: number
  account_number: string
  account_name: string
  balance: string
  username: string
  full_name: string
}

type Transaction = {
  id: number
  from_account: string
  to_account: string
  amount: string
  description: string
  status: string
  created_by: number
  created_at: string
}

// Categories Configuration
const CATEGORIES = {
  FOOD: 'Food & Dining',
  UTILITIES: 'Utilities & Bills',
  FEES: 'Fees & Commissions',
  OTHERS: 'Shopping & Others'
}

const CATEGORY_COLORS = {
  [CATEGORIES.FOOD]: '#ec4899', // Pink
  [CATEGORIES.UTILITIES]: '#3b82f6', // Blue
  [CATEGORIES.FEES]: '#eab308', // Yellow
  [CATEGORIES.OTHERS]: '#8b5cf6' // Purple
}

const DEFAULT_BUDGETS = {
  [CATEGORIES.FOOD]: 15000,
  [CATEGORIES.UTILITIES]: 20000,
  [CATEGORIES.FEES]: 5000,
  [CATEGORIES.OTHERS]: 10000
}

// Helper to resolve cookie values
function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || ''
  return ''
}

export default function SmartSpendPage() {
  // Authentication & ID states
  const [userId, setUserId] = useState<string>('1')
  const [loading, setLoading] = useState<boolean>(true)

  // Data lists
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Custom Overrides & Budgets
  const [overriddenCategories, setOverriddenCategories] = useState<
    Record<number, string>
  >({})
  const [budgets, setBudgets] =
    useState<Record<string, number>>(DEFAULT_BUDGETS)
  const [editingBudget, setEditingBudget] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState<string>('')

  // Interactive UI States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  // 1. Initial configuration and authentication load
  useEffect(() => {
    const id = getCookie('user_id') || '1'
    setUserId(id)

    // Load budgets from localStorage if available
    const savedBudgets = localStorage.getItem(`budgets_user_${id}`)
    if (savedBudgets) {
      try {
        setBudgets(JSON.parse(savedBudgets))
      } catch (err) {
        console.error('Error parsing saved budgets', err)
      }
    }

    // Load overrides from localStorage
    const savedOverrides = localStorage.getItem(`overrides_user_${id}`)
    if (savedOverrides) {
      try {
        setOverriddenCategories(JSON.parse(savedOverrides))
      } catch (err) {
        console.error('Error parsing overrides', err)
      }
    }

    fetchAccounts(id)
  }, [])

  // 2. Fetch Accounts
  const fetchAccounts = async (uid: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/accounts?userId=${uid}`)
      if (!res.ok) throw new Error('Failed to fetch accounts')
      const data = await res.json()

      if (data.ok && data.accounts && data.accounts.length > 0) {
        setAccounts(data.accounts)
        setSelectedAccount(data.accounts[0])
        fetchTransactions(data.accounts[0].account_number)
      } else {
        // Fallback for demo/offline
        const mockAccounts: Account[] = [
          {
            id: 1,
            user_id: 1,
            account_number: '1000003423',
            account_name: 'Dilara Savings',
            balance: '100000.00',
            username: 'dilara',
            full_name: 'Dilara Perera'
          },
          {
            id: 2,
            user_id: 1,
            account_number: '1000004876',
            account_name: 'Dilara Expenses',
            balance: '42000.00',
            username: 'dilara',
            full_name: 'Dilara Perera'
          }
        ]
        setAccounts(mockAccounts)
        setSelectedAccount(mockAccounts[0])
        fetchTransactions(mockAccounts[0].account_number)
      }
    } catch (err) {
      console.error(err)
      // Fallback fallback
      const mockAccounts: Account[] = [
        {
          id: 1,
          user_id: 1,
          account_number: '1000003423',
          account_name: 'Dilara Savings',
          balance: '100000.00',
          username: 'dilara',
          full_name: 'Dilara Perera'
        },
        {
          id: 2,
          user_id: 1,
          account_number: '1000004876',
          account_name: 'Dilara Expenses',
          balance: '42000.00',
          username: 'dilara',
          full_name: 'Dilara Perera'
        }
      ]
      setAccounts(mockAccounts)
      setSelectedAccount(mockAccounts[0])
      fetchTransactions(mockAccounts[0].account_number)
    } finally {
      setLoading(false)
    }
  }

  // 3. Fetch Transactions
  const fetchTransactions = async (accountNumber: string) => {
    try {
      const res = await fetch(`/api/transactions?account=${accountNumber}`)
      if (!res.ok) throw new Error('Failed to fetch transactions')
      const data = await res.json()
      if (data.ok && data.transactions) {
        setTransactions(data.transactions)
      } else {
        setTransactions(getFallbackTransactions(accountNumber))
      }
    } catch (err) {
      console.error(err)
      setTransactions(getFallbackTransactions(accountNumber))
    }
  }

  const getFallbackTransactions = (accountNumber: string): Transaction[] => {
    if (accountNumber === '1000003423') {
      return [
        {
          id: 1,
          from_account: '1000003423',
          to_account: '2000006754',
          amount: '4500.00',
          description: 'Lunch money at KFC',
          status: 'SUCCESS',
          created_by: 1,
          created_at: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 3,
          from_account: '2000006754',
          to_account: '1000003423',
          amount: '9870.00',
          description: 'Refund maybe',
          status: 'SUCCESS',
          created_by: 2,
          created_at: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          id: 4,
          from_account: '1000003423',
          to_account: '3000001111',
          amount: '8000.00',
          description: 'Water Bill payment',
          status: 'SUCCESS',
          created_by: 1,
          created_at: new Date(Date.now() - 86400000 * 6).toISOString()
        },
        {
          id: 5,
          from_account: '1000003423',
          to_account: '9999999999',
          amount: '250.00',
          description: 'SMS alert charge',
          status: 'SUCCESS',
          created_by: 1,
          created_at: new Date(Date.now() - 86400000 * 10).toISOString()
        }
      ]
    } else {
      return [
        {
          id: 2,
          from_account: '1000004876',
          to_account: '9999999999',
          amount: '10000.00',
          description: 'Totally normal fee',
          status: 'SUCCESS',
          created_by: 1,
          created_at: new Date(Date.now() - 86400000 * 1).toISOString()
        },
        {
          id: 6,
          from_account: '1000004876',
          to_account: '4000002222',
          amount: '5200.00',
          description: 'Weekly groceries at Keells',
          status: 'SUCCESS',
          created_by: 1,
          created_at: new Date(Date.now() - 86400000 * 3).toISOString()
        },
        {
          id: 7,
          from_account: '1000004876',
          to_account: '5000003333',
          amount: '15000.00',
          description: 'Electricity CEB Bill',
          status: 'SUCCESS',
          created_by: 1,
          created_at: new Date(Date.now() - 86400000 * 8).toISOString()
        }
      ]
    }
  }

  // 4. Handle Account selection change
  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account)
    fetchTransactions(account.account_number)
  }

  // 5. Rule engine to categorize transaction descriptions
  const classifyTransaction = (desc: string): string => {
    const d = desc.toLowerCase()
    if (
      d.includes('lunch') ||
      d.includes('dinner') ||
      d.includes('kfc') ||
      d.includes('burger') ||
      d.includes('food') ||
      d.includes('eat') ||
      d.includes('dining') ||
      d.includes('groceries') ||
      d.includes('keells') ||
      d.includes('supermarket')
    ) {
      return CATEGORIES.FOOD
    }
    if (
      d.includes('water') ||
      d.includes('electricity') ||
      d.includes('ceb') ||
      d.includes('slt') ||
      d.includes('telecom') ||
      d.includes('dialog') ||
      d.includes('cable') ||
      d.includes('bill') ||
      d.includes('biller') ||
      d.includes('phone') ||
      d.includes('utility')
    ) {
      return CATEGORIES.UTILITIES
    }
    if (
      d.includes('fee') ||
      d.includes('commission') ||
      d.includes('admin') ||
      d.includes('charge') ||
      d.includes('interest') ||
      d.includes('tax') ||
      d.includes('sms')
    ) {
      return CATEGORIES.FEES
    }
    return CATEGORIES.OTHERS
  }

  // 6. Handle category override updates
  const handleCategoryOverride = (txId: number, newCategory: string) => {
    const updated = {
      ...overriddenCategories,
      [txId]: newCategory
    }
    setOverriddenCategories(updated)
    localStorage.setItem(`overrides_user_${userId}`, JSON.stringify(updated))
    triggerNotification('Transaction category updated!')
  }

  // 7. Save custom budget limit
  const handleSaveBudget = (cat: string) => {
    const val = Number.parseFloat(editingValue)
    if (isNaN(val) || val <= 0) {
      alert('Please enter a valid positive number for budget.')
      return
    }

    const updated = {
      ...budgets,
      [cat]: val
    }
    setBudgets(updated)
    localStorage.setItem(`budgets_user_${userId}`, JSON.stringify(updated))
    setEditingBudget(null)
    triggerNotification(`Budget limit updated for ${cat}`)
  }

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  // Process data for charts and progress bars
  const currentAccountNumber = selectedAccount
    ? selectedAccount.account_number
    : ''

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((tx) => {
    const desc = tx.description ? tx.description.toLowerCase() : ''
    const amountStr = tx.amount.toString()
    const query = searchQuery.toLowerCase()
    return desc.includes(query) || amountStr.includes(query)
  })

  // Calculate Aggregations
  let totalExpenses = 0
  let totalIncome = 0
  const categoryExpenses: Record<string, number> = {
    [CATEGORIES.FOOD]: 0,
    [CATEGORIES.UTILITIES]: 0,
    [CATEGORIES.FEES]: 0,
    [CATEGORIES.OTHERS]: 0
  }

  transactions.forEach((tx) => {
    const amount = Number.parseFloat(tx.amount)
    if (tx.from_account === currentAccountNumber) {
      totalExpenses += amount
      const cat =
        overriddenCategories[tx.id] || classifyTransaction(tx.description || '')
      if (categoryExpenses[cat] !== undefined) {
        categoryExpenses[cat] += amount
      } else {
        categoryExpenses[CATEGORIES.OTHERS] += amount
      }
    } else if (tx.to_account === currentAccountNumber) {
      totalIncome += amount
    }
  })

  // Format data for Pie/Donut Chart
  const pieData = Object.keys(categoryExpenses).map((cat) => ({
    category: cat,
    amount: categoryExpenses[cat],
    color: CATEGORY_COLORS[cat]
  }))

  const hasExpenses = totalExpenses > 0

  // Calculate daily spending trend for bar chart (latest 6 days or transactions)
  // Group transactions by date
  const groupedTrends: Record<string, number> = {}
  transactions
    .filter((tx) => tx.from_account === currentAccountNumber)
    .slice()
    .reverse()
    .forEach((tx) => {
      const date = new Date(tx.created_at)
      const label = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      groupedTrends[label] =
        (groupedTrends[label] || 0) + Number.parseFloat(tx.amount)
    })

  const trendData = Object.keys(groupedTrends)
    .map((date) => ({
      label: date,
      value: groupedTrends[date]
    }))
    .slice(-6) // take last 6 days

  // Custom Donut Path Drawing
  const donutChartSegments = () => {
    const total = pieData.reduce((acc, d) => acc + d.amount, 0)
    if (total === 0) return null

    let accumulatedPercent = 0
    return pieData.map((slice, i) => {
      const percent = slice.amount / total
      if (percent === 0) return null

      const startPercent = accumulatedPercent
      const endPercent = accumulatedPercent + percent
      accumulatedPercent += percent

      // Convert percentages to radians (shift by -90 deg to start top-center)
      const angleStart = 2 * Math.PI * startPercent - Math.PI / 2
      const angleEnd = 2 * Math.PI * endPercent - Math.PI / 2

      // Arc coordinates
      const r = 80 // Radius
      const cx = 100 // Center X
      const cy = 100 // Center Y

      const x1 = cx + r * Math.cos(angleStart)
      const y1 = cy + r * Math.sin(angleStart)
      const x2 = cx + r * Math.cos(angleEnd)
      const y2 = cy + r * Math.sin(angleEnd)

      const largeArcFlag = percent > 0.5 ? 1 : 0

      // SVG Arc Command: M cx cy L x1 y1 A r r 0 largeArcFlag 1 x2 y2 Z
      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

      const isHovered = hoveredSlice === slice.category

      return (
        <path
          key={slice.category}
          d={d}
          fill={slice.color}
          className="transition-all duration-300 cursor-pointer"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transformOrigin: '100px 100px',
            opacity: hoveredSlice && !isHovered ? 0.5 : 1
          }}
          onMouseEnter={() => setHoveredSlice(slice.category)}
          onMouseLeave={() => setHoveredSlice(null)}
        />
      )
    })
  }

  // Dynamic AI Recommendations / Advice
  const getFinancialAdvice = () => {
    const adviceList: string[] = []

    // Budget health checks
    Object.keys(budgets).forEach((cat) => {
      const spent = categoryExpenses[cat] || 0
      const limit = budgets[cat]
      const percent = (spent / limit) * 100

      if (percent >= 100) {
        adviceList.push(
          `🚨 Over Limit: You have exceeded your budget for "${cat}" by Rs. ${(spent - limit).toLocaleString()}. Recommend pausing expenses in this category.`
        )
      } else if (percent >= 80) {
        adviceList.push(
          `⚠️ Budget Alert: You have used ${percent.toFixed(0)}% of your "${cat}" budget (Rs. ${spent.toLocaleString()} / Rs. ${limit.toLocaleString()}). Slow down!`
        )
      }
    })

    // Savings opportunities
    if (selectedAccount) {
      const balance = Number.parseFloat(selectedAccount.balance)
      if (balance > 50000) {
        adviceList.push(
          `💡 Savings Tip: Your balance is Rs. ${balance.toLocaleString()}. By transferring Rs. ${(balance * 0.25).toLocaleString()} to a Fixed Deposit, you can earn up to 8.5% interest per annum!`
        )
      }
    }

    // High expense insights
    const highExpense = transactions
      .filter((tx) => tx.from_account === currentAccountNumber)
      .reduce(
        (max, tx) =>
          Number.parseFloat(tx.amount) > Number.parseFloat(max.amount)
            ? tx
            : max,
        transactions[0]
      )

    if (highExpense && Number.parseFloat(highExpense.amount) > 5000) {
      adviceList.push(
        `📉 Spend Insight: Your highest single expense was Rs. ${Number.parseFloat(highExpense.amount).toLocaleString()} for "${highExpense.description}". Keep an eye on big purchases!`
      )
    }

    if (adviceList.length === 0) {
      adviceList.push(
        '✨ Great Job! Your spending is well within your budget limits. Keep managing your funds smart!'
      )
    }

    return adviceList
  }

  return (
    <div className="min-h-screen bg-bg-light font-geist p-0 flex">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-12 text-black flex flex-col min-w-0">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed top-5 right-5 bg-purple-900 text-white px-5 py-3 rounded-xl shadow-lg border border-purple-500 flex items-center gap-2 animate-bounce z-50">
            <span className="text-lime-400 font-bold">✓</span> {notification}
          </div>
        )}

        {/* Topbar Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-purple-900">
              Smart Spend
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              AI-powered personal budget & spending manager
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="topbar-icon" aria-label="search">
              <Search size={20} />
            </button>
            <button className="topbar-icon" aria-label="notifications">
              <Bell size={20} />
            </button>
            <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-purple-200 shadow-sm bg-white flex items-center justify-center">
              <Image
                src="/avatar.png"
                alt="profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {loading ? (
          // Loading Skeletons
          <div className="flex-1 space-y-6 animate-pulse">
            <div className="h-44 bg-gray-200 rounded-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-64 bg-gray-200 rounded-3xl lg:col-span-2" />
              <div className="h-64 bg-gray-200 rounded-3xl" />
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-8">
            {/* 1. Accounts Carousel/Selection */}
            <section aria-label="Account Selection">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                🏦 Active Bank Accounts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((acc) => {
                  const isSelected =
                    selectedAccount?.account_number === acc.account_number
                  return (
                    <button
                      key={acc.account_number}
                      onClick={() => handleAccountSelect(acc)}
                      className={`text-left p-6 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden group shadow-md ${
                        isSelected
                          ? 'border-purple-800 bg-[#450043] text-white shadow-purple-900/10'
                          : 'border-white bg-white text-black hover:border-purple-300 hover:shadow-lg'
                      }`}
                    >
                      {/* Interactive hover glow */}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p
                            className={`text-xs uppercase tracking-wider ${isSelected ? 'text-purple-300' : 'text-gray-400'}`}
                          >
                            {acc.account_name}
                          </p>
                          <p className="text-sm font-semibold mt-0.5 font-mono">
                            {acc.account_number.slice(0, 4)}••••
                            {acc.account_number.slice(-4)}
                          </p>
                        </div>
                        <span
                          className={`text-xl ${isSelected ? 'text-lime-400' : 'text-purple-900'}`}
                        >
                          💳
                        </span>
                      </div>

                      <div className="mt-2">
                        <p
                          className={`text-xs ${isSelected ? 'text-purple-300' : 'text-gray-500'}`}
                        >
                          Available Balance
                        </p>
                        <p
                          className={`text-2xl font-black font-mono mt-1 ${isSelected ? 'text-lime-400' : 'text-purple-900'}`}
                        >
                          Rs.{' '}
                          {Number.parseFloat(acc.balance).toLocaleString(
                            'en-US',
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }
                          )}
                        </p>
                      </div>

                      {/* Selected check tag */}
                      {isSelected && (
                        <div className="absolute right-0 bottom-0 bg-lime-400 text-[#450043] px-3 py-1 text-xs font-black rounded-tl-xl">
                          ACTIVE
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* 2. Charts & Budgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Analytics (Pie & Trend Charts) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Donut Chart Card */}
                <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      📊 Expense Distribution
                    </h3>
                    <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full font-bold">
                      This Month
                    </span>
                  </div>

                  {hasExpenses ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      {/* SVG Segmented Donut with tooltips */}
                      <div className="relative flex justify-center py-4">
                        <svg width="200" height="200" className="w-48 h-48">
                          {donutChartSegments()}

                          {/* Inner white circle for Donut effect */}
                          <circle cx="100" cy="100" r="50" fill="#ffffff" />

                          {/* Inside donut text */}
                          <g
                            transform="translate(100, 100)"
                            textAnchor="middle"
                          >
                            <text
                              y="-8"
                              className="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                              fill="#9ca3af"
                            >
                              Expenses
                            </text>
                            <text
                              y="14"
                              className="text-lg font-black text-purple-950 font-mono"
                              fill="#3b0764"
                            >
                              Rs. {Math.round(totalExpenses).toLocaleString()}
                            </text>
                          </g>
                        </svg>

                        {/* Interactive Tooltip Overlay */}
                        {hoveredSlice && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-950 text-white p-3 rounded-2xl shadow-xl text-center pointer-events-none z-10 border border-purple-500/20 max-w-[160px] animate-fade-in">
                            <p className="text-[10px] uppercase font-bold text-lime-400 tracking-wider">
                              {hoveredSlice}
                            </p>
                            <p className="text-sm font-bold font-mono mt-1">
                              Rs.{' '}
                              {categoryExpenses[hoveredSlice].toLocaleString()}
                            </p>
                            <p className="text-[10px] text-purple-300 mt-0.5">
                              {(
                                (categoryExpenses[hoveredSlice] /
                                  totalExpenses) *
                                100
                              ).toFixed(1)}
                              % of total
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Legend Grid */}
                      <div className="space-y-4">
                        {pieData.map((slice) => {
                          const percent =
                            totalExpenses > 0
                              ? (slice.amount / totalExpenses) * 100
                              : 0
                          const isHovered = hoveredSlice === slice.category
                          return (
                            <div
                              key={slice.category}
                              className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                                isHovered
                                  ? 'bg-purple-55 border-purple-300 shadow-sm'
                                  : 'bg-transparent border-transparent hover:bg-gray-50'
                              }`}
                              onMouseEnter={() =>
                                setHoveredSlice(slice.category)
                              }
                              onMouseLeave={() => setHoveredSlice(null)}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: slice.color }}
                                />
                                <div>
                                  <p className="text-sm font-bold text-gray-700">
                                    {slice.category}
                                  </p>
                                  <p className="text-xs text-gray-400 font-mono">
                                    Rs. {slice.amount.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <span className="text-sm font-black text-purple-900 font-mono">
                                {percent.toFixed(1)}%
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-[24px]">
                      <span className="text-4xl">🧾</span>
                      <p className="text-gray-500 font-medium mt-3">
                        No expenses recorded on this account yet.
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Transfers out of this account will automatically group
                        here.
                      </p>
                    </div>
                  )}
                </div>

                {/* Spending Trend Bar Chart Card */}
                <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    📈 Spending Trend
                  </h3>

                  {trendData.length > 0 ? (
                    <div className="relative">
                      {/* Chart Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                        <div className="border-t border-gray-100 h-0" />
                        <div className="border-t border-gray-100 h-0" />
                        <div className="border-t border-gray-100 h-0" />
                        <div className="border-t border-gray-100 h-0" />
                      </div>

                      {/* Custom Rendered SVG Bar Chart */}
                      <div className="h-44 w-full flex items-end justify-between px-2 pt-6 pb-2 border-b border-gray-200 relative z-10">
                        {trendData.map((bar, i) => {
                          const maxVal = Math.max(
                            ...trendData.map((d) => d.value),
                            1
                          )
                          const heightPercent = (bar.value / maxVal) * 100

                          return (
                            <div
                              key={i}
                              className="flex-1 flex flex-col items-center group mx-2"
                            >
                              <div className="relative w-full flex flex-col items-center justify-end h-36">
                                {/* Hover Tooltip */}
                                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-300 bg-purple-950 text-lime-400 text-[10px] font-bold px-2 py-1 rounded-xl shadow-lg border border-purple-500/20 whitespace-nowrap z-20">
                                  Rs. {bar.value.toLocaleString()}
                                </div>

                                <div
                                  className="w-10 rounded-t-xl bg-gradient-to-t from-purple-800 to-pink-500 group-hover:from-purple-900 group-hover:to-pink-600 transition-all duration-300 cursor-pointer shadow-md"
                                  style={{ height: `${heightPercent}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-semibold text-gray-400 mt-2 truncate w-full text-center">
                                {bar.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      Not enough data to calculate spending trends.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Budgets & Insights */}
              <div className="lg:col-span-4 space-y-8">
                {/* Smart Budgets List */}
                <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    🎯 Budget Limits
                  </h3>

                  <div className="space-y-6">
                    {Object.keys(budgets).map((cat) => {
                      const spent = categoryExpenses[cat] || 0
                      const limit = budgets[cat]
                      const percent = Math.min((spent / limit) * 100, 100)
                      const isOverBudget = spent > limit
                      const isNearingLimit =
                        spent / limit >= 0.8 && spent / limit <= 1.0

                      // Determine bar color
                      let barColorClass = 'bg-lime-400'
                      if (isOverBudget)
                        barColorClass = 'bg-red-500 animate-pulse'
                      else if (isNearingLimit) barColorClass = 'bg-amber-400'

                      return (
                        <div key={cat} className="space-y-2 group">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-700">
                              {cat}
                            </span>

                            {editingBudget === cat ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  className="w-18 border border-purple-300 rounded px-1.5 py-0.5 text-xs text-black font-semibold outline-none"
                                  value={editingValue}
                                  onChange={(e) =>
                                    setEditingValue(e.target.value)
                                  }
                                  placeholder="limit"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveBudget(cat)}
                                  className="bg-purple-900 text-white text-[10px] px-1.5 py-0.5 rounded hover:bg-purple-950 font-bold"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingBudget(null)}
                                  className="text-gray-400 text-[10px] hover:text-gray-600 font-bold"
                                >
                                  ✖
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingBudget(cat)
                                  setEditingValue(limit.toString())
                                }}
                                className="text-xs text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ✏️ Edit Limit
                              </button>
                            )}
                          </div>

                          {/* Budget Stats */}
                          <div className="flex justify-between text-xs font-semibold text-gray-500 font-mono">
                            <span>
                              Spent: Rs. {Math.round(spent).toLocaleString()}
                            </span>
                            <span>Limit: Rs. {limit.toLocaleString()}</span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner relative">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${barColorClass}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          {/* Status text */}
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span
                              className={
                                isOverBudget
                                  ? 'text-red-500'
                                  : isNearingLimit
                                    ? 'text-amber-500'
                                    : 'text-lime-600'
                              }
                            >
                              {isOverBudget
                                ? 'Over Budget!'
                                : isNearingLimit
                                  ? 'Nearing Limit'
                                  : 'Within Budget'}
                            </span>
                            <span className="text-gray-400 font-mono">
                              {percent.toFixed(0)}% used
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* AI insights & Advice Box */}
                <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#450043] to-[#1d0730] text-white shadow-xl relative overflow-hidden border border-purple-500/20">
                  <div className="absolute right-0 bottom-0 text-9xl opacity-5 pointer-events-none">
                    💡
                  </div>

                  <h3 className="text-lg font-black text-lime-400 mb-4 flex items-center gap-2">
                    💡 AI Financial Advice
                  </h3>

                  <div className="space-y-4">
                    {getFinancialAdvice().map((advice, i) => (
                      <div
                        key={i}
                        className="text-xs leading-relaxed border-b border-purple-950 pb-3 last:border-0 last:pb-0 font-medium"
                      >
                        {advice}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Categorized Transaction List Section */}
            <section
              className="bg-white p-8 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100"
              aria-label="Transaction records"
            >
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Transactions Ledger
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Filter and override category grouping here
                  </p>
                </div>

                {/* Search query box */}
                <div className="relative w-64 max-w-full">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by description..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-9 pr-4 text-xs font-semibold outline-none focus:border-purple-800 focus:bg-white text-black transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                    >
                      ✖
                    </button>
                  )}
                </div>
              </div>

              {filteredTransactions.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-gray-50">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                        <th className="p-4 w-28">Date</th>
                        <th className="p-4">Description</th>
                        <th className="p-4 w-44">Category / Change Category</th>
                        <th className="p-4 w-32 text-right">Amount</th>
                        <th className="p-4 w-24 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {filteredTransactions.map((tx) => {
                        const isDebit = tx.from_account === currentAccountNumber
                        const computedCat = classifyTransaction(
                          tx.description || ''
                        )
                        const selectedCat =
                          overriddenCategories[tx.id] || computedCat

                        return (
                          <tr
                            key={tx.id}
                            className="hover:bg-gray-50/70 transition-colors"
                          >
                            <td className="p-4 text-gray-400 font-mono">
                              {new Date(tx.created_at).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                }
                              )}
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-gray-800">
                                {tx.description || 'Transfer description'}
                              </p>
                              <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                Ref: {tx.id}
                              </p>
                            </td>

                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {/* Tag with Category color */}
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{
                                    backgroundColor:
                                      CATEGORY_COLORS[selectedCat] || '#9ca3af'
                                  }}
                                />

                                <select
                                  aria-label="Transaction category select"
                                  value={selectedCat}
                                  onChange={(e) =>
                                    handleCategoryOverride(
                                      tx.id,
                                      e.target.value
                                    )
                                  }
                                  className="bg-transparent text-gray-700 font-semibold border-0 outline-none cursor-pointer text-xs focus:ring-0"
                                >
                                  {Object.values(CATEGORIES).map((c) => (
                                    <option key={c} value={c}>
                                      {c}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </td>

                            <td
                              className={`p-4 text-right font-black font-mono ${isDebit ? 'text-red-500' : 'text-lime-600'}`}
                            >
                              {isDebit ? '-' : '+'}Rs.{' '}
                              {Number.parseFloat(tx.amount).toLocaleString(
                                'en-US',
                                { minimumFractionDigits: 2 }
                              )}
                            </td>

                            <td className="p-4 text-center">
                              <span className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-[10px] font-bold">
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-2xl">
                  <span className="text-2xl">🔍</span>
                  <p className="text-gray-400 text-xs mt-2">
                    No transactions match your search filter.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}