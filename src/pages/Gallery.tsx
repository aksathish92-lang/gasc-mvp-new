import { useEffect, useState, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { GalleryGrid } from '@/components/GalleryGrid';
import { ErrorState } from '@/components/ErrorState';
import { fetchImages } from '@/lib/api';
import type { SiteImage, ImageCategory } from '@/types';

const CATEGORIES: { label: string; value: ImageCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Campus', value: 'campus' },
  { label: 'Events', value: 'event' },
  { label: 'Activities', value: 'gallery' },
  { label: 'General', value: 'about' },
];

export function Gallery() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ImageCategory | 'all'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchImages('gallery');
      setImages(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A glimpse of campus life, events, and activities at our college."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Gallery' }]}
      />

      <section className="py-16 md:py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-navy-800 text-white shadow-md'
                    : 'bg-white text-navy-600 hover:bg-navy-50 border border-cream-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {error ? (
            <ErrorState message="Unable to load gallery images at this time." onRetry={load} />
          ) : (
            <GalleryGrid images={filtered} loading={loading} />
          )}
        </div>
      </section>
    </>
  );
}
