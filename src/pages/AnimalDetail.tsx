import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Animal } from "../models/Animal";
import { useAnimalStatus } from "../hooks/useAnimalStatus";
import { CareStatus } from "../components/CareStatus";
import "./AnimalDetail.css";

export const AnimalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data: Animal[]) => {
        const found = data.find((a) => a.id === Number(id));
        setAnimal(found || null);
      });
  }, [id]);

  // Hook för mat och klappning
  // Mat: 0-2h = happy, 2-3h = warning, >3 = alert | canFeed = true om >=3
  // Klapp: 0-1h = happy, 1-2h = warning, >2 = alert | canPet = true om >=2
  const feed = useAnimalStatus(Number(id), "lastFed", { happy: 3, warning: 2 });
  const pet = useAnimalStatus(Number(id), "lastPetted", { happy: 2, warning: 1 });

  if (!animal) return <p>Hittade inte djuret.</p>;

  // Formaterar tid till YYYY-MM-DD HH:MM:SS
  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return "Aldrig";
    const d = new Date(timestamp);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  return (
    <div className="animal-detail">
      <div className="animal-detail-card">
        <button onClick={() => navigate("/animals")} className="back-button">⬅ Tillbaka</button>

        <h2>{animal.name}</h2>
        <img
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e) => {(e.target as HTMLImageElement).src = "src/assets/safe_image.webp";}}
        />

        <section className="animal-info">
          <h3>Vem är {animal.name}?</h3>
          <p>{animal.name} är {new Date().getFullYear() - animal.yearOfBirth} år. {animal.shortDescription}</p>

          <div className="taking-care-of">
            <span>
              <h3>Fick mat senast;</h3>
              <p>{feed.hoursSince !== Infinity ? formatTime(feed.lastAction) : "Inte matat ännu"}</p>
              <CareStatus
                animalName={animal.name}
                status={feed.status}
                type="feed"
                onAction={feed.update}
                buttonLabel={`Mata ${animal.name}`}
                canAct={feed.canAct}
              />
            </span>

            <span>
              <h3>Blev klappad senast;</h3>
              <p>{pet.hoursSince !== Infinity ? formatTime(pet.lastAction) : "Inte klappad ännu"}</p>
              <CareStatus
                animalName={animal.name}
                status={pet.status}
                type="pet"
                onAction={pet.update}
                buttonLabel={`Klappa ${animal.name}`}
                canAct={pet.canAct}
              />
            </span>
          </div>
        </section>

        <hr />

        <section className="animal-extra">
          <h3>Lär dig mer om djurrasen <em>{animal.latinName}</em></h3>
          <p>{animal.longDescription}</p>
        </section>
      </div>
    </div>
  );
};

export default AnimalDetail;
