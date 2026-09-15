import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, COLLEGE } from '@/lib/constants';
import { Logo } from '@/components/Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info strip */}
      <div className="bg-navy-900 text-cream-100 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-between items-center">
          <p className="font-medium tracking-wide">
            Affiliated to {COLLEGE.affiliation}
          </p>
          <p className="text-gold-300 font-medium">Established {COLLEGE.established}</p>
        </div>
      </div>

      {/* Main header */}
      <div
        className={`bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ${
          scrolled ? 'border-navy-200 shadow-lg' : 'border-cream-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center" aria-label="College home">
              <Logo showText={true} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative ${
                      isActive
                        ? 'text-navy-900'
                        : 'text-navy-600 hover:text-navy-900'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold-400 transition-all duration-300 ${
                        isActive ? 'w-3/4' : 'w-0'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-md text-navy-700 hover:bg-cream-100 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-b border-navy-200 shadow-xl animate-fade-in" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-navy-50 text-navy-900 border-l-4 border-gold-400'
                      : 'text-navy-600 hover:bg-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="px-4 py-2 text-xs text-navy-500 border-t border-cream-200 mt-2 pt-3">
              <p>Affiliated to {COLLEGE.affiliation}</p>
              <p className="text-gold-600 font-medium mt-1">Established {COLLEGE.established}</p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
