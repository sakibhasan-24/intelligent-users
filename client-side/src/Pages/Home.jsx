import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="">
          <h1 className="font-bold">Users</h1>
        </Link>
        <ul className="flex space-x-4 font-bold">
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
