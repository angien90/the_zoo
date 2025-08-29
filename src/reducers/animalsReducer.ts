// Hanterar listan med djur och visningen av dem i karusellen
// Håller reda på själva djuren som ska visas,
// Hur många kort som visas per sida,
// Bredden på ett enskilt kort (för layout),
// Gör det möjligt att uppdatera dessa värden via actions.

import type { Animal } from "../models/Animal";

// Typ för state som reducer håller
export interface AnimalsState {
  animals: Animal[];
  cardsPerPage: number;
  cardWidth: number;
}

// Actions som reducer kan hantera
export type Action =
  | { type: "SET_ANIMALS"; payload: Animal[] }
  | { type: "SET_CARDS_PER_PAGE"; payload: number }
  | { type: "SET_CARD_WIDTH"; payload: number };

// Reducer som hanterar stateuppdateringar för djurkarusellen
// Tar nuvarande state och en action, och returnerar ett nytt state 
export const animalsReducer = (state: AnimalsState, action: Action): AnimalsState => {
  switch (action.type) {
    case "SET_ANIMALS":
      return { ...state, animals: action.payload };
    case "SET_CARDS_PER_PAGE":
      return { ...state, cardsPerPage: action.payload };
    case "SET_CARD_WIDTH":
      return { ...state, cardWidth: action.payload };
    default:
      return state;
  }
};
