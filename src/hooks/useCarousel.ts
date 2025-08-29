// Hooken håller all logik för att karusellen ska fungera

import { useState } from "react";

interface UseCarouselProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalItems: number;
  cardsPerPage: number;
  cardWidth: number;
  gap: number; // lägg till gap
}

export const useCarousel = ({
  containerRef,
  totalItems,
  cardsPerPage,
  cardWidth,
  gap,
}: UseCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / cardsPerPage) : 0;
  const lastPageIndex = totalPages > 0 ? totalPages - 1 : 0;

  const scrollToPage = (page: number) => {
    if (!containerRef.current || cardWidth === 0) return;

    let scrollPos = 0;

    if (page === lastPageIndex) {
      // sista sidan: räkna antalet kort som ska visas
      const cardsOnLastPage = totalItems % cardsPerPage || cardsPerPage;
      scrollPos = (totalItems - cardsOnLastPage) * (cardWidth + gap);
    } else {
      scrollPos = page * cardsPerPage * (cardWidth + gap);
    }

    containerRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
    setCurrentPage(page);
  };

  const scrollRight = () => {
    const nextPage = currentPage === lastPageIndex ? 0 : currentPage + 1;
    scrollToPage(nextPage);
  };

  const scrollLeft = () => {
    const prevPage = currentPage === 0 ? lastPageIndex : currentPage - 1;
    scrollToPage(prevPage);
  };

  const handleScroll = () => {
    if (!containerRef.current || cardWidth === 0) return;

    const approxPage = containerRef.current.scrollLeft / ((cardWidth + gap) * cardsPerPage);
    const page = Math.round(approxPage);
    if (page !== currentPage) setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    scrollLeft,
    scrollRight,
    handleScroll,
  };
};
