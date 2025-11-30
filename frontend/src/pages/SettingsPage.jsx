import React from "react";
import { allThemes } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const handleTheme = (changeTheme) => {
    console.log("handleTheme is runnig");

    setTheme(changeTheme);
  };
  return (
    <div className="flex h-screen align-center justify-center items-center gap-3 font-bold ">
      {allThemes.map((themeName, index) => {
        return (
          <button
            className="cursor-pointer"
            key={index}
            onClick={() => handleTheme(themeName)}
          >
            {themeName}
          </button>
        );
      })}

    <Link to="/" className="absolute top-5 left-10 flex gap-7 items-center">
        <ArrowLeft /> Back
      </Link>
    </div>
  );
};

export default SettingsPage;
