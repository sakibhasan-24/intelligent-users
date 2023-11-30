import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const handleFormData = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-center font-bold text-lg gap-6  my-10">Profile</h1>
      <form className="flex flex-col max-w-2xl  mx-auto my-6 shadow-lg  ">
        <img
          src={currentUser.profilePicture}
          alt=""
          className="h-20 w-20 cursor-pointer self-center rounded-full object-cover"
        />
        <input
          type="text"
          id="userName"
          defaultValue={currentUser.userName}
          placeholder="user Name"
          className="p-4 rounded-lg bg-slate-200 mt-6 mb-4 w-3/4 mx-auto"
          onChange={handleFormData}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="p-4 rounded-lg bg-slate-200 mt-6 mb-4 w-3/4 mx-auto"
          onChange={handleFormData}
        />
        <input
          type="password"
          id="password"
          placeholder=""
          className="p-4 rounded-lg bg-slate-200 mt-6 mb-4 w-3/4 mx-auto"
          onChange={handleFormData}
        />

        <button
          disabled={loading}
          className="bg-slate-700 w-3/4 mx-auto px-4 py-2 text-white font-bold rounded-lg hover:bg-slate-950 disabled:bg-slate-800 mb-6"
        >
          update
        </button>
      </form>
      <div className="flex justify-between max-w-2xl mx-auto mt-6 mb-3">
        <p className="text-red-800 cursor-pointer">Delete Account</p>
        <p className="text-slate-700 cursor-pointer">Sign Out</p>
      </div>
    </div>
  );
}
