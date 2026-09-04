// components/Header.
import { NavLink } from "react-router"

type NavItem = {
  to: string;
  label: string;
};

type HeaderProps = {
  navItems: NavItem[];
};


export default function Header({ navItems }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-dusk-blue-500/30 bg-ink-black-500/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">

        <NavLink
          to="/"
          className="flex items-center gap-3 text-lg font-semibold"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dusk-blue-500">
            ✓
          </div>

          <span>HomeBase</span>
        </NavLink>

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

      </div>
    </header>
  );
}