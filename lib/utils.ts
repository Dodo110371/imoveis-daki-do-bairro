import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyInput(value: string | number): string {
  if (!value) return '';
  
  // Remove non-digits
  const numericValue = value.toString().replace(/\D/g, '');
  
  if (!numericValue) return '';
  
  // Convert to number and divide by 100
  const floatValue = parseFloat(numericValue) / 100;
  
  // Format number part only (e.g. 1.234,56)
  return floatValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrency(value: string): number {
  if (!value) return 0;
  // Remove all non-digits except comma
  // Then replace comma with dot
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
