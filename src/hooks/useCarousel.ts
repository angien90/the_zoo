import { useState } from "react";

interface UseCarouselProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalItems: number;
  cardsPerPage: number;
  cardWidth: number;
  gap?: number; 
}

export const useCarousel = ({
  containerRef,
  totalItems,
  cardsPerPage,
  cardWidth,
  gap = 32,
}: UseCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(totalItems / cardsPerPage);
  const lastPageIndex = totalPages - 1;

  const scrollToPage = (page: number) => {
    if (!containerRef.current) return;

    let scrollPos = page * (cardsPerPage * cardWidth + (cardsPerPage - 1) * gap);

    // Justera för sista sidan så att den stannar vid sista kortet
    if (page === lastPageIndex) {
      const remainingCards = totalItems % cardsPerPage || cardsPerPage;
      scrollPos =
        containerRef.current.scrollWidth -
        (remainingCards * cardWidth + (remainingCards - 1) * gap);
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
    if (!containerRef.current) return;
    const approxPage =
      containerRef.current.scrollLeft / (cardsPerPage * cardWidth + (cardsPerPage - 1) * gap);
    const page = Math.round(approxPage);
    if (page !== currentPage) setCurrentPage(page);
  };

  return { currentPage, totalPages, scrollLeft, scrollRight, handleScroll, scrollToPage };
};