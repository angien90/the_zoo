import "./Layout.css";
import { NavLink, Outlet } from "react-router";

export const Layout = () => {

    return (
        <div className="app-wrapper">
            <header>
                <h1>The Zoo</h1>
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
        );
};