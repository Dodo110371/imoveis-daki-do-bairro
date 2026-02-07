'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  iconSize?: number;
}

export function FavoriteButton({ propertyId, className, iconSize = 20 }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(propertyId);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if inside a card
    e.stopPropagation();
    toggleFavorite(propertyId);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
        isFav 
          ? "bg-red-50 text-red-500 shadow-sm" 
          : "bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm",
        className
      )}
      aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart 
        size={iconSize} 
        className={cn(
          "transition-all duration-300",
          isFav ? "fill-current scale-110" : "scale-100"
        )} 
      />
    </button>
  );
}
