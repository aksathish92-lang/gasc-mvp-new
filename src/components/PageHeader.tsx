import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}) {
  return (
    <section className="bg-gradient-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, #d4a042 1px, transparent 1px), radial-gradient(circle at 80% 70%, #d4a042 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-cream-300 mb-4" aria-label="Breadcrumb">
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {bc.path ? (
                  <Link to={bc.path} className="hover:text-gold-300 transition-colors">{bc.label}</Link>
                ) : (
                  <span className="text-gold-300 font-medium">{bc.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 text-cream-500" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white text-shadow-md">{title}</h1>
        {subtitle && <p className="text-cream-300 mt-3 text-base md:text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
