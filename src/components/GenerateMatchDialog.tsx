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

export default function GenerateMatchDialog({ favIds }: { favIds: string[] }) {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [open, setOpen] = useState(false);

  async function handleGenerateMatch() {
    try {
      const matchId = await fetchMatch(favIds);
      const matchedDog = await fetchDogById(matchId);
      setMatchedDog(matchedDog);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        onClick={handleGenerateMatch}
        className="bg-rose-600 hover:bg-rose-700 focus:outline-none active:bg-rose-600 active:outline-none"
      >
        Generate Match
      </DialogTrigger>
      {open && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-rose-600">Match Found!</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}

// Framer Motion variants for the backdrop and modal
// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.3 } },
// };

// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.8, y: -50 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.5, type: "spring", bounce: 0.3 },
//   },
// };

// // A simple variant for falling hearts. Adjust values as needed.
// const heartVariants = {
//   initial: { opacity: 0, y: -20 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1,
//       ease: "easeOut",
//       repeat: Infinity,
//       repeatDelay: 0.3,
//     },
//   },
// };
