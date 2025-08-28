import { useEffect, useReducer } from "react";
import { getAnimalData, saveAnimalData } from "../helpers/localStorage";

export type Status = "happy" | "warning" | "alert";

interface StatusState {
  lastAction: number | null;
}

type Action =
  | { type: "SET_LAST_ACTION"; payload: number }
  | { type: "LOAD_FROM_STORAGE"; payload: number | null };

interface StatusResult {
  status: Status;
  canAct: boolean;
  hoursSince: number;
  lastAction: number | null;
  update: () => void;
}

const reducer = (state: StatusState, action: Action): StatusState => {
  switch (action.type) {
    case "SET_LAST_ACTION":
      return { lastAction: action.payload };
    case "LOAD_FROM_STORAGE":
      return { lastAction: action.payload };
    default:
      return state;
  }
};

export const useAnimalStatusReducer = (
  animalId: number,
  key: "lastFed" | "lastPetted",
  thresholds: { happy: number; warning: number }
): StatusResult => {
  const [state, dispatch] = useReducer(reducer, { lastAction: null });

  // Ladda initialt från localStorage
  useEffect(() => {
    const storedTime = getAnimalData(animalId, key);
    dispatch({ type: "LOAD_FROM_STORAGE", payload: storedTime ?? null });
  }, [animalId, key]);

  const hoursSince = state.lastAction
    ? (Date.now() - state.lastAction) / (1000 * 60 * 60)
    : Infinity;

  let status: Status;
  if (hoursSince <= thresholds.warning) {
    status = "happy";
  } else if (hoursSince <= thresholds.happy) {
    status = "warning";
  } else {
    status = "alert";
  }

  const canAct = hoursSince >= thresholds.happy;

  const update = () => {
    const nowTime = Date.now();
    dispatch({ type: "SET_LAST_ACTION", payload: nowTime });
    saveAnimalData(animalId, key, nowTime);
  };

  return { status, canAct, hoursSince, lastAction: state.lastAction, update };
};
