import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BreedFilter({
  breeds,
  checkedBreeds,
  onHandleBreed,
}: {
  breeds: string[];
  checkedBreeds: Set<string>;
  onHandleBreed: (breed: string) => void;
}) {
  const breedCheckBoxes = breeds.map((breed) => (
    <DropdownMenuCheckboxItem
      key={breed}
      id={breed}
      checked={checkedBreeds.has(breed)}
      onCheckedChange={() => onHandleBreed(breed)}
    >
      {breed}
    </DropdownMenuCheckboxItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <Button variant="secondary">
          <FilterIcon /> Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Breeds</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {breedCheckBoxes}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
