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
import { useAccountStore } from "./store/account";
import { checkSession } from "./utils/auth";
import LogoutPage from "./pages/Logout/Logout";
import PrivacyPolicyPage from "./pages/Legal/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditionsPage from "./pages/Legal/TermsAndConditions/TermsAndConditions";
import CookiePolicyPage from "./pages/Legal/CookiePolicy/CookiePolicy";
import LegalDisclaimerPage from "./pages/Legal/LegalDisclaimer/LegalDisclaimer";

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
        children: [
          { path: "login", element: <LoginPage /> },
          {
            path: "logout",
            element: <LogoutPage />,
          },
        ],
      },
      {
        path: "legal",
        children: [
          { path: "privacy-policy", element: <PrivacyPolicyPage /> },
          {
            path: "terms-and-conditions",
            element: <TermsAndConditionsPage />,
          },
          { path: "cookie-policy", element: <CookiePolicyPage /> },
          { path: "legal-disclaimer", element: <LegalDisclaimerPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const { cart, setCart } = useCartStore();
  const { isLoggedIn } = useAccountStore();

  const resetAccountData = useAccountStore((state) => state.reset);
  const updateIsLoggedIn = useAccountStore((state) => state.updateIsLoggedIn);
  const updateIsAdmin = useAccountStore((state) => state.updateIsAdmin);

  useEffect(() => {
    async function chechAccountSession() {
      const response = await checkSession();
      if (response.ok) {
        const responseData = await response.json();
        updateIsLoggedIn(true);
        if (responseData.isAdmin) {
          updateIsAdmin(true);
        }
      } else {
        resetAccountData();
      }
    }
    chechAccountSession();
  }, []);

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

    if (isFirstRender.current || isLoggedIn === true) {
      getCart();
      isFirstRender.current = false;
    }
  }, [isLoggedIn]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
