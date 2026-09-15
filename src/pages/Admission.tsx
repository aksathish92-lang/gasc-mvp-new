import { useEffect, useState, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { fetchAnnouncements } from '@/lib/api';
import { COLLEGE } from '@/lib/constants';
import { ClipboardList, FileText, CalendarDays, Mail, Bell } from 'lucide-react';
import type { Announcement } from '@/types';

export function Admission() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchAnnouncements(10);
      const admissionRelated = data.filter(
        (a) => !a.category || a.category.toLowerCase().includes('admission') || a.category.toLowerCase().includes('general')
      );
      setAnnouncements(admissionRelated.length > 0 ? admissionRelated : data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <>
      <PageHeader
        title="Admission"
        subtitle="Information about the admission process, eligibility, and important notifications."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Admission' }]}
      />

      {/* Admission Updates */}
      <section className="py-16 md:py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-maroon-50 text-maroon-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                <Bell className="w-3.5 h-3.5" />
                Updates
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">Admission Updates</h2>
            </div>
          </div>

          {loading ? (
            <LoadingState message="Loading admission updates..." />
          ) : error ? (
            <ErrorState message="Unable to load admission updates at this time." onRetry={load} />
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-cream-200 text-center">
              <p className="text-navy-500 font-medium">No current admission announcements.</p>
              <p className="text-sm text-navy-400 mt-1">Please check back later for updates.</p>
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

      {/* Admission Process & Info */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoSection
              icon={ClipboardList}
              title="Application Process"
              content="Detailed application process information will be updated here by the administration."
            />
            <InfoSection
              icon={FileText}
              title="Eligibility"
              content="Eligibility criteria for each programme will be published here when available."
            />
            <InfoSection
              icon={CalendarDays}
              title="Important Dates"
              content="Admission schedule and important dates will be announced here."
            />
            <InfoSection
              icon={Mail}
              title="Contact for Admission"
              content={`Email: ${COLLEGE.emails[0]}`}
            />
          </div>
        </div>
      </section>

      {/* Notifications placeholder */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 border-l-4 border-gold-400 shadow-sm">
            <h3 className="font-serif font-bold text-navy-900 text-lg mb-2">Important Notifications</h3>
            <p className="text-navy-600 text-sm leading-relaxed">
              Admission-related notifications and circulars will be published on this page as they become available.
              Please check back regularly for the latest updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoSection({ icon: Icon, title, content }: { icon: typeof Mail; title: string; content: string }) {
  return (
    <div className="card-hover bg-cream-50 rounded-xl p-6 border border-cream-200">
      <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center mb-4">
        <Icon className="w-5.5 h-5.5 text-gold-400" size={22} strokeWidth={1.6} />
      </div>
      <h3 className="font-serif font-bold text-navy-900 text-base mb-2">{title}</h3>
      <p className="text-sm text-navy-500 leading-relaxed">{content}</p>
    </div>
  );
}
