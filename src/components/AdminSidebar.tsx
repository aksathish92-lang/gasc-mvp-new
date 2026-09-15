import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Image,
  GalleryHorizontal,
  Megaphone,
  FileText,
  Settings,
  LogOut,
  Globe,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const MENU = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Hero Images', path: '/admin/hero', icon: Image },
  { label: 'Gallery', path: '/admin/gallery', icon: GalleryHorizontal },
  { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { label: 'Admission Content', path: '/admin/admission', icon: FileText },
  { label: 'Site Settings', path: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="h-full flex flex-col bg-navy-900 text-cream-100 w-64">
      <div className="px-5 py-5 border-b border-navy-700">
        <Link to="/admin" onClick={onNavigate} className="block">
          <p className="font-serif font-bold text-sm leading-tight">GASC MVP</p>
          <p className="text-xs text-cream-400 mt-0.5">Admin Dashboard</p>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" aria-label="Admin navigation">
        {MENU.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gold-400/20 text-gold-300 border-l-2 border-gold-400'
                  : 'text-cream-300 hover:bg-navy-800 hover:text-white'
              }`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-navy-700 space-y-1">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream-300 hover:bg-navy-800 hover:text-white transition-colors"
        >
          <Globe className="w-4.5 h-4.5 flex-shrink-0" size={18} />
          View Website
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-maroon-300 hover:bg-maroon-950/40 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5 flex-shrink-0" size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
