// Hämtar djurdata från JSON när komponenten laddas.
// Håller djurdata i state via reducer.
// Håller koll på karusell-layout (cardsPerPage och cardWidth) och uppdaterar vid fönsterändring.
// Exponerar state, dispatch och en carouselRef för komponenterna som använder hooken.

import { useEffect, useReducer, useRef } from "react";
import type { Animal } from "../models/Animal";
import { animalsReducer } from "../reducers/animalsReducer";

// Definiera Action-typer baserat på vad din reducer hanterar
export type Action =
  | { type: "SET_ANIMALS"; payload: Animal[] }
  | { type: "SET_CARDS_PER_PAGE"; payload: number }
  | { type: "SET_CARD_WIDTH"; payload: number };

// Hook för djurdata
export const useAnimals = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [state, dispatch] = useReducer(animalsReducer, {
    animals: [] as Animal[],
    cardsPerPage: 2,
    cardWidth: 0,
  });

  // Hämta djurdata från JSON
  useEffect(() => {
    fetch("/animals.json")
      .then(res => res.json())
      .then((data: Animal[]) => dispatch({ type: "SET_ANIMALS", payload: data }))
      .catch(console.error);
  }, []);

  // Uppdatera layout vid resize
  useEffect(() => {
    const updateLayout = () => {
      const cardsPerPage = window.innerWidth <= 800 ? 1 : 2;
      dispatch({ type: "SET_CARDS_PER_PAGE", payload: cardsPerPage });

      if (carouselRef.current) {
        const firstCard = carouselRef.current.querySelector(".animal-card") as HTMLElement;
        if (firstCard) {
          dispatch({ type: "SET_CARD_WIDTH", payload: firstCard.offsetWidth + 32 });
        }
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [state.animals]);

  return { carouselRef, state, dispatch };
};
