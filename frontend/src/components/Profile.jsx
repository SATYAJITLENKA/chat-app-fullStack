import React, { useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import profile from "../assets/profile.svg";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
export default function Profile() {
  const [selectedProfile, setSelectedProfile] = useState();
  const { authUser, updateProfile } = useAuthStore();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedProfile(base64Image);
      console.log(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-6">
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl p-8 rounded-2xl border border-base-200">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center relative">
          Profile
        </h2>
        <Link to="/">
        <ArrowLeft className="absolute lefo-0 top-10" />
        </Link>
        
        {/* Profile Details Section */}
        <div className="mb-8 ">
          {/* <h3 className="text-xl font-semibold mb-3">Profile Details</h3> */}

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <img
                src={selectedProfile || authUser.profilePic || profile}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border"
              />

              {/* Edit Icon */}
              <label className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg">
                <Pencil size={16} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Name & Email Form */}
        <form className="flex flex-col gap-5 mt-6">
          <label className="form-control w-full">
            <span className="label-text mb-1">Full Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full rounded-xl"
              value={authUser.fullname}
              readOnly
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-xl"
              value={authUser.email}
              readOnly
            />
          </label>

          {/* <button className="btn btn-primary w-full rounded-xl mt-2 text-base">
            Update Profile
          </button> */}
        </form>
      </div>
    </div>
  );
}
