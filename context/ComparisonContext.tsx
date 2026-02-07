'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ComparisonContextType {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        setCompareList([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('compareList', JSON.stringify(compareList));
    }
  }, [compareList, isLoaded]);

  const addToCompare = (id: string) => {
    if (compareList.length >= 3) {
      // In a real app, we might use a toast here. For now, we'll rely on the UI to disable/show status.
      // But we can also just alert or ignore.
      // Let's allow the caller to handle the "full" state check usually, but as a safeguard:
      if (!compareList.includes(id)) {
         alert("Você só pode comparar até 3 imóveis.");
      }
      return;
    }
    if (!compareList.includes(id)) {
      setCompareList([...compareList, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(itemId => itemId !== id));
  };

  const isInCompare = (id: string) => compareList.includes(id);

  const toggleCompare = (id: string) => {
    if (isInCompare(id)) {
      removeFromCompare(id);
    } else {
      addToCompare(id);
    }
  };

  const clearCompare = () => setCompareList([]);

  return (
    <ComparisonContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, toggleCompare, clearCompare }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error('useComparison must be used within ComparisonProvider');
  return context;
}
