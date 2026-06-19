'use client'

import Sidebar from '@/components/sidebar'

export default function EStatementPage() {
return ( <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"> <div className="flex min-h-screen"> <Sidebar />

```
    <main className="flex-1 p-10">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            E-Statement
          </h1>
          <p className="mt-2 text-slate-500">
            View, generate and download your bank statements
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-xl bg-white p-3 shadow-md transition hover:shadow-lg">
            <img
              src="/search.png"
              alt="search"
              className="h-5 w-5"
            />
          </button>

          <button className="rounded-xl bg-white p-3 shadow-md transition hover:shadow-lg">
            <img
              src="/notification.png"
              alt="notification"
              className="h-5 w-5"
            />
          </button>

          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
            <img
              src="/avatar.png"
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Generate Statement Card */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-semibold text-slate-800">
          Generate Statement
        </h2>

        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Enter Account Number"
            className="flex-1 rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
            Generate
          </button>
        </div>
      </div>

      {/* Statement Preview */}
      <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-10 shadow-xl">

        {/* Statement Header */}
        <div className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">
            <img
              src="/loginlogo.png"
              alt="Nova Bank"
              className="h-20 w-20 rounded-2xl object-cover"
            />

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                NOVA BANK
              </h2>
              <p className="text-slate-500">
                Official Bank Statement
              </p>
            </div>
          </div>

          <button className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Download PDF
          </button>
        </div>

        {/* Account Details */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Account Information
            </h3>

            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">Account Holder:</span> John
                Doe
              </p>

              <p>
                <span className="font-medium">Account Number:</span>
                {' '}
                1234567890
              </p>

              <p>
                <span className="font-medium">Branch:</span> Colombo Main
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Statement Period
            </h3>

            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">From:</span> 01 Jun 2026
              </p>

              <p>
                <span className="font-medium">To:</span> 30 Jun 2026
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-slate-500">
              Opening Balance
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-700">
              Rs. 250,000
            </h3>
          </div>

          <div className="rounded-2xl bg-green-50 p-5">
            <p className="text-sm text-slate-500">
              Total Credits
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              Rs. 50,000
            </h3>
          </div>

          <div className="rounded-2xl bg-red-50 p-5">
            <p className="text-sm text-slate-500">
              Total Debits
            </p>

            <h3 className="mt-2 text-2xl font-bold text-red-600">
              Rs. 25,000
            </h3>
          </div>

          <div className="rounded-2xl bg-indigo-50 p-5">
            <p className="text-sm text-slate-500">
              Closing Balance
            </p>

            <h3 className="mt-2 text-2xl font-bold text-indigo-700">
              Rs. 275,000
            </h3>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-10">

          <h3 className="mb-5 text-xl font-semibold text-slate-800">
            Transaction History
          </h3>

          <div className="overflow-hidden rounded-2xl border border-slate-200">

            <table className="w-full text-sm">

              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left font-semibold">
                    Date
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Description
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Reference ID
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Debit
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Credit
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Balance
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-t hover:bg-slate-50">
                  <td className="p-4">15 Jun 2026</td>
                  <td className="p-4">Electricity Bill Payment</td>
                  <td className="p-4">TXN987654</td>
                  <td className="p-4 font-medium text-red-600">
                    Rs. 5,000
                  </td>
                  <td className="p-4">-</td>
                  <td className="p-4">Rs. 245,000</td>
                </tr>

                <tr className="border-t hover:bg-slate-50">
                  <td className="p-4">18 Jun 2026</td>
                  <td className="p-4">Salary Credit</td>
                  <td className="p-4">TXN123456</td>
                  <td className="p-4">-</td>
                  <td className="p-4 font-medium text-green-600">
                    Rs. 50,000
                  </td>
                  <td className="p-4">Rs. 295,000</td>
                </tr>

                <tr className="border-t hover:bg-slate-50">
                  <td className="p-4">22 Jun 2026</td>
                  <td className="p-4">Online Transfer</td>
                  <td className="p-4">TXN567890</td>
                  <td className="p-4 font-medium text-red-600">
                    Rs. 20,000
                  </td>
                  <td className="p-4">-</td>
                  <td className="p-4">Rs. 275,000</td>
                </tr>

              </tbody>

            </table>

          </div>
        </div>

      </section>
    </main>
  </div>
</div>

)
};
