/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Vehicle {
  brand: string;
  models: string[];
}

export interface DiagnosticModule {
  id: string;
  name: string;
  codeName: string; // e.g. ECU, ABS, SRS, TCU, BCM
  description: string;
  icon: string;
}

export interface Symptom {
  id: string;
  name: string;
  icon: string;
  description: string;
  likelyCause: string;
  systemToScanId: string; // ID of the DiagnosticModule
  severity: "low" | "medium" | "high";
}

export interface DiagnosticPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  timeEstimated: string; // e.g. "30 a 45 min"
  features: string[];
  isPopular?: boolean;
}

export interface DiagnosticReport {
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlate?: string;
  moduleId: string;
  moduleName: string;
  scanTime: string;
  status: "clear" | "warning" | "critical";
  dtcList: DTC[];
  batteryVoltage: number;
  protocol: string;
  recommendation: string;
}

export interface DTC {
  code: string;
  description: string;
  status: "Ativo" | "Passivo" | "Histórico";
  severity: "low" | "medium" | "high";
  possibleFix: string;
}

export interface Appointment {
  clientName: string;
  clientPhone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlate?: string;
  symptomId?: string;
  packageId: string;
  preferredDate: string;
  preferredTime: string;
  serviceMode?: "workshop" | "home";
  homeAddress?: string;
  homeZone?: string;
  homeFee?: number;
  notes?: string;
}
