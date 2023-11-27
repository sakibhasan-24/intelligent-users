import React from "react";
import { Link } from "react-router-dom";

export default function SIgnUp() {
  return (
    <div className="p-2 max-w-2xl mx-auto ">
      <h1 className="font-bold text-4xl text-center my-6">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          id="name"
          placeholder="user Name"
          className="p-4 rounded-lg bg-slate-200"
        />
        <input
          type="email"
          id="email"
          placeholder="user Email"
          className="p-4 rounded-lg bg-slate-200"
        />
        <input
          type="password"
          id="password"
          placeholder="user Password"
          className="p-4 rounded-lg bg-slate-200"
        />
        <button className="bg-slate-700 px-4 py-2 text-white font-bold rounded-lg hover:bg-slate-950">
          Sign Up
        </button>
        <div className="flex gap-2">
          <p>
            already have an account?{" "}
            <span className="text-blue-500">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
