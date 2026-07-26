/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Gauge, CheckCircle, Shield, ArrowRight, Play } from "lucide-react";

interface HeroProps {
  onCheckSymptoms: () => void;
  onBookNow: () => void;
}

export default function Hero({ onCheckSymptoms, onBookNow }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative bg-[#0f0f0f] text-white pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center border-b border-raven-border"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-raven-red rounded-full filter blur-[180px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Main Copy */}
          <div className="flex flex-col space-y-8 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#161616] border border-raven-border text-white/90 rounded-none py-2 px-4 w-fit"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-raven-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-raven-red"></span>
              </span>
              <span className="text-xs font-mono font-black tracking-[0.2em] uppercase">
                ESPECIALISTAS EM CÂMBIOS AUTOMÁTICOS & TCU
              </span>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-tighter leading-none uppercase break-words">
                Seu câmbio automático sem mistérios com{" "}
                <span className="text-raven-red glow-red block sm:inline">
                  AUTOSCANNER ONLINE
                </span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Diagnóstico computadorizado avançado em domicílio. Identificamos e verificamos problemas de trancos, patinação, atrasos de engate e falhas de solenoides em câmbios automáticos com precisão absoluta.
              </p>
            </motion.div>

            {/* Quick Benefits Bullet List */}
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono tracking-wider uppercase text-white/85 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-raven-red shrink-0" />
                <span>Mapeamento do Módulo TCM (Câmbio)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-raven-red shrink-0" />
                <span>Teste de Solenoides e Corpo de Válvulas</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-raven-red shrink-0" />
                <span>Análise de Desgaste e Pressão do Óleo</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-raven-red shrink-0" />
                <span>Atendimento Completo em Domicílio</span>
              </li>
            </motion.ul>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                id="hero-cta-sintomas"
                onClick={onCheckSymptoms}
                className="bg-raven-red hover:bg-[#ff2a30] active:bg-[#c01419] text-white px-8 py-5 rounded-none text-sm font-black tracking-widest uppercase shadow-lg shadow-raven-red/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-transparent"
              >
                <Play className="w-4 h-4 fill-current stroke-none" />
                Sintomas do Câmbio
              </button>
              <button
                id="hero-cta-agendar"
                onClick={onBookNow}
                className="bg-[#161616] hover:bg-[#202020] border border-raven-border text-white px-8 py-5 rounded-none text-sm font-black tracking-widest uppercase transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Agendamento Direto
                <ArrowRight className="w-4 h-4 text-raven-red" />
              </button>
            </motion.div>

            {/* Safety badge */}
            <motion.div
              className="flex items-center gap-2 text-[10px] text-white/40 font-mono tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Shield className="w-4 h-4 text-raven-red" />
              <span>Verificação não invasiva sem violar a garantia de fábrica do veículo</span>
            </motion.div>
          </div>

          {/* Interactive Raven Terminal Preview */}
          <motion.div
            className="w-full h-full flex justify-center items-center lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-[#161616] border border-raven-border rounded-none p-4 sm:p-6 shadow-2xl glow-box-red w-full max-w-lg aspect-auto sm:aspect-video flex flex-col justify-between overflow-hidden min-h-[280px]">
              <div className="absolute top-0 right-0 p-8 w-48 h-48 bg-raven-red/5 rounded-full filter blur-xl pointer-events-none" />

              {/* Terminal Head */}
              <div className="flex items-center justify-between border-b border-raven-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-none bg-raven-red block"></span>
                    <span className="w-2.5 h-2.5 rounded-none bg-white/40 block"></span>
                    <span className="w-2.5 h-2.5 rounded-none bg-white/20 block"></span>
                  </div>
                  <span className="text-[11px] font-mono text-white/50 font-bold uppercase tracking-wider">TCU_DIAG_X.4_SCAN</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0f0f0f] border border-raven-border py-1 px-3 rounded-none">
                  <span className="w-2 h-2 bg-raven-red rounded-full animate-ping"></span>
                  <span className="text-[10px] font-mono text-raven-red font-bold tracking-widest uppercase">ONLINE</span>
                </div>
              </div>

              {/* Terminal Display */}
              <div className="space-y-3 py-6 font-mono text-xs text-white/80">
                <div className="flex justify-between border-b border-raven-border/40 pb-1.5">
                  <span className="text-white/40 uppercase">SISTEMA ACESSADO:</span>
                  <span className="text-white font-bold">TRANSMISSION CONTROL MODULE (TCM/TCU)</span>
                </div>
                <div className="flex justify-between border-b border-raven-border/40 pb-1.5">
                  <span className="text-white/40 uppercase">EMBREAGEM / SOLENOIDE:</span>
                  <span className="text-raven-red font-bold">LEITURA DE PRESSÃO HIDRÁULICA</span>
                </div>
                <div className="flex justify-between border-b border-raven-border/40 pb-1.5">
                  <span className="text-white/40 uppercase">ALERTA EM MEMÓRIA:</span>
                  <span className="text-white font-bold">DTC P0700 (FALHA NO SOLENOIDE)</span>
                </div>
                <div className="flex justify-between border-b border-raven-border/40 pb-1.5">
                  <span className="text-white/40 uppercase">FLUIDO DE TRANSMISSÃO:</span>
                  <span className="text-white font-bold">85°C (ESTÁVEL OPERACIONAL)</span>
                </div>
              </div>

              {/* Live Waveform graphic representation */}
              <div className="flex items-end gap-1 h-14 w-full bg-[#080808] border border-raven-border rounded-none p-3 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-raven-red/25" preserveAspectRatio="none">
                  <path
                    d="M 0 30 Q 30 10 60 40 T 120 20 T 180 35 T 240 15 T 300 25 T 360 40 T 420 10 T 480 30 L 500 30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="absolute top-1 right-2 text-[8px] text-white/40 font-mono tracking-wider uppercase">
                  TELEMETRIA DO SOLENOIDE DE PRESSÃO A (bar)
                </div>
                <div className="flex items-center justify-between w-full relative z-10 text-[9px] font-mono font-bold text-raven-red uppercase">
                  <span>CAN BUS SPEED: HIGH</span>
                  <span>PRONTO PARA RE-APRENDIZO DE SINCRO</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
