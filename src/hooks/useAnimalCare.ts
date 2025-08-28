import { useReducer } from "react";
import type { Animal } from "../models/Animal";
import { getAnimalData, saveAnimalData } from "../helpers/localStorage";
import type { Status } from "../components/CareStatus";

interface State {
  lastFed: number | null;
  lastPetted: number | null;
}

type Action =
  | { type: "UPDATE_FEED"; payload?: number }
  | { type: "UPDATE_PET"; payload?: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FEED":
      return { ...state, lastFed: action.payload ?? Date.now() };
    case "UPDATE_PET":
      return { ...state, lastPetted: action.payload ?? Date.now() };
    default:
      return state;
  }
};

export const useAnimalCare = (animal: Animal | null) => {
  const [state, dispatch] = useReducer(reducer, {
    lastFed: animal ? getAnimalData(animal.id, "lastFed") : null,
    lastPetted: animal ? getAnimalData(animal.id, "lastPetted") : null,
  });

  const getStatus = (lastAction: number | null, thresholds: { happy: number; warning: number }) => {
    const hoursSince = lastAction ? (Date.now() - lastAction) / (1000 * 60 * 60) : Infinity;
    let status: Status;
    if (hoursSince <= thresholds.warning) status = "happy";
    else if (hoursSince <= thresholds.happy) status = "warning";
    else status = "alert";
    const canAct = hoursSince >= thresholds.happy;
    return { status, canAct, hoursSince };
  };

  const updateFeed = () => {
    if (!animal) return;
    const now = Date.now();
    dispatch({ type: "UPDATE_FEED", payload: now });
    saveAnimalData(animal.id, "lastFed", now);
  };

  const updatePet = () => {
    if (!animal) return;
    const now = Date.now();
    dispatch({ type: "UPDATE_PET", payload: now });
    saveAnimalData(animal.id, "lastPetted", now);
  };

  return {
    lastFed: state.lastFed,
    lastPetted: state.lastPetted,
    getStatus,
    updateFeed,
    updatePet,
  };
};