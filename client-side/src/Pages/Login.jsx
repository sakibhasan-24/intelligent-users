import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/userStorage";
import { useDispatch, useSelector } from "react-redux";
import GoogleButton from "../components/GoogleButton";

export default function Login() {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };
  const handleSubmitForm = (e) => {
    // setLoading(true);
    // setError(false);
    // ----------------------redux will used----------------------------

    dispatch(signInStart()); //set loading true
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // setLoading(false);

        if (data.success === false) {
          // setError(true);
          // console.log(data);
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate("/");
        // console.log(data + " created successfully");
      })
      .catch((err) => {
        // setLoading(false);
        // setError(true);
        dispatch(signInFailure(err));
      });
  };

  return (
    <div className="p-2 max-w-2xl mx-auto ">
      <h1 className="font-bold text-4xl text-center my-6">Login</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 ">
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
            dont's have an account?{" "}
            <span className="text-blue-500">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
      <p>{error && "something went wrong"}</p>
    </div>
  );
}
