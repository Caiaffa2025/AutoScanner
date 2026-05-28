/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  AlertTriangle, 
  Gauge, 
  ShieldAlert, 
  Battery, 
  Wrench, 
  Database, 
  Search,
  Sparkles
} from "lucide-react";

interface DiagnosticScopeProps {
  onBookNow: () => void;
}

export default function DiagnosticScope({ onBookNow }: DiagnosticScopeProps) {
  const scopeItems = [
    {
      id: "injecao",
      title: "Luz de Injeção Acesa",
      desc: "Varredura na central do motor para rastrear emissões, falhas na Sonda Lambda, TBI, bicos injetores e qualidade de combustível.",
      icon: <AlertTriangle className="w-5 h-5 text-raven-red" />,
      badge: "Injeção"
    },
    {
      id: "abs",
      title: "Falha ABS / ESP",
      desc: "Interrogação da central de frenagem ABS para decodificar anomalias no sistema antitravamento de pânico e controle de tração.",
      icon: <Gauge className="w-5 h-5 text-raven-red" />,
      badge: "Segurança"
    },
    {
      id: "airbag",
      title: "Falha de Airbag (SRS)",
      desc: "Leitura de conectores, fita do volante (clock spring) e sensores de colisão ativos que acendem o aviso de airbag no painel.",
      icon: <ShieldAlert className="w-5 h-5 text-raven-red" />,
      badge: "Retenção"
    },
    {
      id: "bateria",
      title: "Saúde da Bateria",
      desc: "Verificação da tensão operacional sob partida (CCA), taxa de recarga do alternador e detecção de fugas de corrente elétrica.",
      icon: <Battery className="w-5 h-5 text-raven-red" />,
      badge: "Elétrica"
    },
    {
      id: "reset",
      title: "Reset de Manutenção",
      desc: "Zerar avisos periódicos de manutenção, avisos de troca de óleo vencida e redefinir indicadores visuais de advertência após o reparo.",
      icon: <Wrench className="w-5 h-5 text-raven-red" />,
      badge: "Painel"
    },
    {
      id: "leitura",
      title: "Leitura de Códigos de Erro",
      desc: "Rastreamento completo e transmissão dos códigos DTC (Diagnostic Trouble Codes) gravados na memória eletrônica do veículo.",
      icon: <Database className="w-5 h-5 text-raven-red" />,
      badge: "Scanner OBD2"
    },
    {
      id: "preliminar",
      title: "Diagnóstico Preliminar",
      desc: "Análise técnica prévia sobre o possível problema de pane ou falha existente, blindando o cliente de trocas precipitadas de peças.",
      icon: <Search className="w-5 h-5 text-raven-red" />,
      badge: "Aconselhamento"
    }
  ];

  return (
    <section id="escopo-diagnostico" className="py-24 bg-[#0a0a0a] text-white border-b border-raven-border relative font-sans">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block">
            Escopo Operacional Atendido
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            Diagnóstico Preliminar e Códigos de Falha
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Consulte de forma transparente o tipo de serviço que se baseia a nossa análise computadorizada preliminar para detectar o possível problema crítico existente e resolver os códigos de falha do seu veículo.
          </p>
        </div>

        {/* Dynamic List Container / Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scopeItems.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-[#121212] border border-raven-border p-6 rounded-none flex flex-col justify-between hover:border-white/30 hover:scale-[1.02] transition-all duration-300 group ${
                item.id === "preliminar" ? "lg:col-span-2 xl:col-span-2 border-dashed border-raven-red/40 bg-raven-red/5" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="p-3 bg-[#161616] border border-raven-border text-white inline-block">
                    {item.icon}
                  </span>
                  <span className="text-[8px] font-mono font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/65 px-2 py-0.5">
                    {item.badge}
                  </span>
                </div>
                
                <h3 className="font-display font-black text-sm tracking-wide uppercase text-white flex items-center gap-1.5">
                  {item.id === "preliminar" && <Sparkles className="w-4 h-4 text-raven-red animate-pulse shrink-0" />}
                  {item.title}
                </h3>
                
                <p className="text-white/60 text-xs leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>

              {item.id === "preliminar" && (
                <div className="mt-6 pt-4 border-t border-raven-border/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <span className="text-[10px] font-mono text-raven-red font-extrabold uppercase tracking-widest flex items-center gap-1"/>
                  <button
                    onClick={onBookNow}
                    className="bg-raven-red hover:bg-[#ff2a30] text-white text-[10px] font-mono font-black uppercase tracking-widest px-4 py-2 hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Agendar Meu Diagnóstico Preliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlighting Explanatory Card */}
        <div className="mt-12 bg-[#121212] border border-raven-border p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 max-w-2xl">
            <div className="w-2.5 h-12 bg-raven-red shrink-0" />
            <p className="text-xs text-white/70 leading-relaxed font-semibold">
              <strong className="text-white uppercase font-black block text-[10px] font-mono tracking-wider mb-1">Como funciona a leitura preliminar?</strong>
              Nosso equipamento de diagnóstico de alta tecnologia interroga e extrai os códigos de falha do software de bordo em todas as centrais eletrônicas. Você recebe um <strong className="text-white">diagnóstico preliminar preciso com apontamento exato da falha</strong> antes de qualquer reparo, evitando gastos com a troca desnecessária de peças de bom funcionamento.
            </p>
          </div>
          <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase shrink-0">TECNOLOGIA OBD-II PROFISSIONAL</p>
        </div>

      </div>
    </section>
  );
}
