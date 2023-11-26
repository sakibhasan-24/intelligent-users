import React from "react";
import { Outlet } from "react-router-dom";
import Home from "./Pages/Home";

export default function HomeComponent() {
  return (
    <div>
      <Home />
      <Outlet />
    </div>
  );
}
