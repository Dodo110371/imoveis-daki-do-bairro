import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Move, MapPin } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  type: 'Venda' | 'Aluguel';
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
  type,
}: PropertyCardProps) {
  return (
    <Link href={`/imovel/${id}`} className="group block overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 rounded-md bg-slate-900/90 px-2 py-1 text-xs font-semibold text-white">
          {type}
        </div>
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
        <div className="mt-4 text-xl font-bold text-slate-900">{price}</div>
      </div>
    </Link>
  );
}
