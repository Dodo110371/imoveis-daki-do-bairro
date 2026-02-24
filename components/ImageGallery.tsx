'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out invalid images just in case
  const displayImages = images.filter(img => !!img);
  const hasImages = displayImages.length > 0;

  const openLightbox = (index: number) => {
    if (!hasImages) return;
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasImages) {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }
  }, [displayImages.length, hasImages]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasImages) {
      setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }
  }, [displayImages.length, hasImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <>
      {/* Main Gallery Display */}
      <div 
        className={cn(
          "relative h-[400px] w-full md:h-[500px] group overflow-hidden rounded-b-2xl md:rounded-b-none bg-slate-100",
          hasImages ? "cursor-pointer" : "cursor-default"
        )} 
        onClick={() => openLightbox(0)}
      >
        {hasImages ? (
          <Image
            src={displayImages[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Maximize2 className="w-16 h-16 mb-4 opacity-20" />
            <span className="text-lg font-medium opacity-60">Sem fotos disponíveis</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent pointer-events-none" />

        {hasImages && (
          <div className="absolute top-3 right-3 md:top-auto md:bottom-4 md:right-4 z-20">
            <button
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-lg flex items-center gap-2 transition-all font-medium border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(0);
              }}
            >
              <Maximize2 size={18} />
              Ver Fotos ({displayImages.length})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {isOpen && hasImages && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
            onClick={closeLightbox}
        >
            {/* Close Button */}
            <button 
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110]"
                onClick={closeLightbox}
                aria-label="Fechar"
            >
                <X size={32} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/80 font-medium z-[110]">
                {currentIndex + 1} / {displayImages.length}
            </div>

            {/* Navigation Buttons */}
            {displayImages.length > 1 && (
                <>
                    <button 
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110] focus:outline-none"
                        onClick={prevImage}
                        aria-label="Imagem anterior"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button 
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110] focus:outline-none"
                        onClick={nextImage}
                        aria-label="Próxima imagem"
                    >
                        <ChevronRight size={40} />
                    </button>
                </>
            )}

            {/* Main Image Container */}
            <div 
                className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
            >
                <div className="relative w-full h-full">
                    <Image
                        src={displayImages[currentIndex]}
                        alt={`${title} - Foto ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                        quality={90}
                    />
                </div>
            </div>

            {/* Thumbnails Strip (Optional - visible on larger screens) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2 no-scrollbar z-[110]">
                {displayImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                        className={cn(
                            "relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-all",
                            currentIndex === idx ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
      )}
    </>
  );
}
