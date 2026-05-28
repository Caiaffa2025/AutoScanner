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
      id: "diagnostico-tcu",
      question: "Como o Scanner identifica problemas em câmbios automáticos?",
      answer: "Utilizamos software de diagnóstico original de montadora para interrogar o módulo eletrônico TCU (Transmission Control Unit). O scanner acessa os mapas de pressão hidráulica, testa os solenóides ativos bidirecionalmente, monitora a temperatura do fluido e extrai os códigos de erro DTCs. Com isso, indicamos se a causa dos trancos e patinação é de origem elétrica, eletrônica ou mecânica profunda antes de qualquer desmontagem física."
    },
    {
      id: "luz-injecao-cambio",
      question: "Por que a luz da injeção acende quando o câmbio automático está falhando?",
      answer: "O motor e a transmissão trabalham em cooperação permanente na Rede CAN do automóvel. Se o módulo TCU detecta que uma embreagem do câmbio deslizou (patinação) ou houve falha eletrônica de solenóide, ele ordena que a central da injeção (ECU) acenda a luz no painel e force o motor a reduzir força para evitar a quebra total de componentes metálicos internos."
    },
    {
      id: "re-aprendizado-tcu",
      question: "O scanner consegue recalibrar as trocas de marchas do veículo?",
      answer: "Sim! Executamos o reset dos adaptativos internos e o re-aprendizado eletrônico de sincronismo do câmbio automático. Esse processo redefine as pressões hidráulicas enviadas aos solenóides baseado no desgaste natural do câmbio, eliminando trancos e sapatadas nas trocas. Recomendamos fortemente realizar essa calibração após a troca preventiva do óleo da transmissão."
    },
    {
      id: "bateria-trancos",
      question: "Uma bateria ou elétrica cansada pode provocar trancos no câmbio?",
      answer: "Sim, e de forma bem frequente! Os solenóides magnéticos de controle de marchas demandam alta corrente elétrica rápida. Se a bateria estiver desgastada (abaixo de 12.2V) ou o alternador oscilar, os solenóides atuarão de forma atrasada e irregular, gerando trancos bruscos nas trocas de marchas e registrando falsos códigos de falha de câmbio no painel."
    },
    {
      id: "abs-dependencia",
      question: "A falha de freio ABS afeta as marchas do câmbio de alguma maneira?",
      answer: "Sem dúvida. O módulo de câmbio automático necessita saber a velocidade exata de rolagem do carro de forma confiável para escolher a marcha ideal. O ABS colhe esses dados através dos sensores de rotação das rodas. Se o ABS acender aviso de falha, a transmissão deixa de receber estes dados e pode entrar imediatamente em Modo de Segurança (modo de emergência de fábrica)."
    },
    {
      id: "diagnostico-preliminar-cambio",
      question: "Como o Diagnóstico Preliminar me protege de gastos desnecessários?",
      answer: "Oficinas descuidadas tendem a sugerir a retífica inteira do câmbio automático (serviços de R$ 10.000 a R$ 15.000) por meros desvios eletrônicos de sinal ou solenóides travados em curto. Nosso diagnóstico preliminar computadorizado isola exatamente onde está a falha física ou eletrônica, gerando um laudo ético de fácil visualização para que você faça o conserto exato e certeiro."
    },
    {
      id: "atendimento-domicilio-cambio",
      question: "Como funciona a verificação e diagnóstico preliminar em domicílio?",
      answer: "Nosso técnico especialista se desloca com o equipamento de varredura completo diretamente até a sua residência, condomínio ou garagem de trabalho em São Paulo e região. Não é necessário guincho: realizamos toda a leitura preliminar no local onde o automóvel está estacionado com dedicação impecável."
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
