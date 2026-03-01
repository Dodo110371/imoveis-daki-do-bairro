import { Calculator, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RentSummaryProps {
  rentPrice: number;
  condoPrice?: number;
  iptuPrice?: number;
}

export function RentSummary({ rentPrice, condoPrice = 0, iptuPrice = 0 }: RentSummaryProps) {
  const total = rentPrice + condoPrice + iptuPrice;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Estimativa Mensal</h3>
          <p className="text-sm text-slate-500">Resumo dos custos para locação</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cost Breakdown */}
        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-slate-600">
            <span>Aluguel</span>
            <span className="font-medium text-slate-900">{formatCurrency(rentPrice)}</span>
          </div>
          
          {condoPrice > 0 && (
            <div className="flex justify-between items-center text-slate-600">
              <span>Condomínio</span>
              <span className="font-medium text-slate-900">{formatCurrency(condoPrice)}</span>
            </div>
          )}
          
          {iptuPrice > 0 && (
            <div className="flex justify-between items-center text-slate-600">
              <span>IPTU (mensal)</span>
              <span className="font-medium text-slate-900">{formatCurrency(iptuPrice)}</span>
            </div>
          )}

          <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-slate-900">Total Estimado</span>
            <span className="font-bold text-xl text-blue-600">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Documents */}
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
              <FileText className="h-5 w-5 text-blue-600" />
              Documentação Básica
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                RG e CPF
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                Comprovante de Renda
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                Comprovante de Residência
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Garantias Comuns
            </h4>
            <p className="text-sm text-slate-600 mb-2">
              Verifique com o anunciante as opções aceitas:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Seguro Fiança
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Caução / Depósito
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Fiador
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
