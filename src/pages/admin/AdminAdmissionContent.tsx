import { AdminLayout } from '@/layouts/AdminLayout';
import { FileText, Info } from 'lucide-react';

export function AdminAdmissionContent() {
  return (
    <AdminLayout title="Admission Content">
      <div className="bg-white rounded-xl p-8 border border-cream-200 shadow-sm max-w-3xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-gold-400" strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-serif font-bold text-navy-900 text-lg">Admission Content Management</h2>
            <p className="text-sm text-navy-600 mt-1">Manage admission-related information displayed on the website.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gold-50 border border-gold-200 rounded-lg mb-6">
          <Info className="w-5 h-5 text-gold-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gold-800">
            Admission announcements can be managed through the Announcements section by using the category
            "Admission". They will automatically appear on the Admission page.
          </p>
        </div>

        <div className="space-y-4">
          <ContentPlaceholder title="Application Process" />
          <ContentPlaceholder title="Eligibility Criteria" />
          <ContentPlaceholder title="Important Dates" />
          <ContentPlaceholder title="Required Documents" />
        </div>

        <p className="text-xs text-navy-400 mt-6">
          Detailed content management for these sections will be available in a future update. For now, use the
          Announcements manager to post admission-related updates.
        </p>
      </div>
    </AdminLayout>
  );
}

function ContentPlaceholder({ title }: { title: string }) {
  return (
    <div className="p-4 bg-cream-50 rounded-lg border border-cream-200">
      <h3 className="font-semibold text-navy-900 text-sm mb-1">{title}</h3>
      <p className="text-xs text-navy-400">Content will be updated soon.</p>
    </div>
  );
}
