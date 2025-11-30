import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function Signup() {
    const {signup} = useAuthStore()

    const [formData , setFormData] = useState({
        fullname:"",
        email:"",
        password:""
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        signup(formData)
    }    

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered"
              required
              onChange={(e)=>setFormData({...formData , fullname:e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <br />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input input-bordered"
              required
              onChange={(e)=>setFormData({...formData , email:e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered"
              required
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
            />
          </div>

          {/* Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full" type="submit">Sign Up</button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center mt-4">
          Already have an account?{" "}
            <Link className="link link-primary" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
