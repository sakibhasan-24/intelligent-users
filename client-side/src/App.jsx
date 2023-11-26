import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import SIgnUp from "./Pages/SIgnUp";
import Login from "./Pages/Login";
import HomeComponent from "./HomeComponent";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeComponent />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/about", element: <About /> },
        { path: "/signup", element: <SIgnUp /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
