import { AdminLayout } from '@/layouts/AdminLayout';
import { Settings as SettingsIcon, Info } from 'lucide-react';
import { COLLEGE } from '@/lib/constants';

export function AdminSettings() {
  return (
    <AdminLayout title="Site Settings">
      <div className="bg-white rounded-xl p-8 border border-cream-200 shadow-sm max-w-3xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
            <SettingsIcon className="w-6 h-6 text-gold-400" strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-serif font-bold text-navy-900 text-lg">Site Settings</h2>
            <p className="text-sm text-navy-600 mt-1">View and manage website configuration.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gold-50 border border-gold-200 rounded-lg mb-6">
          <Info className="w-5 h-5 text-gold-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gold-800">
            Site settings are currently managed through constants and database content. Additional settings
            management will be available in a future update.
          </p>
        </div>

        <div className="space-y-3">
          <SettingRow label="College Name" value={COLLEGE.name} />
          <SettingRow label="Location" value={COLLEGE.location} />
          <SettingRow label="District" value={COLLEGE.district} />
          <SettingRow label="Taluk" value={COLLEGE.taluk} />
          <SettingRow label="Affiliation" value={COLLEGE.affiliation} />
          <SettingRow label="Established" value={COLLEGE.established} />
          <SettingRow label="Website" value={COLLEGE.website} />
          <SettingRow label="Emails" value={COLLEGE.emails.join(', ')} />
        </div>
      </div>
    </AdminLayout>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg border border-cream-200">
      <span className="text-sm font-medium text-navy-500">{label}</span>
      <span className="text-sm font-semibold text-navy-900 text-right">{value}</span>
    </div>
  );
}
