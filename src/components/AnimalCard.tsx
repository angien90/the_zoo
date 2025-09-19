// Komponent för hur ett djur visas på Animals.tsx sidan

import { Link } from "react-router-dom";
import type { Animal } from "../models/Animal";
import { useAnimalStatus } from "../reducers/AnimalStatusReducer";
import { CareStatus } from "../components/CareStatus";
import "../pages/Animals.scss";
import safeImage from '../assets/safe_image.webp';

// Props-typ för AnimalCard-komponenten
interface AnimalCardProps {
  animal: Animal;
}

// Visar info om ett djur på Animals.tsx sidan
export const AnimalCard = ({ animal }: AnimalCardProps) => {
  // Indikation på att djuret snart behöver mat efter 3 timmar
  // Knappen blir klickbar efter 3 timmar inne i AnimalDetail
  // Djuret ska ha mat efter 5h
  const feed = useAnimalStatus(animal.id, "lastFed", { canAct: 5, warning: 3 });
  // Indikation på att djuret snart behöver klappas efter 2 timmar
  // Knappen blir klickbar efter 2 timmar inne i AnimalDetail
  // Djuret ska bli klappad efter 4h
  const pet = useAnimalStatus(animal.id, "lastPetted", { canAct: 4, warning: 2 });

  return (
    <div className="animal-card">
      <h2>{animal.name}</h2>
      <img
        src={animal.imageUrl}
        alt={animal.name}
        onError={(e) => (e.target as HTMLImageElement).src = safeImage}
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
