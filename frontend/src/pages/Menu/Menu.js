import React from "react";
import { Outlet } from "react-router-dom";
import MenuSelect from "../../components/MenuSelect/MenuSelect";

import "./Menu.css";

export default function MenuPage() {
  return (
    <>
      <div className="menu-select-container">
        <MenuSelect />
      </div>
      <Outlet />
    </>
  );
}
