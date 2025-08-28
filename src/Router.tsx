import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Animals } from "./pages/Animals";
import { AnimalDetail } from "./pages/AnimalDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/animals",
        element: <Animals />,
      },
      {
        path: "/animals/:id",
        element: <AnimalDetail />,
      },
    ],
  },
]);