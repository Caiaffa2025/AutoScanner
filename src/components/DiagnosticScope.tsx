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
  Sparkles,
  Cpu,
  RefreshCw,
  Droplets,
  Disc,
  Activity,
  Laptop,
  ClipboardCheck
} from "lucide-react";

interface DiagnosticScopeProps {
  onBookNow: () => void;
}

export default function DiagnosticScope({ onBookNow }: DiagnosticScopeProps) {
  const scopeItems = [
    {
      id: "scanner-transmissao",
      title: "Leitura dos Sensores de Pressão Eletrônica e Solenoides",
      desc: "Varredura computadorizada profunda na central TCU para ler dados do câmbio em tempo real, monitorar o funcionamento do corpo de válvulas e mapear falhas de solenoides e variação de pressão.",
      icon: <Cpu className="w-5 h-5 text-raven-red" />,
      badge: "Módulo TCU"
    },
    {
      id: "reset-adaptacao",
      title: "Reset e Adaptação",
      desc: "Redefinição completa dos parâmetros adaptativos de pressão hidráulica e desgaste das embreagens, eliminando trancos severos e atrasos de trocas.",
      icon: <RefreshCw className="w-5 h-5 text-raven-red" />,
      badge: "Calibração"
    },
    {
      id: "oleo-atf",
      title: "Troca de Óleo ATF (Diagnóstico)",
      desc: "Análise técnica computadorizada de envelhecimento térmico, contaminação do fluido e necessidade preventiva de substituição do óleo de transmissão (ATF).",
      icon: <Droplets className="w-5 h-5 text-raven-red" />,
      badge: "Lubrificação"
    },
    {
      id: "troca-filtro",
      title: "Troca de Filtro (Inspeção)",
      desc: "Verificação de restrição no fluxo hidráulico e aconselhamento do estado de saturação de filtros de transmissão primários ou do cárter.",
      icon: <Disc className="w-5 h-5 text-raven-red" />,
      badge: "Filtragem"
    },
    {
      id: "reaprendizado",
      title: "Reaprendizado Eletrônico",
      desc: "Ciclos guiados via scanner para ressincronizar pontos de acorrentamento e contato de embreagens para câmbios automáticos, CVTs ou Dupla Embreagem (DSG/Powershift).",
      icon: <Activity className="w-5 h-5 text-raven-red" />,
      badge: "Sincronismo"
    },
    {
      id: "diagnostico-eletronico",
      title: "Diagnóstico Eletrônico Avançado",
      desc: "Rastreamento transversal de toda a malha multiplexada do veículo para isolar perdas de sinal CAN Bus, sensores de velocidade de turbina e falhas elétricas gerais.",
      icon: <Laptop className="w-5 h-5 text-raven-red" />,
      badge: "Eletrônica Ativa"
    },
    {
      id: "pre-compra",
      title: "Inspeção Pré-Compra",
      desc: "Análise eletrônica e teste dinâmico rigoroso da transmissão automática de um veículo que você deseja comprar, blindando sua aquisição contra quebras caríssimas.",
      icon: <ClipboardCheck className="w-5 h-5 text-raven-red" />,
      badge: "Pré-Compra"
    },
    {
      id: "preliminar",
      title: "Diagnóstico Preliminar Especializado",
      desc: "Mapeamento prévio sobre o tipo de anomalia existente no veículo com foco no comportamento do câmbio, blindando o cliente de trocas desnecessárias de peças.",
      icon: <Search className="w-5 h-5 text-raven-red" />,
      badge: "Laudo Preliminar"
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
            Diagnóstico Preliminar Interativo
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Nossa plataforma é estruturada para fornecer um diagnóstico computadorizado preliminar baseado na leitura minuciosa de códigos de falha do veículo, com foco em identificar patinação, trancos e anomalias eletrônicas em câmbios automáticos.
          </p>
        </div>

        {/* Dynamic List Container / Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scopeItems.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-[#121212] border border-raven-border p-4 sm:p-6 rounded-none flex flex-col justify-between hover:border-white/30 hover:scale-[1.02] transition-all duration-300 group ${
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
