import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { Badge } from "@/shared/display";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { itemCount } = useCart();
  const { openDrawer } = useCartDrawer();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg-primary/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left: Brand */}
          <Link
            to="/"
            className="font-serif text-xl md:text-2xl font-semibold text-text-primary hover:text-brand transition-colors"
          >
            Khati
          </Link>

          {/* Center: Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-sans transition-colors ${
                    isActive
                      ? "text-brand font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={openDrawer}
              className="relative p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus"
              aria-label={`Cart with ${itemCount} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] bg-brand text-text-inverse border-0"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </button>

            {/* Mobile: Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-bg-primary"
          >
            <nav className="flex flex-col py-4 px-4 gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-3 px-4 rounded-md text-sm font-sans transition-colors ${
                      isActive
                        ? "text-brand font-semibold bg-bg-secondary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-md text-sm font-sans text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors flex items-center gap-2"
              >
                Cart
                {itemCount > 0 && (
                  <Badge variant="default" className="bg-brand text-text-inverse border-0">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
