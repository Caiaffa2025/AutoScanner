/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { DiagnosticPackage } from "../types";

const PACKAGES: DiagnosticPackage[] = [
  {
    id: "preventive",
    name: "Varredura Preventiva Check-Up",
    description: "Ideal para check-ups periódicos ou antes de viagens para garantir segurança absoluta.",
    price: 119,
    timeEstimated: "30 min",
    features: [
      "Varredura exclusiva na central de Injeção",
      "Leitura de códigos de falha (DTCs)",
      "Análise de saúde interna da bateria",
      "Teste dinâmico do alternador de carga",
      "Reset físico de avisos simples",
      "Emissão de relatório técnico PDF simplificado"
    ]
  },
  {
    id: "complete",
    name: "Diagnóstico Eletrônico Completo",
    description: "O mais solicitado. Uma varredura minuciosa com o sistema AUTOSCANNER ONLINE em tudo que o carro possui.",
    price: 199,
    timeEstimated: "50 min",
    features: [
      "Leitura ativa em todos os módulos (Injeção, ABS, Airbag, Clima, Rede)",
      "Monitoramento dinâmico de mais de 40 parâmetros/seg",
      "Varredura e reset de anomalias passivas/históricas",
      "Ajuste e sincronização eletrônica pós-reparos",
      "Diagnóstico preventivo do catalisador",
      "Relatório detalhado exportado para o WhatsApp",
      "Conselho mecânico profissional das falhas encontradas"
    ],
    isPopular: true
  }
];

interface PricingPackagesProps {
  onSelectPackage: (packageId: string) => void;
}

export default function PricingPackages({ onSelectPackage }: PricingPackagesProps) {
  return (
    <section id="pricing" className="py-24 bg-[#121212] text-white border-b border-raven-border font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block">
            Preços Transparentes
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            Pacotes de Diagnóstico Profissional
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Escolha o nível de profundidade analítica apropriado para o seu veículo. Oferecemos valores transparentes sem taxas extras ocultas.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`rounded-none p-7.5 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.isPopular
                    ? "bg-[#181818] text-white border-2 border-raven-red shadow-2xl lg:scale-[1.03] z-10"
                    : "bg-[#0c0c0c] text-white/90 border border-raven-border shadow-xl hover:border-[#444]"
                }`}
              >
                {/* Popular Ribbon badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-raven-red text-white text-[9px] font-mono font-black tracking-[0.22em] px-4 py-2 rounded-none shadow-lg flex items-center gap-1 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    MAIS RECOMENDADO
                  </div>
                )}

                <div>
                  {/* Name & description */}
                  <div className="space-y-3 border-b border-dashed pb-5 mb-5 border-raven-border">
                    <h3 className="font-display font-black text-base uppercase tracking-wider leading-snug">{pkg.name}</h3>
                    <p className={`text-xs ${pkg.isPopular ? "text-white/50" : "text-white/40"} leading-relaxed font-semibold`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing dynamic label */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase text-white/40">Investimento de</span>
                    <span className="font-display font-black text-3xl md:text-4xl text-white">R$ {pkg.price}</span>
                  </div>

                  {/* Estimation info card */}
                  <div className={`p-3.5 rounded-none flex items-center justify-between text-xs font-mono mb-6 ${
                    pkg.isPopular ? "bg-black/40 border border-[#333]" : "bg-[#121212] border border-raven-border"
                  }`}>
                    <span className="text-white/40 uppercase text-[9px] font-bold tracking-wider">Tempo estimado:</span>
                    <span className="font-black text-white">{pkg.timeEstimated}</span>
                  </div>

                  {/* Feature lists */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[9px] font-mono tracking-widest text-white/40 uppercase font-black">ITENS INCLUSOS NO DIAGNÓSTICO:</p>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs">
                          <Check className="w-4 h-4 text-raven-red shrink-0 mt-0.5" />
                          <span className={`${pkg.isPopular ? "text-white/80" : "text-white/70"} leading-snug font-semibold`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Confirm Package Selection Trigger */}
                <button
                  id={`pricing-btn-${pkg.id}`}
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-4 px-4 rounded-none font-black uppercase tracking-widest transition-all text-xs text-center flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.isPopular
                      ? "bg-raven-red hover:bg-[#ff2a30] text-white shadow-lg"
                      : "bg-[#222] hover:bg-[#333] border border-raven-border text-white"
                  }`}
                >
                  Selecionar este Pacote
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Home Service Delivery Fee Alert Badge with WA CTA */}
        <div className="mt-12 text-center max-w-2xl mx-auto border border-dashed border-raven-red/30 p-6 bg-[#0a0a0a] relative">
          <p className="text-xs text-white/70 leading-relaxed font-semibold">
            <span className="text-raven-red font-mono font-black text-xs uppercase tracking-widest block mb-2">
              🚚 ATENDIMENTO EXCLUSIVO EM DOMICÍLIO (NÃO ATENDEMOS EM OFICINA)
            </span>
            Realizamos o escaneamento computadorizado diretamente na sua residência, condomínio, trabalho ou onde o veículo estiver imobilizado. 
            O valor total do atendimento recebe uma taxa de deslocamento calculada de forma justa de acordo com a distância (selecionada na etapa de agendamento).
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
            <a
              href="https://wa.me/5511984937529?text=Olá!%20Gostaria%20de%20solicitar%20um%20diagnóstico%20automotivo%20em%20domicília."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-black font-black uppercase tracking-wider px-5 py-3 text-xs inline-flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.467 0 9.911-4.43 9.914-9.885.002-2.643-1.013-5.129-2.862-6.98C16.47 1.884 13.991.869 11.35.869c-5.476 0-9.92 4.434-9.923 9.893-.001 1.905.513 3.766 1.488 5.412L1.874 22.1l6.002-1.574c1.62.88 3.243 1.328 4.771 1.328zM17.61 14.38c-.29-.145-1.72-.848-1.986-.944-.266-.097-.46-.145-.653.145-.193.29-.747.944-.916 1.139-.17.193-.338.217-.628.072-.29-.145-1.228-.453-2.338-1.444-.864-.772-1.448-1.727-1.618-2.017-.17-.29-.018-.447.127-.59.13-.13.29-.338.435-.507.145-.17.193-.29.29-.483.097-.193.048-.361-.025-.507-.072-.145-.653-1.573-.894-2.152-.236-.569-.475-.49-.652-.49-.17 0-.361-.024-.554-.024s-.506.072-.771.361c-.266.29-1.013.99-1.013 2.415 0 1.425 1.037 2.798 1.182 2.992.145.193 2.037 3.111 4.934 4.362.688.297 1.224.474 1.644.608.692.22 1.322.189 1.821.114.555-.083 1.72-.7 1.961-1.374.24-.674.24-1.253.17-1.374-.073-.12-.266-.193-.555-.338z" />
              </svg>
              Falar Via WhatsApp: (11) 98493-7529
            </a>
            <span className="text-[10px] font-mono text-white/40">ou ligue direto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
