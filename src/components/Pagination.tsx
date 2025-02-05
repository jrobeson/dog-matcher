import {
  Pagination as PaginationElement,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  goToPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  goToPage,
}: PaginationProps) {
  return (
    <PaginationElement className="mt-4 cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousPage} />
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink className="bg-blue-500 text-white">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationElement>
  );
}
