'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type IconProps = { size?: number }

const LayoutGrid = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const Settings = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.28 16.9l.06-.06c.45-.45.58-1.1.33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.7 0 1.27-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82L4.3 4.3A2 2 0 1 1 7.12 1.47l.06.06c.45.45 1.1.58 1.82.33.6-.25 1.26-.25 1.86 0 .72.25 1.37.12 1.82-.33l.06-.06A2 2 0 1 1 19.7 4.3l-.06.06c-.45.45-.58 1.1-.33 1.82.25.6.25 1.26 0 1.86a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83l-.06.06z"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
)

const HelpCircle = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 17h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.5 10a2.5 2.5 0 1 1 5 0c0 1.75-2 2.25-2 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'DASHBOARD',
      path: '/dashboard',
      icon: <LayoutGrid size={18} />
    },
    {
      label: 'ACCOUNTS',
      path: '/bank-accounts',
      icon: '🏦'
    },
    {
      label: 'BANK TRANSFER',
      path: '/bank-transfer',
      icon: '💸'
    },
    {
      label: 'PAY BILLS',
      path: '/pay-bills',
      icon: '📄'
    },
    {
      label: 'SMART SPEND',
      path: '/smart-spend',
      icon: '📊'
    },
    {
      label: 'E-STATEMENT',
      path: '/e-statement',
      icon: '📑'
    }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-top">

        <div className="logo-wrapper">
          <img
            src="/loginlogo.png"
            alt="Nova Bank"
            className="logo-img"
          />
          <div>
            <h1 className="brand-name">NOVA BANK</h1>
            <p className="brand-subtitle">Digital Banking</p>
          </div>
        </div>

        <nav className="menu">
          {menuItems.map((item) => {
            const isActive = pathname === item.path

            return (
              <Link
                key={item.label}
                href={item.path}
                className="menu-link"
              >
                <button
                  className={`menu-item ${isActive ? 'active' : ''}`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="footer-btn">
          <Settings />
        </div>

        <div className="footer-btn">
          <HelpCircle />
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          min-height: 100vh;
          background: linear-gradient(
            180deg,
            #0f172a 0%,
            #172554 50%,
            #1e3a8a 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          flex-shrink: 0;
        }

        .sidebar-top {
          display: flex;
          flex-direction: column;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 28px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .logo-img {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          object-fit: cover;
          background: white;
          padding: 4px;
        }

        .brand-name {
          color: white;
          font-size: 20px;
          font-weight: 800;
          margin: 0;
          letter-spacing: 1px;
        }

        .brand-subtitle {
          color: rgba(255, 255, 255, 0.65);
          font-size: 12px;
          margin-top: 4px;
        }

        .menu {
          margin-top: 24px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-link {
          text-decoration: none;
        }

        .menu-item {
          width: 100%;
          height: 54px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          border-radius: 14px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .menu-icon {
          width: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: translateX(5px);
        }

        .menu-item.active {
          background: white;
          color: #1e3a8a;
          font-weight: 700;
          box-shadow: 0 12px 24px rgba(255, 255, 255, 0.15);
        }

        .sidebar-footer {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .footer-btn:hover {
          background: white;
          color: #1e3a8a;
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            min-height: auto;
          }

          .menu-item {
            height: 48px;
            font-size: 13px;
          }

          .brand-name {
            font-size: 17px;
          }
        }
      `}</style>
    </aside>
  )
}