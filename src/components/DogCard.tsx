import { Dog } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { motion } from "motion/react";

interface DogCardProps {
  dog: Dog;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function DogCard({
  dog,
  isFavorite,
  onToggleFavorite,
}: DogCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.04 }}>
      <Card className="relative border-none">
        <CardHeader className="p-0">
          <CardTitle>
            <motion.div whileTap={{ y: 1.25 }}>
              <Button
                onClick={onToggleFavorite}
                variant="outline"
                size="icon"
                className="absolute border-0 bg-transparent hover:bg-transparent focus:outline-none active:bg-transparent"
              >
                <HeartIcon
                  className="absolute text-stone-50"
                  fill={isFavorite ? "deeppink" : "darkslategray"}
                />
              </Button>
            </motion.div>

            <img
              className="mb-2 h-48 w-96 rounded object-cover"
              src={dog.img}
              alt={`an image of ${dog.name} the ${dog.breed}`}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <section>
            <p className="font-semibold text-rose-600">{dog.name}</p>
            <p className="text-gray-600">{dog.breed}</p>
            <p className="text-gray-600">Age: {dog.age}</p>
            <p className="text-gray-600">Location: {dog.zip_code}</p>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}
