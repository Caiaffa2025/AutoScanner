/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, CheckCircle, Shield, AlertCircle, Calendar, Sparkles } from "lucide-react";

interface SupportedBrandsProps {
  onPreFillBrand: (brand: string) => void;
  onBookNow: () => void;
}

interface BrandData {
  id: string;
  name: string;
  country: string;
  flag: string;
  systems: string[];
  coverage: string;
  logoColor: string;
  svgPath: React.ReactNode;
}

const BRANDS: BrandData[] = [
  {
    id: "volkswagen",
    name: "Volkswagen",
    country: "Alemanha",
    flag: "🇩🇪",
    systems: ["Injeção (UCC)", "Câmbio DSG Tiptronic", "ABS/ESP/EPB", "Faróis Direcionais"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#001e3d",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M28 26 L42 66 L50 42 L58 66 L72 26" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33 46 L45 80 L55 80 L67 46" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 49.5 L74 49.5" fill="none" stroke="#000" strokeWidth="3" />
      </svg>
    )
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    country: "EUA",
    flag: "🇺🇸",
    systems: ["Módulo OBD-II", "Transmissão Active", "Direção EPS", "Carroceria BCM"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#cba052",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <path d="M15 42 L28 42 L32 28 L68 28 L72 42 L85 42 L85 58 L72 58 L68 72 L32 72 L28 58 L15 58 Z" />
        <path d="M18 45 L26 45 L30 31 L70 31 L74 45 L82 45 L82 55 L74 55 L70 69 L30 69 L26 55 L18 55 Z" fill="#121212" />
        <path d="M22 48 L78 48 L78 52 L22 52 Z" />
      </svg>
    )
  },
  {
    id: "fiat",
    name: "Fiat",
    country: "Itália",
    flag: "🇮🇹",
    systems: ["Rede CAN Bus", "Injeção Fire/Turbo", "Câmbio Dualogic", "Airbag Autoliv"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#8b181e",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <rect x="15" y="30" width="70" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
        <text x="50" y="56" className="font-sans font-black tracking-widest text-lg md:text-xl text-center" textAnchor="middle" fill="currentColor">FIAT</text>
        <line x1="28" y1="36" x2="28" y2="64" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="42" y1="36" x2="42" y2="64" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="58" y1="36" x2="58" y2="64" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="72" y1="36" x2="72" y2="64" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    )
  },
  {
    id: "ford",
    name: "Ford",
    country: "EUA",
    flag: "🇺🇸",
    systems: ["Injeção Sigma/Ecoboost", "Câmbio Powershift", "ABS Bosch 9.0", "Painel IPC"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#003399",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <ellipse cx="50" cy="50" rx="45" ry="25" fill="none" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="50" rx="40" ry="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <text x="50" y="55" className="font-serif italic font-black text-xs md:text-sm text-center" textAnchor="middle" fill="currentColor" style={{ fontFamily: "Georgia, serif" }}>Ford</text>
      </svg>
    )
  },
  {
    id: "toyota",
    name: "Toyota",
    country: "Japão",
    flag: "🇯🇵",
    systems: ["Motor ciclo Atkinson", "Inversores Híbridos", "Baterias HV", "Direção EPS"],
    coverage: "Cobertura Completa 1998 - 2026",
    logoColor: "#eb0a1e",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="currentColor" strokeWidth="4.5" />
        <ellipse cx="50" cy="40" rx="25" ry="15" fill="none" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="50" rx="10" ry="30" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
    )
  },
  {
    id: "honda",
    name: "Honda",
    country: "Japão",
    flag: "🇯🇵",
    systems: ["Injeção i-VTEC", "Transmissão CVT", "Luz de Airbag SRS", "VSA Controle Estabilidade"],
    coverage: "Cobertura Completa 1997 - 2026",
    logoColor: "#1d1d1d",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <rect x="20" y="20" width="60" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M32 30 L38 30 L40 50 L60 50 L62 30 L68 30 L64 70 L58 70 L56 56 L44 56 L42 70 L36 70 Z" />
      </svg>
    )
  },
  {
    id: "hyundai",
    name: "Hyundai",
    country: "Coreia do Sul",
    flag: "🇰🇷",
    systems: ["Injeção Kappa/Gamma", "Câmbio Automático Shiftronic", "Módulo de Segurança", "Ar-condicionado FATC"],
    coverage: "Cobertura Completa 1999 - 2026",
    logoColor: "#002c5f",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <ellipse cx="50" cy="50" rx="45" ry="28" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M35 32 L43 32 L47 48 L57 48 L61 32 L69 32 L63 68 L55 68 L51 54 L41 54 L37 68 L29 68 Z" transform="skewX(-15) translate(15, 0)" />
      </svg>
    )
  },
  {
    id: "renault",
    name: "Renault",
    country: "França",
    flag: "🇫🇷",
    systems: ["Injeção Hi-Flex", "Conforto UCH", "Direção Assistida", "Painel de Instrumentos"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#ffcc00",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <path d="M50 12 L80 50 L50 88 L20 50 Z" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="miter" />
        <path d="M50 25 L68 50 L50 75 L32 50 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: "peugeot",
    name: "Peugeot",
    country: "França",
    flag: "🇫🇷",
    systems: ["Unidade de Comando BSI", "Injeção PureTech", "Câmbio AL4 / EAT6", "Painel de Instrumentos i-Cockpit"],
    coverage: "Cobertura Completa 1998 - 2026",
    logoColor: "#001021",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <path d="M15 15 L85 15 L85 85 L15 85 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M50 22 C37 22 35 45 42 55 L35 78 L45 78 L50 63 L55 78 L65 78 L58 55 C65 45 63 22 50 22 Z" />
        <path d="M48 26 L52 26 L52 30 L48 30 Z" fill="#fff" />
      </svg>
    )
  },
  {
    id: "jeep",
    name: "Jeep",
    country: "EUA",
    flag: "🇺🇸",
    systems: ["Injeção Turbo Flex / Diesel MultiJet", "Câmbio ZF de 9 Marchas", "Módulo de Tração 4x4", "Suspensão Eletrônica"],
    coverage: "Cobertura Completa 2002 - 2026",
    logoColor: "#2a3d35",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <text x="50" y="58" className="font-sans font-black tracking-tighter text-[22px] text-center" textAnchor="middle" fill="currentColor">Jeep</text>
        <rect x="12" y="16" width="76" height="68" rx="4" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.15" />
      </svg>
    )
  },
  {
    id: "bmw",
    name: "BMW",
    country: "Alemanha",
    flag: "🇩🇪",
    systems: ["Módulo DME Motor", "Transmissão ZF", "Suspensão EDC", "Análise Dinâmica DSC"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#0066b2",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 50 L50 15 A35 35 0 0 1 85 50 Z" fill="currentColor" opacity="0.3" />
        <path d="M50 50 L15 50 A35 35 0 0 1 50 15 Z" fill="none" />
        <path d="M50 50 L50 85 A35 35 0 0 1 15 50 Z" fill="currentColor" opacity="0.3" />
      </svg>
    )
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    country: "Alemanha",
    flag: "🇩🇪",
    systems: ["Módulo SAM Dianteiro/Traseiro", "Câmbio 7G/9G-Tronic", "DTCs de Segurança ESP", "Suspensão Pneumática Airmatic"],
    coverage: "Cobertura Completa 1996 - 2026",
    logoColor: "#1a1a1a",
    svgPath: (
      <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M50 5 L50 50 L12 72.5 M50 50 L88 72.5" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 8 L50 50 L14 71 M50 50 L86 71" fill="none" stroke="#000" strokeWidth="1.2" />
      </svg>
    )
  }
];

