"use client";

import { useState, useMemo, useEffect } from 'react';
import { Calculator, Percent, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [value, setValue] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2); // 20% default
  const [interestRate, setInterestRate] = useState(10.5); // 10.5% default annual
  const [years, setYears] = useState(30); // 30 years default

  useEffect(() => {
    if (propertyPrice > 0) {
      setValue(propertyPrice);
      setDownPayment(propertyPrice * 0.2);
    }
  }, [propertyPrice]);

  const monthlyPayment = useMemo(() => {
    const principal = value - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;

    if (principal > 0 && monthlyRate > 0) {
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      return principal * (numerator / denominator);
    }

    return 0;
  }, [value, downPayment, interestRate, years]);



  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Simulador de Financiamento</h3>
          <p className="text-sm text-slate-500">Faça uma simulação e planeje sua compra</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Property Value */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Valor do Imóvel</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500">R$</span>
              </div>
              <input
                type="text"
                value={value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  const floatValue = rawValue ? parseFloat(rawValue) / 100 : 0;
                  setValue(floatValue);
                }}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Entrada ({value > 0 ? Math.round((downPayment / value) * 100) : 0}%)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500">R$</span>
              </div>
              <input
                type="text"
                value={downPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  const floatValue = rawValue ? parseFloat(rawValue) / 100 : 0;
                  setDownPayment(floatValue);
                }}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900"
              />
            </div>
            <input
              type="range"
              min={0}
              max={value}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Juros Anuais</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="block w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Years */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Prazo (Anos)</label>
              <div className="relative">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="block w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-slate-200">
          <p className="text-slate-500 font-medium mb-2">Primeira Parcela Estimada</p>
          <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
            {formatCurrency(monthlyPayment)}
          </div>
          <p className="text-xs text-slate-400 max-w-xs">
            *Valor aproximado usando Tabela Price. Não inclui taxas administrativas, seguros ou correção monetária (TR/IPCA). Consulte um banco para valores exatos.
          </p>
          
          <div className="w-full mt-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Valor Financiado:</span>
              <span className="font-semibold text-slate-900">{formatCurrency(value - downPayment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total de Meses:</span>
              <span className="font-semibold text-slate-900">{years * 12} meses</span>
            </div>
          </div>

          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Solicitar Análise de Crédito
          </button>
        </div>
      </div>
    </div>
  );
}
