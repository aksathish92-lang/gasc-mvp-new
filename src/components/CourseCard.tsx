import { Link } from 'react-router-dom';
import { BookOpen, Languages, Calculator, Sigma, Cpu, ArrowRight } from 'lucide-react';
import type { Course } from '@/types';

const ICONS: Record<string, typeof BookOpen> = {
  BookOpen,
  Languages,
  Calculator,
  Sigma,
  Cpu,
};

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const Icon = ICONS[course.iconName] ?? BookOpen;

  return (
    <article
      className="card-hover group bg-white rounded-xl border border-cream-200 overflow-hidden shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-gold-400" strokeWidth={1.7} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-maroon-600 bg-maroon-50 px-3 py-1 rounded-full">
            {course.degreeType}
          </span>
        </div>
        <h3 className="font-serif font-bold text-navy-900 text-lg md:text-xl mb-2">
          {course.name}
        </h3>
        <p className="text-sm text-navy-600 leading-relaxed mb-5">
          {course.description}
        </p>
        <Link
          to="/admission"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors group/link"
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-maroon-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </article>
  );
}
