import { createContext, type ReactNode, useContext } from "react";

interface PaginationContextValue {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  goToPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextValue | null>(null);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
}

export function Pagination({
  children,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        handleNextPage,
        handlePreviousPage,
        goToPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
