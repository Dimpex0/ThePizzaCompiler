import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/Root/Root";
import MenuPage from "./pages/Menu/Menu";
import PizzaMenuPage from "./pages/PizzaMenu/PizzaMenu";
import DrinksPage from "./pages/Drinks/Drinks";
import PizzaDetailsPage from "./pages/PizzaDetails/PizzaDetails";
import { useCartStore } from "./store/cart";
import { useEffect, useRef } from "react";
import CartPage from "./pages/Cart/Cart";
import { retrieveCart, updateCartItemsToBackend } from "./utils/cart";
import LoginPage from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <MenuPage />,
        children: [
          {
            index: true,
            element: <PizzaMenuPage />,
          },
          { path: "menu/pizza", element: <PizzaMenuPage /> },
          { path: "menu/pizza/:pizzaSlug", element: <PizzaDetailsPage /> },
          { path: "menu/drinks", element: <DrinksPage /> },
        ],
      },
      { path: "cart", element: <CartPage /> },
      {
        path: "account",
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);

function App() {
  const { cart, setCart } = useCartStore();

  const isFirstRender = useRef(true);

  useEffect(() => {
    async function updateCartItems() {
      const response = await updateCartItemsToBackend(cart);
      // handle response
    }

    if (!isFirstRender.current) {
      updateCartItems();
    }
  }, [cart]);

  useEffect(() => {
    async function getCart() {
      const response = await retrieveCart();
      const responseData = await response.json();
      if (response.ok) {
        setCart(responseData.items);
      } else {
        //
      }
    }

    if (isFirstRender.current) {
      getCart();
      isFirstRender.current = false;
    }
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
