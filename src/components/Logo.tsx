import { GraduationCap } from 'lucide-react';
import { COLLEGE } from '@/lib/constants';

export function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center ring-2 ring-gold-400/70 shadow-md">
        <GraduationCap className="w-6 h-6 text-gold-400" strokeWidth={1.8} />
      </div>
      {showText && (
        <div className="leading-tight">
          <p className="font-serif font-bold text-navy-900 text-sm md:text-base">
            Government Arts &amp; Science College
          </p>
          <p className="text-xs text-maroon-700 font-medium">Melvenkatapuram · Ranipet District</p>
        </div>
      )}
    </div>
  );
}
