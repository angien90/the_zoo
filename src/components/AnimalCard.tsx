// Komponent för hur ett djur visas på Animals.tsx sidan

import { Link } from "react-router-dom";
import type { Animal } from "../models/Animal";
import { useAnimalStatus } from "../reducers/AnimalStatusReducer";
import { CareStatus } from "../components/CareStatus";
import "../pages/Animals.scss";

// Props-typ för AnimalCard-komponenten
interface AnimalCardProps {
  animal: Animal;
}

// AnimalCard-komponenten visar info om ett djur i kortvy
export const AnimalCard = ({ animal }: AnimalCardProps) => {
  // Hook för att hantera matstatus
  // Kan mata djuret efter 5h (canAct), visar varning efter 4h (warning)
  const feed = useAnimalStatus(animal.id, "lastFed", { canAct: 5, warning: 3 });
  // Kan klappa djuret efter 3h, visar varning efter 2h 
  const pet = useAnimalStatus(animal.id, "lastPetted", { canAct: 4, warning: 2 });

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
        canAct={feed.canAct}
      />

      <CareStatus
        animalName={animal.name}
        status={pet.status}
        type="pet"
        onAction={pet.update}
        canAct={pet.canAct}
      />

      <Link to={`/animals/${animal.id}`}>
        <button>Ge {animal.name} kärlek</button>
      </Link>
    </div>
  );
};
