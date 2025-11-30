import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import { useAuthStore } from "./store/useAuthStore";
import {Loader} from "lucide-react"
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SettingsPage from "./pages/SettingsPage";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth , isCheckingAuth  , onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()
  useEffect(() => {
    checkAuth()
  } , [checkAuth]);

  console.log("onlineUsers" , onlineUsers)

  console.log("authUser" , authUser)

  if ( isCheckingAuth && !authUser ) return(
    <div className="flex items-center justify-center h-screen">
    <Loader className="size-30 animate-spin"/>
    </div>
  )

  const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      { index: true , element: authUser ? <Home/> : <Navigate to="/Login"/>},
      {path:"signup", element: !authUser ? <Signup/> : <Navigate to="/"/>},
      {path:"login",  element: !authUser?<Login/> : <Navigate to="/"/> },
      {path:"profile",  element: authUser?<Profile/> : <Navigate to="/"/> },
      {path:"settings",  element: authUser?<SettingsPage/> : <Navigate to="/"/> }
    ]
  }
]);
console.log(theme)
  return (
    <div data-theme={theme}>
      <RouterProvider router={appRouter} />
      <Toaster/>
    </div>
  );
}

export default App;
