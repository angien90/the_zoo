import { useEffect, useReducer, useRef } from "react";
import type { Animal } from "../models/Animal";
import { animalsReducer } from "../reducers/animalsReducer";

export const useAnimals = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [state, dispatch] = useReducer(animalsReducer, {
    animals: [] as Animal[],
    cardsPerPage: 2,
    cardWidth: 0,
  });

  // Hämta djurdata
  useEffect(() => {
    fetch("/animals.json")
      .then(res => res.json())
      .then((data: Animal[]) => dispatch({ type: "SET_ANIMALS", payload: data }))
      .catch(console.error);
  }, []);

  // Uppdatera kort per sida och kortbredd vid resize
  useEffect(() => {
    const updateLayout = () => {
      const cardsPerPage = window.innerWidth <= 800 ? 1 : 2;
      dispatch({ type: "SET_CARDS_PER_PAGE", payload: cardsPerPage });

      if (carouselRef.current) {
        const firstCard = carouselRef.current.querySelector(".animal-card") as HTMLElement;
        if (firstCard) dispatch({ type: "SET_CARD_WIDTH", payload: firstCard.offsetWidth + 32 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [state.animals]);

  return { carouselRef, state, dispatch };
};
