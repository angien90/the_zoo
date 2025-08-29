import { useContext } from "react";
import { AnimalContext } from "../contexts/AnimalContext";
import { useCarousel } from "../hooks/useCarousel";
import { AnimalsCarousel } from "../components/AnimalsCarousel";
import "../pages/Animals.scss";



export const Animals = () => {
  const { animals, carouselRef } = useContext(AnimalContext);

  const { currentPage, totalPages, scrollLeft, scrollRight, handleScroll } = useCarousel({
    containerRef: carouselRef,
    totalItems: animals.length,
    cardsPerPage: 2,
    cardWidth: 300,
    gap: 32,
  });

  return (
    <div className="animals-page">
      <h2 className="animals-title">Hjälp oss ta hand om våra djur</h2>

      <AnimalsCarousel
        currentPage={currentPage}
        totalPages={totalPages}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        handleScroll={handleScroll}
      />
    </div>
  );
};
