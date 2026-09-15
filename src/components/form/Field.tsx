import { type ReactNode } from 'react';

interface FieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

export function Field({ label, children, hint }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-navy-400 mt-1">{hint}</p>}
    </div>
  );
}

export const inputClass =
  'w-full px-3.5 py-2.5 text-sm border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all';

export const labelClass = 'block text-sm font-semibold text-navy-700 mb-1.5';
