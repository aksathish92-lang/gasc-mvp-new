import { useEffect, useState, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { fetchAnnouncements } from '@/lib/api';
import { Bell, FileText, GraduationCap, BookOpen, ClipboardCheck } from 'lucide-react';
import type { Announcement } from '@/types';

export function StudentCorner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchAnnouncements(10);
      setAnnouncements(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const resources = [
    { icon: Bell, title: 'Notices', desc: 'General notices and circulars for students.' },
    { icon: GraduationCap, title: 'Examination Notifications', desc: 'Exam schedules and related announcements.' },
    { icon: BookOpen, title: 'Academic Information', desc: 'Academic guidelines and programme details.' },
    { icon: ClipboardCheck, title: 'Student Resources', desc: 'Resources and materials for students.' },
    { icon: FileText, title: 'Important Announcements', desc: 'Key announcements from the college.' },
  ];

  return (
    <>
      <PageHeader
        title="Student Corner"
        subtitle="Notices, examination notifications, and academic resources for students."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Student Corner' }]}
      />

      {/* Resources */}
      <section className="py-16 md:py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mb-10 text-center">
            Student Resources
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-white rounded-xl p-6 border border-cream-200 shadow-sm animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-6 h-6 text-gold-400" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-serif font-bold text-navy-900 text-base mb-2">{r.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Bell className="w-5 h-5 text-maroon-600" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">Important Announcements</h2>
          </div>

          {loading ? (
            <LoadingState message="Loading announcements..." />
          ) : error ? (
            <ErrorState message="Unable to load announcements at this time." onRetry={load} />
          ) : announcements.length === 0 ? (
            <div className="bg-cream-50 rounded-xl p-8 border border-cream-200 text-center">
              <p className="text-navy-500 font-medium">No current announcements.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {announcements.map((ann, i) => (
                <AnnouncementCard key={ann.id} announcement={ann} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
