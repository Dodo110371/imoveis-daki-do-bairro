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
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('comparison_ids');
    if (saved) {
      try {
        setComparisonIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse comparison list:', e);
        setComparisonIds([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('comparison_ids', JSON.stringify(comparisonIds));
    }
  }, [comparisonIds, isLoading]);

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