const SECONDARY_BRANDS = [
  "Citroën", "Nissan", "Mitsubishi", "Kia", "Chery", "BYD", "GWM", "Volvo", "Audi", "Land Rover", "Suzuki", "JAC Motors", "Porsche", "Subaru", "SsangYong", "Iveco", "Troller", "Lexus"
];

export default function SupportedBrands({ onPreFillBrand, onBookNow }: SupportedBrandsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedResult, setSearchedResult] = useState<{
    found: boolean;
    name: string;
    status: string;
    details: string;
  } | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchedResult(null);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    
    // Check main brands
    const mainFound = BRANDS.find(b => b.name.toLowerCase().includes(q) || b.id.includes(q));
    if (mainFound) {
      setSearchedResult({
        found: true,
        name: mainFound.name,
        status: "Compatibilidade Total de 100%",
        details: `Sistemas suportados: ${mainFound.systems.join(", ")}. Protocolo ISO-CAN integrado e homologado.`
      });
      return;
    }

    // Check secondary brands
    const secFound = SECONDARY_BRANDS.find(b => b.toLowerCase().includes(q));
    if (secFound) {
      setSearchedResult({
        found: true,
        name: secFound,
        status: "Compatibilidade Total de 100%",
        details: "Mapeamento completo ativo via Rede Multiplexada CAN Bus e K-Line. Diagnóstico de motor, freios, airbags e direção elétrica liberado."
      });
      return;
    }

    // Generic match
    if (q.length >= 2) {
      const capitalized = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
      setSearchedResult({
        found: true,
        name: capitalized,
        status: "Compatível Base OBD-II",
        details: "O AUTOSCANNER ONLINE suporta este veículo com escaneamento completo de injeção global eletrônica, diagnóstico de emissões DTC e fluxo dinâmico de sensores."
      });
    } else {
      setSearchedResult({
        found: false,
        name: searchQuery,
        status: "Não Encontrado",
        details: "Por favor digite um termo com pelo menos 2 letras."
      });
    }
  };

  const handleFastSelect = (brandName: string) => {
    onPreFillBrand(brandName);
    setSearchedResult({
      found: true,
      name: brandName,
      status: "Compatibilidade Total de 100%",
      details: "Detectado no banco de dados! Clique no botão abaixo para agendar diretamente com este fabricante de veículo pré-selecionado."
    });
  };

  return (
    <section id="brands" className="py-24 bg-[#080808] text-white border-b border-raven-border font-sans relative overflow-hidden">
      
      {/* Visual background atmospheric elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-raven-red/5 rounded-full filter blur-[130px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-raven-red/5 rounded-full filter blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block">
            Ampla Cobertura Automotiva
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            Fabricantes e Marcas Atendidas
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Nossa plataforma está homologada com o banco de dados oficial das montadoras nacionais e importadas. Cobrimos todos os sistemas integrados em mais de 98% dos carros em circulação rápida no Brasil.
          </p>
        </div>

        {/* Dynamic Infinite Marquee Ribbon of Secondary/All logos */}
        <div className="mb-16 bg-black/60 border-y border-raven-border py-4 overflow-hidden relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max text-xs font-mono font-black tracking-widest text-white/40 uppercase items-center">
            {/* Double output for continuous infinite scroll loop */}
            {[...BRANDS.map(b => b.name), ...SECONDARY_BRANDS, ...BRANDS.map(b => b.name), ...SECONDARY_BRANDS].map((bname, idx) => (
              <span key={idx} className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 bg-raven-red rounded-none animate-pulse" />
                {bname}
              </span>
            ))}
          </div>
          
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* Interactive Query Widget */}
        <div className="max-w-4xl mx-auto bg-[#0c0c0c] border border-raven-border p-6 md:p-8 shadow-2xl mb-16 rounded-none relative">
          <div className="absolute top-0 right-0 bg-raven-red text-white text-[8px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
            BANCO OBD-II INTERATIVO
          </div>
          <h3 className="font-display font-black text-base md:text-lg uppercase tracking-tight text-white mb-2">
            Verificar Compatibilidade de Modelo
          </h3>
          <p className="text-white/50 text-xs font-semibold leading-relaxed mb-6">
            Digite o fabricante do seu veículo abaixo para interrogar instantaneamente as nossas tabelas de cobertura do sistema.
          </p>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) setSearchedResult(null);
                }}
                placeholder="Exemplo: Peugeot, Chevrolet, BYD, Volvo..."
                className="w-full bg-black border border-raven-border pl-11 pr-4 py-4 text-xs font-semibold text-white focus:outline-none focus:border-raven-red rounded-none"
              />
            </div>
            <button
              type="submit"
              className="bg-raven-red hover:bg-[#ff2a30] text-white px-8 py-4 rounded-none text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-raven-red/10"
            >
              Pesquisar Cobertura
            </button>
          </form>

          {/* Quick Suggestions links */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-[10px] text-white/40 font-semibold font-mono">
            <span>SUGESTÕES RÁPIDAS:</span>
            {["BYD", "Renault", "Jeep", "BMW", "Audi", "Fiat"].map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => {
                  setSearchQuery(sug);
                  handleFastSelect(sug);
                }}
                className="text-white/60 hover:text-white hover:underline transition-colors uppercase"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Searched Results Pane */}
          <AnimatePresence mode="wait">
            {searchedResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-5 bg-black/80 border border-raven-border/80 rounded-none flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-raven-red/10 border border-raven-red/20 rounded-none mt-0.5 shrink-0">
                    {searchedResult.found ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-raven-red" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
                        {searchedResult.name}
                      </h4>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900 font-extrabold uppercase">
                        {searchedResult.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs font-semibold mt-1 leading-relaxed">
                      {searchedResult.details}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  {searchedResult.found && (
                    <button
                      onClick={() => {
                        onPreFillBrand(searchedResult.name);
                        onBookNow();
                      }}
                      className="w-full md:w-auto bg-white hover:bg-white/95 text-black px-5 py-3 rounded-none text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Escolher esta Marca e Agendar
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Brands Grid */}
        <p className="text-[10px] font-mono font-black tracking-widest text-white/40 uppercase mb-6 text-center">
          MONTADORAS POPULARES ATENDIDAS COMPLEMENTARMENTE (COMENTÁRIO TÉCNICO AUTOSCANNER ONLINE)
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {BRANDS.map((item) => (
            <div
              key={item.id}
              className="bg-[#0c0c0c] border border-raven-border p-5 hover:border-[#444] hover:bg-[#111] transition-all duration-300 group flex flex-col justify-between min-h-[220px] rounded-none relative"
            >
              <div>
                {/* Brand icon and origin badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-white/40 group-hover:text-white transition-colors">
                    {item.svgPath}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wide font-extrabold uppercase flex items-center gap-1">
                    <span>{item.flag}</span>
                    <span>{item.country}</span>
                  </span>
                </div>

                {/* Name */}
                <h4 className="font-display font-black text-sm uppercase tracking-wide text-white group-hover:text-raven-red transition-colors">
                  {item.name}
                </h4>
                
                <p className="text-[9.5px] text-white/35 font-mono uppercase tracking-wider mt-1.5 font-black">
                  {item.coverage}
                </p>

                {/* Subsystem small prints */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.systems.slice(0, 3).map((sys, sysIdx) => (
                    <span
                      key={sysIdx}
                      className="text-[8.5px] font-semibold text-white/50 px-1.5 py-0.5 bg-black/40 border border-raven-border rounded-none uppercase block"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selection button */}
              <button
                onClick={() => handleFastSelect(item.name)}
                className="w-full mt-4 text-[9px] font-mono tracking-widest font-black uppercase text-center text-white/40 group-hover:text-white hover:text-white bg-black/60 border border-raven-border group-hover:border-raven-red py-2 hover:bg-raven-red transition-all cursor-pointer rounded-none"
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>

        {/* More Brands Collapsible Showcase */}
        <div className="mt-12 text-center bg-black/30 border border-raven-border p-6 max-w-4xl mx-auto">
          <p className="text-xs font-bold text-white/60 mb-4 uppercase">
            E MAIS ESSAS 18 MONTADORAS COM CERTIFICAÇÃO DETALHADA:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SECONDARY_BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => handleFastSelect(b)}
                className="px-3.5 py-1.5 bg-[#0e0e0e] hover:bg-[#151515] border border-raven-border text-white/70 hover:text-white text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer"
              >
                {b}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
