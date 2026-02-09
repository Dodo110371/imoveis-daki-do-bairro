"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

interface FAQAccordionProps {
  categories: FAQCategory[];
}

export function FAQAccordion({ categories }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const id = `${categoryIndex}-${itemIndex}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="space-y-12">
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="scroll-mt-24" id={`category-${catIndex}`}>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <div className="h-8 w-1 bg-blue-600 rounded-full" />
            {category.title}
          </h3>
          <div className="space-y-4">
            {category.items.map((item, itemIndex) => {
              const isOpen = openIndex === `${catIndex}-${itemIndex}`;
              return (
                <div 
                  key={itemIndex}
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-blue-200 bg-blue-50/30 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(catIndex, itemIndex)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className={`font-medium text-lg ${isOpen ? 'text-blue-700' : 'text-slate-700'}`}>
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
