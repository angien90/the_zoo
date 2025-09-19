import React, { useContext } from "react";
import { AnimalContext } from "../contexts/AnimalContext";
import { AnimalCard } from "./AnimalCard";
import "../pages/Animals.scss";

interface AnimalsCarouselProps {
  currentPage: number;
  totalPages: number;
  scrollLeft: () => void;
  scrollRight: () => void;
  handleScroll: () => void;
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

export const AnimalsCarousel = ({
  currentPage,
  totalPages,
  scrollLeft,
  scrollRight,
  handleScroll,
  carouselRef,
}: AnimalsCarouselProps) => {
  const { animals } = useContext(AnimalContext);

  // Hämta djuren som ska visas på den aktuella sidan
  const startIndex = (currentPage - 1) * 2;
  const displayedAnimals = animals.slice(startIndex, startIndex + 2);

  return (
    <>
      <section className="carousel-wrapper">
        <button className="carousel-button left" onClick={scrollLeft}>&#8592;</button>

        <div
          className="animals-carousel"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {displayedAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>

        <button className="carousel-button right" onClick={scrollRight}>&#8594;</button>
      </section>

      <div className="carousel-progress-paws">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`paw ${i < currentPage ? "filled" : ""}`} // Fyller pilarna baserat på currentPage
          >
            ❤️
          </span>
        ))}
      </div>
    </>
  );
};