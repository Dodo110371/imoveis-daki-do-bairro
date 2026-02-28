"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Move, MapPin, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { CompareButton } from './CompareButton';
import { cn, formatCurrency } from '@/lib/utils';
import { AgencyPartnerBadge } from './AgencyPartnerBadge';
import { PartnerBadge } from './PartnerBadge';

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
  agencyPartner = false,
  realtorPartner = false,
}: PropertyCardProps) {
  const formattedPrice = typeof price === 'number' ? formatCurrency(price) : price;

  // Use images array if provided and not empty, otherwise fallback to [imageUrl]
  // Filter out null/undefined values
  const validImages = (images && images.length > 0 ? images : [imageUrl]).filter((img): img is string => !!img);
  const hasImages = validImages.length > 0;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  return (
    <div className="group block overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg relative">
      <Link href={`/imoveis/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center">
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

          <div className="absolute top-2 left-2 rounded-md bg-slate-900/90 px-2 py-1 text-xs font-semibold text-white z-10">
            {type}
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
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-20"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-20"
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
      </Link>
    </div>
  );
}
