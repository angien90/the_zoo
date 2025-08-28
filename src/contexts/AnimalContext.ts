import { createContext } from "react";
import type { AnimalItem } from "../models/AnimalItem";

type AnimalContextType = {
  animal: AnimalItem[];
};

export const AnimalContext = createContext<AnimalContextType>({
  animal: [],
});
