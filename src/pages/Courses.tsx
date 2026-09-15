import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { CourseCard } from '@/components/CourseCard';
import { COURSES } from '@/lib/constants';
import { ArrowRight, GraduationCap } from 'lucide-react';

export function Courses() {
  return (
    <>
      <PageHeader
        title="Undergraduate Programmes"
        subtitle="Explore the academic programmes offered at our college."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Courses' }]}
      />

      <section className="section-padding bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-navy-800 items-center justify-center mb-4">
              <GraduationCap className="w-7 h-7 text-gold-400" strokeWidth={1.6} />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mb-3">
              Our Undergraduate Courses
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              The college offers the following undergraduate programmes affiliated to Thiruvalluvar University, Vellore.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          <div className="mt-14 bg-white rounded-2xl p-8 md:p-10 border border-cream-200 shadow-sm text-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-navy-900 mb-3">
              Interested in Joining?
            </h3>
            <p className="text-navy-600 mb-6 max-w-xl mx-auto">
              Learn more about the admission process and how to apply to our college.
            </p>
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 hover:bg-navy-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              Admission Information
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
