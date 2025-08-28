import { useState } from "react";
import type { RefObject } from "react";

interface UseCarouselProps {
  totalItems: number;
  cardsPerPage: number;
  cardWidth: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export const useCarousel = ({ containerRef, totalItems, cardsPerPage, cardWidth }: UseCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / cardsPerPage) : 0;
  const lastPageIndex = totalPages > 0 ? totalPages - 1 : 0;

  const scrollToPage = (page: number) => {
    if (!containerRef.current || cardWidth === 0) return;

    const cards = containerRef.current.querySelectorAll(".animal-card");
    if (cards.length === 0) return;

    let scrollPos = 0;

    if (page === lastPageIndex) {
      const cardsOnLastPage = totalItems % cardsPerPage || cardsPerPage;
      const lastCardsWidth = Array.from(cards)
        .slice(-cardsOnLastPage)
        .reduce((sum, card) => sum + (card as HTMLElement).offsetWidth + 32, 0);
      scrollPos = containerRef.current.scrollWidth - lastCardsWidth;
    } else {
      scrollPos = page * cardsPerPage * cardWidth;
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
    const approxPage = containerRef.current.scrollLeft / (cardWidth * cardsPerPage);
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
