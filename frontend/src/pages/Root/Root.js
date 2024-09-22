import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation/MainNavigation";

export default function RootPage() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
