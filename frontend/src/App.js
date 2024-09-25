import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/Root/Root";
import MenuPage from "./pages/Menu/Menu";
import PizzaMenuPage from "./pages/PizzaMenu/PizzaMenu";
import DrinksPage from "./pages/Drinks/Drinks";
import PizzaDetailsPage from "./pages/PizzaDetails/PizzaDetails";
import { useCartStore } from "./store/cart";
import { useEffect } from "react";

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
            element: <PizzaMenuPage />,
          },
          { path: "pizza", element: <PizzaMenuPage /> },
          { path: "pizza/:pizzaSlug", element: <PizzaDetailsPage /> },
          { path: "drinks", element: <DrinksPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const { cart } = useCartStore();

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
