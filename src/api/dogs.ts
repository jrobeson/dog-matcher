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
  if (breedFilters?.length !== 0) {
    params.append("breeds", breedFilters!.join(","));
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

export async function fetchDogDetails(ids: string[]) {
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
