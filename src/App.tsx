/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import DiagnosticScope from "./components/DiagnosticScope";
import SymptomChecker from "./components/SymptomChecker";
import TransmissionTroubleSection from "./components/TransmissionTroubleSection";
import SupportedBrands from "./components/SupportedBrands";
import Features from "./components/Features";
import PricingPackages from "./components/PricingPackages";
import BookingForm from "./components/BookingForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AgencyModal from "./components/AgencyModal";

import { AlertCircle, CheckCircle, Sparkles, X } from "lucide-react";

export default function App() {
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);

  // Auto-open modal on initial landing page load for 6 seconds
  useEffect(() => {
    // Open immediately when page loads
    setIsAgencyModalOpen(true);

    const timer = setTimeout(() => {
      setIsAgencyModalOpen(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);
  const [preFillBookingData, setPreFillBookingData] = useState<{
    brand?: string;
    model?: string;
    moduleId?: string;
    packageId?: string;
  } | null>(null);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info" | "warning";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "info" | "warning" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePreFillBooking = (info: { brand: string; model: string; moduleId: string; packageId: string }) => {
    setPreFillBookingData(info);
    showNotification(
      `Dados do ${info.brand} ${info.model} transferidos para o formulário de reserva!`,
      "success"
    );
    setTimeout(() => {
      handleScrollToSection("booking");
    }, 150);
  };

  const handleSymptomSelect = (moduleId: string) => {
    setPreFillBookingData({
      moduleId: moduleId
    });

    showNotification(
      `Módulo ${moduleId.toUpperCase()} pré-selecionado para agendamento!`,
      "success"
    );

    setTimeout(() => {
      handleScrollToSection("booking");
    }, 150);
  };

  const handleBrandSelect = (brandName: string) => {
    setPreFillBookingData({
      brand: brandName
    });

    showNotification(
      `Marca ${brandName.toUpperCase()} pré-selecionada para agendamento!`,
      "success"
    );

    setTimeout(() => {
      handleScrollToSection("booking");
    }, 150);
  };

  const handlePackageSelect = (packageId: string) => {
    const names: Record<string, string> = {
      preventive: "Varredura Preventiva Check-Up",
      complete: "Diagnóstico Eletrônico Completo"
    };

    setPreFillBookingData({
      packageId: packageId
    });

    showNotification(
      `Pacote "${names[packageId]}" selecionado com sucesso!`,
      "success"
    );

    setTimeout(() => {
      handleScrollToSection("booking");
    }, 150);
  };

  return (
    <div className="bg-[#0f0f0f] text-white font-sans min-h-screen flex flex-col justify-between selection:bg-raven-red selection:text-white overflow-x-hidden">
      
      {/* Dynamic Pop notification toast bar */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full">
        {notification && (
          <div className="bg-slate-900 text-white border border-slate-800 p-4 rounded-xl shadow-2xl flex items-start gap-3 pointer-events-auto animate-fade-in">
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : notification.type === "warning" ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-xs font-mono font-bold text-slate-400">AVISO DO SISTEMA RAVEN</p>
              <p className="text-xs mt-0.5 text-slate-100 font-light">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Header */}
      <Header onNavigate={handleScrollToSection} />

      {/* Main Structural Body */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onCheckSymptoms={() => handleScrollToSection("symptoms")}
          onBookNow={() => handleScrollToSection("booking")}
        />

        {/* Scope of Preliminary Diagnostics and Fault Codes */}
        <DiagnosticScope onBookNow={() => handleScrollToSection("booking")} />

        {/* Symptoms checker */}
        <SymptomChecker
          onSelectSymptomForScan={handleSymptomSelect}
          onBookNow={() => handleScrollToSection("booking")}
        />

        {/* Common transmission issues & OBD2 diagnostic codes */}
        <TransmissionTroubleSection onBookNow={() => handleScrollToSection("booking")} />

        {/* Brand coverage list and interactive compat checker */}
        <SupportedBrands
          onPreFillBrand={handleBrandSelect}
          onBookNow={() => handleScrollToSection("booking")}
        />

        {/* Raven technical features */}
        <Features />

        {/* Transparent Pacotes/Preços */}
        <PricingPackages onSelectPackage={handlePackageSelect} />

        {/* Booking Agendar Reservation Form */}
        <BookingForm
          preFillData={preFillBookingData}
          onBookingSuccess={() =>
            showNotification("Sua reserva de diagnóstico no AUTOSCANNER ONLINE foi enviada com sucesso!", "success")
          }
        />

        {/* FAQ - Frequently Asked Questions */}
        <FAQ />
        
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleScrollToSection}
        onOpenAgencyModal={() => setIsAgencyModalOpen(true)}
      />

      {/* Agencia STC Mobile Popup Modal */}
      <AgencyModal
        isOpen={isAgencyModalOpen}
        onClose={() => setIsAgencyModalOpen(false)}
      />

    </div>
  );
}
