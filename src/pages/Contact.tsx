import { PageHeader } from '@/components/PageHeader';
import { COLLEGE } from '@/lib/constants';
import { MapPin, Mail, Globe, Building2 } from 'lucide-react';

export function Contact() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with Government Arts and Science College, Melvenkatapuram."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Contact' }]}
      />

      <section className="section-padding bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Contact Information</h2>
                <p className="text-navy-600">Reach out to us through any of the following channels.</p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-xl p-6 border border-cream-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5.5 h-5.5 text-gold-400" size={22} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-navy-900 mb-2">Address</h3>
                    <address className="text-sm text-navy-600 not-italic leading-relaxed">
                      {COLLEGE.address.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </address>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 border border-cream-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5.5 h-5.5 text-gold-400" size={22} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-navy-900 mb-2">Email</h3>
                    {COLLEGE.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block text-sm text-navy-600 hover:text-gold-600 transition-colors break-all"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="bg-white rounded-xl p-6 border border-cream-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5.5 h-5.5 text-gold-400" size={22} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-navy-900 mb-2">Website</h3>
                    <a
                      href={COLLEGE.website}
                      className="text-sm text-navy-600 hover:text-gold-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {COLLEGE.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Institutional info */}
              <div className="bg-gradient-navy rounded-xl p-6 text-cream-100">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5.5 h-5.5 text-gold-400" size={22} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white mb-1">Institutional Information</h3>
                    <p className="text-sm text-cream-300">Affiliated to {COLLEGE.affiliation}</p>
                    <p className="text-sm text-gold-300 mt-1">Established {COLLEGE.established}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Find Us</h2>
                <p className="text-navy-600">Our college is located in Sholinghur Taluk, Ranipet District.</p>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-sm">
                <div className="aspect-[4/3] bg-gradient-to-br from-navy-50 to-cream-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(#0d1b2a 1px, transparent 1px), linear-gradient(90deg, #0d1b2a 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }} />
                  <div className="text-center relative z-10 p-6">
                    <div className="w-16 h-16 rounded-full bg-maroon-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="font-serif font-bold text-navy-900 text-lg">College Location</p>
                    <p className="text-sm text-navy-600 mt-1">
                      Walajah–Sholinghur Road, Ranipet District – 631 102
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Government+Arts+and+Science+College+Melvenkatapuram+Sholinghur+Ranipet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
