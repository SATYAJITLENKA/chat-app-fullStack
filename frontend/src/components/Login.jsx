import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function Login() {

 const { login , isLoggingIng} = useAuthStore()
 console.log(isLoggingIng);
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData)
    login(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8 rounded-2xl border border-base-200">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full rounded-xl"
              onChange={(e) => setFormData({...formData , email:e.target.value})}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-xl"
              onChange={(e) => setFormData({...formData , password:e.target.value})}
              required
            />
          </label>

          <button className="btn btn-primary w-full rounded-xl mt-2 text-base">
            {
                isLoggingIng ? (<Loader className="animate-spin" />) : ("Log In")
                
            }
            
          </button>
        </form>

        <p className="text-center mt-6 text-sm opacity-80">
          Don't have an account? <Link className="link link-primary" to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
