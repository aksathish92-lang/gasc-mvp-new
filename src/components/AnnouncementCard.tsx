import { Calendar, Bell } from 'lucide-react';
import type { Announcement } from '@/types';

export function AnnouncementCard({ announcement, index = 0 }: { announcement: Announcement; index?: number }) {
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article
      className="card-hover bg-white rounded-xl border border-cream-200 p-6 shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-maroon-50 flex items-center justify-center">
          <Bell className="w-5 h-5 text-maroon-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-navy-400" />
            <time className="text-xs text-navy-400 font-medium" dateTime={announcement.date}>
              {formattedDate}
            </time>
            {announcement.category && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gold-100 text-gold-700">
                {announcement.category}
              </span>
            )}
          </div>
          <h3 className="font-serif font-bold text-navy-900 text-base md:text-lg leading-snug mb-2">
            {announcement.title}
          </h3>
          <p className="text-sm text-navy-600 leading-relaxed line-clamp-3">
            {announcement.content}
          </p>
        </div>
      </div>
    </article>
  );
}
