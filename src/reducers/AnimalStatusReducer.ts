// Hanterar ”mata” och ”klappa”-logiken
// Håller reda på senaste gången ett djur fick mat/blev klappat,
// Avgör om djuret är glatt, börjar bli hungrigt eller är hungrigt,
// Bestämmer om knappen för att mata/klappa ska vara klickbar,
// Sparar/laddar data från localStorage.

import { useState, useEffect } from "react";
import { getAnimalData, saveAnimalData } from "../helpers/localStorage";

// Typ för statusen som kan visas för matning eller klappning
export type Status = "happy" | "warning" | "alert";

// Thresholds anger när en åtgärd kan utföras och när varning ska visas
export interface Thresholds {
  canAct: number;    // timmar tills åtgärd kan utföras
  warning: number;   // timmar innan varning visas
}

// Resultatet från hooken
export interface StatusResult {
  status: Status;
  lastAction: number | null;
  canAct: boolean;
  update: () => void;
}

// Helper: beräkna status baserat på tid sedan senaste handling
const getStatus = (hoursSince: number, thresholds: Thresholds): Status => {
  if (hoursSince < thresholds.warning) return "happy";
  if (hoursSince < thresholds.canAct) return "warning";
  return "alert";
};

// Hook som hanterar status för matning eller klappning
export const useAnimalStatus = (
  animalId: number,
  key: "lastFed" | "lastPetted",
  thresholds: Thresholds
): StatusResult => {
  const [lastAction, setLastAction] = useState<number | null>(null);

  // Ladda senaste handling från localStorage
  useEffect(() => {
    const stored = getAnimalData(animalId, key) ?? null;
    setLastAction(stored);
  }, [animalId, key]);

  // Funktion för att uppdatera senaste handling
  const update = () => {
    const now = Date.now();
    setLastAction(now);
    saveAnimalData(animalId, key, now);
  };

  // Beräkna timmar sedan senaste handling
  const hoursSince = lastAction ? (Date.now() - lastAction) / (1000 * 60 * 60) : Infinity;

  const canAct = hoursSince >= thresholds.canAct;
  const status = getStatus(hoursSince, thresholds);

  return { status, lastAction, canAct, update };
};
