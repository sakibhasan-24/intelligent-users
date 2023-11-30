import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
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
          {currentUser ? (
            <Link to="/profile">
              <img
                // src="https://lh3.googleusercontent.com/a/ACg8ocISpLo3wfgTRfrwd1TtibHuVrA8Q1m1tsXqXqzux3MJ=s96-c"
                src={currentUser.profilePicture}
                className="h-7 w-7 rounded-full object-cover"
                alt=""
              />
            </Link>
          ) : (
            <Link to="/signup">
              <li>SignUp</li>
            </Link>
          )}
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
