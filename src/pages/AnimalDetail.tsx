import { useParams, useNavigate } from "react-router-dom";
import { CareStatus } from "../components/CareStatus";
import { useAnimalDetail } from "../hooks/useAnimalDetail";
import { useAnimalStatus } from "../reducers/AnimalStatusReducer";
import "./AnimalDetail.scss";

export const AnimalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id);

  const animal = useAnimalDetail(numericId);


  const feedStatus = useAnimalStatus(animal?.id ?? 0, "lastFed", {
  canAct: 4,
  warning: 3
  });

  const petStatus = useAnimalStatus(animal?.id ?? 0, "lastPetted", {
    canAct: 3,
    warning: 2
  });

  // Hjälpfunktion för att formatera datum
  const formatTime = (date: string | number | Date) => {
    return new Date(date).toLocaleString();
  };

  if (!animal) return <p>Djur hittades inte</p>;

  return (
    <div className="animal-detail">
      <div className="animal-detail-card">
        <button onClick={() => navigate("/animals")} className="back-button">⬅ Tillbaka</button>

        <h2>{animal.name}</h2>
        <img
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e) => (e.target as HTMLImageElement).src = "src/assets/safe_image.webp"}
        />

        <section className="animal-info">
          <h3>Vem är {animal.name}?</h3>
          <p>{animal.name} är {new Date().getFullYear() - animal.yearOfBirth} år. {animal.shortDescription}</p>

          <div className="taking-care-of">
            <span>
              <h3>Fick mat senast:</h3>
              <p>{formatTime(feedStatus.lastAction ?? new Date())}</p>
              <CareStatus
                animalName={animal.name}
                status={feedStatus.status}
                type="feed"
                onAction={feedStatus.update}
                buttonLabel={`Mata ${animal.name}`}
                canAct={feedStatus.canAct}
              />
            </span>

            <span>
              <h3>Blev klappad senast:</h3>
              <p>{formatTime(petStatus.lastAction ?? new Date())}</p>
              <CareStatus
                animalName={animal.name}
                status={petStatus.status}
                type="pet"
                onAction={petStatus.update}
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
