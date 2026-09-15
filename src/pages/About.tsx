import { PageHeader } from '@/components/PageHeader';
import { COLLEGE } from '@/lib/constants';
import { Calendar, MapPin, Building2, School, BookOpen } from 'lucide-react';

export function About() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Learn about our institution, location, and academic affiliation."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'About Us' }]}
      />

      <section className="section-padding bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                Our Institution
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mb-6 leading-tight">
                Government Arts and Science College, Melvenkatapuram
              </h2>
              <p className="text-navy-700 text-base leading-relaxed mb-4">
                Government Arts and Science College, Melvenkatapuram, is a government institution located in
                Sholinghur Taluk, Ranipet District, Tamil Nadu. The college was established in the year 2020 and
                is affiliated to Thiruvalluvar University, Vellore.
              </p>
              <p className="text-navy-600 text-base leading-relaxed mb-6">
                As a government arts and science college, it offers undergraduate programmes in arts, commerce,
                and science disciplines, serving the educational needs of students in the region.
              </p>

              <div className="space-y-4">
                <InfoRow icon={Calendar} label="Established" value="2020" />
                <InfoRow icon={MapPin} label="District" value="Ranipet" />
                <InfoRow icon={Building2} label="Taluk" value="Sholinghur" />
                <InfoRow icon={School} label="Affiliation" value="Thiruvalluvar University, Vellore" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-navy">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center text-cream-200">
                    <School className="w-20 h-20 text-gold-400 mx-auto mb-4" strokeWidth={1} />
                    <p className="font-serif text-xl font-bold">Excellence in Education</p>
                    <p className="text-gold-300 mt-1">Since 2020</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
                <h3 className="font-serif font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold-600" />
                  Programmes Offered
                </h3>
                <ul className="space-y-2 text-sm text-navy-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    B.A. Tamil
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    B.A. English
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    B.Com.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    B.Sc. Mathematics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    B.Sc. Computer Science
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision placeholder section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <PlaceholderCard title="Our Vision" />
            <PlaceholderCard title="Our Mission" />
            <PlaceholderCard title="Our Values" />
          </div>
          <p className="text-center text-sm text-navy-400 mt-8 max-w-2xl mx-auto">
            Additional institutional information will be updated here by the college administration.
          </p>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-cream-200 shadow-sm">
      <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-navy-700" strokeWidth={1.7} />
      </div>
      <div>
        <p className="text-xs text-navy-400 uppercase tracking-wider">{label}</p>
        <p className="font-semibold text-navy-900">{value}</p>
      </div>
    </div>
  );
}

function PlaceholderCard({ title }: { title: string }) {
  return (
    <div className="bg-cream-50 rounded-xl p-6 border border-cream-200 text-center">
      <h3 className="font-serif font-bold text-navy-900 text-lg mb-2">{title}</h3>
      <p className="text-sm text-navy-400">Content will be updated soon.</p>
    </div>
  );
}
