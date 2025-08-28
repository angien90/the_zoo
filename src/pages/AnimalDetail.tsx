import { useParams, useNavigate } from "react-router-dom";
import { CareStatus } from "../components/CareStatus";
import { useAnimal } from "../hooks/useAnimal";
import { useAnimalCare } from "../hooks/useAnimalCare";
import "./AnimalDetail.scss";

export const AnimalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const animal = useAnimal(id);
  const care = useAnimalCare(animal);

  if (!animal) return <p>Hittade inte djuret.</p>;

  const feedStatus = care!.getStatus(care!.lastFed, { happy: 3, warning: 2 });
  const petStatus = care!.getStatus(care!.lastPetted, { happy: 2, warning: 1 });

  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return "Aldrig - Var försiktig!";
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
  };

  return (
    <div className="animal-detail">
      <div className="animal-detail-card">
        <button onClick={() => navigate("/animals")} className="back-button">⬅ Tillbaka</button>
        <h2>{animal.name}</h2>
        <img src={animal.imageUrl} alt={animal.name} onError={(e) => (e.target as HTMLImageElement).src = "src/assets/safe_image.webp"} />

        <section className="animal-info">
          <h3>Vem är {animal.name}?</h3>
          <p>{animal.name} är {new Date().getFullYear() - animal.yearOfBirth} år. {animal.shortDescription}</p>

          <div className="taking-care-of">
            <span>
              <h3>Fick mat senast;</h3>
              <p>{formatTime(care!.lastFed)}</p>
              <CareStatus
                animalName={animal.name}
                status={feedStatus.status}
                type="feed"
                onAction={care!.updateFeed}
                buttonLabel={`Mata ${animal.name}`}
                canAct={feedStatus.canAct}
              />
            </span>

            <span>
              <h3>Blev klappad senast;</h3>
              <p>{formatTime(care!.lastPetted)}</p>
              <CareStatus
                animalName={animal.name}
                status={petStatus.status}
                type="pet"
                onAction={care!.updatePet}
                buttonLabel={`Klappa ${animal.name}`}
                canAct={petStatus.canAct}
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
