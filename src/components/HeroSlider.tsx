import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { fetchImages } from '@/lib/api';
import type { SiteImage } from '@/types';
import { LoadingState } from '@/components/LoadingState';

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #0d1b2a 0%, #243b53 50%, #324e6b 100%)',
  'linear-gradient(135deg, #16263b 0%, #243b53 50%, #7a1c38 100%)',
  'linear-gradient(135deg, #0d1b2a 0%, #5c1830 50%, #7a1c38 100%)',
];

const SLIDE_INTERVAL = 6000;

export function HeroSlider() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const loadImages = useCallback(async () => {
    try {
      const data = await fetchImages('hero');
      setImages(data);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const handleImgError = (idx: number) => {
    setFailed((prev) => new Set(prev).add(idx));
  };

  if (loading) {
    return (
      <div className="h-[70vh] min-h-[500px] bg-gradient-navy flex items-center justify-center">
        <LoadingState message="Loading..." />
      </div>
    );
  }

  const hasImages = images.length > 0;

  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[85vh] md:min-h-[600px] overflow-hidden bg-navy-900">
      {/* Slides */}
      {hasImages ? (
        images.map((img, idx) => {
          const isCurrent = idx === current;
          const isFailed = failed.has(idx);
          return (
            <div
              key={img.id}
              className={`absolute inset-0 hero-slide ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              aria-hidden={!isCurrent}
            >
              {!isFailed ? (
                <img
                  src={img.image_url}
                  alt={img.title || 'College campus'}
                  className="w-full h-full object-cover"
                  onError={() => handleImgError(idx)}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="w-full h-full" style={{ background: FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length] }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950/75" />
            </div>
          );
        })
      ) : (
        <div className="absolute inset-0" style={{ background: FALLBACK_GRADIENTS[0] }}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, #d4a042 1px, transparent 1px), radial-gradient(circle at 70% 80%, #d4a042 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/30 to-navy-950/60" />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-400/20 border border-gold-400/30 rounded-full mb-6 animate-fade-in-up">
              <GraduationCap className="w-4 h-4 text-gold-300" />
              <span className="text-gold-200 text-xs font-semibold tracking-wider uppercase">
                Government Institution · Estd. 2020
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow-lg leading-tight animate-fade-in-up">
              Government Arts &amp; Science College
            </h1>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-gold-300 mt-3 text-shadow-md animate-fade-in-up">
              Melvenkatapuram
            </p>
            <p className="text-base md:text-lg text-cream-200 mt-4 text-shadow-md animate-fade-in-up">
              Ranipet District, Tamil Nadu
            </p>
            <p className="text-sm md:text-base text-cream-300 mt-2 text-shadow-md animate-fade-in-up">
              Affiliated to Thiruvalluvar University, Vellore · Established 2020
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-fade-in-up">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-300 text-navy-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Explore Our College
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4" />
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      {hasImages && images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-8 bg-gold-400' : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
