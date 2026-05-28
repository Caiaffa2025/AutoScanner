/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  Flame,
  Zap,
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  Gauge,
  ArrowRight,
  Sparkles,
  Wind,
  Compass,
  Thermometer,
  Activity,
  Cpu,
  Disc,
  Shield
} from "lucide-react";
import { Symptom } from "../types";

const SYMPTOMS: Symptom[] = [
  {
    id: "gear-jerk",
    name: "Trancos Severos nas Trocas de Marcha",
    icon: "TrendingDown",
    description: "Solavancos secos e solavancos ao trocar as marchas, principalmente na redução de velocidade ou ao engatar D (Drive) ou R (Reverse).",
    likelyCause: "Solenóides de embreagem obstruídos, desgaste do corpo de válvulas interno ou óleo de transmissão degradado e fora da viscosidade nominal.",
    systemToScanId: "tcu",
    severity: "high"
  },
  {
    id: "gear-slippage",
    name: "Câmbio Patinando (Gira mas não traciona)",
    icon: "Gauge",
    description: "O giro do motor sobe repentinamente mas o veículo não ganha velocidade correspondente, dando a sensação de ponto morto temporário.",
    likelyCause: "Baixa pressão na linha hidráulica da transmissão, discos internos de fricção gastos ou sensores de pressão com leitura corrompida.",
    systemToScanId: "tcu",
    severity: "high"
  },
  {
    id: "limp-mode",
    name: "Aviso de Transmissão em Modo de Emergência",
    icon: "ShieldAlert",
    description: "O veículo ativa o modo de segurança (Limp Mode), travando a transmissão em 3ª marcha para proteger os componentes internos de atrito fatal.",
    likelyCause: "Falha crítica de comunicação na central eletrônica da transmissão, solenóides inoperantes ou sinal corrompido de rotação de entrada/saída.",
    systemToScanId: "tcu",
    severity: "high"
  },
  {
    id: "shudder-cvt",
    name: "Tremor / Vibração Severa na Saída (CVT ou Dupla Embreagem)",
    icon: "Activity",
    description: "O carro trepida de forma assustadora ao arrancar do repouso ou em aclives acentuados, normalizando apenas em rotações mais elevadas.",
    likelyCause: "Contaminação do fluido hidráulico CVT, desgaste nas garras eletrônicas de embreagem ou descalibração do re-aprendizado no módulo TCU.",
    systemToScanId: "tcu",
    severity: "high"
  },
  {
    id: "gear-delay",
    name: "Atraso no Engate de Partida de D ou R",
    icon: "Thermometer",
    description: "Demora excessiva (acima de 2 segundos) para o carro engrenar e se mover após mover a alavanca seletora.",
    likelyCause: "Fuga de pressão hidráulica através de anéis de vedação ressecados ou solenóides moduladoras travando a frio devido a resíduos de desgaste.",
    systemToScanId: "tcu",
    severity: "medium"
  },
  {
    id: "injection-light",
    name: "Luz da Injeção Acesa no Painel",
    icon: "AlertTriangle",
    description: "Sinalizador amarelo em formato de motor aceso. Em carros automáticos, frequentemente indica uma falha integrada do motor em decorrência do câmbio ou vice-versa.",
    likelyCause: "Sonda lambda avariada, bicos injetores oxidados, combustível adulterado ou falha crítica gerada do módulo de transmissão para a ECU.",
    systemToScanId: "ecu",
    severity: "high"
  },
  {
    id: "abs-alarm",
    name: "Falha no ABS / Controle de Tração",
    icon: "Disc",
    description: "Indicador do ABS ativo. O sistema afeta a caixa de câmbio automática, pois a perda de dados dos sensores de velocidade de roda impede o TCU de decidir os pontos exatos de troca.",
    likelyCause: "Sensores eletromagnéticos de rotação da roda partidos ou obstruídos por detritos metálicos de frenagem.",
    systemToScanId: "abs",
    severity: "high"
  },
  {
    id: "airbag-warning",
    name: "Luz do Airbag (SRS) Acesa",
    icon: "Cpu",
    description: "Mensagem ou símbolo vermelho de restrição suplementar no painel, desabilitando o funcionamento das bolsas em qualquer eventual desaceleração brusca.",
    likelyCause: "Rompimento da cinta de contato eletrônico (clock-spring) no volante ou conexões oxidadas sob os bancos do motorista ou passageiro.",
    systemToScanId: "srs",
    severity: "medium"
  },
  {
    id: "battery-issue",
    name: "Oscilação de Bateria / Tensão Fraca",
    icon: "Zap",
    description: "Instabilidade elétrica generalizada. O Módulo TCU é extremamente sensível à tensão; oscilações abaixo de 12.2V provocam trancos severos e falsos códigos de erro.",
    likelyCause: "Placas internas da bateria sulfatadas ou alternador com desgaste nas escovas reguladoras de carga de corrente.",
    systemToScanId: "battery",
    severity: "medium"
  },
  {
    id: "maintenance-reset",
    name: "Reset de Manutenção / Troca de Óleo",
    icon: "Compass",
    description: "Aviso recorrente no painel indicando necessidade de revisão. Essencial para reinicializar o tempo de desgaste eletrônico e alertas após a troca preventiva do fluido de câmbio.",
    likelyCause: "Atingimento da quilometragem limite programada pelo fabricante para substituição de fluidos ou monitoramento periódico de filtros.",
    systemToScanId: "service",
    severity: "low"
  }
];

