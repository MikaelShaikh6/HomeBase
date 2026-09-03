import React from 'react'
import { NavLink } from "react-router"

const Home = () => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/expenses", label: "Expenses" },
    { to: "/chores", label: "Chores" },
  ]


  return (
    <div className="min-h-screen bg-ink-black-500 text-alabaster-grey-100">
      <header className="sticky top-0 z-50 border-b border-dusk-blue-500/30 bg-ink-black-500/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-alabaster-grey-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dusk-blue-500 text-alabaster-grey-100">
              ✓
            </div>

            <span>HomeCrew</span>
          </NavLink>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-prussian-blue-500 text-alabaster-grey-100"
                      : "text-lavender-grey-500 hover:bg-prussian-blue-500/70 hover:text-alabaster-grey-100"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-prussian-blue-500">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-grey-500 font-semibold text-ink-black-500">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-alabaster-grey-100">
                Alex
              </p>
              <p className="text-xs text-lavender-grey-500">
                Smith Family
              </p>
            </div>
          </button>
        </div>
      </header>
    </div>
  )
}

export default Home