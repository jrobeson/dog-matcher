import DogCard from "@/components/DogCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { type Dog } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DogResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

async function fetchDogIds(
  breedFilters: string[],
  sort: string,
  page?: string,
): Promise<DogResponse> {
  const params = new URLSearchParams();
  if (breedFilters?.length !== 0) {
    params.append("breeds", breedFilters!.join(","));
  }
  if (sort) params.append("sort", `breed:${sort}`);
  if (page) {
    const from = new URL(
      page,
      "https://frontend-take-home-service.fetch.com/",
    ).searchParams.get("from");

    params.append("from", from);
  }
  const { data } = await axios.get(
    `https://frontend-take-home-service.fetch.com/dogs/search?${params.toString()}`,
    { withCredentials: true },
  );
  return data;
}

async function fetchDogDetails(ids: string[]) {
  const response = await axios.post(
    "https://frontend-take-home-service.fetch.com/dogs",
    ids,
    { withCredentials: true },
  );
  return response.data;
}

async function fetchDogs({
  queryKey,
}: {
  queryKey: [
    string,
    { breedFilters: string[]; sortOrder: "asc" | "desc"; page?: string },
  ];
}) {
  const [, { breedFilters, sortOrder, page }] = queryKey;
  const dogIdData = await fetchDogIds(breedFilters, sortOrder, page);
  const dogs = await fetchDogDetails(dogIdData.resultIds);
  return {
    dogs,
    total: dogIdData.total,
    next: dogIdData.next,
    prev: dogIdData.prev,
  };
}

export default function Search() {
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState<string | undefined>(undefined);
  const [breedFilters, setBreedFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-dogs", { breedFilters, sortOrder, page }],
    queryFn: fetchDogs,
    placeholderData: keepPreviousData,
  });

  function toggleFavorite(id: string) {
    setFavIds((prevFavs) => {
      const newFavs = new Set(prevFavs);
      if (newFavs.has(id)) newFavs.delete(id);
      else newFavs.add(id);
      return newFavs;
    });
  }

  if (isLoading) return <div>Loading dogs...</div>;
  if (isError) return <div>Error loading best friends!</div>;

  const dogCards = data?.dogs.map((dog: Dog) => (
    <DogCard
      isFavorite={favIds.has(dog.id)}
      dog={dog}
      key={dog.id}
      onToggleFavorite={() => toggleFavorite(dog.id)}
    />
  ));
  return (
    <div className="bg-slate-200">
      <div>
        <Button variant="secondary" onClick={() => setPage(data?.prev)}>
          <ChevronLeft />
        </Button>
        <Button variant="secondary" onClick={() => setPage(data?.next)}>
          <ChevronRight />
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {dogCards}
      </div>
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
