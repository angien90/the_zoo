// Hanterar listan med djur och visningen av dem i karusellen
// Håller reda på själva djuren som ska visas,
// Hur många kort som visas per sida,
// Bredden på ett enskilt kort (för layout),
// Gör det möjligt att uppdatera dessa värden via actions.

import type { Animal } from "../models/Animal";
import type { Action } from "../hooks/useAnimals";

// Typ för state som reducer håller
export interface AnimalsState {
  animals: Animal[];
  cardsPerPage: number;
  cardWidth: number;
}

export const animalsReducer = (state: AnimalsState, action: Action): AnimalsState => {
  switch (action.type) {
    case "SET_ANIMALS":
      return { ...state, animals: action.payload };
    case "SET_CARDS_PER_PAGE":
      return { ...state, cardsPerPage: action.payload };
    case "SET_CARD_WIDTH":
      return { ...state, cardWidth: action.payload };
    case "RESET_FEEDING":
      return {
        ...state,
        animals: state.animals.map(a =>
          a.id === action.payload ? { ...a, isFed: false } : a
        ),
      };
    default:
      return state;
  }
};