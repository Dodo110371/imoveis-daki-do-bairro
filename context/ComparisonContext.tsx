'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ComparisonContextType {
  comparisonIds: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  isInComparison: (id: string) => boolean;
  toggleComparison: (id: string) => void;
  clearComparison: () => void;
  isLoading: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('comparison_ids') : null;
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading] = useState(false);

  // Save to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem('comparison_ids', JSON.stringify(comparisonIds));
  }, [comparisonIds]);

  const addToComparison = (id: string) => {
    setComparisonIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        alert("Você só pode comparar até 3 imóveis por vez.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromComparison = (id: string) => {
    setComparisonIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isInComparison = (id: string) => {
    return comparisonIds.includes(id);
  };

  const toggleComparison = (id: string) => {
    if (isInComparison(id)) {
      removeFromComparison(id);
    } else {
      addToComparison(id);
    }
  };

  const clearComparison = () => {
    setComparisonIds([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonIds,
        addToComparison,
        removeFromComparison,
        isInComparison,
        toggleComparison,
        clearComparison,
        isLoading,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
