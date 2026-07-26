/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wrench, Phone, MapPin, Mail, ShieldAlert, BadgeInfo } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#080808] text-white/50 py-16 border-t border-raven-border font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer blocks grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-raven-border pb-10 mb-8">
          
          {/* Logo Brand information (md:col-span-5) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("hero")}>
              <div className="bg-raven-red p-2.5 text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-black text-lg tracking-tighter text-white">
                    AUTOSCANNER
                  </span>
                  <span className="font-display font-black text-lg tracking-tighter text-raven-red">
                    ONLINE
                  </span>
                </div>
                <p className="text-[9px] font-mono tracking-widest text-[#666] uppercase mt-1 font-bold">
                  Scanner de Última Geração
                </p>
              </div>
            </div>
            
            <p className="text-xs text-white/40 leading-relaxed font-semibold max-w-sm">
              Especialistas em escaneamento automotivo eletrônico de alta performance. Equipamentos de ponta para avaliação em redes CAN Bus e diagnósticos avançados.
            </p>

            <div className="flex items-center gap-2 text-[9px] font-mono font-black uppercase tracking-wider text-white/40 bg-[#121212] px-4 py-2 border border-raven-border w-fit">
              <BadgeInfo className="w-4 h-4 text-raven-red" />
              <span>Concessionária Autorizada</span>
            </div>
          </div>

          {/* Site Quick links (md:col-span-3) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="font-display font-black text-white/90 text-xs tracking-widest uppercase">Navegação</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  onClick={() => onNavigate("symptoms")}
                  className="hover:text-raven-red text-white/60 hover:underline transition-all cursor-pointer text-left uppercase text-[10px] tracking-wider"
                >
                  Análise de Sintomas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("features")}
                  className="hover:text-raven-red text-white/60 hover:underline transition-all cursor-pointer text-left uppercase text-[10px] tracking-wider"
                >
                  Diferenciais Técnicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-raven-red text-white/60 hover:underline transition-all cursor-pointer text-left uppercase text-[10px] tracking-wider"
                >
                  Planos de Varredura
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("booking")}
                  className="hover:text-raven-red text-white/60 hover:underline transition-all cursor-pointer text-left uppercase text-[10px] tracking-wider"
                >
                  Agendamento Direto
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Support & Location (md:col-span-4) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <h4 className="font-display font-black text-white/90 text-xs tracking-widest uppercase">Atendimento & Contato</h4>
            <ul className="space-y-3.5 text-xs text-white/60 font-semibold">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-raven-red shrink-0 mt-0.5" />
                <span className="leading-relaxed font-bold">Atendimento 100% em Domicílio / Unidade Móvel (Grande São Paulo e Regiões)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#25D366] text-sm shrink-0">💬</span>
                <a
                  href="https://wa.me/5511984937529?text=Olá!%20Gostaria%20de%20solicitar%20um%20diagnóstico%20automotivo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline decoration-[#25D366]"
                >
                  WhatsApp: 11 98493 7529
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-mono text-[10px] text-white/40">
                <span>Disponível todos os dias</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-raven-red shrink-0" />
                <span>suporte@autoscanneronline.com.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/35 font-mono uppercase font-black tracking-wide">
          <div>
            <p>© 2026 AUTOSCANNERONLINE. Todos os Direitos Reservados.</p>
            <p className="text-[10px] text-yellow-400 mt-1 normal-case font-bold tracking-wider uppercase">
              Agencia Stc Mobile / Sydney Caiaffa
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-white/20">
            <ShieldAlert className="w-3.5 h-3.5 text-raven-red" />
            <span>As marcas e logos das montadoras pertencem aos seus fabricantes.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
