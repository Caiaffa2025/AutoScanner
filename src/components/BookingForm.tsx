/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  FileText,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Download,
  Share2
} from "lucide-react";
import { Appointment } from "../types";

interface BookingFormProps {
  preFillData?: {
    brand?: string;
    model?: string;
    moduleId?: string;
    packageId?: string;
  } | null;
  onBookingSuccess: () => void;
}

const BRANDS = [
  "Chevrolet",
  "Volkswagen",
  "Fiat",
  "Ford",
  "Toyota",
  "Honda",
  "Hyundai",
  "Jeep",
  "Renault",
  "Peugeot",
  "Citroën",
  "Nissan",
  "Mitsubishi",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volvo",
  "Land Rover",
  "Kia",
  "Chery",
  "BYD",
  "GWM",
  "Outra"
];

const ZONE_FEES: Record<string, number> = {
  central: 30,
  mid: 50,
  far: 80,
  metro: 120
};

export default function BookingForm({ preFillData, onBookingSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    vehicleBrand: "Chevrolet",
    vehicleModel: "",
    vehicleYear: "",
    vehiclePlate: "",
    packageId: "complete",
    preferredDate: "",
    preferredTime: "09:00",
    serviceMode: "home" as "workshop" | "home",
    homeAddress: "",
    homeZone: "central",
    notes: ""
  });

  const [bookingTicket, setBookingTicket] = useState<Appointment | null>(null);
  const [ticketNumber, setTicketNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if preFillData is dispatched from simulation/symptoms
  useEffect(() => {
    if (preFillData) {
      setFormData((prev) => ({
        ...prev,
        vehicleBrand: preFillData.brand || prev.vehicleBrand,
        vehicleModel: preFillData.model || prev.vehicleModel,
        packageId: preFillData.packageId || prev.packageId,
        notes: preFillData.moduleId 
          ? `Iniciado através do pré-diagnóstico do módulo: ${preFillData.moduleId.toUpperCase()}`
          : prev.notes
      }));
    }
  }, [preFillData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientPhone || !formData.vehicleModel || !formData.preferredDate) {
      return;
    }

    if (formData.serviceMode === "home" && !formData.homeAddress) {
      return;
    }

    setIsSubmitting(true);

    // Simulate database booking lag
    setTimeout(() => {
      const uniqueId = "RAV-" + Math.floor(Math.random() * 90000 + 10000);
      setTicketNumber(uniqueId);
      setBookingTicket({
        ...formData,
        homeFee: formData.serviceMode === "home" ? (ZONE_FEES[formData.homeZone] || 0) : 0
      });
      setIsSubmitting(false);
      onBookingSuccess();
    }, 1500);
  };

  const resetTicket = () => {
    setBookingTicket(null);
    setTicketNumber("");
    setFormData({
      clientName: "",
      clientPhone: "",
      vehicleBrand: "Chevrolet",
      vehicleModel: "",
      vehicleYear: "",
      vehiclePlate: "",
      packageId: "complete",
      preferredDate: "",
      preferredTime: "09:00",
      serviceMode: "home",
      homeAddress: "",
      homeZone: "central",
      notes: ""
    });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 25 }, (_, i) => String(currentYear - i));

  return (
    <section id="booking" className="py-24 bg-[#0a0a0a] text-white relative font-sans">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-black/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-raven-red font-mono text-[10px] tracking-[0.2em] font-black uppercase py-2 px-4 bg-raven-red/10 border border-raven-red/20 rounded-none inline-block">
            RESERVA DE AGENDA ONLINE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl mt-6 tracking-tighter uppercase leading-none">
            RESERVE SEU EXAME COMPUTADORIZADO
          </h2>
          <p className="text-white/60 mt-4 text-base font-semibold leading-relaxed">
            Preencha seus dados técnicos abaixo. Nossa equipe entrará em contato em menos de 10 minutos via WhatsApp para homologação do seu horário.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!bookingTicket ? (
              
              /* INPUT FORM STEP */
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#0f0f0f] border border-raven-border rounded-none p-6 md:p-10 shadow-2xl"
                onSubmit={handleFormSubmit}
              >
                {/* Visual state callout if data was prefilled */}
                {preFillData && (
                  <div className="mb-8 p-4 bg-raven-red/10 border border-raven-red/30 text-raven-red text-[10px] font-mono tracking-widest rounded-none flex items-center justify-between uppercase font-black">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-none bg-raven-red animate-pulse" />
                      <span>DADOS DO MAPEAMENTO CARREGADOS!</span>
                    </div>
                    <span className="text-[9px] text-white/40">Formulário Pré-Preenchido</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Client Info Section */}
                  <div className="space-y-6 md:border-r md:border-raven-border md:pr-8">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-raven-border flex items-center gap-2 pb-3 font-black">
                      <User className="w-4 h-4 text-raven-red" />
                      1. Informações de Identificação
                    </p>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Nome Completo</label>
                      <input
                        required
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Silva"
                        className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">WhatsApp para Retorno</label>
                      <input
                        required
                        type="tel"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleInputChange}
                        placeholder="Ex: (11) 98888-7777"
                        className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Histórico de Sintomas do Veículo</label>
                      <textarea
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Ex: Luz da injeção acesa intermitente, perda instantânea de força elétrica..."
                        className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Vehicle & Package Section */}
                  <div className="space-y-6">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-raven-border flex items-center gap-2 pb-3 font-black">
                      <Car className="w-4 h-4 text-raven-red" />
                      2. Ficha do Automóvel & Pacote
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Fabricante</label>
                        <select
                          name="vehicleBrand"
                          value={formData.vehicleBrand}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                        >
                          {BRANDS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Modelo</label>
                        <input
                          required
                          type="text"
                          name="vehicleModel"
                          value={formData.vehicleModel}
                          onChange={handleInputChange}
                          placeholder="Ex: Corolla"
                          className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Ano Modelo</label>
                        <select
                          name="vehicleYear"
                          value={formData.vehicleYear}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                        >
                          <option value="">Selecione...</option>
                          {yearOptions.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Placa do Veículo</label>
                        <input
                          type="text"
                          name="vehiclePlate"
                          maxLength={8}
                          value={formData.vehiclePlate}
                          onChange={handleInputChange}
                          placeholder="ABC1D23"
                          className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors uppercase"
                        />
                      </div>
                    </div>

                    {/* Service Package */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">Protocolo de Diagnóstico Contratado</label>
                      <select
                        name="packageId"
                        value={formData.packageId}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                      >
                        <option value="preventive">Varredura Preventiva Check-Up (R$ 119)</option>
                        <option value="complete">Diagnóstico Eletrônico Completo (R$ 199)</option>
                      </select>
                    </div>

                    {/* Preferred Date & Time */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-raven-red" />
                          Data Desejada
                        </label>
                        <input
                          required
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs focus:outline-none transition-colors font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-raven-red" />
                          Horário Pretendido
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs focus:outline-none transition-colors font-mono"
                        >
                          <option value="08:00">08:00 (Manhã)</option>
                          <option value="09:30">09:30 (Manhã)</option>
                          <option value="11:00">11:00 (Manhã)</option>
                          <option value="13:30">13:30 (Tarde)</option>
                          <option value="15:00">15:00 (Tarde)</option>
                          <option value="16:30">16:30 (Tarde)</option>
                        </select>
                      </div>
                    </div>

                    {/* Modalidade de Atendimento: EXCLUSIVAMENTE EM DOMICÍLIO */}
                    <div className="space-y-3.5 border-t border-raven-border/40 pt-5">
                      <div className="p-4 bg-raven-red/5 border border-raven-red/20 rounded-none space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-raven-red animate-pulse" />
                          <h4 className="font-display font-black text-xs uppercase text-white tracking-widest">
                            Atendimento Exclusivo Em Domicílio
                          </h4>
                        </div>
                        <p className="text-[10.5px] text-white/70 leading-relaxed font-semibold">
                          Não possuímos oficina física. Visando seu total conforto e conveniência, realizamos todo o diagnóstico computadorizado e escaneamento avançado <strong className="text-white">diretamente em sua garagem, residência, condomínio ou local de pane</strong>.
                        </p>
                        <div className="pt-1.5 flex flex-wrap gap-2">
                          <a
                            href="https://wa.me/5511984937529?text=Olá!%20Gostaria%20de%20solicitar%20um%20diagnóstico%20automotivo%20em%20domicílio%20com%20o%20Scanner."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1.5 inline-flex items-center gap-1.5 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.467 0 9.911-4.43 9.914-9.885.002-2.643-1.013-5.129-2.862-6.98C16.47 1.884 13.991.869 11.35.869c-5.476 0-9.92 4.434-9.923 9.893-.001 1.905.513 3.766 1.488 5.412L1.874 22.1l6.002-1.574c1.62.88 3.243 1.328 4.771 1.328zM17.61 14.38c-.29-.145-1.72-.848-1.986-.944-.266-.097-.46-.145-.653.145-.193.29-.747.944-.916 1.139-.17.193-.338.217-.628.072-.29-.145-1.228-.453-2.338-1.444-.864-.772-1.448-1.727-1.618-2.017-.17-.29-.018-.447.127-.59.13-.13.29-.338.435-.507.145-.17.193-.29.29-.483.097-.193.048-.361-.025-.507-.072-.145-.653-1.573-.894-2.152-.236-.569-.475-.49-.652-.49-.17 0-.361-.024-.554-.024s-.506.072-.771.361c-.266.29-1.013.99-1.013 2.415 0 1.425 1.037 2.798 1.182 2.992.145.193 2.037 3.111 4.934 4.362.688.297 1.224.474 1.644.608.692.22 1.322.189 1.821.114.555-.083 1.72-.7 1.961-1.374.24-.674.24-1.253.17-1.374-.073-.12-.266-.193-.555-.338z" />
                            </svg>
                            Agendar via WhatsApp (11) 98493-7529
                          </a>
                          
                          <a
                            href="https://wa.me/5511084937529?text=Olá!%20Gostaria%20de%20solicitar%20um%20diagnóstico%20automotivo%20em%20domicílio%20com%20o%20Scanner."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black hover:bg-white/5 text-white/50 border border-raven-border font-mono font-black text-[8px] uppercase tracking-widest px-2.5 py-1.5 inline-flex items-center gap-1.5 transition-colors"
                          >
                            Opção WhatsApp 2: (11) 08493-7529
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Home Service Details */}
                    <AnimatePresence>
                      {formData.serviceMode === "home" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4 pt-1.5 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">
                                Região do Veículo (Valor de Deslocamento)
                              </label>
                              <select
                                name="homeZone"
                                value={formData.homeZone}
                                onChange={handleInputChange}
                                className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                              >
                                <option value="central">Região Central / Próximo à nossa Base (Taxa R$ 30,00)</option>
                                <option value="mid">Zona Intermediária - Até 15km (Taxa R$ 50,00)</option>
                                <option value="far">Zona Afastada - 15km a 30km (Taxa R$ 80,00)</option>
                                <option value="metro">Grande SP / Região Metropolitana (Taxa R$ 120,00)</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-mono text-white/50 uppercase font-black tracking-wider">
                                Endereço de Atendimento Completo
                              </label>
                              <input
                                required={formData.serviceMode === "home"}
                                type="text"
                                name="homeAddress"
                                value={formData.homeAddress}
                                onChange={handleInputChange}
                                placeholder="Rua, número, bairro e apto (se houver)"
                                className="w-full bg-black border border-raven-border focus:border-raven-red rounded-none py-3 px-3.5 text-white text-xs font-semibold focus:outline-none transition-colors"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dynamic Real-time Pricing Summary Block */}
                    <div className="mt-6 p-4.5 bg-black border border-raven-border/80 rounded-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="font-mono text-[10px] space-y-1">
                        <div className="flex gap-2 text-white/40">
                          <span>PACOTE:</span>
                          <span className="text-white font-black">
                            {formData.packageId === "preventive" ? "PREVENTIVA (R$ 119)" : "COMPLETO (R$ 199)"}
                          </span>
                        </div>
                        {formData.serviceMode === "home" && (
                          <div className="flex gap-2 text-white/40">
                            <span>DESLOCAMENTO (DOMICÍLIO):</span>
                            <span className="text-white font-black">
                              + R$ {ZONE_FEES[formData.homeZone] || 0} ({formData.homeZone === "central" ? "Até 5km" : formData.homeZone === "mid" ? "5-15km" : formData.homeZone === "far" ? "15-30km" : "Mais de 30km"})
                            </span>
                          </div>
                        )}
                        <p className="text-white/25 uppercase text-[9px] font-bold tracking-wider pt-0.5">
                          *Atendimento em domicílio com valor agregado sob medida para sua localização.
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-[#222] pt-3 sm:pt-0">
                        <span className="text-[10px] font-mono text-white/40 uppercase font-bold mr-2 sm:mr-0">TOTAL ESTIMADO:</span>
                        <span className="text-xl md:text-2xl font-display font-black text-white leading-none">
                          R$ { (formData.packageId === "preventive" ? 119 : 199) + (formData.serviceMode === "home" ? (ZONE_FEES[formData.homeZone] || 0) : 0) },00
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Booking Trigger Buttons */}
                <div className="pt-8 border-t border-raven-border mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <span className="text-[10px] text-white/40 font-mono text-center sm:text-left uppercase font-bold tracking-wider">
                    *Faturamento local após os testes. Nenhuma transação eletrônica é necessária nesta etapa.
                  </span>
                  <button
                    id="booking-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-raven-red hover:bg-[#ff2a30] font-black uppercase tracking-widest px-8 py-4.5 rounded-none text-white shadow-xl transition-all text-xs w-full sm:w-auto cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block"></span>
                        Processando Voucher...
                      </>
                    ) : (
                      <>
                        Confirmar Horário do Scanner
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              
              /* CONFIRMED TICKET STEP */
              <motion.div
                key="booking-ticket"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xl mx-auto bg-[#0f0f0f] text-white rounded-none border border-raven-border overflow-hidden shadow-2xl relative"
              >
                {/* Visual Header Ribbon */}
                <div className="bg-[#121212] text-white p-8 text-center space-y-3 relative border-b border-raven-border">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-24 bg-raven-red/10 rounded-full filter blur-xl" />
                  <div className="w-12 h-12 rounded-none bg-raven-red flex items-center justify-center text-white mx-auto">
                    <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm tracking-widest uppercase">Reserva Homologada com Sucesso</h3>
                    <p className="text-[10px] font-mono text-raven-red tracking-widest uppercase mt-1">VOUCHER ID: {ticketNumber}</p>
                  </div>
                </div>

                {/* Ticket Details Body */}
                <div className="p-6 space-y-6 bg-black">
                  <div className="bg-[#0f0f0f] rounded-none p-5 border border-raven-border space-y-3.5 font-mono text-xs">
                    <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                      <span>CLIENTE:</span>
                      <span className="text-white font-black">{bookingTicket.clientName.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                      <span>CELULAR:</span>
                      <span className="text-white font-black">{bookingTicket.clientPhone}</span>
                    </div>
                    <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                      <span>VEÍCULO:</span>
                      <span className="text-white font-black">
                        {bookingTicket.vehicleBrand} {bookingTicket.vehicleModel} ({bookingTicket.vehicleYear})
                      </span>
                    </div>
                    {bookingTicket.vehiclePlate && (
                      <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                        <span>PLACA DIGITADA:</span>
                        <span className="text-white font-black uppercase">{bookingTicket.vehiclePlate}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                      <span>VARREDURA SELECIONADA:</span>
                      <span className="text-raven-red font-black uppercase">
                        {bookingTicket.packageId === "preventive" 
                          ? "Preventiva Check-Up" 
                          : "Diagnóstico Completo"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                      <span>LOCAL DO ATENDIMENTO:</span>
                      <span className="text-white font-black uppercase">
                        {bookingTicket.serviceMode === "home" ? "🚚 Em Domicílio" : "🏢 Na Oficina"}
                      </span>
                    </div>
                    {bookingTicket.serviceMode === "home" && (
                      <>
                        <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                          <span>ENDEREÇO DE DESTINO:</span>
                          <span className="text-white font-black uppercase text-right max-w-[200px] truncate" title={bookingTicket.homeAddress}>
                            {bookingTicket.homeAddress}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                          <span>TAXA DE DESLOCAMENTO:</span>
                          <span className="text-white font-black">
                            R$ {bookingTicket.homeFee},00
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between border-b border-raven-border pb-2 text-white/50">
                      <span>CORRESPONDÊNCIA DE HORÁRIO:</span>
                      <span className="text-white font-black">
                        {new Date(bookingTicket.preferredDate).toLocaleDateString("pt-BR")} às {bookingTicket.preferredTime}h
                      </span>
                    </div>
                    <div className="flex justify-between text-white/80 font-bold">
                      <span>INVESTIMENTO TOTAL:</span>
                      <span className="text-raven-red font-black">
                        R$ {(bookingTicket.packageId === "preventive" ? 119 : 199) + (bookingTicket.serviceMode === "home" ? (bookingTicket.homeFee || 0) : 0)},00
                      </span>
                    </div>
                  </div>

                  {/* QR code and visual ticket helper */}
                  <div className="flex items-center gap-4 p-4.5 bg-raven-red/10 border border-raven-red/20 rounded-none">
                    <QrCode className="w-14 h-14 text-white shrink-0" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-white">
                        {bookingTicket.serviceMode === "home" ? "Apresente ao Técnico no Local" : "Apresente este código na Oficina"}
                      </p>
                      <p className="text-[10px] text-white/60 leading-relaxed font-semibold mt-1">
                        Sua agenda foi alocada de forma preferencial no software da AUTOSCANNER ONLINE. Nossa unidade enviará uma mensagem em instantes para confirmação do deslocamento.
                      </p>
                    </div>
                  </div>

                  {/* Ticket actions */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      id="ticket-btn-share"
                      onClick={() => alert("Link de compartilhamento copiado para a área de transferência!")}
                      className="border border-[#444] bg-[#0c0c0c] hover:bg-[#121212] text-white py-3.5 rounded-none text-[10px] font-black font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-white" />
                      COMPARTILHAR
                    </button>
                    <button
                      id="ticket-btn-finish"
                      onClick={resetTicket}
                      className="bg-raven-red hover:bg-[#ff2a30] text-white py-3.5 rounded-none text-[10px] font-black font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      NOVO AGENDAMENTO
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
