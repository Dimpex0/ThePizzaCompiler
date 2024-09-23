import React from "react";
import { Outlet } from "react-router-dom";
import MenuSelect from "../../components/MenuSelect/MenuSelect";

export default function MenuPage() {
  return (
    <>
      <h1>Menu</h1>
      <MenuSelect />
      <Outlet />
    </>
  );
}
