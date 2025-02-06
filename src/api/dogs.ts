import { Dog } from "@/types";
import axios from "axios";

interface DogResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export async function fetchDogIds(
  breedFilters: string[],
  sort: string,
  page?: string,
): Promise<DogResponse> {
  const params = new URLSearchParams();
  if (breedFilters && breedFilters.length > 0) {
    breedFilters.forEach((breed) => {
      params.append("breeds", breed);
    });
  }
  if (sort) params.append("sort", `breed:${sort}`);
  if (page) {
    params.append("from", page);
  }
  const { data } = await axios.get(
    `https://frontend-take-home-service.fetch.com/dogs/search?${params.toString()}`,
    { withCredentials: true },
  );
  return data;
}

export async function fetchDogDetails(ids: string[]): Promise<Dog[]> {
  const response = await axios.post(
    "https://frontend-take-home-service.fetch.com/dogs",
    ids,
    { withCredentials: true },
  );
  return response.data;
}

export async function fetchDogs({
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

export async function fetchBreeds() {
  const { data } = await axios.get(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    { withCredentials: true },
  );
  return data;
}

export async function fetchMatch(ids: string[]): Promise<string> {
  try {
    const { data } = await axios.post(
      "https://frontend-take-home-service.fetch.com/dogs/match",
      ids,
      { withCredentials: true },
    );
    return data.match;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected matching error occured");
    }
  }
}

export const fetchDogById = async (dogId: string): Promise<Dog> => {
  console.log('finding by id')
  const { data } = await axios.post(
    "https://frontend-take-home-service.fetch.com/dogs",
    [dogId],
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  return data[0];
};
