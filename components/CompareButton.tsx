'use client';

import { ArrowRightLeft } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';

interface CompareButtonProps {
  propertyId: string;
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
}

export function CompareButton({ propertyId, className, iconSize = 20, showLabel = false }: CompareButtonProps) {
  const { isInCompare, toggleCompare, compareList } = useComparison();
  const isCompared = isInCompare(propertyId);
  const isFull = compareList.length >= 3;

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isCompared && isFull) {
      alert("Limite de 3 imóveis para comparação atingido.");
      return;
    }
    toggleCompare(propertyId);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 rounded-full p-2 transition-all duration-300 focus:outline-none",
        isCompared 
          ? "bg-blue-100 text-blue-600" 
          : "bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm",
        showLabel && "px-4",
        className
      )}
      title={isCompared ? "Remover da comparação" : "Adicionar à comparação"}
    >
      <ArrowRightLeft 
        size={iconSize} 
        className={cn(
          "transition-transform",
          isCompared ? "scale-110" : "scale-100"
        )} 
      />
      {showLabel && (
        <span className="text-sm font-medium">
          {isCompared ? "Comparando" : "Comparar"}
        </span>
      )}
    </button>
  );
}
