import { motion, AnimatePresence } from "motion/react";
import { X, Smartphone, MessageCircle, ExternalLink, Code2, Sparkles } from "lucide-react";

interface AgencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgencyModal({ isOpen, onClose }: AgencyModalProps) {
  const whatsappUrl = "https://wa.me/5511984937529?text=Ol%C3%A1!%20Vim%20pelo%20site%20AutoScanner%20Online%20e%20gostaria%20de%20falar%20com%20a%20Agencia%20Stc%20Mobile.";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-md bg-[#141414] border-2 border-yellow-400/80 p-6 sm:p-8 shadow-2xl glow-box-red overflow-hidden z-10"
          >
            {/* 6-Second Auto-close Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-yellow-400"
              />
            </div>

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-raven-red/10 rounded-full filter blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors rounded-none border border-transparent hover:border-white/20"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1.5 w-fit mb-4">
              <Code2 className="w-4 h-4 text-yellow-400" />
              <span>Desenvolvimento Web & Mobile</span>
            </div>

            {/* Title & Main Text requested */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight leading-snug">
                Agência STC Mobile
              </h2>

              <div className="bg-[#0a0a0a] border border-white/10 p-4 space-y-3 font-mono">
                <p className="text-sm text-yellow-400 font-bold leading-relaxed">
                  Este Projeto foi desenvolvido pela Agencia Stc Mobile.
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 pt-1 border-t border-white/10">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>11-98493-7529 - whatsapp</span>
                </div>
              </div>

              <p className="text-xs text-white/60 font-medium leading-relaxed">
                Especialistas em desenvolvimento de aplicações de alta performance, landing pages automotivas e estratégias digitais.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-black font-mono font-black text-xs uppercase px-4 py-3.5 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Falar no WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <button
                onClick={onClose}
                className="bg-transparent hover:bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase px-4 py-3.5 transition-colors"
              >
                Fechar
              </button>
            </div>

            {/* Footer Tag */}
            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/40 uppercase">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                Sydney Caiaffa
              </span>
              <span>Agencia STC Mobile</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
