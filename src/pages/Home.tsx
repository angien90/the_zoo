import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="home-top">
        <h2>Välkommen till The Zoo!</h2>
        <p>Ge dina djur den kärlek de förtjänar!</p>
      </section>

      <div className="home-sections">
        <section className="home-card">
          <h2>Dagens höjdpunkt</h2>
          <p>Visste du att katter kan drömma precis som människor? Ge din katt lite extra godis idag! 😺</p>
        </section>

        <section className="home-card">
          <h2>Matningsutmaning</h2>
          <p>Kan du ge alla djur mat och klappa dem innan dagens slut? ⏰</p>
          <button className="feed-button" onClick={() => navigate("/animals")}>Starta utmaningen</button>
        </section>

        <section className="home-card">
          <h2>Djurens favoritmat</h2>
          <ul className="favorites">
            <li>🐱 Katt: Tonfisk</li>
            <li>🐶 Hund: Kycklingbitar</li>
            <li>🐹 Hamster: Solrosfrön</li>
            <li>🐰 Kanin: Morötter</li>
          </ul>
        </section>

        <section className="home-card">
          <h2>Visste du att…?</h2>
          <p>…kaniner inte svettas? Så se till att deras matplats är sval och skön! 🥕</p>
        </section>
      </div>
    </div>
  );
};

export default Home;
