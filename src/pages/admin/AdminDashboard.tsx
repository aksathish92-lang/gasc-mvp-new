import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Image, GalleryHorizontal, Megaphone, TrendingUp, ArrowRight } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { fetchAllImages, fetchAllAnnouncements } from '@/lib/api';
import type { SiteImage, Announcement } from '@/types';

export function AdminDashboard() {
  const [heroCount, setHeroCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [activeAnnouncements, setActiveAnnouncements] = useState(0);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [images, announcements] = await Promise.all([fetchAllImages(), fetchAllAnnouncements()]);
      setHeroCount(images.filter((i) => i.category === 'hero').length);
      setGalleryCount(images.filter((i) => i.category === 'gallery' || i.category === 'campus' || i.category === 'event').length);
      setActiveAnnouncements(announcements.filter((a) => a.is_active).length);
      setTotalAnnouncements(announcements.length);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const cards = [
    { label: 'Hero Images', value: heroCount, icon: Image, path: '/admin/hero', color: 'from-navy-800 to-navy-600' },
    { label: 'Gallery Images', value: galleryCount, icon: GalleryHorizontal, path: '/admin/gallery', color: 'from-maroon-700 to-maroon-500' },
    { label: 'Active Announcements', value: activeAnnouncements, icon: Megaphone, path: '/admin/announcements', color: 'from-gold-600 to-gold-400' },
    { label: 'Total Announcements', value: totalAnnouncements, icon: TrendingUp, path: '/admin/announcements', color: 'from-navy-700 to-navy-500' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-6">
        <p className="text-navy-600 text-sm">Welcome to the admin dashboard. Manage your website content from here.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="spinner" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  to={card.path}
                  className="card-hover bg-white rounded-xl p-6 border border-cream-200 shadow-sm group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.6} />
                  </div>
                  <p className="text-3xl font-bold text-navy-900">{card.value}</p>
                  <p className="text-sm text-navy-500 mt-1">{card.label}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <QuickLink title="Upload Hero Banner" desc="Add or manage hero slider images on the homepage." path="/admin/hero" />
            <QuickLink title="Manage Gallery" desc="Upload, categorize, and organize gallery images." path="/admin/gallery" />
            <QuickLink title="Post Announcement" desc="Create and manage college announcements and notices." path="/admin/announcements" />
            <QuickLink title="Admission Content" desc="Update admission-related information and content." path="/admin/admission" />
          </div>
        </>
      )}
    </AdminLayout>
  );
}

function QuickLink({ title, desc, path }: { title: string; desc: string; path: string }) {
  return (
    <Link
      to={path}
      className="card-hover bg-white rounded-xl p-6 border border-cream-200 shadow-sm flex items-center justify-between gap-4 group"
    >
      <div>
        <h3 className="font-serif font-bold text-navy-900 text-base mb-1">{title}</h3>
        <p className="text-sm text-navy-500">{desc}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-navy-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  );
}
