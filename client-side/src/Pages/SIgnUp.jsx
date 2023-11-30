import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";

export default function SIgnUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleFormData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };
  const handleSubmitForm = (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();
    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        // console.log(data);
        if (data.success === false) {
          setError(true);
          return;
        }

        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };
  return (
    <div className="p-2 max-w-2xl mx-auto ">
      <h1 className="font-bold text-4xl text-center my-6">Sign Up</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 ">
        <input
          type="text"
          id="userName"
          placeholder="user Name"
          className="p-4 rounded-lg bg-slate-200"
          onChange={handleFormData}
        />
        <input
          type="email"
          id="email"
          placeholder="user Email"
          className="p-4 rounded-lg bg-slate-200"
          onChange={handleFormData}
        />
        <input
          type="password"
          id="password"
          placeholder="user Password"
          className="p-4 rounded-lg bg-slate-200"
          onChange={handleFormData}
        />
        <button
          disabled={loading}
          className="bg-slate-700 px-4 py-2 text-white font-bold rounded-lg hover:bg-slate-950 disabled:bg-slate-800"
        >
          {loading ? "loading" : "sign up"}
        </button>
        <GoogleButton />
        <div className="flex gap-2">
          <p>
            already have an account?{" "}
            <span className="text-blue-500">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
      <p>{error && "something wen wrong"}</p>
    </div>
  );
}
