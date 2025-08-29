import { useParams, useNavigate } from "react-router-dom";
import { CareStatus } from "../components/CareStatus";
import { useAnimalDetail } from "../hooks/useAnimalDetail";
import { useAnimalStatus } from "../reducers/AnimalStatusReducer";
import "./AnimalDetail.scss";

export const AnimalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id);

  // Hämta djuret
  const animal = useAnimalDetail(numericId);
  // Indikation på att djuret snart behöver matas efter 3 timmar
  // Knappen blir klickbar efter 3 timmar
  // Djuret ska ha mat efter 4h
  const feedStatus = useAnimalStatus(animal?.id ?? 0, "lastFed", { canAct: 4, warning: 3 }, { canClickEarly: true });
  // Indikation på att djuret snart behöver klappas efter 2 timmar
  // Knappen blir klickbar efter 2 timmar
  // Djuret ska bli klappad efter 3h
  const petStatus = useAnimalStatus(animal?.id ?? 0, "lastPetted", { canAct: 3, warning: 2 }, { canClickEarly: true });

  // Hjälpfunktion för att formatera datum
  const formatTime = (date: string | number | Date) => {
    return new Date(date).toLocaleString();
  };

  if (!animal) return <p>Djur hittades inte</p>;

  // Knapp-logik: kan bara klickas om djuret är hungrigt/kelsjuk (status !== "happy") och canAct är true
  const feedCanAct = feedStatus.status !== "happy" && feedStatus.canAct;
  const petCanAct = petStatus.status !== "happy" && petStatus.canAct;

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
                canAct={feedCanAct}
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
                canAct={petCanAct}
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
