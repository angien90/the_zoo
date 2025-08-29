// Hämtar ett specifikt djur baserat på dess id och visar det på AnimalDetail.tsx.

import type { Animal } from "../models/Animal";
import { useAnimals } from "./useAnimals";

export const useAnimalDetail = (id: number | string): Animal | undefined => {
  const { state } = useAnimals(); // hämta state från useAnimals
  const numericId = typeof id === "string" ? Number(id) : id;

  return state.animals.find((a: Animal) => a.id === numericId);
};
