"use client";

import { useState, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bed, Bath, Move, MapPin, ChevronLeft, ChevronRight, Home, Sparkles } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { CompareButton } from './CompareButton';
import { cn, formatCurrency } from '@/lib/utils';
import { AgencyPartnerBadge } from './AgencyPartnerBadge';
import { PartnerBadge } from './PartnerBadge';
import { hasAnalyticsConsent, hasMarketingConsent } from '@/context/CookieConsentContext';
import { trackAnalyticsEvent } from '@/lib/analytics/track';

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string | null;
  images?: string[];
  type: 'Venda' | 'Aluguel';
  featured?: boolean;
  agencyPartner?: boolean;
  realtorPartner?: boolean;
}

export function PropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  images = [],
  type,
  featured = false,
  agencyPartner = false,
  realtorPartner = false,
}: PropertyCardProps) {
  const router = useRouter();
  const formattedPrice = typeof price === 'number' ? formatCurrency(price) : price;

  // Use images array if provided and not empty, otherwise fallback to [imageUrl]
  // Filter out null/undefined values
  const validImages = (images && images.length > 0 ? images : [imageUrl]).filter((img): img is string => !!img);
  const hasImages = validImages.length > 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }

    if (isRightSwipe && hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  const nextImage = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  const trackPropertyClick = () => {
    if (!hasAnalyticsConsent()) return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', 'click_imovel', {
      event_category: 'imovel',
      event_label: id,
    });
  };

  const handleCardClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      if (hasMarketingConsent()) {
        trackAnalyticsEvent({ eventType: "click_imovel", propertyId: id });
      }
      trackPropertyClick();
      return;
    }

    e.preventDefault();

    if (hasMarketingConsent()) {
      trackAnalyticsEvent({ eventType: "click_imovel", propertyId: id });
    }

    if (!hasAnalyticsConsent()) {
      router.push(`/imoveis/${id}`);
      return;
    }

    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) {
      router.push(`/imoveis/${id}`);
      return;
    }

    let navigated = false;
    const navigate = () => {
      if (navigated) return;
      navigated = true;
      router.push(`/imoveis/${id}`);
    };

    gtag('event', 'click_imovel', {
      event_category: 'imovel',
      event_label: id,
      event_callback: navigate,
      event_timeout: 750,
    });

    window.setTimeout(navigate, 900);
  };

  return (
    <div className="group block overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg relative">
      <a href={`/imoveis/${id}`} className="block" onClick={handleCardClick}>
        <div
          className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {hasImages ? (
            <Image
              src={validImages[currentImageIndex]}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <Home className="w-12 h-12 mb-2 opacity-50" />
              <span className="text-xs font-medium uppercase tracking-wide">Sem foto</span>
            </div>
          )}

          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
            {featured && (
              <div className="rounded-md bg-amber-500 px-2 py-1 text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 fill-white" />
                DESTAQUE
              </div>
            )}
            <div className="rounded-md bg-slate-900/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
              {type}
            </div>
          </div>

          {agencyPartner && (
            <div className="absolute bottom-2 md:bottom-3 lg:bottom-4 left-2 md:left-3 lg:left-4 z-10">
              <span className="md:hidden">
                <AgencyPartnerBadge size="sm" className="opacity-95 transition-opacity duration-150 md:duration-200 group-hover:opacity-100" />
              </span>
              <span className="hidden md:inline-flex">
                <AgencyPartnerBadge size="md" className="opacity-95 transition-opacity duration-150 md:duration-200 group-hover:opacity-100" />
              </span>
            </div>
          )}

          {realtorPartner && (
            <div className="absolute bottom-2 md:bottom-3 lg:bottom-4 right-2 md:right-3 lg:right-4 z-10">
              <span className="md:hidden">
                <PartnerBadge size="sm" className="opacity-95 transition-opacity duration-150 md:duration-200 group-hover:opacity-100" />
              </span>
              <span className="hidden md:inline-flex">
                <PartnerBadge size="md" className="opacity-95 transition-opacity duration-150 md:duration-200 group-hover:opacity-100" />
              </span>
            </div>
          )}

          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            <FavoriteButton propertyId={id} />
            <CompareButton propertyId={id} />
          </div>

          {/* Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-slate-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white z-20"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-slate-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white z-20"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {validImages.slice(0, 5).map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-1.5 rounded-full transition-all shadow-sm",
                      idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 truncate">{title}</h3>
          <div className="mt-1 flex items-center text-sm text-slate-500">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            {location}
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Move className="h-4 w-4" />
                <span>{area}m²</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xl font-bold text-slate-900">{formattedPrice}</div>
        </div>
      </a>
    </div>
  );
}
