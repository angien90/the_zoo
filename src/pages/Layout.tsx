import "./Layout.scss";
import { NavLink, Outlet } from "react-router";
import { useAnimals } from "../hooks/useAnimals";
import { AnimalContext } from "../contexts/AnimalContext";

export const Layout = () => {
  const { state, dispatch, carouselRef } = useAnimals();

  return (
    <AnimalContext.Provider
      value={{
        animals: state.animals,
        dispatch,
        carouselRef,
      }}
    >
      <div className="app-wrapper">
        <header>
          <h1>The Zoo 🐾</h1>
          <nav>
            <ul>
              <li>
                <NavLink to={"/"}>Hem</NavLink>
              </li>
              <li>
                <NavLink to={"/animals"}>Djur</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <p>© 2025 The Zoo</p>
          <p>Alla djur matas med kärlek ❤️</p>
        </footer>
      </div>
    </AnimalContext.Provider>
  );
};
