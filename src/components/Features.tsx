/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import {
  Smartphone,
  Zap,
  Layers,
  FileText,
  ShieldCheck,
  Compass
} from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  id?: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#121212] border border-raven-border p-6 rounded-none flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 group hover:border-[#444]">
      <div className="space-y-4">
        <span className="p-3 bg-raven-red text-white inline-block border border-transparent">
          {icon}
        </span>
        <h3 className="font-display font-black text-sm tracking-wide uppercase text-white">{title}</h3>
        <p className="text-white/60 text-xs leading-relaxed font-semibold">{description}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#0f0f0f] text-white relative border-b border-raven-border font-sans">
      {/* Background dynamic light flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-raven-red/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block">
            DIFERENCIAIS TÉCNICOS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            Por que o AUTOSCANNER ONLINE é Diferente?
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Esqueça as oficinas convencionais que trocam peças por pura adivinhação. A tecnologia avançada da ferramenta AUTOSCANNER ONLINE garante precisão científica ao analisar seu veículo.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            title="Escaneamento de Ultra Velocidade"
            description="Escaneamento transversal de todos os sistemas ativos do veículo com foco central na unidade TCM/TCU de câmbio e integração com módulo do motor."
            id="feature-speed"
          />
          <FeatureCard
            icon={<Layers className="w-5 h-5" />}
            title="Mapeamento Integrado REDE CAN"
            description="Varredura avançada da comunicação multiplexada do veículo para isolar perdas de sinal, atrasos de dados e interrupções que afetam as trocas de marchas."
            id="feature-can-network"
          />
          <FeatureCard
            icon={<Compass className="w-5 h-5" />}
            title="Boletins Técnicos Oficiais"
            description="Consultas instantâneas aos manuais técnicos oficiais das montadoras para correlação exata de sintomas e soluções de câmbios automáticos."
            id="feature-cloud"
          />
          <FeatureCard
            icon={<Smartphone className="w-5 h-5" />}
            title="Testes de Atuadores Ativos"
            description="Enviamos comandos bidirecionais via scanner para inspecionar fisicamente o acoplamento de embreagens e válvulas solenóides do câmbio."
            id="feature-test"
          />
          <FeatureCard
            icon={<FileText className="w-5 h-5" />}
            title="Laudo Técnico Completo"
            description="Exportação automatizada de relatórios DTC detalhados em PDF direto no seu WhatsApp, detalhando o diagnóstico e a saúde da transmissão."
            id="feature-report"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Calibração de Adaptativos"
            description="Executamos o reset de memória e recalibração dos parâmetros de desgaste de embreagem e ponto de contato das marchas após serviços mecânicos."
            id="feature-calibration"
          />
        </div>

        {/* Dynamic technology callout panel */}
        <div className="mt-16 bg-[#121212] border border-raven-border rounded-none p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 p-12 bg-raven-red/5 rounded-full filter blur-xl" />
          <div className="space-y-2 relative z-10 max-w-2xl">
            <h3 className="font-display font-black text-sm tracking-wide uppercase text-white">Equipamento Homologado Pelas Principais Montadoras</h3>
            <p className="text-xs text-white/50 leading-relaxed font-semibold">
              O software de diagnóstico recebe atualizações dinâmicas diretamente dos servidores integrados via internet. Isto assegura cobertura máxima em veículos de última geração, incluindo novos motores híbridos e carros 100% elétricos.
            </p>
          </div>
          <div className="flex gap-4 items-center shrink-0">
            <span className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">CONEXÃO SEGURA</span>
            <div className="h-8 w-px bg-raven-border" />
            <span className="font-display font-black text-sm text-raven-red tracking-widest uppercase">AUTOSCANNER_ACTIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
