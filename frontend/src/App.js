import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/Root/Root";
import MenuPage from "./pages/Menu/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [{ path: "menu", element: <MenuPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
