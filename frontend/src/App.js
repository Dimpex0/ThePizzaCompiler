import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/Root/Root";
import MenuPage from "./pages/Menu/Menu";
import PizzaPage from "./pages/Pizza/Pizza";
import DrinksPage from "./pages/Drinks/Drinks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "menu",
        element: <MenuPage />,
        children: [
          {
            index: true,
            element: <PizzaPage />,
          },
          { path: "pizza", element: <PizzaPage /> },
          { path: "drinks", element: <DrinksPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
