import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { signInSuccess } from "../redux/userStorage";
import { useDispatch } from "react-redux";
export default function GoogleButton() {
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, googleProvider);
      //   console.log(result.user);
      //   store data in mongodb
      fetch("http://localhost:3000/api/google/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(signInSuccess(data));
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="bg-red-600 text-slate-100 p-4 font-bold text-xs rounded-lg uppercase"
    >
      Sign In with Google
    </button>
  );
}
