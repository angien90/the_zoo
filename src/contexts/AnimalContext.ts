// Används för att dela data om djur globalt i appen utan att behöva skicka props genom flera komponenter.

import React, { createContext } from "react";
import type { Animal } from "../models/Animal";
import type { Action } from "../hooks/useAnimals";

export type AnimalContextType = {
  animals: Animal[];
  dispatch: React.Dispatch<Action>;
  carouselRef: React.RefObject<HTMLDivElement | null>;
  cardsPerPage?: number;
};

export const AnimalContext = createContext<AnimalContextType>({
  animals: [],
  dispatch: () => {}, // tom funktion som default
  carouselRef: React.createRef<HTMLDivElement>(), 
  cardsPerPage: 2,
});
