import { useEffect, useReducer, useRef } from "react";
import type { Animal } from "../models/Animal";
import { AnimalCard } from "../components/AnimalCard";
import { useCarousel } from "../hooks/useCarousel";
import "./Animals.scss";

interface AnimalsState {
  animals: Animal[];
  cardsPerPage: number;
  cardWidth: number;
}

type Action =
  | { type: "SET_ANIMALS"; payload: Animal[] }
  | { type: "SET_CARDS_PER_PAGE"; payload: number }
  | { type: "SET_CARD_WIDTH"; payload: number };

const reducer = (state: AnimalsState, action: Action): AnimalsState => {
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

export const Animals = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [state, dispatch] = useReducer(reducer, {
    animals: [],
    cardsPerPage: 2,
    cardWidth: 0,
  });

  // Ladda djur
  useEffect(() => {
    fetch("/animals.json")
      .then(res => res.json())
      .then((data: Animal[]) => dispatch({ type: "SET_ANIMALS", payload: data }))
      .catch(console.error);
  }, []);

  // Anpassa layout vid resize
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

  const { currentPage, totalPages, scrollLeft, scrollRight, handleScroll } = useCarousel({
    containerRef: carouselRef,
    totalItems: state.animals.length,
    cardsPerPage: state.cardsPerPage,
    cardWidth: state.cardWidth,
  });

  return (
    <div className="animals-page">
      <h2 className="animals-title">Hjälp oss ta hand om våra djur</h2>

      <section className="carousel-wrapper">
        <button className="carousel-button" onClick={scrollLeft} aria-label="Föregående djur">⬅</button>

        <div className="animals-carousel" ref={carouselRef} onScroll={handleScroll}>
          {state.animals.map(a => <AnimalCard key={a.id} animal={a} />)}
        </div>

        <button className="carousel-button" onClick={scrollRight} aria-label="Nästa djur">➡</button>
      </section>

      <div className="carousel-progress-paws">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span key={i} className={`paw ${i <= currentPage ? "filled" : ""}`}>❤️</span>
        ))}
      </div>
    </div>
  );
};

export default Animals;
