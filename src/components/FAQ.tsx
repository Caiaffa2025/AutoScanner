/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqList: FAQItem[] = [
    {
      id: "luz-injecao",
      question: "A luz da injeção eletrônica acendeu no painel. O diagnóstico ajuda?",
      answer: "Sim, com certeza. A luz de injeção acesa aponta que a central eletrônica detectou parâmetros fora do padrão na motorização ou sistemas de emissões. Nosso scanner de última geração faz uma varredura completa, lê o código de falha ativo (DTC) e indica exatamente qual sensor ou atuador está com mau funcionamento (ex: Sonda Lambda, corpo de borboleta, bobina de ignição)."
    },
    {
      id: "falha-abs",
      question: "Como é diagnosticada a falha de ABS?",
      answer: "A falha no sistema ABS compromete a segurança ativa de frenagem de pânico. Nosso técnico conecta o scanner automotivo diretamente na porta OBD-II para acessar a central de freios. O equipamento realiza testes de sensores de roda individuais, analisa o sinal de velocidade e detecta falhas na válvula hidráulica ou no módulo ABS."
    },
    {
      id: "falha-airbag",
      question: "O diagnóstico também lê códigos de erro de Airbag?",
      answer: "Sim, realizamos o rastreamento completo do sistema de retenção suplementar (SRS/Airbag). Diagnosticamos falhas relacionadas a sensores de impacto, fita do airbag do volante (clock spring), tensores dos cintos de segurança e falhas de comunicação da central de airbag, ajudando a garantir o funcionamento correto em casos de emergência."
    },
    {
      id: "saude-bateria",
      question: "Como funciona o teste de bateria e elétrica?",
      answer: "Verificamos a saúde da bateria através do scanner e de testes operacionais de tensão de partida (CCA) e taxa de carga produzida pelo alternador. Isso permite identificar se o problema de partida do veículo reside em carga baixa da bateria, desgaste natural do acumulador ou falha no sistema de carga e partida."
    },
    {
      id: "reset-manutencao",
      question: "O que é o Reset de Manutenção e quando ele deve ser feito?",
      answer: "Muitos veículos modernos exigem que, após a troca de óleo ou revisões periódicas periódicas, o aviso no painel seja redefinido eletronicamente. Nosso scanner automotivo realiza esse reset de intervalos de manutenção e zeramento de avisos, apagando avisos insistentes de revisão e restaurando os cronogramas internos de serviço."
    },
    {
      id: "leitura-codigos",
      question: "O que é a leitura de códigos de erro?",
      answer: "É a extração e decodificação dos códigos DTC (Diagnostic Trouble Codes) armazenados nos múltiplos módulos e computadores de bordo do veículo. Ao invés de adivinhar o defeito baseado em sintomas genéricos, a leitura de códigos fornece informações exatas registradas diretamente pelas centrais eletrônicas em tempo real."
    },
    {
      id: "diagnostico-preliminar",
      question: "O que é e qual o limite do Diagnóstico Preliminar?",
      answer: "O diagnóstico preliminar baseia-se no rastreamento eletrônico robusto para encontrar e isolar a raiz do problema elétrico ou de injeção indicado pelas falhas registradas no painel. Ele orienta com extrema precisão qual peça ou chicote necessita de reparo profissional, protegendo você contra trocas errôneas gratuitas de peças saudáveis."
    },
    {
      id: "preco-atendimento",
      question: "Onde o diagnóstico é feito e qual a área de cobertura?",
      answer: "O nosso atendimento é móvel e realizado exclusivamente em domicílio, garantindo o máximo conforto para você, sem que precise contratar um guincho ou deslocar o veículo com falhas ativas de injeção ou frenagem. Cobrimos a Grande São Paulo e regiões próximas."
    }
  ];

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-24 bg-[#0a0a0a] text-white border-t border-raven-border relative font-sans">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block">
            Central de Dúvidas
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            Perguntas Frequentes — FAQ
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed max-w-2xl mx-auto">
            Esclareça suas principais dúvidas sobre o procedimento de diagnóstico computadorizado preliminar, leitura de códigos OBD2 e redefinições eletrônicas.
          </p>
        </div>

        {/* Accordion List Container */}
        <div className="space-y-4">
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="bg-[#121212] border border-raven-border hover:border-white/25 transition-colors duration-300 rounded-none"
              >
                {/* Accordion Trigger/Header Button */}
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-raven-red shrink-0" />
                    <span className="font-display font-black text-sm uppercase tracking-wide text-white leading-tight">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? "text-raven-red" : "text-white/40"}`} />
                  </motion.div>
                </button>

                {/* Accordion Panel with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-raven-border/40 text-xs leading-relaxed font-semibold text-white/70">
                        {item.answer}
                        
                        {item.id === "diagnostico-preliminar" && (
                          <div className="mt-4 flex items-center gap-2 bg-raven-red/5 border border-raven-red/20 p-3">
                            <Sparkles className="w-4 h-4 text-raven-red shrink-0" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-white">
                              Evite gastos extras com o diagnóstico preliminar!
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
