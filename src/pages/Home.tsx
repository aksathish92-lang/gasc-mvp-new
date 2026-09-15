import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, School, ArrowRight, Bell, BookOpen } from 'lucide-react';
import { HeroSlider } from '@/components/HeroSlider';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { CourseCard } from '@/components/CourseCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { fetchAnnouncements } from '@/lib/api';
import { COURSES, COLLEGE } from '@/lib/constants';
import type { Announcement } from '@/types';

export function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [annLoading, setAnnLoading] = useState(true);
  const [annError, setAnnError] = useState(false);

  const loadAnnouncements = useCallback(async () => {
    setAnnLoading(true);
    setAnnError(false);
    try {
      const data = await fetchAnnouncements(4);
      setAnnouncements(data);
    } catch {
      setAnnError(true);
    } finally {
      setAnnLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <>
      <HeroSlider />

      {/* Welcome Section */}
      <section className="section-padding bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                Welcome
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                Welcome to Our College
              </h2>
              <p className="text-navy-700 text-base md:text-lg leading-relaxed mb-4">
                Welcome to the official website of Government Arts and Science College, Melvenkatapuram.
              </p>
              <p className="text-navy-600 text-base leading-relaxed mb-8">
                The college is located in Sholinghur Taluk, Ranipet District, Tamil Nadu and is affiliated to
                Thiruvalluvar University, Vellore.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <InfoStat icon={Calendar} label="Established" value={COLLEGE.established} />
                <InfoStat icon={MapPin} label="District" value={COLLEGE.district} />
                <InfoStat icon={Building2} label="Taluk" value={COLLEGE.taluk} />
                <InfoStat icon={School} label="Affiliation" value="Thiruvalluvar Univ." />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-navy">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center text-cream-200">
                    <School className="w-20 h-20 text-gold-400 mx-auto mb-4" strokeWidth={1} />
                    <p className="font-serif text-xl font-bold">Government Arts &amp; Science College</p>
                    <p className="text-gold-300 mt-1">Melvenkatapuram</p>
                    <p className="text-sm text-cream-400 mt-3">Ranipet District, Tamil Nadu</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold-400/20 rounded-2xl -z-0" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-maroon-600/10 rounded-2xl -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-maroon-50 text-maroon-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                <Bell className="w-3.5 h-3.5" />
                Notice Board
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">Important Announcements</h2>
            </div>
            <Link to="/student-corner" className="text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors inline-flex items-center gap-1.5">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {annLoading ? (
            <LoadingState message="Loading announcements..." />
          ) : annError ? (
            <ErrorState message="Unable to load announcements at this time." onRetry={loadAnnouncements} />
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
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

      {/* Courses Preview */}
      <section className="py-16 md:py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-navy-100 text-navy-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Academics
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">Our Courses</h2>
            <p className="text-navy-600 mt-2">Undergraduate (UG)</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About College Summary */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">About Our College</h2>
            <p className="text-navy-600 mt-2">Institutional Information</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <InfoCard icon={Calendar} label="Established" value="2020" />
            <InfoCard icon={MapPin} label="District" value="Ranipet" />
            <InfoCard icon={Building2} label="Taluk" value="Sholinghur" />
            <InfoCard icon={School} label="Affiliated To" value="Thiruvalluvar University, Vellore" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-maroon py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 40%, #d4a042 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white text-shadow-md mb-4">
            Discover Your Academic Journey
          </h2>
          <p className="text-cream-200 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Explore our courses, admission information and student resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/courses"
              className="px-6 py-3 bg-gold-400 hover:bg-gold-300 text-navy-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              View Courses
            </Link>
            <Link
              to="/admission"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 transition-all duration-300"
            >
              Admission Information
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoStat({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-cream-200 shadow-sm">
      <Icon className="w-5 h-5 text-gold-600 flex-shrink-0" />
      <div>
        <p className="text-xs text-navy-400">{label}</p>
        <p className="text-sm font-semibold text-navy-900">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="card-hover bg-cream-50 rounded-xl p-6 text-center border border-cream-200">
      <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-gold-400" strokeWidth={1.6} />
      </div>
      <p className="text-xs text-navy-400 uppercase tracking-wider font-medium mb-1">{label}</p>
      <p className="font-serif font-bold text-navy-900 text-sm md:text-base">{value}</p>
    </div>
  );
}
