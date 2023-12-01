import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase/firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imageProgress, setImageProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  //   console.log(image);
  const handleFormData = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (image) {
      // uploadImage
      uploadImage(image);
    }
  }, [image]);
  const uploadImage = async (image) => {
    // console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setImageError(true);
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //   console.log("File available at", downloadURL);
          setFormData({ ...formData, downloadURL });
        });
      }
    );
  };
  //   console.log(imageProgress);
  return (
    <div className="max-w-4xl mx-auto ">
      <input
        type="file"
        ref={fileRef}
        name=""
        id="file"
        className="hidden"
        accept=""
        onChange={(e) => setImage(e.target.files[0])}
      />
      <h1 className="text-center font-bold text-lg gap-6  my-10">Profile</h1>
      <form className="flex flex-col max-w-2xl  mx-auto my-6 shadow-lg  ">
        <img
          src={currentUser.profilePicture}
          alt=""
          onClick={() => fileRef.current.click()}
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
