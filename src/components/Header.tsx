/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Wrench, Menu, X, Shield, Phone } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-raven-darker/95 backdrop-blur-md border-b border-raven-border shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="brand-logo"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleLinkClick("hero")}
          >
            <div className="bg-raven-red p-2.5 rounded-none text-white font-black text-xl shadow-lg shadow-raven-red/10 group-hover:scale-105 transition-transform duration-300">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg tracking-tighter text-white">
                  AUTOSCANNER
                </span>
                <span className="font-display font-black text-lg tracking-tighter text-raven-red glow-red">
                  ONLINE
                </span>
              </div>
              <p className="text-[9px] font-mono tracking-[0.2em] text-white/50 uppercase -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-raven-red animate-pulse"></span>
                Diagnóstico de Última Geração
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            <button
              id="nav-link-sintomas"
              onClick={() => handleLinkClick("symptoms")}
              className="text-white/70 hover:text-white hover:underline decoration-raven-red decoration-2 underline-offset-4 text-xs font-bold tracking-[0.1em] uppercase transition-all cursor-pointer"
            >
              Sintomas Comuns
            </button>
            <button
              id="nav-link-marcas"
              onClick={() => handleLinkClick("brands")}
              className="text-white/70 hover:text-white hover:underline decoration-raven-red decoration-2 underline-offset-4 text-xs font-bold tracking-[0.1em] uppercase transition-all cursor-pointer"
            >
              Marcas Atendidas
            </button>
            <button
              id="nav-link-vantagens"
              onClick={() => handleLinkClick("features")}
              className="text-white/70 hover:text-white hover:underline decoration-raven-red decoration-2 underline-offset-4 text-xs font-bold tracking-[0.1em] uppercase transition-all cursor-pointer"
            >
              Tecnologia do Scanner
            </button>
            <button
              id="nav-link-precos"
              onClick={() => handleLinkClick("pricing")}
              className="text-white/70 hover:text-white hover:underline decoration-raven-red decoration-2 underline-offset-4 text-xs font-bold tracking-[0.1em] uppercase transition-all cursor-pointer"
            >
              Pacotes
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-white/50 bg-[#161616] px-3.5 py-2 rounded-none border border-white/10">
              <Shield className="w-3.5 h-3.5 text-raven-red" />
              <span>Diagnóstico 100% Preciso</span>
            </div>
            <button
              id="cta-agendar-header"
              onClick={() => handleLinkClick("booking")}
              className="bg-raven-red hover:bg-[#ff2a30] active:bg-[#c01419] text-white px-6 py-3 rounded-none text-xs font-black uppercase tracking-widest shadow-lg shadow-raven-red/20 transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              Agendar Scanner
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 p-2 hover:text-white transition-colors cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden absolute top-full left-0 right-0 bg-[#0c0c0c] border-b border-raven-border shadow-2xl"
        >
          <div className="px-5 pt-4 pb-8 space-y-3">
            <button
              id="mob-nav-link-sintomas"
              onClick={() => handleLinkClick("symptoms")}
              className="block w-full text-left px-4 py-3 rounded-none text-white/80 hover:text-white hover:bg-white/5 text-sm font-bold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-raven-red"
            >
              Análise de Sintomas
            </button>
            <button
              id="mob-nav-link-marcas"
              onClick={() => handleLinkClick("brands")}
              className="block w-full text-left px-4 py-3 rounded-none text-white/80 hover:text-white hover:bg-white/5 text-sm font-bold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-raven-red"
            >
              Marcas Atendidas
            </button>
            <button
              id="mob-nav-link-vantagens"
              onClick={() => handleLinkClick("features")}
              className="block w-full text-left px-4 py-3 rounded-none text-white/80 hover:text-white hover:bg-white/5 text-sm font-bold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-raven-red"
            >
              Tecnologia do Scanner
            </button>
            <button
              id="mob-nav-link-precos"
              onClick={() => handleLinkClick("pricing")}
              className="block w-full text-left px-4 py-3 rounded-none text-white/80 hover:text-white hover:bg-white/5 text-sm font-bold uppercase tracking-wider transition-colors border-l-2 border-transparent hover:border-raven-red"
            >
              Preços e Palno
            </button>
            <div className="pt-4 border-t border-raven-border flex flex-col gap-3 px-4">
              <a
                href="https://wa.me/5511984937529?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20sobre%20o%20Atendimento%20em%20Domicílio."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-xs text-white/60 font-mono uppercase hover:text-[#25D366] transition-colors"
              >
                <span className="text-[#25D366] text-sm">💬</span>
                WhatsApp: 11 98493 7529
              </a>
              <button
                id="mob-cta-agendar"
                onClick={() => handleLinkClick("booking")}
                className="w-full bg-raven-red hover:bg-[#ff2a30] text-white font-black uppercase tracking-widest py-4 px-4 rounded-none text-center shadow-lg shadow-raven-red/20 text-xs"
              >
                Agendar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
