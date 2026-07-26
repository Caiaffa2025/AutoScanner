/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  Cpu, 
  Settings, 
  Layers, 
  Thermometer, 
  Activity, 
  ShieldAlert, 
  FileText, 
  Search, 
  Database, 
  Wrench, 
  TrendingDown, 
  Sparkles, 
  Droplets,
  FolderOpen
} from "lucide-react";

interface MechanicalError {
  id: string;
  title: string;
  consequence: string;
  recommendation: string;
  icon: React.ReactNode;
  severity: "critical" | "warning";
}

interface DtcCode {
  code: string;
  system: string;
  description: string;
  symptomAndSource: string;
  typicalFix: string;
}

interface TransmissionTroubleSectionProps {
  onBookNow: () => void;
}

export default function TransmissionTroubleSection({ onBookNow }: TransmissionTroubleSectionProps) {
  const [activeTab, setActiveTab] = useState<"mechanical" | "dtc">("mechanical");
  const [selectedCodeId, setSelectedCodeId] = useState<string>("P0700");
  const [selectedErrorId, setSelectedErrorId] = useState<string>("tranco");

  const mechanicalErrors: MechanicalError[] = [
    {
      id: "tranco",
      title: "Trancos e Trancos Estrepitosos (Frio ou Quente)",
      consequence: "Solavancos violentos ao mover a alavanca seletora para Drive (D) ou Ré (R), ou forte chacoalhada nas trocas ascendentes/reduções.",
      recommendation: "Geralmente causado por solenóides com acúmulo de limalhas na mola interna ou desgaste prematuro do corpo de válvulas. Necessita de escaneamento imediato das eletroválvulas de pressão antes do desgaste dos discos multilamelas.",
      icon: <Activity className="w-5 h-5 text-raven-red" />,
      severity: "critical"
    },
    {
      id: "patinacao",
      title: "Patinação de Embreagem (Giro Sobe, Carro Não Vai)",
      consequence: "O motor ruge e as rotações (RPM) sobem instantaneamente durante uma troca de marcha, mas o carro sofre perda súbita de velocidade e tração física.",
      recommendation: "Indica séria perda de pressão hidráulica interna ou pacotes de discos de fricção com composto sinterizado já fadigado ou desgastado. A verificação precoce de pressão evita a queima definitiva dos componentes.",
      icon: <TrendingDown className="w-5 h-5 text-raven-red" />,
      severity: "critical"
    },
    {
      id: "atraso",
      title: "Atraso no Engate de Partida (D ou R)",
      consequence: "Você coloca a alavanca em Drive ou Ré e o carro demora mais do que 2 a 3 segundos para responder, engatando de forma tardia e súbita.",
      recommendation: "Vazamento interno pelas vedações de teflon ou anéis rasgados, além de perda de vedação no conversor de torque. O diagnóstico preliminar avalia se o problema é resolvível com reset de acumuladores ou substituição de retentores.",
      icon: <Layers className="w-5 h-5 text-raven-red" />,
      severity: "warning"
    },
    {
      id: "aquecimento",
      title: "Superaquecimento do Fluído de Transmissão (ATF)",
      consequence: "O óleo de transmissão ultrapassa o patamar ideal de 90°C, chegando a mais de 125°C. Ativa avisos visuais no painel e exala cheiro forte de queimado.",
      recommendation: "Causado por obstrução no trocador de calor externo ou patinação gerando calor excessivo de atrito. Destrói o filme lubrificante do óleo ATF, queimando discos orgânicos de fricção a curto prazo.",
      icon: <Thermometer className="w-5 h-5 text-raven-red" />,
      severity: "critical"
    },
    {
      id: "limp",
      title: "Bloqueio no Modo de Emergência (Limp Mode)",
      consequence: "O painel sinaliza anomalia extrema na transmissão e o câmbio trava fixo na 3ª marcha (ou 2ª), impedindo quaisquer trocas sequenciais automáticas.",
      recommendation: "É uma autodefesa da central de bordo. O módulo TCU desliga o controle de solenóides ao detectar leituras absurdas de rotação. É de vital importância rodar o scanner de transmissão móvel no local para ler o DTC raiz antes de rebocar.",
      icon: <ShieldAlert className="w-5 h-5 text-raven-red" />,
      severity: "critical"
    }
  ];

  const dtcCodes: DtcCode[] = [
    {
      code: "P0700",
      system: "Módulo da Injeção (ECU)",
      description: "Códigos de Mau Funcionamento no Sistema de Controle da Transmissão (TCM)",
      symptomAndSource: "A luz de injeção eletrônica acende no painel. O módulo do motor (ECU) registra este DTC indicando que o módulo do câmbio (TCU) detectou uma anomalia severa ativa e solicitou interligação de alertas.",
      typicalFix: "É necessário acessar diretamente o módulo de transmissão (TCU) via scanner de alta profundidade para rastrear a raiz do código de erro real."
    },
    {
      code: "P0730",
      system: "Módulo da Transmissão (TCU)",
      description: "Relação de Marcha Incorreta Encontrada (Slippage / Escorregamento)",
      symptomAndSource: "Trancos seguidos de patinação ao tentar engrenar. O módulo cruza dados de rotação do sensor de entrada e saída, constatando que os discos deslizaram mais do que o coeficiente de atrito programado.",
      typicalFix: "Verificação da pressão da linha hidráulica principal do câmbio, inspeção do nível e propriedades do fluido ATF ou re-aprendizado adaptativo mecânico."
    },
    {
      code: "P0750",
      system: "Eletroválvulas / TCU",
      description: "Anomalia de Solenóide de Mudança 'A' - Mau Funcionamento Elétrico ou Hidráulico",
      symptomAndSource: "A transmissão pula ou se recusa a engatar marchas específicas (como 1ª ou 2ª). Indica curto no enrolamento elétrico do solenóide, fiação rompida ou válvula emperrada por sedimentos de limalhas.",
      typicalFix: "Verificação bidirecional de impedância ôhmica do solenóide, teste dinâmico ativo via scanner com acionador forçado ou substituição de eletroválvula específica."
    },
    {
      code: "P0841",
      system: "Pressão Hidráulica / TCU",
      description: "Desvio / Faixa de Leitura Fora da Roda do Sensor de Pressão do Fluído de Transmissão",
      symptomAndSource: "Limp mode ativado repentinamente. O sensor de pressão lê valores absurdamente baixos ou estáticos, incapazes de acoplar as embreagens de maneira precisa.",
      typicalFix: "Mapeamento elétrico do chicote do sensor, verificação de obstrução física na peneira do filtro de óleo ATF ou vazamento de pressão na bomba principal."
    },
    {
      code: "P0711",
      system: "Sensor Térmico / TCU",
      description: "Faixa / Desempenho do Sensor de Temperatura do Óleo ATF",
      symptomAndSource: "Variação brusca no comportamento das trocas de marcha e sensação térmica de atrito pesado. O sensor falha em enviar dados calibrados, impedindo a TCU de compensar a viscosidade do óleo.",
      typicalFix: "Mapeamento eletrônico do sensor térmico acoplado ao chicote interno de controle das válvulas solenóides."
    },
    {
      code: "P17F0",
      system: "Vibração de Polias / CVT",
      description: "Vibração Extrema na Polia de Transmissão CVT (CVT Judder / Shudder)",
      symptomAndSource: "Oscilação e forte ruído oscilante nas saídas e arrancadas, típico em caixas CVT da linha asiática (como Nissan, Honda etc.) devido a ranhuras nas polias ou correias frouxas.",
      typicalFix: "Diagnóstico computadorizado minucioso de pressão hidráulica na linha e análise de contaminação por micropartículas antes de condenar o câmbio."
    },
    {
      code: "P2711",
      system: "Dupla Embreagem / DSG",
      description: "Engate Mecânico Incorreto / Desengate Mecânico Inesperado de Marchas",
      symptomAndSource: "Muito comum em transmissões de dupla embreagem (como DSG e Powershift). As marchas ímpares ou pares somem, acusando que o garfo seletor interno não se moveu para a distância determinada.",
      typicalFix: "Calibração e reaprendizado dos atuadores de dupla embreagem, redefinição das posições dos garfos seletores digitais ou reparo mecatrônico."
    }
  ];

  // Pick active lists based on state
  const currentError = mechanicalErrors.find((e) => e.id === selectedErrorId) || mechanicalErrors[0];
  const currentDtc = dtcCodes.find((d) => d.code === selectedCodeId) || dtcCodes[0];

  return (
    <section id="erros-transmissao" className="py-24 bg-[#0d0d0d] text-white border-t border-b border-raven-border relative font-sans">
      
      {/* Mesh Background style */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#c01419,transparent_80%)]" style={{ transform: "translateY(-10%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/25 rounded-none inline-block">
            Mapeamento de Falhas Críticas
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            Anomalias Mecânicas e Códigos DTC OBD-II
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Consulte os problemas físicos mais temidos em proprietários de veículos automáticos e os códigos eletrônicos específicos revelados pelo scanner profissional na mecatrônica.
          </p>
        </div>

        {/* Custom Tab Selector */}
        <div className="flex justify-center mb-12" id="trouble-tabs-wrapper">
          <div className="bg-[#121212] border border-raven-border p-1.5 flex flex-col sm:flex-row gap-2 rounded-none w-full sm:w-auto">
            <button
              id="tab-btn-mechanical"
              onClick={() => setActiveTab("mechanical")}
              className={`px-4 sm:px-6 py-3 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "mechanical" 
                  ? "bg-raven-red text-white shadow-lg" 
                  : "bg-transparent text-white/50 hover:text-white"
              }`}
            >
              1. Anomalias Mecânicas Comuns
            </button>
            <button
              id="tab-btn-dtc"
              onClick={() => setActiveTab("dtc")}
              className={`px-4 sm:px-6 py-3 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "dtc" 
                  ? "bg-raven-red text-white shadow-lg" 
                  : "bg-transparent text-white/50 hover:text-white"
              }`}
            >
              2. Principais Códigos de Falha (DTC)
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {activeTab === "mechanical" ? (
            <motion.div
              key="mechanical-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
              id="mechanical-layout"
            >
              {/* Left Selector Side */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 px-1">Sintomas Físicos Críticos</p>
                {mechanicalErrors.map((error) => {
                  const isSelected = selectedErrorId === error.id;
                  return (
                    <button
                      key={error.id}
                      id={`error-btn-${error.id}`}
                      onClick={() => setSelectedErrorId(error.id)}
                      className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                        isSelected 
                          ? "bg-raven-red/10 border-raven-red text-white" 
                          : "bg-[#121212] border-raven-border text-white/60 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`p-2 transition-colors duration-300 ${isSelected ? "bg-raven-red text-white" : "bg-[#161616] group-hover:bg-[#1a1a1a]"}`}>
                          {error.icon}
                        </span>
                        <span className="font-display font-black text-xs uppercase tracking-wider">
                          {error.title.split(" (")[0]}
                        </span>
                      </div>
                      <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 border ${
                        error.severity === "critical" 
                          ? "bg-raven-red/20 text-raven-red border-raven-red/30 animate-pulse" 
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }`}>
                        {error.severity === "critical" ? "Critico" : "Alerta"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Console Side */}
              <div className="lg:col-span-3 bg-[#121212] border border-raven-border p-8 relative flex flex-col justify-between min-h-[380px]" id="mechanical-console">
                {/* Decorative border tags */}
                <div className="absolute top-0 right-0 p-3 text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  TCU_METRIC_REPORT
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="p-4 bg-raven-red/10 border border-raven-red/30 text-raven-red">
                      {currentError.icon}
                    </span>
                    <div>
                      <span className="text-[9px] font-mono text-raven-red tracking-widest font-black uppercase">
                        Sintoma Mecânico Identificado
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white mt-1">
                        {currentError.title}
                      </h3>
                    </div>
                  </div>

                  <div className="border-t border-b border-raven-border/40 py-5 space-y-4">
                    <div>
                      <h4 className="text-[10px] font-mono text-white/40 tracking-wider uppercase mb-1">Como se comporta o veículo:</h4>
                      <p className="text-white text-xs font-semibold leading-relaxed">
                        {currentError.consequence}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono text-white/40 tracking-wider uppercase mb-1">Aconselhamento Preliminar Técnico:</h4>
                      <p className="text-white/70 text-xs font-semibold leading-relaxed">
                        {currentError.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-raven-red animate-pulse" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-white/50">
                      Evite a quebra e retífica preventiva!
                    </span>
                  </div>
                  <button
                    onClick={onBookNow}
                    id="mechanical-console-cta"
                    className="bg-raven-red hover:bg-[#ff2a30] text-white text-[10px] font-mono font-black uppercase tracking-widest px-6 py-3 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    Diagnosticar Meu Câmbio Agora
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dtc-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
              id="dtc-layout"
            >
              {/* Left Selector Side */}
              <div className="lg:col-span-2 space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 px-1">Códigos de Diagnóstico (DTC) Comuns</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {dtcCodes.map((dtc) => {
                    const isSelected = selectedCodeId === dtc.code;
                    return (
                      <button
                        key={dtc.code}
                        id={`dtc-btn-${dtc.code}`}
                        onClick={() => setSelectedCodeId(dtc.code)}
                        className={`text-left p-3 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                          isSelected 
                            ? "bg-white/5 border-white text-white" 
                            : "bg-[#121212] border-raven-border text-white/40 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`font-mono font-black text-sm tracking-wide ${isSelected ? "text-raven-red" : "text-white/80 group-hover:text-white"}`}>
                            {dtc.code}
                          </span>
                          <span className="text-[8px] font-mono text-white/30 tracking-wider uppercase font-bold shrink-0">
                            {dtc.system.split(" (")[1]?.replace(")", "") || "TCU"}
                          </span>
                        </div>
                        <span className="text-[9px] font-semibold truncate text-white/50 block mt-1">
                          {dtc.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Detail Console Side */}
              <div className="lg:col-span-3 bg-[#121212] border border-raven-border p-8 relative flex flex-col justify-between min-h-[380px]" id="dtc-console">
                {/* Decorative border tags */}
                <div className="absolute top-0 right-0 p-3 text-[9px] font-mono text-white/30 tracking-widest uppercase flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-raven-red" />
                  <span>OBD2_DECODE_LIVE</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-raven-red text-white font-mono font-black text-xs uppercase tracking-wider">
                        SISTEMA: {currentDtc.system}
                      </span>
                    </div>
                    <h3 className="font-mono font-black text-2xl sm:text-3xl text-raven-red tracking-wide mt-2">
                      DTC {currentDtc.code}
                    </h3>
                    <p className="font-display font-black text-sm sm:text-base uppercase tracking-wider text-white border-b border-raven-border/40 pb-4 mt-1">
                      {currentDtc.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-mono text-white/40 tracking-wider uppercase mb-1">Como este código afeta o carro e suas causas:</h4>
                      <p className="text-white text-xs font-semibold leading-relaxed">
                        {currentDtc.symptomAndSource}
                      </p>
                    </div>

                    <div className="bg-white/5 border-l-2 border-raven-red p-4">
                      <h4 className="text-[10px] font-mono text-raven-red tracking-wider font-extrabold uppercase mb-1 flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5" />
                        Ação de Reparo / Diagnóstico Adequada:
                      </h4>
                      <p className="text-white/85 text-xs font-semibold leading-relaxed">
                        {currentDtc.typicalFix}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-raven-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-white/30" />
                    DECODIFICADOR OBD2 COMPILADO
                  </span>
                  <button
                    onClick={onBookNow}
                    id="dtc-console-cta"
                    className="bg-white hover:bg-white/90 text-black text-[10px] font-mono font-black uppercase tracking-widest px-6 py-3 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    Agendar Leitura de Códigos OBD2
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlighting Explanatory Bar */}
        <div className="mt-12 bg-[#121212] border border-raven-border p-6 flex flex-col sm:flex-row items-center justify-between gap-6" id="trouble-bottom-card">
          <div className="flex items-center gap-4 max-w-2xl">
            <div className="w-2.5 h-12 bg-raven-red shrink-0" />
            <p className="text-xs text-white/70 leading-relaxed font-semibold">
              <strong className="text-white uppercase font-black block text-[10px] font-mono tracking-wider mb-0.5">Dica importante do especialista na Grande SP</strong>
              Não permita que as oficinas desmontem sua transmissão sem um pre-diagnóstico eletrônico por Scanner TCU completo. Mais de <strong className="text-white uppercase">45% das ocorrências de trancos</strong> são causadas por mero desalinhamento de sinais de rede CAN, falhas de sensores de velocidade ou fluidos saturados que podem ser resolvidos sem a abertura da caixa!
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#555] font-black uppercase">REDE CAN_AUTOSCANNER PRO</span>
        </div>

      </div>
    </section>
  );
}
