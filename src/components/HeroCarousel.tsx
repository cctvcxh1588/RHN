'use client';

import { useState, useEffect, useCallback } from 'react';

interface Slide {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  interval?: number;
  children?: React.ReactNode;
  className?: string;
}

export default function HeroCarousel({
  slides,
  interval = 5000,
  children,
  className = '',
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out will-change-opacity"
          style={{
            backgroundImage: `url('${slide.src}')`,
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 1 : 0,
          }}
          aria-hidden={index !== current}
        />
      ))}

      {/* Bottom vignette overlay for text readability */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Content */}
      {children && <div className="relative z-[3] h-full">{children}</div>}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-accent-gold w-7'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}