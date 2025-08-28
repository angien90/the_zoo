import { useEffect, useState } from "react";
import { getAnimalData, saveAnimalData } from "../helpers/localStorage";

export type Status = "happy" | "warning" | "alert";

interface StatusResult {
  status: Status;
  canAct: boolean;
  hoursSince: number;
  lastAction: number | null;
  update: () => void;
}

export const useAnimalStatus = (
  animalId: number,
  key: "lastFed" | "lastPetted",
  thresholds: { happy: number; warning: number }
): StatusResult => {
  const [lastAction, setLastAction] = useState<number | null>(null);

  // Laddar initialt från localStorage
  useEffect(() => {
    const storedTime = getAnimalData(animalId, key);
    setLastAction(storedTime ?? null);
  }, [animalId, key]);

  // Räkna ut timmar sedan senaste åtgärd
  const hoursSince = lastAction
    ? (Date.now() - lastAction) / (1000 * 60 * 60)
    : Infinity;

  // Status baserat på thresholds
  let status: Status;
  if (hoursSince <= thresholds.warning) {
    status = "happy";
  } else if (hoursSince <= thresholds.happy) {
    status = "warning";
  } else {
    status = "alert";
  }

  // Om åtgärd kan utföras (t.ex. mata igen efter happy-tiden gått ut)
  const canAct = hoursSince >= thresholds.happy;

  // Uppdaterar lastAction
  const update = () => {
    const nowTime = Date.now();
    setLastAction(nowTime);
    saveAnimalData(animalId, key, nowTime);
  };

  return { status, canAct, hoursSince, lastAction, update };
};
