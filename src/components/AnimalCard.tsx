import { Link } from "react-router-dom";
import type { Animal } from "../models/Animal";
import { useAnimalStatus } from "../hooks/useAnimalStatus";
import { CareStatus } from "../components/CareStatus";
import "../pages/Animals.css";

interface AnimalCardProps {
  animal: Animal;
}

// Hook för mat och klappning
// Mat: 0-3h = happy, 3-4h = warning, >4 = alert | canFeed = true om >=4
// Klapp: 0-2h = happy, 2-3h = warning, >3 = alert | canPet = true om >=3
export const AnimalCard = ({ animal }: AnimalCardProps) => {
  const feed = useAnimalStatus(animal.id, "lastFed", { happy: 4, warning: 3 });
  const pet = useAnimalStatus(animal.id, "lastPetted", { happy: 3, warning: 2 });

  return (
    <div className="animal-card">
      <h2>{animal.name}</h2>
      <img
        src={animal.imageUrl}
        alt={animal.name}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "src/assets/safe_image.webp";
        }}
      />

      <CareStatus
        animalName={animal.name}
        status={feed.status}
        type="feed"
        onAction={feed.update}
      />

      <CareStatus
        animalName={animal.name}
        status={pet.status}
        type="pet" 
        onAction={pet.update}
      />

      <Link to={`/animals/${animal.id}`}>
        <button>Ge {animal.name} kärlek</button>
      </Link>
    </div>
  );
};