const CATEGORIES = [
  { id: "all", name: "Todos os Sintomas" },
  { id: "transmission", name: "Câmbio Automático (TCU)" },
  { id: "engine", name: "Motor e Injeção (ECU)" },
  { id: "safety", name: "Freios e Segurança (ABS/SRS)" },
  { id: "maintenance", name: "Elétrica & Manutenção (Bateria/Reset)" }
];

interface SymptomCheckerProps {
  onSelectSymptomForScan: (moduleId: string) => void;
  onBookNow: () => void;
}

export default function SymptomChecker({ onSelectSymptomForScan, onBookNow }: SymptomCheckerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSymptomId, setActiveSymptomId] = useState<string>("gear-jerk");

  const filteredSymptoms = SYMPTOMS.filter((s) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "transmission") return s.systemToScanId === "tcu";
    if (activeCategory === "engine") return s.systemToScanId === "ecu";
    if (activeCategory === "safety") return ["abs", "srs"].includes(s.systemToScanId);
    if (activeCategory === "maintenance") return ["battery", "service"].includes(s.systemToScanId);
    return true;
  });

  // Safe fallback selection if current activeSymptomId does not exist in filtered list
  const isSelectedInFiltered = filteredSymptoms.some((s) => s.id === activeSymptomId);
  const selectedSymptom = isSelectedInFiltered
    ? SYMPTOMS.find((s) => s.id === activeSymptomId)!
    : (filteredSymptoms[0] || SYMPTOMS[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "AlertTriangle":
        return <AlertTriangle className="w-5 h-5 text-raven-red" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-raven-red" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-raven-red" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-raven-red" />;
      case "TrendingDown":
        return <TrendingDown className="w-5 h-5 text-raven-red" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-raven-red" />;
      case "Wind":
        return <Wind className="w-5 h-5 text-raven-red" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-raven-red" />;
      case "Thermometer":
        return <Thermometer className="w-5 h-5 text-raven-red" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-raven-red" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-raven-red" />;
      case "Disc":
        return <Disc className="w-5 h-5 text-raven-red" />;
      default:
        return <HelpCircle className="w-5 h-5 text-raven-red" />;
    }
  };

  return (
    <section id="symptoms" className="py-24 bg-[#121212] text-white border-b border-raven-border font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block font-sans">
            Diagnóstico Inteligente
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none font-sans">
            Mapeamento de Câmbio & Falhas Suportadas
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed font-sans">
            Nosso foco principal é a verificação especializada de Câmbios Automáticos do mercado, realizando o diagnóstico preliminar detalhado de pressão, solenóides de troca e saúde interna do TCU em domicílio, cobrindo também falhas de motor, ABS, Airbag, Bateria e Reset de Avisos.
          </p>
        </div>

        {/* Category Filters row */}
        <div className="flex flex-wrap gap-2 items-center justify-center mb-10 border-b border-raven-border/40 pb-6 max-w-5xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Auto-focus on the first symptom of newly selected category to yield crisp previews
                  const matched = SYMPTOMS.filter((s) => {
                    if (cat.id === "all") return true;
                    if (cat.id === "transmission") return s.systemToScanId === "tcu";
                    if (cat.id === "engine") return s.systemToScanId === "ecu";
                    if (cat.id === "safety") return ["abs", "srs"].includes(s.systemToScanId);
                    if (cat.id === "maintenance") return ["battery", "service"].includes(s.systemToScanId);
                    return true;
                  });
                  if (matched.length > 0) {
                    setActiveSymptomId(matched[0].id);
                  }
                }}
                className={`px-4 py-2 text-[10px] font-mono tracking-wider font-extrabold uppercase border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-raven-red text-white border-raven-red"
                    : "bg-[#0b0b0b] text-white/50 border-raven-border hover:border-white/30 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Symptoms List (lg:col-span-12 md:col-span-5) */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[350px] lg:max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-[10px] font-mono font-black tracking-widest text-white/40 uppercase px-1 mb-2">
              RESULTADO ({filteredSymptoms.length}): SELECIONE PARA DIAGNÓSTICO
            </p>
            {filteredSymptoms.map((s) => {
              const isActive = s.id === selectedSymptom.id;
              return (
                <button
                  key={s.id}
                  id={`symptom-btn-${s.id}`}
                  onClick={() => setActiveSymptomId(s.id)}
                  className={`w-full text-left p-4 rounded-none border transition-all duration-300 pointer-events-auto flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#181818] text-white border-raven-red scale-[1.01]"
                      : "bg-[#0c0c0c] text-white/70 border-raven-border hover:border-[#444] hover:bg-[#141414]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`p-2.5 rounded-none transition-colors ${
                      isActive ? "bg-raven-red text-white" : "bg-[#161616] text-white/60"
                    }`}>
                      {getIcon(s.icon)}
                    </span>
                    <div>
                      <p className="font-display font-black text-xs uppercase tracking-wide leading-tight">{s.name}</p>
                      <span className="text-[9px] font-mono tracking-wider text-white/40 block uppercase mt-1">
                        SISTEMA DE LEITURA: {s.systemToScanId.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[9.5px] font-mono font-black tracking-wider px-2 py-0.5 rounded-none ${
                    s.severity === "high"
                      ? "bg-raven-red/25 text-raven-red"
                      : s.severity === "medium"
                      ? "bg-yellow-600/25 text-yellow-500"
                      : "bg-emerald-600/25 text-emerald-400"
                  }`}>
                    {s.severity === "high" ? "GRAVE" : s.severity === "medium" ? "ATENÇÃO" : "INFORMATIVO"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Symptom Solutions Pane (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-raven-border rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[400px] lg:min-h-[580px] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSymptom.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header detail */}
                <div className="flex justify-between items-start border-b border-raven-border pb-5">
                  <div>
                    <span className={`text-[9px] font-mono font-black tracking-widest py-1 px-3 border rounded-none uppercase ${
                      selectedSymptom.severity === "high"
                        ? "bg-raven-red/10 border-raven-red/20 text-raven-red"
                        : selectedSymptom.severity === "medium"
                        ? "bg-yellow-600/10 border-yellow-500/20 text-yellow-500"
                        : "bg-emerald-600/10 border-emerald-400/20 text-emerald-400"
                    }`}>
                      NÍVEL CRÍTICO: {selectedSymptom.severity.toUpperCase()}
                    </span>
                    <h3 className="font-display font-black text-xl uppercase tracking-tight text-white mt-4">{selectedSymptom.name}</h3>
                  </div>
                  <span className="p-3 bg-[#161616] border border-raven-border text-raven-red">
                    {getIcon(selectedSymptom.icon)}
                  </span>
                </div>

                {/* What it is */}
                <div className="space-y-2">
                  <h4 className="font-display text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-raven-red" />
                    O que este sintoma indica?
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed font-semibold pl-4 border-l-2 border-slate-800">
                    {selectedSymptom.description}
                  </p>
                </div>

                {/* Likely Cause */}
                <div className="space-y-2 bg-black p-4.5 rounded-none border border-raven-border">
                  <h4 className="font-display text-xs font-black uppercase tracking-wider text-raven-red flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-raven-red animate-ping" />
                    Prováveis Diagnósticos Físicos/Eletrônicos correspondentes:
                  </h4>
                  <p className="text-white/80 text-xs leading-relaxed font-bold pl-4 border-l-2 border-raven-red">
                    {selectedSymptom.likelyCause}
                  </p>
                </div>

                {/* Action of Scanner */}
                <div className="space-y-2">
                  <h4 className="font-display text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-raven-red" />
                    Protocolo de Ação Corretiva com o AutoScanner Online:
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed font-semibold pl-4 border-l-2 border-slate-800">
                    Eliminamos sumariamente os diagnósticos empíricos e por tentativa e erro. A tecnologia do AutoScanner Online se conecta de forma direta via rede de dados mutliplexada CAN Bus, interroga as centrais colhendo barramento DTCs detalhados em milissegundos, monitora o fluxo de parâmetros dinâmicos estáticos e de rotação em tempo real e realiza o re-aprendizado/re-inicialização completa do componente ao finalizar o serviço físico.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions for specific symptom */}
            <div className="mt-8 pt-6 border-t border-raven-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/50 p-4 rounded-none">
              <div className="text-[10px] text-white/50 font-mono text-center sm:text-left uppercase font-bold">
                Módulos para varredura: <span className="text-raven-red font-black uppercase">{selectedSymptom.systemToScanId}</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id={`symptom-cta-book-${selectedSymptom.id}`}
                  onClick={() => onSelectSymptomForScan(selectedSymptom.systemToScanId)}
                  className="bg-raven-red hover:bg-[#ff2a30] text-white px-6 py-4 rounded-none text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-center cursor-pointer shadow-lg shadow-raven-red/10 animate-pulse"
                >
                  Agendar Scanner no Sistema {selectedSymptom.systemToScanId.toUpperCase()}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Cobertura de Falhas do Veículo Callout Component */}
        <div className="mt-16 bg-[#0c0c0c] border border-raven-border p-8 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-raven-red/5 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="space-y-4 relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-raven-red/10 border border-raven-red/20 text-[9px] font-mono tracking-widest font-bold text-raven-red uppercase rounded-none">
              <Sparkles className="w-3.5 h-3.5" />
              Diagnóstico de Falhas de 360 Graus
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-tight">
              Sua Falha Não Está Listada Acima? <span className="text-raven-red">Nós Diagnosticamos Absolutamente Tudo!</span>
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-semibold">
              O AutoScanner Online é uma central de testes homologada capaz de rastrear, ler e analisar **qualquer tipo de falha** que possa existir no seu veículo. Cobrimos desde a injeção eletrônica clássica ate sistemas avançados de transmissão automática, freios ABS de roda, fiação do airbag (SRS), faturamento elétrico de carroceria (BCM), redes de comunicação multiplexadas CAN Bus ou sensores de pressão e oscilação de temperatura. Se há algum desvio de sinal ativo ou pendente na memória, a tecnologia do AutoScanner Online o isolará em milissegundos.
            </p>
          </div>
          <div className="w-full lg:w-auto flex relative z-10 shrink-0">
            <button
              id="cta-diag-all-book"
              onClick={onBookNow}
              className="bg-raven-red hover:bg-[#ff2a30] text-white px-8 py-5 rounded-none text-xs font-black uppercase tracking-widest transition-all text-center cursor-pointer flex items-center justify-center gap-2 w-full shadow-lg shadow-raven-red/15"
            >
              Agendar Diagnóstico Completo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
