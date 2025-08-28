import { useEffect, useRef, useState } from "react";
import type { Animal } from "../models/Animal";
import { AnimalCard } from "../components/AnimalCard";
import "./Animals.css";

export const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [cardWidth, setCardWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Ladda djur
  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then(setAnimals)
      .catch(console.error);
  }, []);

  // Anpassa antal kort per sida vid resize
  useEffect(() => {
    const updateLayout = () => {
      setCardsPerPage(window.innerWidth <= 800 ? 1 : 2);

      // mäta ett korts bredd (+ gap)
      if (carouselRef.current) {
        const firstCard = carouselRef.current.querySelector(".animal-card") as HTMLElement;
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 32); // 32px = 2rem gap
        }
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [animals]);

  const totalPages = animals.length > 0 ? Math.ceil(animals.length / cardsPerPage) : 0;
  const lastPageIndex = totalPages > 0 ? totalPages - 1 : 0;

  // Scrolla till vald sida
  const scrollToPage = (page: number) => {
  if (!carouselRef.current) return;

  const cards = carouselRef.current.querySelectorAll(".animal-card");
  if (cards.length === 0) return;

  let scrollPos = 0;

  if (page === lastPageIndex) {
    // sista sidan
    const cardsOnLastPage = animals.length % cardsPerPage || cardsPerPage;
    const lastCardsWidth = Array.from(cards)
      .slice(-cardsOnLastPage)
      .reduce((sum, card) => sum + (card as HTMLElement).offsetWidth + 32, 0); // 32 = gap
    scrollPos = carouselRef.current.scrollWidth - lastCardsWidth;
  } else {
    // vanliga sidor
    scrollPos = page * cardsPerPage * cardWidth;
  }

  carouselRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
  setCurrentPage(page);
};


  const scrollLeft = () => {
    if (currentPage === 0) {
      scrollToPage(lastPageIndex); // loopa runt
    } else {
      scrollToPage(currentPage - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage === lastPageIndex) {
      scrollToPage(0); // loopa runt
    } else {
      scrollToPage(currentPage + 1);
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current || cardWidth === 0) return;
    const { scrollLeft } = carouselRef.current;

    const approxPage = scrollLeft / (cardWidth * cardsPerPage);
    const page = Math.round(approxPage);

    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="animals-page">
      <h2 className="animals-title">Hjälp oss ta hand om våra djur</h2>

      <div className="carousel-wrapper">
        <button className="carousel-button" onClick={scrollLeft}>⬅</button>

        <div
          className="animals-carousel"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {animals.map((a) => (
            <AnimalCard key={a.id} animal={a} />
          ))}
        </div>

        <button className="carousel-button" onClick={scrollRight}>➡</button>
      </div>

      {/* Progress */}
      <div className="carousel-progress-paws">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span key={i} className={`paw ${i <= currentPage ? "filled" : ""}`}>❤️</span>))}
      </div>
    </div>
  );
};

export default Animals;
