import DogCard from "@/components/DogCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { type Dog } from "../types";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";
import { extractFromParam } from "@/utils/url";
import { fetchDogs, fetchBreeds } from "@/api/dogs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import BreedFilter from "@/components/BreedFilter";
import GenerateMatchDialog from "@/components/GenerateMatchDialog";

export default function Search() {
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState<string | undefined>(undefined);
  const [breedFilters, setBreedFilters] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "current-dogs",
      { breedFilters: Array.from(breedFilters), sortOrder, page },
    ],
    queryFn: fetchDogs,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const { data: breeds } = useQuery({
    queryKey: ["dog-breeds"],
    queryFn: fetchBreeds,
  });

  useEffect(() => {
    setPage(undefined);
  }, [breedFilters, sortOrder]);

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

  function goToPage(page: number) {
    const validPage = Math.min(page, totalPages);
    const offset = (validPage - 1) * 25;
    setPage(String(offset));
  }

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

  function handleBreed(breed: string) {
    setBreedFilters((prevBreeds) => {
      const newBreeds = new Set(prevBreeds);
      if (newBreeds.has(breed)) {
        newBreeds.delete(breed);
      } else {
        newBreeds.add(breed);
      }
      return newBreeds;
    });
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
    <div className="bg-stone-50">
      <Header>
        <section className="bg-stone-50 pb-1 pl-1 shadow-md">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
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
          <BreedFilter
            breeds={breeds}
            checkedBreeds={breedFilters}
            onHandleBreed={handleBreed}
          />
          <GenerateMatchDialog favIds={Array.from(favIds)} />
        </section>
      </Header>
      <div></div>
      <div className="grid scroll-m-10 gap-4 px-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
