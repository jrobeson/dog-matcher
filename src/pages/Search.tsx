import DogCard from "@/components/DogCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { type Dog } from "../types";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";
import { extractFromParam } from "@/utils/url";
import { fetchDogs } from "@/api/dogs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Search() {
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState<string | undefined>(undefined);
  const [breedFilters, setBreedFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-dogs", { breedFilters, sortOrder, page }],
    queryFn: fetchDogs,
    placeholderData: keepPreviousData,
    retry: false,
  });

  if (isLoading) return <div>Loading dogs...</div>;
  if (isError) return <div>Error loading best friends!</div>;

  const currentPage = page ? +page / 25 + 1 : 1;
  const totalPages = data ? Math.ceil(data.total / 25) : 1;

  function toggleFavorite(id: string) {
    setFavIds((prevFavs) => {
      const newFavs = new Set(prevFavs);
      if (newFavs.has(id)) newFavs.delete(id);
      else newFavs.add(id);
      return newFavs;
    });
  }

  const goToPage = (page: number) => {
    const validPage = Math.min(page, totalPages);
    const offset = (validPage - 1) * 25;
    setPage(String(offset));
  };

  function handlePreviousPage() {
    if (data?.prev) {
      const fromValue = extractFromParam(data.prev);
      setPage(fromValue || undefined);
    }
  }
  function handleNextPage() {
    if (data?.next) {
      const offset = extractFromParam(data.next);
      if (offset !== null) {
        const numericOffset = +offset;
        const maxOffset = (totalPages - 1) * 25;
        setPage(String(Math.min(numericOffset, maxOffset)));
      }
    }
  }

  const dogCards = data?.dogs.map((dog: Dog) => (
    <DogCard
      isFavorite={favIds.has(dog.id)}
      dog={dog}
      key={dog.id}
      onToggleFavorite={() => toggleFavorite(dog.id)}
    />
  ));

  return (
    <div className="bg-stone-100">
      <Header />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <ArrowUpDown /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid scroll-m-10 gap-4 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {dogCards}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
}

// async function getBreeds() {
//   const { data } = await axios.get(
//     "https://frontend-take-home-service.fetch.com/dogs/breeds",
//   );
//   console.log(data);
//   return data;
// }

// const {
//   data: breeds,
//   isLoading: isLoadingBreeds,
//   isError: isBreedError,
// } = useQuery({
//   queryKey: ["dog-breeds"],
//   queryFn: getBreeds,
// });
