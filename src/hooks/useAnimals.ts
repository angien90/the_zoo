import { useEffect, useReducer } from "react";
import type { Animal } from "../models/Animal";

interface State {
  animals: Animal[];
}
type Action = { type: "SET_ANIMALS"; payload: Animal[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ANIMALS":
      return { ...state, animals: action.payload };
    default:
      return state;
  }
};

export const useAnimals = () => {
  const [state, dispatch] = useReducer(reducer, { animals: [] });

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data: Animal[]) => dispatch({ type: "SET_ANIMALS", payload: data }))
      .catch(console.error);
  }, []);

  return state.animals;
};
