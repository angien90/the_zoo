import { useContext } from "react";
import { AnimalContext } from "../contexts/AnimalContext";
import { AnimalCard } from "./AnimalCard";
import "../pages/Animals.scss";

interface AnimalsCarouselProps {
  currentPage: number;
  totalPages: number;
  scrollLeft: () => void;
  scrollRight: () => void;
  handleScroll: () => void;
}

export const AnimalsCarousel = ({
  currentPage,
  totalPages,
  scrollLeft,
  scrollRight,
  handleScroll,
}: AnimalsCarouselProps) => {
  const { animals, carouselRef } = useContext(AnimalContext);

  return (
    <>
      <section className="carousel-wrapper">
        <button className="carousel-button left" onClick={scrollLeft}>⬅</button>

        <div className="animals-carousel" ref={carouselRef} onScroll={handleScroll}>
          {animals.map(a => <AnimalCard key={a.id} animal={a} />)}
        </div>

        <button className="carousel-button right" onClick={scrollRight}>➡</button>
      </section>

      <div className="carousel-progress-paws">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span key={i} className={`paw ${i <= currentPage ? "filled" : ""}`}>❤️</span>
        ))}
      </div>
    </>
  );
};
