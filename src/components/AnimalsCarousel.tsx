// Komponent för att visa djurkort i karusell
// Tar emot alla värden via props

import type { RefObject } from "react";
import type { Animal } from "../models/Animal";
import { AnimalCard } from "./AnimalCard";

interface AnimalsCarouselProps {
  animals: Animal[];
  carouselRef: RefObject<HTMLDivElement | null>;
  scrollLeft: () => void;
  scrollRight: () => void;
  handleScroll: () => void;
  currentPage: number;
  totalPages: number;
}

export const AnimalsCarousel: React.FC<AnimalsCarouselProps> = ({
  animals,
  carouselRef,
  scrollLeft,
  scrollRight,
  handleScroll,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      <section className="carousel-wrapper">
        <button className="carousel-button" onClick={scrollLeft} aria-label="Föregående djur">⬅</button>

        <div className="animals-carousel" ref={carouselRef} onScroll={handleScroll}>
          {animals.map(a => <AnimalCard key={a.id} animal={a} />)}
        </div>

        <button className="carousel-button" onClick={scrollRight} aria-label="Nästa djur">➡</button>
      </section>

      <div className="carousel-progress-paws">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span key={i} className={`paw ${i <= currentPage ? "filled" : ""}`}>❤️</span>
        ))}
      </div>
    </>
  );
};
