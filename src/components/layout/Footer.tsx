import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/admin", label: "Admin" },
  { to: "#", label: "About" },
];

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand & tagline */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="font-serif text-2xl md:text-3xl font-semibold text-text-primary hover:text-brand transition-colors"
            >
              Khati
            </Link>
            <p className="mt-3 text-text-secondary font-sans text-sm md:text-base max-w-md">
              Premium food & grocery, delivered with care.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-sans font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">
              Quick links
            </h3>
            <ul className="flex flex-col gap-2">
              {links.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-text-secondary hover:text-text-primary font-sans text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-text-secondary font-sans text-sm">
            © 2026 Khati. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
