import { fetchDogById, fetchMatch } from "@/api/dogs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Dog } from "@/types";
import { useState } from "react";
import logo from "/dog-matcher-logo.png";

export default function GenerateMatchDialog({ favIds }: { favIds: string[] }) {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [open, setOpen] = useState(false);

  async function handleGenerateMatch() {
    if (matchedDog) setMatchedDog(null);
    try {
      const matchId = await fetchMatch(favIds);
      const matchedDog = await fetchDogById(matchId);
      setMatchedDog(matchedDog);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setMatchedDog(null);
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger
        onClick={handleGenerateMatch}
        className="bg-rose-600 hover:bg-rose-700 focus:outline-none active:bg-rose-600 active:outline-none"
      >
        Generate Match
      </DialogTrigger>
      {matchedDog && open && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center text-center text-2xl text-rose-600">
              <img
                src={logo}
                className="w-14 rounded-full"
                alt="Dog Matcher Logo"
              />
              {`You matched with ${matchedDog.name}!`}
            </DialogTitle>
            <DialogDescription className="flex flex-col">
              <img
                src={matchedDog.img}
                alt="image of a found best friend"
                className="rounded-xl"
              />
              <p className="text-xl text-rose-600">
                {`${matchedDog.name} is a ${matchedDog.age} year old ${matchedDog.breed} who cannot wait to meet her new best friend.`}
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}
