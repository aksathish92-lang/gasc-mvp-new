import { type ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-cream-50">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
