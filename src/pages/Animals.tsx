import { useContext, useState } from "react";
import { AnimalContext } from "../contexts/AnimalContext";
import { AnimalsCarousel } from "../components/AnimalsCarousel";
import "../pages/Animals.scss";

export const Animals = () => {
  const { animals, carouselRef } = useContext(AnimalContext);

  // Lokala states för sidhantering
  const [currentPage, setCurrentPage] = useState(1);

  // Beräkna antalet sidor baserat på antalet djur
  const totalPages = Math.ceil(animals.length / 2); // Antal sidor beroende på 2 kort per sida

  // Hantera scrollning och uppdatering av sidan
  const scrollLeft = () => {
  const newPage = currentPage > 1 ? currentPage - 1 : totalPages;
  setCurrentPage(newPage);

  carouselRef.current?.scrollTo({
    left: (newPage - 1) * (300 + 32) * 2, // (kortbredd + gap) * 2 kort per sida
    behavior: "smooth",
  });
};

  const scrollRight = () => {
  const newPage = currentPage < totalPages ? currentPage + 1 : 1;
  setCurrentPage(newPage);

  carouselRef.current?.scrollTo({
    left: (newPage - 1) * (300 + 32) * 2,
    behavior: "smooth",
  });
};

  // Scrollhantering vid användarinteraktion
  const handleScroll = () => {
    const scrollPosition = carouselRef.current?.scrollLeft || 0;
    const scrollWidth = carouselRef.current?.scrollWidth || 0;
    const clientWidth = carouselRef.current?.clientWidth || 0;
    
    // Om vi är nära slutet, uppdatera sidan
    if (scrollPosition + clientWidth >= scrollWidth) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }

    // Om vi är nära början, uppdatera sidan
    if (scrollPosition <= 0) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="animals-page">
      <h2 className="animals-title">Hjälp oss ta hand om våra djur</h2>

      <AnimalsCarousel
        currentPage={currentPage}
        totalPages={totalPages}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        handleScroll={handleScroll}
        carouselRef={carouselRef}
      />
    </div>
  );
};