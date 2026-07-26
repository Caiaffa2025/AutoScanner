import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const CAN_BUS_LOGS = [
  "INICIANDO COMUNICAÇÃO CAN BUS HIGH-SPEED (500 kbps)...",
  "CONEXÃO OBD-II VIA SCANNER RAVEN 3: ESTÁVEL [OK]",
  "TRANSMISSION CONTROL MODULE (TCU/TCM) LOCALIZADO",
  "LEITURA DOS SENSORES DE PRESSÃO ELETRÔNICA E SOLENOIDES...",
  "VARREDURA DO CORPO DE VÁLVULAS: FLUXO HIDRÁULICO 4.8 BAR",
  "TELEMETRIA DE TRANCOS E ATRASO DE ENGATE CONCLUÍDA",
  "SISTEMA PRONTO PARA DIAGNÓSTICO EM DOMICÍLIO"
];

export default function CanBusTypewriter() {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = CAN_BUS_LOGS[currentLogIndex];
    const typingSpeed = isDeleting ? 25 : 45;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentLogIndex((prev) => (prev + 1) % CAN_BUS_LOGS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentLogIndex]);

  return (
    <div className="bg-[#0a0a0a] border border-raven-border p-3 font-mono text-[11px] leading-relaxed shadow-inner overflow-hidden">
      <div className="flex items-center gap-2 text-raven-red font-bold uppercase pb-1.5 border-b border-white/10 mb-2">
        <Terminal className="w-3.5 h-3.5 animate-pulse text-raven-red shrink-0" />
        <span className="tracking-wider">CAN BUS STREAMING LOG:</span>
        <span className="ml-auto text-[9px] bg-raven-red/20 text-raven-red px-1.5 py-0.5 border border-raven-red/40 font-bold">LIVE</span>
      </div>

      <div className="flex items-center gap-1.5 text-white/90 font-medium min-h-[28px]">
        <span className="text-raven-red font-bold select-none">&gt;</span>
        <span className="text-white font-mono tracking-wide">
          {displayedText}
        </span>
        <span className="w-2 h-4 bg-raven-red inline-block animate-pulse shrink-0 ml-0.5" />
      </div>
    </div>
  );
}
