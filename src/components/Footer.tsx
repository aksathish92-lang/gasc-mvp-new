import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Globe, MapPin, ShieldCheck } from 'lucide-react';
import { COLLEGE, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-cream-100">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: College description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center ring-1 ring-gold-400/50">
                <GraduationCap className="w-5 h-5 text-gold-400" strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-serif font-bold text-sm leading-tight">Government Arts &amp; Science College</p>
                <p className="text-xs text-cream-300">Melvenkatapuram</p>
              </div>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              A government institution in Ranipet District, Tamil Nadu, dedicated to providing quality higher education
              and fostering academic excellence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-gold-400 text-sm font-bold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-300 hover:text-gold-300 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-serif text-gold-400 text-sm font-bold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-cream-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                <span>Ranipet District – 631 102, Tamil Nadu</span>
              </div>
              {COLLEGE.emails.map((email) => (
                <div key={email} className="flex items-start gap-2 text-sm text-cream-300">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                  <a href={`mailto:${email}`} className="hover:text-gold-300 transition-colors break-all">
                    {email}
                  </a>
                </div>
              ))}
              <div className="flex items-start gap-2 text-sm text-cream-300">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                <a href={COLLEGE.website} className="hover:text-gold-300 transition-colors" target="_blank" rel="noopener noreferrer">
                  {COLLEGE.website.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Institutional info */}
          <div>
            <h3 className="font-serif text-gold-400 text-sm font-bold uppercase tracking-wider mb-4">
              Institutional Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-cream-300">
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                <div>
                  <p className="text-cream-400 text-xs">Affiliated to</p>
                  <p className="font-medium">Thiruvalluvar University, Vellore</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-cream-300">
                <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                <div>
                  <p className="text-cream-400 text-xs">Established</p>
                  <p className="font-medium">2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-cream-400 text-center sm:text-left">
            © {new Date().getFullYear()} Government Arts and Science College, Melvenkatapuram. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-cream-400">
            <Link to="/admin/login" className="hover:text-gold-300 transition-colors">Admin Login</Link>
            <span className="text-cream-600">|</span>
            <span>Privacy Policy</span>
            <span className="text-cream-600">|</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
