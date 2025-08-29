import { useCarousel } from "../hooks/useCarousel";
import { useAnimals } from "../hooks/useAnimals";
import { AnimalsCarousel } from "../components/AnimalsCarousel";
import "./Animals.scss";

export const Animals = () => {
  // Hooken returnerar carouselRef och state
  const { carouselRef, state } = useAnimals();

  // Använd useCarousel för scroll-logik
  const { currentPage, totalPages, scrollLeft, scrollRight, handleScroll } = useCarousel({
    containerRef: carouselRef,
    totalItems: state.animals.length,
    cardsPerPage: state.cardsPerPage,
    cardWidth: state.cardWidth,
    gap: 32, // gap är required
  });

  return (
    <div className="animals-page">
      <h2 className="animals-title">Hjälp oss ta hand om våra djur</h2>

      <AnimalsCarousel
        animals={state.animals}
        carouselRef={carouselRef}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        handleScroll={handleScroll}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Animals;
